/**
 * Template processing utilities
 */
import fs from 'fs';
import crypto from 'crypto';

/**
 * Replaces placeholders in a template string with provided data.
 * @param {string} template - The template string.
 * @param {object} data - The data object containing values to inject.
 * @returns {string} - The templated string with placeholders replaced by actual data.
 */
export const templatize = (template, data) => {
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
 * Processes a template to add header images and lazy loading.
 * @param {string} templatized - The initial templated string.
 * @param {object} file - The file data object.
 * @param {string} fileBase - The base filename.
 * @param {string} imgDirPath - The path to image directory.
 * @returns {string} - The processed template with images added.
 */
export const processTemplateImages = (templatized, file, fileBase, imgDirPath) => {
  if (file.data.showImg) {
    // Check if the directory exists
    if (fs.existsSync(imgDirPath)) {
      // Look for any file that starts with "head." in the directory
      const headerFiles = fs.readdirSync(imgDirPath)
        .filter(file => file.startsWith('head.'));

      if (headerFiles.length > 0) {
        // Use the first matching file
        const headerFileName = headerFiles[0];
        // Construct the path as it will appear in the HTML
        const imgPath = `${fileBase}/${headerFileName}`;

        // Create HTML with the new structure - full width figure
        const headerImageHTML = `
        <figure class="header-figure">
          <img 
            src="/assets/img/${imgPath}" 
            width="3440" 
            height="1440" 
            alt="${file.data.title}" 
            class="blog-header-image">
        </figure>`;

        // Replace the existing figure element
        templatized = templatized.replace(
          /<figure class="header-figure">[\s\S]*?<\/figure>/g,
          headerImageHTML
        );
      } else {
        // No header image found, remove the figure element
        templatized = templatized.replace(/<figure class="header-figure">[\s\S]*?<\/figure>/g, '');
        console.warn(`⚠️ No header image found for: ${fileBase}`);
      }
    } else {
      // Image directory doesn't exist, remove the figure element
      templatized = templatized.replace(/<figure class="header-figure">[\s\S]*?<\/figure>/g, '');
      console.warn(`⚠️ Image directory doesn't exist for: ${fileBase}`);
    }
  } else {
    // If showImg is false or not specified, remove the figure element completely
    templatized = templatized.replace(
      /<figure class="header-figure">[\s\S]*?<\/figure>/g,
      ""
    );
  }

  // Add lazy loading to all images except the header image
  templatized = templatized.replace(
    /<img(?!\s+loading=["']lazy["'])(?!\s+[^>]*\bclass=["'][^"']*\bblog-header-image\b[^"']*["'])([^>]*)>/g,
    '<img$1 loading="lazy">'
  );

  return templatized;
};

/**
 * Processes a template to add update timestamps.
 * @param {string} templatized - The templated string.
 * @param {object} file - The file data object.
 * @param {string} key - The file key for the hash lookup.
 * @param {object} hashes - The hash object for tracking content changes.
 * @returns {string} - The processed template with timestamps added.
 */
export const processTemplateTimestamp = (templatized, file, key, hashes) => {
  if (file.data.showdate !== true) {
    return templatized;
  }

  // Create a hash of the content of the file
  const hash = crypto.createHash("md5").update(file.html).digest("hex");
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
    hashes[key]["hash"] != hash
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

  return templatized;
};
/**
 * Processes a template to add podcast embed code.
 * @param {string} templatized - The initial templated string.
 * @param {object} file - The file data object.
 * @returns {string} - The processed template with podcast embed added.
 */
export const processPodcasts = (templatized, file, config) => {
  if (!file.data.isPodcast) return templatized;

  // Get podcasts from config
  const podcastsConfig = config.podcasts?.featured || [];

  let podcastsHTML = '';

  // If podcasts exist in config, use them
  if (podcastsConfig.length > 0) {
    podcastsConfig.forEach(podcast => {
      podcastsHTML += `
      <div class="pt3 podcast-wrapper mb3">
        <h6>Featured: ${podcast.name}</h6>
        <iframe allow="autoplay *; encrypted-media *;" frameborder="0" height="450" 
          style="width:100%;max-width:660px;overflow:hidden;background:transparent;" 
          sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" 
          src="https://embed.podcasts.apple.com/us/podcast/${podcast.slug}/id${podcast.id}">
        </iframe>
      </div>`;
    });
  } else {
    podcastsHTML = `
    <div class="podcast-wrapper">
      <h3>No featured podcasts available.</h3>
      <p>Check back later for updates!</p>
    </div>`;
  }

  // Replace the loading div with the podcast embed
  templatized = templatized.replace(
    /<div class="podcasts-here">[\s\S]*?<\/div>/,
    `<div class="podcasts-here">${podcastsHTML}</div>`
  );

  return templatized;
};