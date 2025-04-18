/**
 * Image optimization module
 * Creates responsive image variants with caching
 */
import fs from "fs";
import path from "path";
import sharp from 'sharp';
import crypto from 'crypto';

// Cache directory for storing processed images between builds
const CACHE_DIR = './.cache/images';

/**
 * Calculate hash of file contents
 * @param {string} filePath - Path to the file
 * @returns {string} - MD5 hash of file contents
 */
function getFileHash(filePath) {
  try {
    const fileBuffer = fs.readFileSync(filePath);
    const hashSum = crypto.createHash('md5');
    hashSum.update(fileBuffer);
    return hashSum.digest('hex');
  } catch (error) {
    console.error(`Error hashing file ${filePath}:`, error);
    return null;
  }
}

/**
 * Ensure cache directory exists
 */
function ensureCacheDir() {
  if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
  }
}

/**
 * Creates responsive image variants with caching
 * @param {string} inputPath - Path to the original image
 * @param {string} outputFolder - Where to save responsive images
 * @returns {Array} - Array of generated image filenames
 */
export async function createResponsiveImages(inputPath, outputFolder) {
  const sizes = [768, 1200, 1920]; // Responsive sizes
  
  // Ensure output and cache directories exist
  if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder, { recursive: true });
  }
  ensureCacheDir();

  const filename = path.basename(inputPath, path.extname(inputPath));
  const ext = path.extname(inputPath).toLowerCase();
  
  // Calculate hash of original image
  const fileHash = getFileHash(inputPath);
  if (!fileHash) {
    console.error(`Could not calculate hash for ${inputPath}`);
    return [];
  }

  const outputFiles = [];
  
  // Process all sizes in parallel for better performance
  await Promise.all(sizes.map(async (width) => {
    const outputFilename = `${filename}-${width}${ext}`;
    const outputPath = path.join(outputFolder, outputFilename);
    const cacheKey = `${fileHash}-${width}${ext}`;
    const cachePath = path.join(CACHE_DIR, cacheKey);
    
    try {
      // Check if this exact image is already in cache
      if (fs.existsSync(cachePath)) {
        // Copy from cache to destination
        fs.copyFileSync(cachePath, outputPath);
        outputFiles.push(outputFilename);
      } else {
        // Process image and save to both output and cache
        await sharp(inputPath)
          .resize({ width, withoutEnlargement: true })
          .toFile(outputPath);
          
        // Save to cache for future builds
        fs.copyFileSync(outputPath, cachePath);
        outputFiles.push(outputFilename);
      }
    } catch (error) {
      console.error(`Error creating responsive image ${outputFilename}:`, error);
    }
  }));

  return outputFiles;
}