/**
 * Default page builder
 * Handles generation of non-blog pages
 */
import fs from "fs";
import path from "path";
import { mdToPdf } from "md-to-pdf";
import config from "../config.js";
import { readFile } from "../utils/markdown.js";
import { saveFile, getOutputFilename, getOutputPdfname } from "../utils/file.js";
import { templatize, processTemplateImages, processTemplateTimestamp, processPodcasts } from "../utils/template.js";

/**
 * Processes a default file: reads it, replaces placeholders in the template with actual data, and saves the result.
 * Optionally generates a PDF version of the file. The output filename is generated based on the input filename and output path.
 * @param {string} filename - The filename to process.
 * @param {string} template - The template to use.
 * @param {string} outPath - The output path.
 * @param {object} hashes - The object containing the hashes of the content of the files.
 */
export const processDefaultFile = async (filename, template, outPath, hashes) => {
  const file = readFile(filename);
  const outfilename = getOutputFilename(filename, outPath);

  // Skip draft posts
  const draft = file.data.draft;
  if (draft) return;

  let templatized = templatize(template, {
    title: file.data.title,
    content: file.html,
    description: file.data.description,
    blogslug: filename.split("/").slice(-1).join("/").slice(0, -3),
  });

  // Generate PDF if needed
  if (file.data.pdf && file.data.pdf == true) {
    const outpdfname = getOutputPdfname(filename, outPath);
    mdToPdf({ path: filename }, { dest: outpdfname });
  }

  // Process file key for timestamps and image handling
  let key = filename.split("/").slice(-1).join("/").slice(0, -3);
  templatized = processTemplateTimestamp(templatized, file, key, hashes);

  // Handle images
  const fileBase = filename.split("/").slice(-1)[0].slice(0, -3);
  const imgDirPath = path.join(config.srcPath.assetsPath, 'img', fileBase);
  templatized = await processTemplateImages(templatized, file, fileBase, imgDirPath);

  templatized = processPodcasts(templatized, file, config);

  saveFile(outfilename, templatized);
  console.info(`📄 ${filename.split("/").slice(-1).join("/").slice(0, -3)}`);
};