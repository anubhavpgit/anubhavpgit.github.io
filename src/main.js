#!/usr/bin/env node

/**
 * Main build script
 * Orchestrates the site generation process
 */
import fs from "fs";
import path from "path";
import glob from "glob";
import https from "https";

// Local modules
import config from "./config.js";
import { copyAssets } from "./utils/file.js";
import { processBlogFile, buildBlogIndex } from "./builders/blogBuilder.js";
import { processDefaultFile } from "./builders/defaultBuilder.js";
import { buildInvertedIndex } from "./builders/searchIndex.js";
import { optimizeAssets } from "./optimizers/assets.js";
import { generateXmls } from "./builders/rssBuilder.js";

/**
 * Fetches hash metadata from remote source
 * @returns {Object} - Hash metadata object
 */
async function fetchHashesMetadata() {
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

    return data;
  } catch (error) {
    console.error("Error fetching hash metadata:", error);
    return {};
  }
}

/**
 * Main function that orchestrates the processing of all markdown files.
 */
const main = async () => {
  // Resolve paths from config
  const srcPath = path.resolve(config.srcPath.content);
  const blogOutPath = path.resolve(config.srcPath.blogOutPath);
  const indexOutPath = path.resolve(config.srcPath.indexOutPath);
  const assetsPath = path.resolve(config.srcPath.assetsPath);

  // Read templates
  const blogTemplate = fs.readFileSync(
    config.srcPath.template + "/blog.html",
    "utf8"
  );
  const defaultTemplate = fs.readFileSync(
    config.srcPath.template + "/default.html",
    "utf8"
  );

  // Find content files
  const indexFiles = glob.sync(`${srcPath}/*.md`);
  const blogFiles = glob.sync(`${srcPath}/posts/*.md`);

  // Fetch hash metadata
  const hashes = await fetchHashesMetadata();

  // Clean output directory but preserve cache
  if (fs.existsSync(indexOutPath)) {
    // Get all files and directories in the output path except the .cache directory
    const items = fs.readdirSync(indexOutPath);
    for (const item of items) {
      if (item !== '.cache') {
        const itemPath = path.join(indexOutPath, item);
        fs.rmSync(itemPath, { recursive: true, force: true });
      }
    }
  } else {
    fs.mkdirSync(indexOutPath, { recursive: true });
  }

  // Process default pages
  await Promise.all(
    indexFiles.map(async (filename) => {
      await processDefaultFile(filename, defaultTemplate, indexOutPath, hashes);
    })
  );

  // Process blog posts
  const blogs = new Map();
  await Promise.all(
    blogFiles.map(async (filename) => {
      if (filename.includes("index.md")) {
        await processDefaultFile(filename, defaultTemplate, blogOutPath, hashes);
        return;
      }
      await processBlogFile(filename, blogTemplate, blogOutPath, blogs, hashes);
    })
  );
  console.info("🚀 Build complete!");

  // Save updated hash metadata
  fs.writeFileSync(`${indexOutPath}/metadata.json`, JSON.stringify(hashes));

  // Build search index
  const allFiles = [...indexFiles, ...blogFiles];
  const searchIndex = buildInvertedIndex(allFiles);
  fs.writeFileSync(`${indexOutPath}/search-index.json`, JSON.stringify(searchIndex));

  // Create cache info file for diagnostics
  if (!fs.existsSync(`${indexOutPath}/.cache`)) {
    fs.mkdirSync(`${indexOutPath}/.cache`, { recursive: true });
  }

  const now = new Date();
  const cacheInfo = {
    lastBuild: now.toISOString(),
    cacheStats: {
      images: fs.existsSync('./.cache/images') ?
        fs.readdirSync('./.cache/images').length : 0,
      assets: fs.existsSync('./.cache/assets') ?
        fs.readdirSync('./.cache/assets').length : 0,
      markdown: fs.existsSync('./.cache/markdown') ?
        fs.readdirSync('./.cache/markdown').length : 0
    }
  };

  fs.writeFileSync(`${indexOutPath}/.cache/info.json`, JSON.stringify(cacheInfo, null, 2));

  // Create assets directory
  const assetsDir = path.join(indexOutPath, 'assets');
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
  }

  // Build blog index
  buildBlogIndex(blogs, blogOutPath);

  // Copy and optimize assets
  copyAssets(assetsPath, indexOutPath);
  await optimizeAssets(indexOutPath, blogOutPath, indexOutPath + "/assets");
  console.info("📄 Assets copied and optimized!");

  await generateXmls();
};

// Run the main function
(async () => {
  try {
    await main();
  } catch (error) {
    console.error(error);
  }
})();