/**
 * Markdown processing utilities
 */
import MarkdownIt from "markdown-it";
import markdownItCheckbox from "markdown-it-checkbox";
import markdownItAnchor from "markdown-it-anchor";
import markdownItFootnote from "markdown-it-footnote";
import markdownItKatex from "markdown-it-katex";
import hljs from "highlight.js";
import string from "string";
import matter from "gray-matter";
import fs from "fs";

/**
 * Converts a string into a slug, which is a URL-friendly version of a string.
 * @param {string} s - The string to be converted into a slug.
 * @returns {string} - The slug version of the input string.
 */
export const slugify = (s) => string(s).slugify().toString();

// Initialize MarkdownIt with configured options
export const md = MarkdownIt({
  html: true, // Enable HTML tags in source
  linkify: true, // Autoconvert URL-like text to links
  typographer: true, // Enable language-neutral replacement + quotes beautification
  highlight(str, language) {
    // Highlight code blocks
    if (language && hljs.getLanguage(language)) {
      try {
        return hljs.highlight(str, { language }).value;
      } catch (err) {
        console.error(err);
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
export const readFile = (filename) => {
  const rawFile = fs.readFileSync(filename, "utf8");
  const parsed = matter(rawFile);
  const html = md.render(parsed.content);

  return { ...parsed, html };
};