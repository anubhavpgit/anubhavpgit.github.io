/**
 * Improved search functionality with title matching priority and proper TF-IDF
 */

// MaxHeap with Set semantics to avoid duplicates
class MaxHeap {
  constructor() {
    this.heap = [];
    this.docSet = new Set(); // Track documents to avoid duplicates
  }

  getParentIndex(index) {
    return Math.floor((index - 1) / 2);
  }

  getLeftChildIndex(index) {
    return 2 * index + 1;
  }

  getRightChildIndex(index) {
    return 2 * index + 2;
  }

  hasParent(index) {
    return this.getParentIndex(index) >= 0;
  }

  hasLeftChild(index) {
    return this.getLeftChildIndex(index) < this.heap.length;
  }

  hasRightChild(index) {
    return this.getRightChildIndex(index) < this.heap.length;
  }

  parent(index) {
    return this.heap[this.getParentIndex(index)];
  }

  leftChild(index) {
    return this.heap[this.getLeftChildIndex(index)];
  }

  rightChild(index) {
    return this.heap[this.getRightChildIndex(index)];
  }

  swap(index1, index2) {
    const temp = this.heap[index1];
    this.heap[index1] = this.heap[index2];
    this.heap[index2] = temp;
  }

  insert(item) {
    // Check if this document is already in the heap
    if (this.docSet.has(item.path)) {
      // Find the existing item and update its score if new score is higher
      const existingIndex = this.heap.findIndex(h => h.path === item.path);
      if (existingIndex >= 0 && item.score > this.heap[existingIndex].score) {
        this.heap[existingIndex].score = item.score;
        this.heapifyUp(existingIndex);
      }
      return;
    }

    // Add new document to the heap
    this.heap.push(item);
    this.docSet.add(item.path);
    this.heapifyUp();
  }

  extractMax() {
    if (this.heap.length === 0) return null;

    const max = this.heap[0];
    const lastItem = this.heap.pop();

    // Remove from the set
    this.docSet.delete(max.path);

    if (this.heap.length > 0) {
      this.heap[0] = lastItem;
      this.heapifyDown();
    }

    return max;
  }

  heapifyUp(startIndex) {
    let index = startIndex !== undefined ? startIndex : this.heap.length - 1;

    while (this.hasParent(index) && this.parent(index).score < this.heap[index].score) {
      const parentIndex = this.getParentIndex(index);
      this.swap(parentIndex, index);
      index = parentIndex;
    }
  }

  heapifyDown() {
    let index = 0;

    while (this.hasLeftChild(index)) {
      let largerChildIndex = this.getLeftChildIndex(index);

      if (this.hasRightChild(index) && this.rightChild(index).score > this.leftChild(index).score) {
        largerChildIndex = this.getRightChildIndex(index);
      }

      if (this.heap[index].score >= this.heap[largerChildIndex].score) {
        break;
      }

      this.swap(index, largerChildIndex);
      index = largerChildIndex;
    }
  }

  getSortedArray() {
    const result = [];
    const originalHeap = [...this.heap];
    const originalSet = new Set(this.docSet);

    while (this.heap.length > 0) {
      result.push(this.extractMax());
    }

    // Restore the heap
    this.heap = originalHeap;
    this.docSet = originalSet;

    return result;
  }

  size() {
    return this.heap.length;
  }
}

class SearchEngine {
  constructor() {
    this.searchIndex = null;
    this.initialized = false;
    this.stopWords = ['and', 'the', 'for', 'are', 'with', 'this', 'that', 'not', 'was', 'but'];
    this.totalDocuments = 0;
  }

  async initialize() {
    try {
      const path = '/search-index.json';

      try {
        const response = await fetch(path);
        if (response.ok) {
          this.searchIndex = await response.json();
          this.initialized = true;

          // Calculate total documents from fileIndex
          this.totalDocuments = Object.keys(this.searchIndex.fileIndex).length;
          console.log(`Search index loaded successfully. Found ${this.totalDocuments} documents.`);
        } else {
          throw new Error('Failed to fetch search index');
        }
      } catch (e) {
        console.error('Error fetching search index from path:', path, e);
      }
    } catch (error) {
      console.error('Error loading search index:', error);
    }
  }

  tokenizeQuery(query) {
    return query
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter(token => token && token.length > 2)
      .filter(token => !this.stopWords.includes(token));
  }

  // Check if a term appears in a document title
  checkTitleMatch(term, docPath) {
    // Extract the title from the path
    const pathParts = docPath.split('/');
    const filename = pathParts[pathParts.length - 1].replace('.html', '').replace('.md', '');

    // Add debug logging to understand the match
    console.log(`Checking title match for term "${term}" in file "${filename}"`);

    // Check for exact title match (complete word) rather than substring
    const titleWords = filename.toLowerCase().split(/[^a-z0-9]+/);
    const isExactTitleMatch = titleWords.includes(term.toLowerCase());

    // Check for partial title match (more strict than just includes)
    const isPartialTitleMatch = titleWords.some(word =>
      word.startsWith(term.toLowerCase()) || term.toLowerCase().startsWith(word)
    );

    console.log(`Exact match: ${isExactTitleMatch}, Partial match: ${isPartialTitleMatch}`);

    return isExactTitleMatch ? 2 : (isPartialTitleMatch ? 1 : 0);
  }

  // Calculate document frequency - how many documents contain this term
  getDocumentFrequency(term) {
    return this.searchIndex.invertedIndex[term] ?
      this.searchIndex.invertedIndex[term].length : 0;
  }

  // Calculate term frequency - how many times a term appears in a document
  getTermFrequency(term, docPath) {
    if (!this.searchIndex.fileIndex[docPath]) return 0;

    // Updated to work with new structure
    return this.searchIndex.fileIndex[docPath][term.toLowerCase()] || 0;
  }

  // Calculate TF-IDF score with proper formulas
  calculateTfIdf(term, docPath) {
    const tf = this.getTermFrequency(term, docPath);

    // If term doesn't appear, score is 0
    if (tf === 0) return 0;

    const df = this.getDocumentFrequency(term);

    // If term appears in all documents, IDF is 0
    if (df === this.totalDocuments) return 0;

    // Calculate IDF: log(total docs / docs with term)
    const idf = Math.log(this.totalDocuments / (df || 1));

    console.log(`TF-IDF for term "${term}" in "${docPath}": TF=${tf}, DF=${df}, IDF=${idf}`);
    return tf * idf;
  }

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

    // Use a Map to store document scores with both title match and content match scores
    const documentScores = new Map();
    const { invertedIndex, fileIndex } = this.searchIndex;

    // Process each token in the query
    queryTokens.forEach(token => {
      // Check for exact matches
      if (invertedIndex[token]) {
        invertedIndex[token].forEach(docPath => {
          // Improved title match checking - parse into words
          const pathParts = docPath.split('/');
          const filename = pathParts[pathParts.length - 1].replace('.html', '').replace('.md', '');
          const titleWords = filename.toLowerCase().split(/[^a-z0-9]+/);

          // Check for exact title match (complete word)
          const isExactTitleMatch = titleWords.includes(token.toLowerCase());

          // Check for partial title match
          const isPartialTitleMatch = !isExactTitleMatch && titleWords.some(word =>
            word.startsWith(token.toLowerCase()) || token.toLowerCase().startsWith(word)
          );

          // Get term frequency in this document
          const tfIdf = this.calculateTfIdf(token, docPath);

          // Score based on match type
          let score = tfIdf;
          if (isExactTitleMatch) {
            score += 10; // Boost for exact title matches
            console.log(`Exact title match for "${token}" in "${docPath}"`);
          } else if (isPartialTitleMatch) {
            score += 5;  // Modest boost for partial matches
            console.log(`Partial title match for "${token}" in "${docPath}"`);
          }

          // Add to document's total score
          const currentScore = documentScores.get(docPath) || 0;
          documentScores.set(docPath, currentScore + score);
        });
      }

      // Process prefix matches with lower weight
      Object.keys(invertedIndex).forEach(indexToken => {
        if (indexToken.startsWith(token) && indexToken !== token) {
          invertedIndex[indexToken].forEach(docPath => {
            // Similar improved title match check for prefix matches
            const pathParts = docPath.split('/');
            const filename = pathParts[pathParts.length - 1].replace('.html', '').replace('.md', '');
            const titleWords = filename.toLowerCase().split(/[^a-z0-9]+/);


            let titileMatchScore = this.checkTitleMatch(token, docPath);
            // Calculate TF-IDF with a lower weight for prefix matches
            // Add a length penalty
            const lengthDifference = indexToken.length - token.length;
            const lengthPenalty = Math.max(0.1, 1 - (lengthDifference * 0.2)); // Diminishes with length
            const tfIdf = this.calculateTfIdf(indexToken, docPath) * 0.5 * lengthPenalty;

            // Title matches for prefix terms get less boost
            let score = tfIdf;

            if (titileMatchScore === 2) {
              score += 10; // Less boost than exact query term match
            } else if (titileMatchScore === 1) {
              score += 2;  // Minimal boost for partial prefix match
            } else {
              score += 0;  // No boost for non-matching titles
            }

            console.log(`Prefix match for "${indexToken}" in "${docPath}" with score: ${score}`);

            // Add to document's total score
            const currentScore = documentScores.get(docPath) || 0;
            documentScores.set(docPath, currentScore + score);
          });
        }
      });
    });

    // Use MaxHeap to prioritize results
    const resultsHeap = new MaxHeap();

    // Insert documents into the heap with their scores
    documentScores.forEach((score, docPath) => {
      // Add detailed term counts for each query term (for debugging)
      const termCounts = {};
      queryTokens.forEach(term => {
        termCounts[term] = this.getTermFrequency(term, docPath);
      });

      resultsHeap.insert({
        path: docPath.endsWith('.md') ? `/${docPath.replace('.md', '.html')}` : `/${docPath}`,
        score,
        file: docPath.split('/').pop().replace('.md', ''),
        // Include detailed debug info
        termFrequency: termCounts,
        totalFrequency: Object.values(termCounts).reduce((sum, count) => sum + count, 0)
      });
    });

    // Extract results from the heap
    const sortedResults = [];
    while (resultsHeap.size() > 0) {
      sortedResults.push(resultsHeap.extractMax());
    }

    return sortedResults;
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
      padding: 0.75rem;
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