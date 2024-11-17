#!/usr/bin/env node

import fs from "fs";
import glob from "glob";
import matter from "gray-matter";
import mkdirp from "mkdirp";
import path from "path";
import hljs from "highlight.js";
import MarkdownIt from "markdown-it";
import markdownItCheckbox from "markdown-it-checkbox";
import markdownItAnchor from "markdown-it-anchor";
import markdownItFootnote from "markdown-it-footnote";
import markdownItKatex from "markdown-it-katex";
import string from "string";
import { mdToPdf } from "md-to-pdf";
import crypto from "crypto";
import https from "https";
import toml from "toml";

// Read the config file
const config = toml.parse(fs.readFileSync("./config.toml", "utf-8"));
/*
 * Function: slugify
 * Description: Converts a string into a slug, which is a URL-friendly version of a string.
 * Parameters: s - The string to be converted into a slug.
 * Returns: The slug version of the input string.
 */
const slugify = (s) => string(s).slugify().toString();

// Initializing MarkdownIt with options
const md = MarkdownIt({
  html: true, // Enable HTML tags in source
  linkify: true, // Autoconvert URL-like text to links
  typographer: true, // Enable some language-neutral replacement + quotes beautification
  highlight(str, language) {
    // Highlight code blocks
    if (language && hljs.getLanguage(language)) {
      try {
        return hljs.highlight(str, { language }).value;
      } catch (err) {
        console.log(err);
      }
    }

    return null; // If no language is specified, return null
  },
})
  .use(markdownItAnchor, { slugify }) // Use markdown-it-anchor plugin with slugify function
  .use(markdownItCheckbox) // Use markdown-it-checkbox plugin
  .use(markdownItFootnote) // Use markdown-it-footnote plugin
  .use(markdownItKatex, { throwOnError: false, errorColor: "#cc0000" }); // Use markdown-it-katex plugin
/**
 * Reads a file and returns its content, parsed and rendered as HTML.
 * @param {string} filename - The filename to read.
 * @returns {object} - The parsed file content, including the rendered HTML.
 */
const readFile = (filename) => {
  const rawFile = fs.readFileSync(filename, "utf8");
  const parsed = matter(rawFile);
  const html = md.render(parsed.content);

  return { ...parsed, html };
};

/**
 * Replaces placeholders in a template string with provided data.
 * @param {string} template - The template string.
 * @param {object} data - The data object containing date, title, content, author, and description.
 * @returns {string} - The templated string with placeholders replaced by actual data.
 */
const templatize = (template, data) => {
  let result = template;
  for (let key in data) {
    if (data[key]) {
      result = result.replace(
        new RegExp(`<!-- ${key.toUpperCase()} -->`, "g"),
        data[key]
      );
    }
  }
  return result;
};

/**
 * Saves a string to a file, creating the necessary directories if they don't exist.
 * @param {string} filename - The filename to save.
 * @param {string} contents - The contents to save.
 */
const saveFile = (filename, contents) => {
  const dir = path.dirname(filename);
  mkdirp.sync(dir);
  fs.writeFileSync(filename, contents);
};

/**
 * Generates the output filename for a given input filename and output path.
 * @param {string} filename - The filename to save.
 * @param {string} outPath - The output path.
 * @returns {string} - The output filename.
 */
const getOutputFilename = (filename, outPath) => {
  const basename = path.basename(filename);
  if (basename.includes("index.md")) return path.join(outPath, "index.html");
  const newfilename = `${basename.slice(0, -3)}.html`;
  const outfile = path.join(outPath, newfilename);
  return outfile;
};

/**
 * Generates the output PDF filename for a given input filename and output path.
 * @param {string} filename - The filename to save.
 * @param {string} outPath - The output path.
 * @returns {string} - The output PDF filename.
 */
const getOutputPdfname = (filename, outPath) => {
  const basename = path.basename(filename);
  const newfilename = `${basename.slice(0, -3)}.pdf`;
  const newFolderPath = path.join(outPath, config.srcPath.pdfOutPath);

  if (!fs.existsSync(newFolderPath)) {
    fs.mkdirSync(newFolderPath, { recursive: true });
  }

  const outfile = path.join(newFolderPath, newfilename);
  return outfile;
};

/**
 * Processes a blog file: reads it, replaces placeholders in the template with actual data, and saves the result.
 * Builds a map of blog metadata, to be used for generating the blog index.
 * @param {Map} blogs - The map containing blog metadata.
 * @param {string} filename - The filename to process.
 * @param {string} template - The template to use.
 * @param {string} outPath - The output path.
 * @param {object} hashes - The object containing the hashes of the content of the files.
 */
const processBlogFile = (filename, template, outPath, blogs, hashes) => {
  const file = readFile(filename);

  const draft = file.data.draft;
  if (draft) return;

  const outfilename = getOutputFilename(filename, outPath);

  if (file.data.pdf && file.data.pdf == true) {
    const outpdfname = getOutputPdfname(filename, outPath);
    mdToPdf({ path: filename }, { dest: outpdfname });
  }

  if (file.data.index != false) {
    blogs.set(filename.split("/").slice(-1).join("/").slice(0, -3), {
      title: file.data.title,
      date: file.data.date,
      tag: file.data.tag,
    });
  }

  let templatized = templatize(template, {
    date: file.data.date,
    title: file.data.title,
    content: file.html,
    author: file.data.author,
    description: file.data.description,
    tags: file.data.tag,
  });
  if (file.data.showdate == true) {
    // Create a hash of the content of the file
    const hash = crypto.createHash("md5").update(file.html).digest("hex");
    let key = filename.split("/").slice(-1).join("/").slice(0, -3);
    const date = new Date();
    const options = {
      weekday: "long",
      month: "long",
      day: "numeric",
    };
    const formattedDate = date.toLocaleDateString("en-US", options);
    const datetimeSpan = `<span class="datetime" id="datetime">${formattedDate}</span>`;

    if (
      hashes[key] === undefined ||
      hashes[key] === null ||
      hashes[key] != hash
    ) {
      hashes[key] = {
        hash: hash,
        date: formattedDate,
      };
      // Use regex to find the div and replace it with the updated content
      templatized = templatized.replace(
        /(<span class="update-date-time">)(<\/span>)/,
        `$1${datetimeSpan}$2`
      );
    } else {
      templatized = templatized.replace(
        /(<span class="update-date-time">)(<\/span>)/,
        `$1${hashes[key].date}$2`
      );
    }
  }
  saveFile(outfilename, templatized);
  //skipcq: JS-0002
  console.log(`📄 ${filename.split("/").slice(-1).join("/").slice(0, -3)}`);
};

/**
 * Processes a default file: reads it, replaces placeholders in the template with actual data, and saves the result.
 * Optionally generates a PDF version of the file. The output filename is generated based on the input filename and output path.
 * @param {string} filename - The filename to process.
 * @param {string} template - The template to use.
 * @param {string} outPath - The output path.
 * @param {boolean} generatePdf - Whether to generate a PDF version of the file.
 * @param {object} hashes - The object containing the hashes of the content of the files.
 */
const processDefaultFile = (filename, template, outPath, hashes) => {
  const file = readFile(filename);
  const outfilename = getOutputFilename(filename, outPath);

  let templatized = templatize(template, {
    title: file.data.title,
    content: file.html,
    description: file.data.description,
  });
  if (file.data.pdf && file.data.pdf == true) {
    const outpdfname = getOutputPdfname(filename, outPath);
    mdToPdf({ path: filename }, { dest: outpdfname });
  }

  if (file.data.showdate == true) {
    // Create a hash of the content of the file
    const hash = crypto.createHash("md5").update(file.html).digest("hex");
    let key = filename.split("/").slice(-1).join("/").slice(0, -3);
    const date = new Date();
    const options = {
      weekday: "long",
      month: "long",
      day: "numeric",
    };
    const formattedDate = date.toLocaleDateString("en-US", options);
    const datetimeSpan = `<span class="datetime" id="datetime">${formattedDate}</span>`;
    if (
      hashes[key] === undefined ||
      hashes[key] === null ||
      hashes[key] != hash
    ) {
      hashes[key] = {
        hash: hash,
        date: formattedDate,
      };
      // Use regex to find the div and replace it with the updated content
      templatized = templatized.replace(
        /(<span class="update-date-time">)(<\/span>)/,
        `$1${datetimeSpan}$2`
      );
    } else {
      templatized = templatized.replace(
        /(<span class="update-date-time">)(<\/span>)/,
        `$1${hashes[key].date}$2`
      );
    }
  }

  saveFile(outfilename, templatized);
  //skipcq: JS-0002
  console.log(`📄 ${filename.split("/").slice(-1).join("/").slice(0, -3)}`);
};
/**
 * Builds the blog index from the map of blog metadata and replaces the index placeholder in the blog index file.
 * Updates the index file with the new index HTML.
 * @param {Map} blogs - The map containing blog metadata.
 * @param {string} path - The output path.
 * @returns {string} - The index HTML.
 */

const buildBlogIndex = (blogs, path) => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const sortedBlogs = Array.from(blogs.entries()).sort((a, b) => {
    const [dayA, monthA, yearA] = a[1].date.split("-");
    const [dayB, monthB, yearB] = b[1].date.split("-");

    return (
      new Date(yearB, monthB - 1, dayB) - new Date(yearA, monthA - 1, dayA)
    );
  });

  let allTags = new Set();

  let postsHTML = "";

  sortedBlogs.forEach(([key, value]) => {
    const [day, month, year] = value.date.split("-");
    const displayDate = `${monthNames[parseInt(month) - 1]} ${year.slice(-2)}`;

    // Handle multiple tags per post
    try {
      if (value.tag) {
        const tags = value.tag.split(",").map((t) => t.trim());
        tags.forEach((tag) => allTags.add(tag));
        const tagsHTML = tags
          .map((tag) => `<span style="font-size: 0.8em;">#${tag}</span>`)
          .join(",");

        const listItem = `<li class="flex justify-between pb1" data-tags="${tags.join(
          " "
        )}"> 
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
          });
        });
      });
    </script>
  `;

  // Get index from path
  const indexFile = path + "/index.html";

  // Read the existing index file content
  const indexFileContent = fs.readFileSync(indexFile, "utf8");

  // Replace the placeholder in the index file with the generated HTML
  const replacedIndex = indexFileContent.replace(
    '<h2 id="posts" tabindex="-1">Posts</h2>',
    generatedHTML
  );
  // Write the updated content back to the index file
  fs.writeFileSync(indexFile, replacedIndex);
};
/**
 * Copies assets from the assets folder to the output folder.
 * @param {string} src - The source folder.
 * @param {string} dest - The destination folder.
 **/
const copyAssets = (src, dest, depth = 0) => {
  const files = fs.readdirSync(src);
  files.forEach((file) => {
    if (file === ".DS_Store") {
      return;
    }
    const srcFile = path.join(src, file);
    const destFile =
      depth === 0 && fs.statSync(srcFile).isDirectory()
        ? path.join(dest, "assets", file)
        : path.join(dest, file);
    if (fs.statSync(srcFile).isDirectory()) {
      fs.mkdirSync(destFile, { recursive: true });
      copyAssets(srcFile, destFile, depth + 1);
    } else {
      const destDir = path.dirname(destFile);
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }
      const contents = fs.readFileSync(srcFile);
      fs.writeFileSync(destFile, contents);
    }
  });
};

/**
 * Main function that orchestrates the processing of all markdown files.
 */
const main = async () => {
  const srcPath = path.resolve(config.srcPath.content);
  const blogOutPath = path.resolve(config.srcPath.blogOutPath);
  const dir = path.resolve(config.srcPath.indexOutPath);
  const indexOutPath = path.resolve(config.srcPath.indexOutPath);
  const assetsPath = path.resolve(config.srcPath.assetsPath);

  const blogTemplate = fs.readFileSync(
    config.srcPath.template + "/blog.html",
    "utf8"
  );
  const defaulTemplate = fs.readFileSync(
    config.srcPath.template + "/default.html",
    "utf8"
  );

  const indexFiles = glob.sync(`${srcPath}/*.md`);
  const blogFiles = glob.sync(`${srcPath}/posts/*.md`);
  let hashes;
  try {
    const link = config.srcPath.hashesmetadata;
    const data = await new Promise((resolve, reject) => {
      https
        .get(link, (res) => {
          let data = "";

          res.on("data", (chunk) => {
            data += chunk;
          });

          res.on("end", () => {
            resolve(JSON.parse(data));
          });
        })
        .on("error", (err) => {
          reject(err);
        });
    });

    hashes = data;
  } catch (error) {
    console.error("Error fetching data:", error);
    hashes = {};
  }

  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
  fs.mkdirSync(dir, { recursive: true });

  indexFiles.forEach((filename) => {
    processDefaultFile(filename, defaulTemplate, indexOutPath, hashes);
  });

  const blogs = new Map();

  blogFiles.forEach((filename) => {
    if (filename.includes("index.md")) {
      processDefaultFile(filename, defaulTemplate, blogOutPath, hashes);
      return;
    }
    processBlogFile(filename, blogTemplate, blogOutPath, blogs, hashes);
  });
  console.log("🚀 Build complete!");
  fs.writeFileSync(`${dir}/metadata.json`, JSON.stringify(hashes));

  buildBlogIndex(blogs, blogOutPath);

  copyAssets(assetsPath, indexOutPath);
};

(async () => {
  try {
    await main();
  } catch (error) {
    console.error(error);
  }
})();
