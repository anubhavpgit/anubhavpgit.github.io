/**
 * Blog post builder
 * Handles generation of blog posts and blog index
 */
import fs from "fs";
import path from "path";
import { mdToPdf } from "md-to-pdf";
import config from "../config.js";
import { readFile } from "../utils/markdown.js";
import { saveFile, getOutputFilename, getOutputPdfname } from "../utils/file.js";
import { templatize, processTemplateImages, processTemplateTimestamp } from "../utils/template.js";

/**
 * Processes a blog file: reads it, replaces placeholders in the template with actual data, and saves the result.
 * Builds a map of blog metadata, to be used for generating the blog index.
 * @param {string} filename - The filename to process.
 * @param {string} template - The template to use.
 * @param {string} outPath - The output path.
 * @param {Map} blogs - The map containing blog metadata.
 * @param {object} hashes - The object containing the hashes of the content of the files.
 */
export const processBlogFile = (filename, template, outPath, blogs, hashes) => {
  const file = readFile(filename);

  // Skip draft posts
  const draft = file.data.draft;
  if (draft) return;

  const outfilename = getOutputFilename(filename, outPath);

  // Generate PDF if needed
  if (file.data.pdf && file.data.pdf == true) {
    const outpdfname = getOutputPdfname(filename, outPath);
    mdToPdf({ path: filename }, { dest: outpdfname });
  }

  // Add to blogs map for index generation if this post should be indexed
  if (file.data.index != false) {
    blogs.set(filename.split("/").slice(-1).join("/").slice(0, -3), {
      title: file.data.title,
      date: file.data.date,
      tag: file.data.tag,
    });
  }

  // Format the date for display
  const parts = file.data.date.split("-"); // Split the date into [day, month, year]
  const date = new Date(parts[2], parts[1] - 1, parts[0]);
  const viewDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);

  // Create the initial template with data
  let templatized = templatize(template, {
    date: file.data.date,
    viewDate: viewDate,
    title: file.data.title,
    content: file.html,
    author: file.data.author,
    description: file.data.description,
    tags: file.data.tag,
    blogslug: filename.split("/").slice(-1).join("/").slice(0, -3),
  });

  // Process file key for timestamps and image handling
  let key = filename.split("/").slice(-1).join("/").slice(0, -3);
  templatized = processTemplateTimestamp(templatized, file, key, hashes);

  // Handle images
  const fileBase = filename.split("/").slice(-1)[0].slice(0, -3);
  const imgDirPath = path.join(config.srcPath.assetsPath, 'img', fileBase);
  templatized = processTemplateImages(templatized, file, fileBase, imgDirPath);

  saveFile(outfilename, templatized);
  console.info(`📄 ${filename.split("/").slice(-1).join("/").slice(0, -3)}`);
};

/**
 * Builds the blog index from the map of blog metadata and replaces the index placeholder in the blog index file.
 * Updates the index file with the new index HTML.
 * @param {Map} blogs - The map containing blog metadata.
 * @param {string} path - The output path.
 */
export const buildBlogIndex = (blogs, path) => {
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "June",
    "July", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  // Sort blogs by date (newest first)
  const sortedBlogs = Array.from(blogs.entries()).sort((a, b) => {
    const [dayA, monthA, yearA] = a[1].date.split("-");
    const [dayB, monthB, yearB] = b[1].date.split("-");

    return (
      new Date(yearB, monthB - 1, dayB) - new Date(yearA, monthA - 1, dayA)
    );
  });

  let allTags = new Set();
  let postsHTML = "";
  let currentYear = "";

  // Process each blog post
  sortedBlogs.forEach(([key, value]) => {
    const [day, month, year] = value.date.split("-");
    const displayDate = `${monthNames[parseInt(month) - 1]}`;

    // Add year separator if this is a new year
    if (year !== currentYear) {
      currentYear = year;
      postsHTML += `<div class="year-separator">
      <hr/>
      <span style="white-space: nowrap; text-decoration: underline;">${year}</span>
        </div>`;
    }

    // Handle multiple tags per post
    try {
      if (value.tag) {
        const tags = value.tag.split(",").map((t) => t.trim());
        tags.forEach((tag) => allTags.add(tag));
        const tagsHTML = tags
          .map((tag) => `<span style="font-size: 0.8em;">#${tag}</span>`)
          .join(",");

        const listItem = `<li class="flex justify-between pb1" data-tags="${tags.join(" ")}"> 
      <a href="./${key}.html" class="link">${value.title}</a>${displayDate}
      </li>`;

        postsHTML += listItem;
      } else {
        const listItem = `<li class="flex justify-between pb1" data-tags=""> 
        <a href="./${key}.html" class="link">${value.title}</a>${displayDate}
        </li>`;

        postsHTML += listItem;
      }
    } catch (error) {
      console.error(`Error processing post: ${key}`);
    }
  });

  // Generate tag selection UI
  const tagArray = Array.from(allTags).sort();
  const tagSelectionHTML = `
    <div id="tag-selection" style="margin-bottom: 20px;">
      <span data-tag="all" style="cursor: pointer; margin-right: 10px; font-weight: bold;">#all</span>
      ${tagArray
      .map(
        (tag) =>
          `<span data-tag="${tag}" style="cursor: pointer; margin-right: 10px;">${tag}</span>`
      )
      .join(" ")}
    </div>
  `;

  // Build the final HTML with tags at the top and posts below
  let generatedHTML = `
    ${tagSelectionHTML}
    <ul id="posts-list" style="padding-left: 0px;">
      ${postsHTML}
    </ul>
    <script>
      document.addEventListener('DOMContentLoaded', function() {
        const tagSelectors = document.querySelectorAll('#tag-selection span');
        const posts = document.querySelectorAll('#posts-list li');
        const yearSeparators = document.querySelectorAll('.year-separator');

        tagSelectors.forEach(function(tagSelector) {
          tagSelector.addEventListener('click', function() {
            const selectedTag = this.getAttribute('data-tag');

            // Update the styling of tag selectors
            tagSelectors.forEach(ts => ts.style.fontWeight = 'normal');
            this.style.fontWeight = 'bold';

            if (selectedTag === 'all') {
              posts.forEach(function(post) {
                post.style.display = '';
              });
            } else {
              posts.forEach(function(post) {
                const postTags = post.getAttribute('data-tags').split(' ');
                if (postTags.includes(selectedTag)) {
                  post.style.display = '';
                } else {
                  post.style.display = 'none';
                }
              });
            }

            // Hide year separators without any visible posts below them
            yearSeparators.forEach(function(separator) {
              let nextElement = separator.nextElementSibling;
              let hasVisiblePost = false;
              while (nextElement && nextElement.classList.contains('year-separator') === false) {
                if (nextElement.style.display !== 'none') {
                  hasVisiblePost = true;
                  break;
                }
                nextElement = nextElement.nextElementSibling;
              }
              separator.style.display = hasVisiblePost ? '' : 'none';
            });

          });
        });
      });
    </script>
  `;

  // Get index from path
  const indexFile = path + "/index.html";

  // Read the existing index file content and update it
  const indexFileContent = fs.readFileSync(indexFile, "utf8");
  const replacedIndex = indexFileContent.replace(
    '<h2 id="posts" tabindex="-1">Posts</h2>',
    generatedHTML
  );

  // Write the updated content back to the index file
  fs.writeFileSync(indexFile, replacedIndex);
};