/**
 * File system utility functions
 */
import fs from "fs";
import path from "path";
import mkdirp from "mkdirp";
import config from "../config.js";

/**
 * Saves a string to a file, creating the necessary directories if they don't exist.
 * @param {string} filename - The filename to save.
 * @param {string} contents - The contents to save.
 */
export const saveFile = (filename, contents) => {
  const dir = path.dirname(filename);
  mkdirp.sync(dir);
  fs.writeFileSync(filename, contents);
};

/**
 * Copies assets from the source folder to the destination folder.
 * @param {string} src - The source folder.
 * @param {string} dest - The destination folder.
 * @param {number} depth - The current recursion depth.
 */
export const copyAssets = (src, dest, depth = 0) => {
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
 * Generates the output filename for a given input filename and output path.
 * @param {string} filename - The filename to process.
 * @param {string} outPath - The output path.
 * @returns {string} - The output filename.
 */
export const getOutputFilename = (filename, outPath) => {
  const basename = path.basename(filename);
  if (basename.includes("index.md")) return path.join(outPath, "index.html");
  const newfilename = `${basename.slice(0, -3)}.html`;
  const outfile = path.join(outPath, newfilename);
  return outfile;
};

/**
 * Generates the output PDF filename for a given input filename and output path.
 * @param {string} filename - The filename to process.
 * @param {string} outPath - The output path.
 * @returns {string} - The output PDF filename.
 */
export const getOutputPdfname = (filename, outPath) => {
  const basename = path.basename(filename);
  const newfilename = `${basename.slice(0, -3)}.pdf`;
  const newFolderPath = path.join(outPath, config.srcPath.pdfOutPath);

  if (!fs.existsSync(newFolderPath)) {
    fs.mkdirSync(newFolderPath, { recursive: true });
  }

  const outfile = path.join(newFolderPath, newfilename);
  return outfile;
};