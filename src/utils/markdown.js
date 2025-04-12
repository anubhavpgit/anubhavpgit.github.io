/**
 * Markdown processing utilities with caching
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
import path from "path";
import crypto from "crypto";

// Cache directory for storing processed markdown between builds
const MD_CACHE_DIR = './.cache/markdown';

/**
 * Converts a string into a slug, which is a URL-friendly version of a string.
 * @param {string} s - The string to be converted into a slug.
 * @returns {string} - The slug version of the input string.
 */
export const slugify = (s) => string(s).slugify().toString();

/**
 * Calculate hash of file contents
 * @param {string} content - File content to hash
 * @returns {string} - MD5 hash of file contents
 */
function getContentHash(content) {
  try {
    const hashSum = crypto.createHash('md5');
    hashSum.update(content);
    return hashSum.digest('hex');
  } catch (error) {
    console.error(`Error hashing content:`, error);
    return null;
  }
}

/**
 * Ensure cache directory exists
 */
function ensureMarkdownCacheDir() {
  if (!fs.existsSync(MD_CACHE_DIR)) {
    fs.mkdirSync(MD_CACHE_DIR, { recursive: true });
  }
}

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
 * Uses caching to avoid reprocessing unchanged markdown files.
 * @param {string} filename - The filename to read.
 * @returns {object} - The parsed file content, including the rendered HTML.
 */
export const readFile = (filename) => {
  const rawFile = fs.readFileSync(filename, "utf8");
  
  // Ensure cache directory exists
  ensureMarkdownCacheDir();
  
  // Calculate hash of raw markdown content
  const contentHash = getContentHash(rawFile);
  if (!contentHash) {
    console.error(`Could not calculate hash for ${filename}`);
    // Fall back to non-cached version
    const parsed = matter(rawFile);
    const html = md.render(parsed.content);
    return { ...parsed, html };
  }
  
  // Create cache key based on filename and content hash
  const fileBasename = path.basename(filename);
  const cacheKey = `md_${fileBasename}_${contentHash}.json`;
  const cachePath = path.join(MD_CACHE_DIR, cacheKey);
  
  // Check if cached version exists
  if (fs.existsSync(cachePath)) {
    try {
      // Use cached version
      const cachedData = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
      return cachedData;
    } catch (error) {
      console.error(`Error reading markdown cache for ${filename}:`, error);
      // If cache read fails, continue with normal processing
    }
  }
  
  // Normal processing if no cache hit
  const parsed = matter(rawFile);
  const html = md.render(parsed.content);
  const result = { ...parsed, html };
  
  // Save to cache for future builds
  try {
    fs.writeFileSync(cachePath, JSON.stringify(result));
  } catch (error) {
    console.error(`Error writing markdown cache for ${filename}:`, error);
  }
  
  return result;
};