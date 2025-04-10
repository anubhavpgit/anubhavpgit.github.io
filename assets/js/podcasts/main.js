/**
 * Podcast RSS Feed Parser and Renderer
 * For Anubhav's SSG
 */

// Main function to parse and render the RSS feed
async function renderPodcasts() {
	try {
		// Fetch the RSS feed
		const response = await fetch('assets/js/podcasts/rss.rss');
		const xmlText = await response.text();

		// Parse the XML
		const parser = new DOMParser();
		const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

		// Get channel info
		const channel = xmlDoc.querySelector('channel');
		const channelTitle = channel.querySelector('title').textContent;
		const channelDescription = channel.querySelector('description').textContent;

		// Get all items
		const items = Array.from(xmlDoc.querySelectorAll('item'));

		// Group items by series
		const seriesMap = groupItemsBySeries(items);

		// Render the content
		renderContent(channelTitle, channelDescription, seriesMap);
	} catch (error) {
		console.error('Error rendering podcasts:', error);
		const startHereDiv = document.querySelector('.start-here');
		if (startHereDiv) {
			startHereDiv.innerHTML = `
        <h2>Error Loading Podcasts</h2>
        <p>Sorry, there was an error loading the podcast feed. Please try again later.</p>
      `;
		}
	}
}

// Helper function to get namespaced elements
function getNamespacedElement(parentElement, namespace, tagName) {
	// Try different approaches to get the element
	// 1. Standard approach (works in some browsers)
	let element = parentElement.getElementsByTagNameNS(namespace, tagName)[0];

	// 2. Try with the namespace prefix
	if (!element) {
		element = parentElement.getElementsByTagName(`${namespace}:${tagName}`)[0];
	}

	// 3. Try without namespace handling (works in some parsers)
	if (!element) {
		element = parentElement.getElementsByTagName(tagName)[0];
	}

	// 4. Try with querySelector but with escaped colon (less reliable)
	if (!element) {
		try {
			element = parentElement.querySelector(`*|${tagName}`) ||
				parentElement.querySelector(`${namespace}\\:${tagName}`);
		} catch (e) {
			// Some browsers may throw an error with this approach
		}
	}

	return element;
}

// Get element text content safely
function getElementTextContent(element) {
	return element ? element.textContent : null;
}

// Group items by their series name
function groupItemsBySeries(items) {
	const seriesMap = new Map();

	// First, collect standalone episodes (no series)
	const standaloneAudio = [];
	const standaloneVideo = [];

	items.forEach(item => {
		// Get series name using our helper function
		const seriesName = getNamespacedElement(item, 'itunes', 'seriesName');
		const seriesNameText = getElementTextContent(seriesName);

		// Check if this is a video
		const isVideo = getNamespacedElement(item, 'itunes', 'isVideo');
		const isVideoContent = getElementTextContent(isVideo) === 'true';

		// Also check enclosure type as a fallback for video detection
		const enclosure = item.querySelector('enclosure');
		const enclosureType = enclosure ? enclosure.getAttribute('type') : '';
		const isVideoByEnclosure = enclosureType && enclosureType.includes('video');

		// Final determination if it's video
		const isVideoFinal = isVideoContent || isVideoByEnclosure;

		if (!seriesNameText) {
			// This is a standalone episode
			if (isVideoFinal) {
				standaloneVideo.push(item);
			} else {
				standaloneAudio.push(item);
			}
			return;
		}

		if (!seriesMap.has(seriesNameText)) {
			seriesMap.set(seriesNameText, {
				episodes: [],
				isVideo: isVideoFinal
			});
		}

		seriesMap.get(seriesNameText).episodes.push(item);
	});

	// Sort episodes in each series by date (newest first)
	seriesMap.forEach(series => {
		series.episodes.sort((a, b) => {
			const dateA = new Date(a.querySelector('pubDate').textContent);
			const dateB = new Date(b.querySelector('pubDate').textContent);
			return dateB - dateA;
		});
	});

	// Sort standalone episodes by date (newest first)
	standaloneAudio.sort((a, b) => {
		const dateA = new Date(a.querySelector('pubDate').textContent);
		const dateB = new Date(b.querySelector('pubDate').textContent);
		return dateB - dateA;
	});

	standaloneVideo.sort((a, b) => {
		const dateA = new Date(a.querySelector('pubDate').textContent);
		const dateB = new Date(b.querySelector('pubDate').textContent);
		return dateB - dateA;
	});

	// Add standalone episodes to the map
	if (standaloneAudio.length > 0) {
		seriesMap.set('Standalone Audio', {
			episodes: standaloneAudio,
			isVideo: false
		});
	}

	if (standaloneVideo.length > 0) {
		seriesMap.set('Standalone Video', {
			episodes: standaloneVideo,
			isVideo: true
		});
	}

	return seriesMap;
}

// Format a date for display
function formatDate(dateStr) {
	const date = new Date(dateStr);
	const options = { year: 'numeric', month: 'short', day: 'numeric' };
	return date.toLocaleDateString('en-US', options);
}

// Format duration for display
function formatDuration(durationStr) {
	if (!durationStr) return '';

	// If it's already in HH:MM:SS format, return as is
	if (durationStr.includes(':')) return durationStr;

	// Convert seconds to HH:MM:SS
	const seconds = parseInt(durationStr, 10);
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	const secs = seconds % 60;

	if (hours > 0) {
		return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
	} else {
		return `${minutes}:${secs.toString().padStart(2, '0')}`;
	}
}

// Get specific data from an item with namespace handling
function getItemData(item) {
	const data = {
		title: item.querySelector('title')?.textContent || '',
		description: item.querySelector('description')?.textContent || '',
		pubDate: item.querySelector('pubDate')?.textContent || '',
		enclosure: item.querySelector('enclosure'),
		guid: item.querySelector('guid')?.textContent || '',
		link: item.querySelector('link')?.textContent || ''
	};

	// Get namespaced iTunes elements
	data.itunesTitle = getElementTextContent(getNamespacedElement(item, 'itunes', 'title'));
	data.itunesImage = getNamespacedElement(item, 'itunes', 'image')?.getAttribute('href') || '';
	data.itunesDuration = getElementTextContent(getNamespacedElement(item, 'itunes', 'duration'));
	data.itunesExplicit = getElementTextContent(getNamespacedElement(item, 'itunes', 'explicit'));
	data.itunesEpisode = getElementTextContent(getNamespacedElement(item, 'itunes', 'episode'));
	data.itunesSeason = getElementTextContent(getNamespacedElement(item, 'itunes', 'season'));
	data.itunesEpisodeType = getElementTextContent(getNamespacedElement(item, 'itunes', 'episodeType'));
	data.itunesIsVideo = getElementTextContent(getNamespacedElement(item, 'itunes', 'isVideo')) === 'true';

	// Determine if it's a video from enclosure type
	data.isVideoByEnclosure = data.enclosure &&
		data.enclosure.getAttribute('type') &&
		data.enclosure.getAttribute('type').includes('video');

	// Final determination for video
	data.isVideo = data.itunesIsVideo || data.isVideoByEnclosure;

	// Get the display title (prefer iTunes title if available)
	data.displayTitle = data.itunesTitle || data.title;

	return data;
}

// Render the main content
function renderContent(channelTitle, channelDescription, seriesMap) {
	// Find the start-here div to replace
	const startHereDiv = document.querySelector('.start-here');

	if (!startHereDiv) {
		console.error('Could not find .start-here element');
		return;
	}

	// Start building the podcast content HTML
	let contentHtml = '';

	// Add each series
	seriesMap.forEach((series, seriesName) => {
		contentHtml += `
      <div class="podcast-series">
        <h2>${seriesName} ${series.isVideo ? '(Video)' : ''}</h2>
        <div class="podcast-episodes">
    `;

		// Add each episode in this series
		series.episodes.forEach(episode => {
			// Get episode data using our helper function
			const episodeData = getItemData(episode);

			// Format the episode information
			const pubDate = formatDate(episodeData.pubDate);
			const durationText = episodeData.itunesDuration;

			// Build episode info text (Season X, Episode Y)
			const episodeInfo = [];
			if (episodeData.itunesSeason) episodeInfo.push(`Season ${episodeData.itunesSeason}`);
			if (episodeData.itunesEpisode) episodeInfo.push(`Episode ${episodeData.itunesEpisode}`);
			const episodeInfoText = episodeInfo.length > 0 ? `${episodeInfo.join(', ')}` : '';

			// Create media type indicator (audio/video icon)
			const mediaTypeIcon = episodeData.isVideo ? 'fa-video' : 'fa-headphones';

			contentHtml += `
        <div class="podcast-episode">
          <div class="episode-image">
            ${episodeData.itunesImage ? `<img src="${episodeData.itunesImage}" alt="${episodeData.displayTitle}">` : ''}
          </div>
          <div class="episode-content">
            <h3>${episodeData.displayTitle}</h3>
            ${episodeInfoText ? `<p class="episode-info">${episodeInfoText}</p>` : ''}
            <p class="episode-date">
              <span class="icon fa-calendar-days"></span> ${pubDate} 
              ${durationText ? `<span class="duration"><span class="icon fa-clock"></span> ${formatDuration(durationText)}</span>` : ''}
              <span class="media-type"><span class="icon ${mediaTypeIcon}"></span></span>
            </p>
            <p class="episode-description">${episodeData.description.substring(0, 200)}${episodeData.description.length > 200 ? '...' : ''}</p>
            ${episodeData.enclosure ? `
              <a href="${episodeData.enclosure.getAttribute('url')}" class="episode-link" target="_blank">
                <span class="icon fa-arrow-right"></span> Listen${episodeData.isVideo ? '/Watch' : ''}
              </a>
            ` : ''}
          </div>
        </div>
      `;
		});

		contentHtml += `
        </div>
      </div>
    `;
	});

	// Replace the start-here div with our content
	startHereDiv.outerHTML = contentHtml;

	// Add podcast-specific CSS
	addPodcastStyles();
}

// Add podcast-specific CSS
function addPodcastStyles() {
	const styleElement = document.createElement('style');
	styleElement.textContent = `
    .podcast-series-container {
      max-width: 38rem;
      margin: 0 auto;
    }
    
    .podcast-series {
      margin-bottom: 1rem;
    }
    
    .podcast-series h2 {
      margin-top: 1rem;
      margin-bottom: 0.5rem;
      padding-bottom: 0.25rem;
      border-bottom: 1px solid var(--lightgray);
    }
    
    .podcast-episodes {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    
    .podcast-episode {
      display: flex;
      gap: 0.75rem;
      border-bottom: 1px solid var(--lightgray);
      padding-bottom: 0.75rem;
      margin-bottom: 0.75rem;
    }
    
    .episode-image {
      flex: 0 0 100px;
      height: 100px;
      overflow: hidden;
      background-color: #f5f5f5;
    }
    
    .episode-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .episode-content {
      flex: 1;
      padding: 0;
    }
    
    .episode-content h3 {
      margin-top: 0;
      margin-bottom: 0.25rem;
      font-size: 1.1rem;
    }
    
    .episode-info {
      font-size: 0.85rem;
      margin: 0 0 0.25rem;
      color: var(--azure);
    }
    
    .episode-date {
      font-size: 0.8rem;
      color: #777;
      margin: 0 0 0.25rem;
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }
    
    .episode-date .icon {
      display: inline-flex;
      align-items: center;
      width: 1em;
      height: 1em;
      vertical-align: middle;
    }
    
    .duration {
      margin-left: 0.5rem;
    }
    
    .media-type {
      margin-left: 0.5rem;
    }
    
    .episode-description {
      font-size: 0.85rem;
      margin: 0 0 0.5rem;
      line-height: 1.3;
    }
    
    .episode-link {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.9rem;
      color: var(--azure);
      text-decoration: none;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      transition: background-color 0.2s ease;
    }
    
    .episode-link:hover {
      background-color: rgba(111, 146, 186, 0.1);
    }
    
    .episode-link .icon {
      width: 1em;
      height: 1em;
    }
    
    .fa-clock::before {
      content: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' fill='%23777'><path d='M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z'/></svg>");
      width: calc(1em * (512/512));
      height: 1em;
    }
    
    .fa-headphones::before {
      content: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' fill='%23777'><path d='M256 80C149.9 80 64 165.9 64 272v48.8c0 17.6-14.3 32-32 32H32c-17.7 0-32 14.3-32 32V448c0 17.7 14.3 32 32 32H32c53 0 96-43 96-96v-64c0-71 57-128 128-128s128 57 128 128v64c0 53 43 96 96 96h0c17.7 0 32-14.3 32-32V384.8c0-17.7-14.3-32-32-32H480c-17.7 0-32-14.4-32-32V272C448 165.9 362.1 80 256 80z'/></svg>");
      width: calc(1em * (512/512));
      height: 1em;
    }
    
    .fa-video::before {
      content: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 576 512' fill='%23777'><path d='M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zM559.1 99.8c10.4 5.6 16.9 16.4 16.9 28.2V384c0 11.8-6.5 22.6-16.9 28.2s-23 5-32.9-1.6l-96-64L416 337.1V174.9l14.2-9.5 96-64c9.8-6.5 22.4-7.2 32.9-1.6z'/></svg>");
      width: calc(1em * (576/512));
      height: 1em;
    }
    
    @media (max-width: 768px) {
      .podcast-episode {
        flex-direction: column;
      }
      
      .episode-image {
        flex: 0 0 auto;
        height: 160px;
        width: 100%;
      }
    }
  `;

	document.head.appendChild(styleElement);
}

// Initialize on load
document.addEventListener('DOMContentLoaded', renderPodcasts);