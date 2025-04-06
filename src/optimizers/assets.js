/**
 * Asset optimization module
 * Handles CSS and JS minification
 */
import fs from "fs";
import path from "path";
import glob from "glob";
import * as PurgeCSS from 'purgecss';
import cssnano from "cssnano";
import { minify } from "terser";

/**
 * Optimizes CSS files by removing unused selectors and minifying
 * @param {string} cssPath - Path to the CSS file
 * @param {Array} htmlFiles - List of HTML files to check for CSS usage
 */
export async function optimizeCSS(cssPath, htmlFiles) {
  // Skip if it's already a minified file
  if (cssPath.includes('.min.css')) {
    return;
  }

  const css = fs.readFileSync(cssPath, 'utf8');
  const outputPath = cssPath.replace('.css', '.min.css');

  try {
    // Import PostCSS dynamically
    const postcss = (await import('postcss')).default;

    // Remove unused CSS
    const purgecss = new PurgeCSS.PurgeCSS();
    const purgedCSS = await purgecss.purge({
      content: htmlFiles,
      css: [{ raw: css }],
      safelist: ['active', /^fa-/, /^w-/, /^h-/, /^mt-/, /^mb-/, /^ml-/, /^mr-/] // Add classes that might be added dynamically
    });

    // Minify CSS with cssnano
    const cssnanoProcessor = await cssnano().process(purgedCSS[0].css, {
      from: undefined
    });

    fs.writeFileSync(outputPath, cssnanoProcessor.css);
    // console.info(`      Created: ${path.basename(outputPath)}`);
  } catch (error) {
    console.error(`Error in optimizeCSS: ${error.message}`);
    // Fallback: just minify without purging if there's an error
    try {
      const CleanCSS = (await import('clean-css')).default;
      const minifiedCSS = new CleanCSS().minify(css).styles;
      fs.writeFileSync(outputPath, minifiedCSS);
    } catch (fallbackError) {
      console.error(`Fallback minification also failed: ${fallbackError.message}`);
    }
  }
}

/**
 * Optimizes JavaScript files through minification
 * @param {string} jsPath - Path to the JavaScript file
 */
export async function optimizeJS(jsPath) {
  // Skip if it's already a minified file
  if (jsPath.includes('.min.js')) {
    return;
  }

  const js = fs.readFileSync(jsPath, 'utf8');
  const outputPath = jsPath.replace('.js', '.min.js');

  try {
    const minified = await minify(js, {
      mangle: true,
      compress: true
    });

    if (minified.code) {
      fs.writeFileSync(outputPath, minified.code);
      // console.info(`      Created: ${path.basename(outputPath)}`);
    } else {
      throw new Error('Minification returned empty code');
    }
  } catch (error) {
    console.error(`Error in optimizeJS: ${error.message}`);
  }
}

/**
 * Updates HTML files to reference minified assets
 * @param {Array} htmlFiles - List of HTML files to update
 * @param {string} cssFilename - Original CSS filename
 * @param {string} minCssFilename - Minified CSS filename
 */
export function updateHtmlReferences(htmlFiles, cssFilename, minCssFilename) {
  htmlFiles.forEach(htmlFile => {
    let htmlContent = fs.readFileSync(htmlFile, 'utf8');
    htmlContent = htmlContent.replace(
      new RegExp(`href=["']/assets/css/${cssFilename}["']`, 'g'),
      `href="/assets/css/${minCssFilename}"`
    );
    fs.writeFileSync(htmlFile, htmlContent);
  });
}

/**
 * Optimizes all assets in the specified directories
 * @param {string} indexOutPath - Index output directory
 * @param {string} blogOutPath - Blog output directory
 * @param {string} assetsPath - Assets directory
 */
export async function optimizeAssets(indexOutPath, blogOutPath, assetsPath) {
  console.info("🔧 Optimizing assets...");

  // Get all generated HTML files for PurgeCSS
  const htmlFiles = [
    ...glob.sync(`${indexOutPath}/**/*.html`),
    ...glob.sync(`${blogOutPath}/**/*.html`)
  ];

  // Optimize CSS files
  const cssFiles = glob.sync(`${assetsPath}/css/*.css`).filter(file => !file.includes('.min.css'));
  for (const cssFile of cssFiles) {
    // console.info(`   Optimizing CSS: ${path.basename(cssFile)}`);
    try {
      await optimizeCSS(cssFile, htmlFiles);

      // Update HTML files to reference minified CSS
      const cssFilename = path.basename(cssFile);
      const minCssFilename = cssFilename.replace('.css', '.min.css');
      updateHtmlReferences(htmlFiles, cssFilename, minCssFilename);
    } catch (error) {
      console.error(`  L Error optimizing ${cssFile}:`, error);
    }
  }

  // Optimize JS files
  const jsFiles = glob.sync(`${assetsPath}/js/*.js`).filter(file => !file.includes('.min.js'));
  for (const jsFile of jsFiles) {
    try {
      // console.info(`   Optimizing JS: ${path.basename(jsFile)}`);
      await optimizeJS(jsFile);

      // Update HTML files to reference minified JS
      const jsFilename = path.basename(jsFile);
      const minJsFilename = jsFilename.replace('.js', '.min.js');

      htmlFiles.forEach(htmlFile => {
        let htmlContent = fs.readFileSync(htmlFile, 'utf8');
        htmlContent = htmlContent.replace(
          new RegExp(`src=["']/assets/js/${jsFilename}["']`, 'g'),
          `src="/assets/js/${minJsFilename}"`
        );
        fs.writeFileSync(htmlFile, htmlContent);
      });
    } catch (error) {
      console.error(`  L Error optimizing ${jsFile}:`, error);
    }
  }

  // console.info("Asset optimization complete!");
}