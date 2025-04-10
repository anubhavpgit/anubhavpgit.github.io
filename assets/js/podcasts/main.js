// podcast/main.js - Main module for fetching and rendering podcasts

export const config = {
	// Default configuration
	episodesPerSeries: 5,
	colors: {
		seriesHeader: 'var(--azure)',
		episodeHover: 'var(--lightgray)',
		standaloneBadge: 'var(--pastel-purple)',
		series1Badge: 'var(--pastel-blue)',
		series2Badge: 'var(--pastel-yellow)'
	}
};

// Parse XML string to JSON
function parseRSS(xmlString) {
	const parser = new DOMParser();
	const xmlDoc = parser.parseFromString(xmlString, "text/xml");
	const items = xmlDoc.getElementsByTagName("item");
	const parsedItems = [];

	for (let item of items) {
		// Extract all relevant data from the RSS feed
		const title = getElementText(item, "title") || getElementText(item, "itunes\\:title");
		const description = getElementText(item, "description");
		const pubDate = getElementText(item, "pubDate");
		const duration = getElementText(item, "itunes\\:duration");
		const seriesName = getElementText(item, "itunes\\:seriesName");
		const episodeNumber = getElementText(item, "itunes\\:episode");
		const seasonNumber = getElementText(item, "itunes\\:season");
		const guid = getElementText(item, "guid");

		// Get enclosure (audio file) information
		const enclosure = item.querySelector("enclosure");
		const enclosureUrl = enclosure ? enclosure.getAttribute("url") : "";
		const enclosureType = enclosure ? enclosure.getAttribute("type") : "";

		parsedItems.push({
			title,
			description,
			pubDate,
			'itunes:duration': duration,
			'itunes:episode': episodeNumber,
			'itunes:season': seasonNumber,
			'itunes:seriesName': seriesName,
			guid,
			enclosure: {
				url: enclosureUrl,
				type: enclosureType
			}
		});
	}

	return {
		channel: {
			item: parsedItems
		}
	};
}

// Helper function to get text content from an XML element
function getElementText(parentElement, tagName) {
	const element = parentElement.querySelector(tagName);
	return element ? element.textContent.trim() : '';
}

// Fetch and parse RSS feed
async function fetchRSSFeed() {
	try {
		// Replace with your actual feed URL
		const response = await fetch('/assets/docs/test/rss.rss');
		const xmlString = await response.text();
		return parseRSS(xmlString);
	} catch (error) {
		console.error('Error fetching RSS feed:', error);
		return null;
	}
}

// Format date nicely
function formatDate(dateString) {
	const date = new Date(dateString);
	const options = { day: 'numeric', month: 'short', year: 'numeric' };
	return date.toLocaleDateString('en-US', options);
}

// Format duration nicely
function formatDuration(duration) {
	if (!duration) return '';

	const parts = duration.split(':');
	if (parts.length === 3) {
		return `${parseInt(parts[0])}h ${parseInt(parts[1])}m`;
	} else if (parts.length === 2) {
		return `${parseInt(parts[0])}m ${parseInt(parts[1])}s`;
	}

	return duration;
}

export async function initPodcasts() {
	const rssData = await fetchRSSFeed();
	if (!rssData) {
		console.error('No RSS data provided');
		return;
	}

	const container = document.querySelector('.start-here');
	if (!container) {
		console.error('No podcast container found');
		return;
	}

	// Clear existing content
	container.innerHTML = '';

	// Add styles
	addPodcastStyles();

	// Group episodes by series
	const seriesMap = new Map();
	const standaloneEpisodes = [];

	rssData.channel.item.forEach(episode => {
		const seriesName = episode['itunes:seriesName'];
		if (seriesName) {
			if (!seriesMap.has(seriesName)) {
				seriesMap.set(seriesName, []);
			}
			seriesMap.get(seriesName).push(episode);
		} else {
			standaloneEpisodes.push(episode);
		}
	});

	// Create main container
	const podcastContainer = document.createElement('div');
	podcastContainer.className = 'podcast-container';
	container.appendChild(podcastContainer);

	// Render series
	let seriesIndex = 0;
	seriesMap.forEach((episodes, seriesName) => {
		const seriesElement = createSeriesSection(seriesName, episodes, seriesIndex);
		podcastContainer.appendChild(seriesElement);
		seriesIndex++;
	});

	// Render standalone episodes
	if (standaloneEpisodes.length > 0) {
		const standaloneSection = createStandaloneSection(standaloneEpisodes);
		podcastContainer.appendChild(standaloneSection);
	}
}

function createSeriesSection(seriesName, episodes, seriesIndex) {
	const section = document.createElement('div');
	section.className = 'podcast-series';

	// Series header
	const header = document.createElement('h2');
	header.className = 'series-title';
	header.textContent = seriesName;
	section.appendChild(header);

	const episodesList = document.createElement('div');
	episodesList.className = 'podcast-episodes';

	// Sort episodes by date (newest first)
	episodes.sort((a, b) => {
		return new Date(b.pubDate) - new Date(a.pubDate);
	});

	// Add episodes to this series
	episodes.forEach((episode, index) => {
		// Only show configured number of episodes initially
		const isHidden = index >= config.episodesPerSeries;
		const episodeElement = createEpisodeElement(episode, isHidden, false);
		episodesList.appendChild(episodeElement);
	});

	section.appendChild(episodesList);

	// Add "Show More" button if there are more episodes
	if (episodes.length > config.episodesPerSeries) {
		const showMoreBtn = document.createElement('button');
		showMoreBtn.className = 'podcast-show-more';
		showMoreBtn.textContent = 'Show More Episodes';
		showMoreBtn.addEventListener('click', function () {
			episodesList.querySelectorAll('.podcast-episode.hidden').forEach(el => {
				el.classList.remove('hidden');
			});
			this.style.display = 'none';
		});
		section.appendChild(showMoreBtn);
	}

	return section;
}

function createStandaloneSection(episodes) {
	const section = document.createElement('div');
	section.className = 'podcast-standalone';

	const header = document.createElement('h2');
	header.className = 'standalone-title';
	header.textContent = 'Standalone Episodes';
	section.appendChild(header);

	const episodesList = document.createElement('div');
	episodesList.className = 'podcast-episodes';

	// Sort episodes by date (newest first)
	episodes.sort((a, b) => {
		return new Date(b.pubDate) - new Date(a.pubDate);
	});

	episodes.forEach(episode => {
		const episodeElement = createEpisodeElement(episode, false, true);
		episodesList.appendChild(episodeElement);
	});

	section.appendChild(episodesList);
	return section;
}

function createEpisodeElement(episode, isHidden, isStandalone) {
	const element = document.createElement('div');
	element.className = `podcast-episode${isHidden ? ' hidden' : ''}`;
	element.dataset.guid = episode.guid;

	// Create episode title
	const title = document.createElement('h3');
	title.className = 'episode-title';
	title.textContent = episode.title;
	element.appendChild(title);

	// Create episode metadata
	const metadata = document.createElement('div');
	metadata.className = 'episode-metadata';

	// Add publication date
	const date = document.createElement('span');
	date.className = 'episode-date';
	date.textContent = `Published: ${formatDate(episode.pubDate)}`;
	metadata.appendChild(date);

	// Add duration if available
	if (episode['itunes:duration']) {
		const duration = document.createElement('span');
		duration.className = 'episode-duration';
		duration.textContent = `Duration: ${formatDuration(episode['itunes:duration'])}`;
		metadata.appendChild(duration);
	}

	element.appendChild(metadata);

	// Add episode description
	const description = document.createElement('p');
	description.className = 'episode-description';
	description.textContent = episode.description;
	element.appendChild(description);

	// Add audio player if enclosure URL exists
	if (episode.enclosure && episode.enclosure.url) {
		const player = document.createElement('div');
		player.className = 'episode-player';

		const audio = document.createElement('audio');
		audio.controls = true;
		audio.preload = 'none';
		audio.src = episode.enclosure.url;

		player.appendChild(audio);
		element.appendChild(player);
	}

	return element;
}

// Add styles for podcast components
function addPodcastStyles() {
	if (document.getElementById('podcast-styles')) return;

	const styleEl = document.createElement('style');
	styleEl.id = 'podcast-styles';
	styleEl.textContent = `
    /* Podcast container styling */
    .podcast-container {
      margin: 2rem 0;
      max-width: 36rem;
      margin-left: auto;
      margin-right: auto;
    }
    
    /* Series styling */
    .podcast-series, .podcast-standalone {
      margin-bottom: 2rem;
    }
    
    .series-title, .standalone-title {
      color: var(--darkgray);
      margin-bottom: 1rem;
      border-bottom: 1px solid var(--azure);
      padding-bottom: 0.5rem;
    }
    
    /* Episode styling */
    .podcast-episode {
      margin-bottom: 1.5rem;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid var(--lightgray);
    }
    
    .podcast-episode:last-child {
      border-bottom: none;
    }
    
    .episode-title {
      margin: 0 0 0.5rem 0;
      font-size: 1.2rem;
      color: var(--darkgray);
    }
    
    .episode-metadata {
      display: flex;
      gap: 1rem;
      font-size: 0.8rem;
      color: #777;
      margin-bottom: 0.5rem;
    }
    
    .episode-description {
      font-size: 0.9rem;
      line-height: 1.5;
      margin: 0.75rem 0;
    }
    
    .episode-player {
      margin-top: 1rem;
    }
    
    .episode-player audio {
      width: 100%;
      height: 32px;
    }
    
    /* Show more button */
    .podcast-show-more {
      background-color: transparent;
      color: var(--azure);
      border: 1px solid var(--azure);
      padding: 0.5rem 1rem;
      cursor: pointer;
      font-size: 0.9rem;
      margin-top: 1rem;
      transition: background-color 0.2s;
    }
    
    .podcast-show-more:hover {
      background-color: var(--lightgray);
    }
    
    /* Hidden episodes */
    .podcast-episode.hidden {
      display: none;
    }
    
    /* Media query for mobile */
    @media (max-width: 768px) {
      .episode-metadata {
        flex-direction: column;
        gap: 0.25rem;
      }
    }
  `;

	document.head.appendChild(styleEl);
}

// Initialize podcasts when the page loads
document.addEventListener('DOMContentLoaded', () => {
	initPodcasts();
});