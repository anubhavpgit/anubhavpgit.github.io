/**
 * Image optimization module
 * Creates responsive image variants
 */
import fs from "fs";
import path from "path";
import sharp from 'sharp';

/**
 * Creates responsive image variants
 * @param {string} inputPath - Path to the original image
 * @param {string} outputFolder - Where to save responsive images
 * @returns {Array} - Array of generated image filenames
 */
export async function createResponsiveImages(inputPath, outputFolder) {
  const sizes = [768, 1200, 1920]; // Responsive sizes

  if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder, { recursive: true });
  }

  const filename = path.basename(inputPath, path.extname(inputPath));
  const ext = path.extname(inputPath).toLowerCase();

  const outputFiles = [];

  for (const width of sizes) {
    const outputFilename = `${filename}-${width}${ext}`;
    const outputPath = path.join(outputFolder, outputFilename);

    try {
      await sharp(inputPath)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 80 }) // Convert to WebP for better compression
        .toFile(outputPath.replace(ext, '.webp'));

      outputFiles.push(outputFilename.replace(ext, '.webp'));
    } catch (error) {
      console.error(`Error creating responsive image ${outputFilename}:`, error);
    }
  }

  return outputFiles;
}