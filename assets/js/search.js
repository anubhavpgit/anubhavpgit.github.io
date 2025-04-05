/**
 * Unified search functionality for the website
 * Combines search engine with spotlight-style UI
 */

class SearchEngine {
  constructor() {
    this.searchIndex = null;
    this.initialized = false;
    this.stopWords = ['and', 'the', 'for', 'are', 'with', 'this', 'that', 'not', 'was', 'but'];
  }

  // Initialize the search index
  async initialize() {
    try {
      // Try different possible locations for the search index
      let response;
      const possiblePaths = [
        '/search-index.json',
        '/assets/search-index.json',
        '/assets/js/search-index.json'
      ];

      for (const path of possiblePaths) {
        try {
          response = await fetch(path);
          if (response.ok) {
            break;
          }
        } catch (e) {
          // Continue trying other paths
        }
      }

      if (!response || !response.ok) {
        throw new Error('Failed to load search index from any path');
      }

      this.searchIndex = await response.json();
      this.initialized = true;
    } catch (error) {
      console.error('Error loading search index:', error);
    }
  }

  // Tokenize a search query
  tokenizeQuery(query) {
    return query
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter(token => token && token.length > 2)
      .filter(token => !this.stopWords.includes(token));
  }

  // Search for documents matching the query
  search(query) {
    if (!this.initialized || !this.searchIndex) {
      console.error('Search index not initialized');
      return [];
    }

    // Tokenize the query
    const queryTokens = this.tokenizeQuery(query);
    if (queryTokens.length === 0) {
      return [];
    }

    // Find documents that contain the tokens
    const { invertedIndex } = this.searchIndex;

    // For each token, get the list of documents
    const matchingDocuments = {};

    queryTokens.forEach(token => {
      // Check for exact match
      if (invertedIndex[token]) {
        invertedIndex[token].forEach(doc => {
          if (!matchingDocuments[doc]) {
            matchingDocuments[doc] = 1;
          } else {
            matchingDocuments[doc]++;
          }
        });
      }

      // Also check for prefix match (for partial word search)
      Object.keys(invertedIndex).forEach(indexToken => {
        if (indexToken.startsWith(token) && indexToken !== token) {
          invertedIndex[indexToken].forEach(doc => {
            if (!matchingDocuments[doc]) {
              matchingDocuments[doc] = 0.5; // Lower score for prefix match
            } else {
              matchingDocuments[doc] += 0.5;
            }
          });
        }
      });
    });

    // Convert to array and sort by relevance (number of matching tokens)
    const results = Object.entries(matchingDocuments)
      .map(([doc, score]) => ({
        path: doc.endsWith('.md') ? `/${doc.replace('.md', '.html')}` : `/${doc}`,
        score,
        file: doc.split('/').pop().replace('.md', '')
      }))
      .sort((a, b) => b.score - a.score);

    return results;
  }
}

// Initialize the search engine
const searchEngine = new SearchEngine();
window.searchEngine = searchEngine;

// Global references
let searchOverlay, searchInput, resultsContainer;

// Global toggle function
window.toggleSearchOverlay = function () {
  if (!searchOverlay) {
    console.error('Search overlay not initialized yet');
    return;
  }

  const isVisible = searchOverlay.style.display === 'flex';

  if (isVisible) {
    searchOverlay.style.display = 'none';
    searchOverlay.classList.remove('visible');
    document.body.style.overflow = '';
  } else {
    searchOverlay.style.display = 'flex';
    // Delay adding visible class for animation
    setTimeout(() => {
      searchOverlay.classList.add('visible');
    }, 10);
    document.body.style.overflow = 'hidden'; // Prevent scrolling behind overlay
    searchInput.focus();
    searchInput.value = '';
    resultsContainer.innerHTML = '';
  }
};

// For backward compatibility
const toggleSearchOverlay = window.toggleSearchOverlay;

// Create search UI elements by modifying the existing container
(function createSearchElements() {
  // Find the existing search container
  const existingContainer = document.querySelector('.search-container');
  if (!existingContainer) {
    console.error('Search container not found in the DOM');
    return;
  }

  // Create the search overlay
  searchOverlay = document.createElement('div');
  searchOverlay.id = 'search-overlay';
  searchOverlay.className = 'fixed w-100 h-100 top-0 left-0 z-999 flex items-center justify-center px2';
  searchOverlay.style.display = 'none';
  // searchOverlay.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
  searchOverlay.style.zIndex = '9999'; // Ensure it's on top

  // Center container - updated to be square with thin border
  const searchContainer = document.createElement('div');
  searchContainer.className = 'search-container bg-white overflow-hidden'; // Removed br2 to make it square
  searchContainer.style.maxHeight = '80vh';
  searchContainer.style.width = '100%';
  searchContainer.style.maxWidth = '650px'; // Match content width
  searchContainer.style.transition = 'all 0.1s ease';
  searchContainer.style.position = 'relative';
  searchContainer.style.border = '1px solid #ccc'; // Added thin border

  const searchHeader = document.createElement('div');
  searchHeader.className = 'pa3 bb b--light-gray flex items-center';

  const searchIconSpan = document.createElement('span');
  searchIconSpan.className = 'gray mr2';

  searchInput = document.createElement('input');
  searchInput.id = 'spotlight-search-input';
  searchInput.className = 'input-reset bn w-100';
  searchInput.type = 'text';
  searchInput.placeholder = `Search`;
  searchInput.autocomplete = 'on';

  resultsContainer = document.createElement('div');
  resultsContainer.id = 'search-results-container';
  resultsContainer.className = 'overflow-auto';
  resultsContainer.style.maxHeight = 'calc(80vh - 60px)';

  // Assemble the DOM structure
  searchHeader.appendChild(searchIconSpan);
  searchHeader.appendChild(searchInput);
  searchContainer.appendChild(searchHeader);
  searchContainer.appendChild(resultsContainer);
  searchOverlay.appendChild(searchContainer);

  // Add the overlay to the document body (NOT to the existing container)
  document.body.appendChild(searchOverlay);
})();

// Set up global key listeners
(function setupKeyListeners() {
  // Add logging to help debug
  console.log('Setting up keyboard shortcuts for search');

  // Combined method with proper event handling
  document.addEventListener('keydown', function (e) {
    console.log('Key pressed:', e.key, 'Modifiers:', e.ctrlKey, e.metaKey);

    // Cmd+K or Ctrl+K detection
    if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
      console.log('Search hotkey detected!');
      e.preventDefault();
      e.stopPropagation(); // Stop event from bubbling
      window.toggleSearchOverlay();
      return false;
    }

    // Escape to close search
    if (e.key === 'Escape' && searchOverlay && searchOverlay.style.display === 'flex') {
      window.toggleSearchOverlay();
    }
  }, true); // Use capture phase to get event before browser

  // Slash key detection remains unchanged
  document.addEventListener('keyup', function (e) {
    if (e.key === '/' && !e.ctrlKey && !e.metaKey &&
      !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      window.toggleSearchOverlay();
      e.preventDefault();
    }
  });

  // Add a more aggressive approach for Cmd+K by using document.onkeydown
  document.onkeydown = function (e) {
    if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K' || e.keyCode === 75)) {
      console.log('Detected through onkeydown');
      e.preventDefault();
      e.stopPropagation();
      window.toggleSearchOverlay();
      return false;
    }
  };
})();

// Search Spotlight UI Integration - this runs when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize search engine
  searchEngine.initialize();

  // Add click event to the search icon
  const searchIconSelectors = [
    '.fa-searchengin',
    '.icon',
    '.search-icon',
    'i.fa-brands',
    'i[class*="search"]',
    '.mb2.dib i'
  ];

  let foundIcon = false;
  for (const selector of searchIconSelectors) {
    const navSearchIcon = document.querySelector(selector);
    if (navSearchIcon) {
      navSearchIcon.style.cursor = 'pointer';
      navSearchIcon.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        window.toggleSearchOverlay();
        return false;
      });

      // Add tooltip
      navSearchIcon.title = 'Search (Cmd+K)';
      foundIcon = true;
      break;
    }
  }

  if (!foundIcon) {
    console.warn('Could not find search icon with any selector - adding a search button');
    // Try to find header or nav element
    const headerOrNav = document.querySelector('header nav, .nav-wrapper, #header, header');
    if (headerOrNav) {
      const searchButton = document.createElement('button');
      searchButton.innerHTML = `Search...`;
      searchButton.style.background = 'none';
      searchButton.style.border = 'none';
      searchButton.style.color = '#777';
      searchButton.style.cursor = 'pointer';
      searchButton.style.padding = '5px 10px';
      searchButton.style.marginLeft = '5px';
      searchButton.title = 'Search (Cmd+K)';
      searchButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.toggleSearchOverlay();
      });

      headerOrNav.appendChild(searchButton);
    }
  }

  // Close when clicking outside the search container
  searchOverlay.addEventListener('click', (e) => {
    if (e.target === searchOverlay) {
      toggleSearchOverlay();
    }
  });

  // Handle search input
  searchInput.addEventListener('input', performSearch);

  // Add keyboard navigation for results
  searchInput.addEventListener('keydown', (e) => {
    const results = document.querySelectorAll('.search-result-item');
    const currentIndex = Array.from(results).findIndex(el => document.activeElement === el);
    console.log('Current focused index:', currentIndex); // Debug logging

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        e.stopPropagation(); // Stop event from propagating
        if (results.length > 0) {
          if (currentIndex < 0 || currentIndex >= results.length - 1) {
            results[0].focus();
            // Make sure it's visible by scrolling if needed
            results[0].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          } else {
            results[currentIndex + 1].focus();
            results[currentIndex + 1].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        }
        break;

      case 'ArrowUp':
        e.preventDefault();
        e.stopPropagation(); // Stop event from propagating
        if (results.length > 0) {
          if (currentIndex <= 0) {
            results[results.length - 1].focus();
            results[results.length - 1].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          } else {
            results[currentIndex - 1].focus();
            results[currentIndex - 1].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        }
        break;

      case 'Enter':
        if (currentIndex >= 0) {
          e.preventDefault();
          window.location.href = results[currentIndex].href;
        }
        break;
    }
  });

  // Add styles to ensure proper rendering across all pages
  const style = document.createElement('style');
  style.textContent = `
    /**
     * Unified search styling for minimal design
     */

    /* Search overlay backdrop */
    #search-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      padding: 0 1rem;
      height: 100%;
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 1;
      transition: opacity 0.15s var(--ease);
    }

    #search-overlay.visible {
      opacity: 1;
    }

    /* Search container - now more square-shaped */
    .search-container {
      width: 100%;
      max-width: 500px;
      background-color: white;
      border-radius: 2px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
      overflow: hidden;
      transform: translateY(-5px); /* Reduced for subtlety */
      transition: transform 0.1s var(--ease);
    }

    #search-overlay.visible .search-container {
      transform: translateY(0);
    }

    /* Search input styling */
    #spotlight-search-input {
      width: 100%;
      height: 3rem;
      border: none;
      border-radius: 0;
      outline: none;
      background: transparent;
      color: var(--darkgray);
      padding: 0;
    }

    #spotlight-search-input::placeholder {
      color: #999;
      opacity: 1;
    }

    /* Search results styling */
    .search-results-list {
      max-height: 400px; /* Make container more square */
      overflow-y: auto;
    }

    .search-result-item {
      display: block;
      padding: 0.8rem 1rem;
      text-decoration: none;
      transition: background-color 0.12s ease; /* More subtle */
    }

    .search-result-item:hover,
    .search-result-item:focus {
      background-color: var(--lightgray);
      outline: none;
    }

    .search-result-title {
      color: var(--darkgray);
      margin-bottom: 0.25rem;
    }

    .search-result-path {
      color: #777;
    }

    /* Empty state styling */
    .search-empty-state {
      padding: 2rem;
      text-align: center;
      color: #777;
    }

    /* Animation keyframes - reduced intensity */
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    @keyframes slideUp {
      from {
        transform: translateY(5px); /* Reduced for subtlety */
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }

    /* Apply animations */
    .search-results-list {
      animation: fadeIn 0.1s ease; /* Reduced duration */
    }

    .search-result-item {
      animation: slideUp 0.1s ease backwards; /* Reduced duration */
    }
  `;
  document.head.appendChild(style);

  // Debug helper
  const searchStatusElement = document.createElement('div');
  searchStatusElement.style.position = 'fixed';
  searchStatusElement.style.bottom = '10px';
  searchStatusElement.style.right = '10px';
  searchStatusElement.style.backgroundColor = 'rgba(255,255,255,0.8)';
  searchStatusElement.style.padding = '5px 10px';
  searchStatusElement.style.borderRadius = '3px';
  searchStatusElement.style.fontSize = '12px';
  searchStatusElement.style.color = '#333';
  searchStatusElement.style.zIndex = '999';
  searchStatusElement.style.display = 'none'; // Hidden by default
  searchStatusElement.textContent = 'Search Ready (Cmd+K or / to activate)';
  document.body.appendChild(searchStatusElement);

  // Show status element for debugging
  setTimeout(() => {
    searchStatusElement.style.display = 'block';
    setTimeout(() => {
      searchStatusElement.style.display = 'none';
    }, 5000); // Hide after 5 seconds
  }, 2000);
});

// Perform search function
function performSearch() {
  const query = searchInput.value.trim();
  resultsContainer.innerHTML = '';

  if (query.length < 2) {
    const emptyState = document.createElement('div');
    emptyState.className = 'search-empty-state';
    emptyState.style.padding = '2rem';
    emptyState.style.textAlign = 'center';
    emptyState.style.color = '#777';
    emptyState.textContent = 'Type at least 2 characters to search';
    resultsContainer.appendChild(emptyState);
    return;
  }

  if (!window.searchEngine || !window.searchEngine.initialized) {
    const loadingState = document.createElement('div');
    loadingState.className = 'search-empty-state';
    loadingState.style.padding = '2rem';
    loadingState.style.textAlign = 'center';
    loadingState.style.color = '#777';

    // Create loading message
    const loadingText = document.createElement('p');
    loadingText.textContent = 'Search index is still loading...';
    loadingState.appendChild(loadingText);

    // Add retry button
    const retryButton = document.createElement('button');
    retryButton.textContent = 'Retry Loading Index';
    retryButton.style.background = 'none';
    retryButton.style.border = '1px solid #ccc';
    retryButton.style.borderRadius = '4px';
    retryButton.style.padding = '5px 10px';
    retryButton.style.marginTop = '10px';
    retryButton.style.cursor = 'pointer';
    retryButton.style.fontSize = '0.9rem';
    retryButton.style.color = '#777';

    retryButton.addEventListener('click', () => {
      loadingText.textContent = 'Retrying...';
      retryButton.disabled = true;
      retryButton.style.opacity = '0.5';

      // Attempt to reinitialize the search engine
      searchEngine.initialize().then(() => {
        if (searchEngine.initialized) {
          performSearch();
        } else {
          loadingText.textContent = 'Could not load search index. Please try again later.';
          retryButton.disabled = false;
          retryButton.style.opacity = '1';
        }
      });
    });

    loadingState.appendChild(retryButton);
    resultsContainer.appendChild(loadingState);
    return;
  }

  const results = window.searchEngine.search(query);

  if (results.length === 0) {
    const noResultsState = document.createElement('div');
    noResultsState.className = 'search-empty-state';
    noResultsState.style.padding = '2rem';
    noResultsState.style.textAlign = 'center';
    noResultsState.style.color = '#777';
    noResultsState.textContent = 'No results found';
    resultsContainer.appendChild(noResultsState);
    return;
  }

  // Display results
  const resultsList = document.createElement('div');
  resultsList.className = 'search-results-list';
  resultsList.style.borderTop = '1px solid #f3f3f3';

  results.slice(0, 10).forEach((result, index) => {
    const resultItem = document.createElement('a');
    resultItem.href = result.path;
    resultItem.className = 'search-result-item';
    resultItem.setAttribute('tabindex', '0');
    resultItem.style.animationDelay = `${0.05 * index}s`;

    // Style to match site design
    resultItem.style.display = 'block';
    resultItem.style.padding = '12px 16px';
    resultItem.style.borderBottom = '1px solid #f3f3f3';
    resultItem.style.textDecoration = 'none';
    resultItem.style.transition = 'background-color 0.15s ease';

    // Add hover effect with JavaScript
    resultItem.addEventListener('mouseover', () => {
      resultItem.style.backgroundColor = '#f7f7f7';
    });

    resultItem.addEventListener('mouseout', () => {
      resultItem.style.backgroundColor = '';
    });

    resultItem.addEventListener('focus', () => {
      resultItem.style.backgroundColor = '#f7f7f7';
      resultItem.style.outline = 'none';
    });

    resultItem.addEventListener('blur', () => {
      resultItem.style.backgroundColor = '';
    });

    // Create title with highlighted matches
    const title = document.createElement('div');
    title.className = 'search-result-title';
    title.style.color = '#333';
    title.style.fontSize = '0.92rem';

    // Format the file name for display
    let displayTitle = result.file.replace(/-/g, ' ');
    // Capitalize first letter of each word
    displayTitle = displayTitle.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    title.textContent = displayTitle;

    // Add path as subtitle
    const path = document.createElement('div');
    path.className = 'search-result-path';
    path.style.fontSize = '0.75rem';
    path.style.color = '#777';
    path.textContent = result.path;

    resultItem.appendChild(title);
    resultItem.appendChild(path);
    resultsList.appendChild(resultItem);

    // Add click handler to close search when a result is clicked
    resultItem.addEventListener('click', () => {
      toggleSearchOverlay();
    });
  });

  resultsContainer.appendChild(resultsList);
}