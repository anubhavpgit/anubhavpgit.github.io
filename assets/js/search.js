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

// Trie data structure for autocomplete and fuzzy search
class TrieNode {
  constructor() {
    this.children = new Map();
    this.isEndOfWord = false;
    this.frequency = 0;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word, frequency = 1) {
    if (!word) return;

    let node = this.root;
    const lowerWord = word.toLowerCase();

    for (const char of lowerWord) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char);
    }

    node.isEndOfWord = true;
    node.frequency += frequency;
  }

  findWordsWithPrefix(prefix, limit = 5) {
    const result = [];
    if (!prefix) return result;

    let node = this.root;
    const lowerPrefix = prefix.toLowerCase();

    // Navigate to the node representing the prefix
    for (const char of lowerPrefix) {
      if (!node.children.has(char)) {
        return result; // Prefix not found
      }
      node = node.children.get(char);
    }

    // Collect all words with this prefix using DFS
    this._collectWords(node, lowerPrefix, result, limit);

    // Sort results by frequency (descending)
    result.sort((a, b) => b.frequency - a.frequency);

    return result.map(item => item.word);
  }

  _collectWords(node, prefix, result, limit) {
    if (result.length >= limit) return;

    if (node.isEndOfWord) {
      result.push({ word: prefix, frequency: node.frequency });
    }

    for (const [char, childNode] of node.children.entries()) {
      this._collectWords(childNode, prefix + char, result, limit);
    }
  }
}

class SearchEngine {
  constructor() {
    this.searchIndex = null;
    this.initialized = false;
    this.stopWords = ['and', 'the', 'for', 'are', 'with', 'this', 'that', 'not', 'was', 'but'];
    this.totalDocuments = 0;
    this.k1 = 1.2; // Term frequency saturation parameter
    this.b = 0.75; // Document length normalization parameter
    this.trie = new Trie(); // For autocomplete and fuzzy search
    this.maxLevenshteinDistance = 2; // Maximum edit distance for fuzzy search
  }

  // Initialize the trie for autocomplete
  initializeTrie() {
    if (!this.searchIndex || !this.searchIndex.invertedIndex) {
      console.error('Search index not initialized');
      return;
    }

    // Add all terms from the inverted index to the trie
    Object.keys(this.searchIndex.invertedIndex).forEach(term => {
      if (!this.stopWords.includes(term)) {
        this.trie.insert(term);
      }
    });
  }
  // Get autocomplete suggestions for a prefix
  getAutocompleteSuggestions(prefix, limit = 1) {
    if (!prefix || prefix.length === 0) {
      return [];
    }

    // Convert to lowercase for case-insensitive matching
    prefix = prefix.toLowerCase();

    // Get suggestions from the trie - limit to just one for blog UX
    return this.trie.findWordsWithPrefix(prefix, limit);
  }

  // Calculate Levenshtein distance between two strings
  calculateLevenshteinDistance(str1, str2) {
    const m = str1.length;
    const n = str2.length;

    // Create a matrix of size (m+1) x (n+1)
    const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));

    // Fill the first row and column
    for (let i = 0; i <= m; i++) {
      dp[i][0] = i;
    }

    for (let j = 0; j <= n; j++) {
      dp[0][j] = j;
    }

    // Fill the rest of the matrix
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1, // Deletion
          dp[i][j - 1] + 1, // Insertion
          dp[i - 1][j - 1] + cost // Substitution
        );
      }
    }

    return dp[m][n];
  }

  // Find fuzzy matches for a term
  findFuzzyMatches(term, maxDistance = this.maxLevenshteinDistance) {
    if (!term || term.length === 0) {
      return [];
    }

    // Convert to lowercase for case-insensitive matching
    term = term.toLowerCase();

    // For very short terms, reduce the max distance
    if (term.length <= 3) {
      maxDistance = 1;
    }

    const matches = [];
    const termNGrams = this.generateNGrams(term, 2); // Bi-grams for term

    // Get all words from the inverted index
    const allWords = Object.keys(this.searchIndex.invertedIndex);

    // Filter and score candidates based on n-gram overlap first (faster pre-filtering)
    const candidates = [];
    for (const word of allWords) {
      if (Math.abs(word.length - term.length) <= maxDistance) {
        const wordNGrams = this.generateNGrams(word, 2);
        const overlapScore = this.calculateNGramOverlap(termNGrams, wordNGrams);

        // Only consider words with some n-gram overlap for further processing
        if (overlapScore > 0) {
          candidates.push({ word, overlapScore });
        }
      }
    }

    // Sort candidates by n-gram overlap score (descending)
    candidates.sort((a, b) => b.overlapScore - a.overlapScore);

    // Take top candidates (e.g., top 100) for Levenshtein calculation
    const topCandidates = candidates.slice(0, 100);

    // Calculate Levenshtein distance for top candidates
    for (const candidate of topCandidates) {
      const distance = this.calculateLevenshteinDistance(term, candidate.word);

      if (distance <= maxDistance) {
        matches.push({
          term: candidate.word,
          distance,
          ngramScore: candidate.overlapScore
        });
      }
    }

    // Sort matches by distance (ascending) and then by n-gram score (descending)
    matches.sort((a, b) => {
      if (a.distance !== b.distance) {
        return a.distance - b.distance;
      }
      return b.ngramScore - a.ngramScore;
    });

    return matches.map(match => match.term);
  }

  // Generate n-grams for a string
  generateNGrams(str, n) {
    const ngrams = [];
    for (let i = 0; i <= str.length - n; i++) {
      ngrams.push(str.substring(i, i + n));
    }
    return ngrams;
  }

  // Calculate n-gram overlap score between two sets of n-grams
  calculateNGramOverlap(ngrams1, ngrams2) {
    const set1 = new Set(ngrams1);
    const set2 = new Set(ngrams2);

    let overlapCount = 0;
    for (const ngram of set1) {
      if (set2.has(ngram)) {
        overlapCount++;
      }
    }

    // Dice coefficient: 2 * |intersection| / (|set1| + |set2|)
    return (2 * overlapCount) / (set1.size + set2.size);
  }


  // Initialize the search engine
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

          // Initialize the trie for autocomplete functionality
          this.initializeTrie();
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

  // Helper method to check title match
  checkTitleMatch(token, docPath) {
    const pathParts = docPath.split('/');
    const filename = pathParts[pathParts.length - 1].replace('.html', '').replace('.md', '');
    const titleWords = filename.toLowerCase().split(/[^a-z0-9]+/);

    // Check for exact title match (complete word)
    if (titleWords.includes(token.toLowerCase())) {
      return 2; // Exact match
    }

    // Check for partial title match
    if (titleWords.some(word =>
      word.startsWith(token.toLowerCase()) || token.toLowerCase().startsWith(word)
    )) {
      return 1; // Partial match
    }

    return 0; // No match
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

  calculateBM25(term, docPath) {
    const tf = this.getTermFrequency(term, docPath);
    if (tf === 0) return 0;

    const df = this.getDocumentFrequency(term);
    const docLength = this.searchIndex.documentLengths[docPath];
    const avgDocLength = this.searchIndex.avgDocumentLength;

    // BM25 IDF component: log((N - n + 0.5) / (n + 0.5) + 1)
    // Where N is total documents and n is document frequency
    const idf = Math.log((this.totalDocuments - df + 0.5) / (df + 0.5) + 1);

    // BM25 TF component with saturation and length normalization
    const numerator = tf * (this.k1 + 1);
    const denominator = tf + this.k1 * (1 - this.b + this.b * docLength / avgDocLength);

    // console.log(`BM25 for term "${term}" in "${docPath}": TF=${tf}, DF=${df}, IDF=${idf}, DocLen=${docLength}, AvgLen=${avgDocLength}`);

    return idf * numerator / denominator;
  }

  // Helper method to process fuzzy matches
  processFuzzyMatches(originalToken, fuzzyTerm, docPaths, documentScores) {
    const distance = this.calculateLevenshteinDistance(originalToken, fuzzyTerm);
    const similarityFactor = 1 - (distance / Math.max(originalToken.length, fuzzyTerm.length));

    docPaths.forEach(docPath => {
      // Similar to exact matches but with lower weight based on edit distance
      const titleMatchScore = this.checkTitleMatch(fuzzyTerm, docPath);

      // Calculate base score using BM25 but apply similarity penalty
      let score = this.calculateBM25(fuzzyTerm, docPath) * similarityFactor * 0.7;

      // Lower boost for fuzzy matches in titles
      if (titleMatchScore === 2) {
        score += 5 * similarityFactor; // Lower boost for fuzzy exact title matches
      } else if (titleMatchScore === 1) {
        score += 2 * similarityFactor; // Lower boost for fuzzy partial title matches
      }

      // Add to document's total score
      const currentScore = documentScores.get(docPath) || 0;
      documentScores.set(docPath, currentScore + score);
    });
  }

  processExactMatches(token, docPaths, documentScores) {
    docPaths.forEach(docPath => {
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
      let score = this.calculateBM25(token, docPath);

      // Score based on match type
      if (isExactTitleMatch) {
        score += 10; // Boost for exact title matches
      } else if (isPartialTitleMatch) {
        score += 5;  // Modest boost for partial matches
      }

      // Add to document's total score
      const currentScore = documentScores.get(docPath) || 0;
      documentScores.set(docPath, currentScore + score);
    });
  }

  // Helper method to process prefix matches
  processPrefixMatches(token, invertedIndex, documentScores) {
    Object.keys(invertedIndex).forEach(indexToken => {
      if (indexToken.startsWith(token) && indexToken !== token) {
        invertedIndex[indexToken].forEach(docPath => {
          // Similar to your original code
          const titleMatchScore = this.checkTitleMatch(indexToken, docPath);

          // Add a length penalty for prefix matching
          const lengthDifference = indexToken.length - token.length;
          const lengthPenalty = Math.max(0.1, 1 - (lengthDifference * 0.2));

          // Calculate score with BM25
          let score = this.calculateBM25(indexToken, docPath) * 0.5 * lengthPenalty;

          // Title matches for prefix terms get less boost
          if (titleMatchScore === 2) {
            score += 5; // Less boost than exact match
          } else if (titleMatchScore === 1) {
            score += 2; // Minimal boost for partial prefix match
          }

          // Add to document's total score
          const currentScore = documentScores.get(docPath) || 0;
          documentScores.set(docPath, currentScore + score);
        });
      }
    });
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

    // Use a Map to store document scores
    const documentScores = new Map();
    const { invertedIndex, fileIndex } = this.searchIndex;

    // Process each token in the query
    queryTokens.forEach(token => {
      // Check for exact matches
      if (invertedIndex[token]) {
        this.processExactMatches(token, invertedIndex[token], documentScores);
      }

      // Find fuzzy matches for this token
      const fuzzyMatches = this.findFuzzyMatches(token);

      // Process fuzzy matches with lower weights
      fuzzyMatches.forEach(fuzzyTerm => {
        if (invertedIndex[fuzzyTerm] && fuzzyTerm !== token) {
          this.processFuzzyMatches(token, fuzzyTerm, invertedIndex[fuzzyTerm], documentScores);
        }
      });

      // Process prefix matches (similar to your original code)
      this.processPrefixMatches(token, invertedIndex, documentScores);
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
function createSearchElements() {
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
  searchIconSpan.innerHTML = '<i class="fa-solid fa-search"></i>'; // Add search icon

  searchInput = document.createElement('input');
  searchInput.id = 'spotlight-search-input';
  searchInput.className = 'input-reset bn w-100';
  searchInput.type = 'text';
  searchInput.placeholder = `Search`;
  searchInput.autocomplete = 'off'; // Changed to off to prevent browser autocomplete

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

  // Add the overlay to the document body
  document.body.appendChild(searchOverlay);
}

// Execute the function to create search elements 
(function () {
  try {
    createSearchElements();
  } catch (error) {
    console.error('Error creating search elements:', error);
  }
})();

// Set up global key listeners
(function setupKeyListeners() {
  // Add logging to help debug
  // Combined method with proper event handling
  document.addEventListener('keydown', function (e) {

    // Cmd+K or Ctrl+K detection
    if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
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
      e.preventDefault();
      e.stopPropagation();
      window.toggleSearchOverlay();
      return false;
    }
  };
})();


let autocompleteContainer;

// Setup autocomplete UI
function setupAutocomplete() {
  // Create autocomplete container if it doesn't exist
  if (!autocompleteContainer) {
    autocompleteContainer = document.createElement('div');
    autocompleteContainer.className = 'autocomplete-container';
    autocompleteContainer.style.position = 'absolute';
    autocompleteContainer.style.width = '100%';
    autocompleteContainer.style.height = '100%';
    autocompleteContainer.style.pointerEvents = 'none';  // Let clicks go through to the input
    autocompleteContainer.style.zIndex = '1000';
    autocompleteContainer.style.display = 'none';
    autocompleteContainer.style.paddingLeft = '2px';


    // Insert directly into the search input's parent for proper positioning
    if (searchInput && searchInput.parentNode) {
      // Position relative to make absolute positioning work within
      searchInput.parentNode.style.position = 'relative';
      searchInput.parentNode.appendChild(autocompleteContainer);
    } else {
      console.error('Search input not found or has no parent - cannot add autocomplete');
    }
  }
}

// Variables to track autocomplete state
let selectedSuggestionIndex = -1;
let currentSuggestions = [];

// Update autocomplete suggestions
function updateAutocompleteSuggestions() {
  const query = searchInput.value.trim();

  if (!query || query.length < 2 || !searchEngine || !searchEngine.initialized) {
    if (autocompleteContainer) {
      autocompleteContainer.style.display = 'none';
    }
    currentSuggestions = [];
    return;
  }

  // Make sure the autocomplete container exists
  if (!autocompleteContainer) {
    setupAutocomplete();
  }

  // Get suggestions from search engine - limited to one for blog UX
  currentSuggestions = searchEngine.getAutocompleteSuggestions(query);
  // console.log('Autocomplete suggestion for', query, ':', currentSuggestions);

  if (currentSuggestions.length === 0) {
    autocompleteContainer.style.display = 'none';
    return;
  }

  // Instead of showing multiple options in a dropdown, display the suggestion 
  // directly in the input field as grayed-out completion text
  const suggestion = currentSuggestions[0];

  // Only show completion if the suggestion starts with the query
  if (suggestion.toLowerCase().startsWith(query.toLowerCase())) {
    // Create a span to measure exact text width
    const measurer = document.createElement('span');
    measurer.style.visibility = 'hidden';
    measurer.style.position = 'absolute';
    measurer.style.whiteSpace = 'pre';
    measurer.style.fontFamily = window.getComputedStyle(searchInput).fontFamily;
    measurer.style.fontSize = window.getComputedStyle(searchInput).fontSize;
    measurer.style.fontWeight = window.getComputedStyle(searchInput).fontWeight;
    measurer.style.letterSpacing = window.getComputedStyle(searchInput).letterSpacing;
    measurer.textContent = searchInput.value;
    document.body.appendChild(measurer);

    // Get exact pixel width
    const inputTextWidth = measurer.getBoundingClientRect().width;
    document.body.removeChild(measurer);

    // Adjust for padding
    const paddingLeft = parseInt(window.getComputedStyle(searchInput).paddingLeft) || 0;

    // Create a visible hint of what tab will complete
    const completion = document.createElement('div');
    completion.className = 'tab-completion-hint';
    completion.style.position = 'absolute';
    completion.style.top = '50%';
    completion.style.transform = 'translateY(-50%)';
    completion.style.marginLeft = '0.5rem';
    completion.style.left = `${paddingLeft + inputTextWidth}px`;
    completion.style.color = '#aaa';
    completion.style.pointerEvents = 'none';
    completion.style.whiteSpace = 'nowrap';
    completion.style.fontFamily = 'inherit';
    completion.style.fontSize = 'inherit';

    // Show the completion part
    completion.textContent = suggestion.substring(query.length);

    // Clear existing suggestions
    autocompleteContainer.innerHTML = '';
    autocompleteContainer.appendChild(completion);

    // Add subtle hint about tab functionality
    const tabHint = document.createElement('div');
    tabHint.className = 'tab-hint';
    tabHint.style.position = 'absolute';
    tabHint.style.right = '10px';
    tabHint.style.top = '50%';
    tabHint.style.transform = 'translateY(-50%)';
    tabHint.style.color = '#aaa';
    tabHint.style.fontSize = '0.75rem';
    tabHint.style.pointerEvents = 'none';

    // Check if device is mobile or tablet
    const isMobileOrTablet = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    tabHint.textContent = isMobileOrTablet ? 'Tap to complete' : 'Tab to complete';

    tabHint.style.pointerEvents = 'auto'; // Allow clicks on the hint
    tabHint.style.cursor = 'pointer'; // Change cursor to pointer
    tabHint.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent the click from propagating
      if (currentSuggestions.length > 0) {
        applySuggestion(currentSuggestions[0]);
      }
    });

    autocompleteContainer.appendChild(tabHint);

    // Position the autocomplete container over the input
    const searchHeaderRect = searchInput.getBoundingClientRect();
    autocompleteContainer.style.position = 'absolute';
    autocompleteContainer.style.top = '0';
    autocompleteContainer.style.left = '0';
    autocompleteContainer.style.width = '100%';
    autocompleteContainer.style.height = '100%';
    autocompleteContainer.style.display = 'block';
    autocompleteContainer.style.backgroundColor = 'transparent';
    autocompleteContainer.style.border = 'none';
    autocompleteContainer.style.boxShadow = 'none';

    selectedSuggestionIndex = 0; // Always select the first (only) suggestion
  } else {
    autocompleteContainer.style.display = 'none';
  }
}

// Highlight the selected suggestion
function highlightSelectedSuggestion() {
  const items = autocompleteContainer.querySelectorAll('.autocomplete-item');

  items.forEach((item, index) => {
    if (index === selectedSuggestionIndex) {
      item.style.backgroundColor = '#f0f0f0';
    } else {
      item.style.backgroundColor = '';
    }
  });
}

// Apply the selected suggestion
function applySuggestion(suggestion) {
  searchInput.value = suggestion;
  autocompleteContainer.style.display = 'none';
  performSearch();
}

// Enhance search input event listeners
function enhanceSearchInputWithAutocomplete() {
  // Setup autocomplete UI
  setupAutocomplete();

  // Add input handler for autocomplete
  document.addEventListener('input', () => {
    updateAutocompleteSuggestions();
  });

  // Add keyboard navigation for autocomplete
  document.addEventListener('keydown', (e) => {
    // Only handle special keys if we have suggestions
    if (autocompleteContainer.style.display === 'none' || currentSuggestions.length === 0) {
      return;
    }

    switch (e.key) {
      case 'Tab':
        // Tab always completes the suggestion if available
        e.preventDefault();
        // With our simplified design, we always have just one suggestion
        applySuggestion(currentSuggestions[0]);
        break;

      case 'ArrowRight':
        // Right arrow at the end of input also completes (like Tab)
        if (searchInput.selectionStart === searchInput.value.length) {
          e.preventDefault();
          applySuggestion(currentSuggestions[0]);
        }
        break;

      case 'Enter':
        // We'll let Enter submit the search if the user wants
        // without enforcing autocomplete
        break;

      case 'Escape':
        // Hide the suggestion
        autocompleteContainer.style.display = 'none';
        break;
    }
  });

  // Hide autocomplete when clicking outside
  document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !autocompleteContainer.contains(e.target)) {
      autocompleteContainer.style.display = 'none';
    }
  });
}

// Search Spotlight UI Integration - this runs when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {

  // Initialize search engine first
  searchEngine.initialize().then(() => {
    // Setup autocomplete UI now that the trie is loaded
    setupAutocomplete();
  }).catch(error => {
    console.error('Failed to initialize search engine:', error);
  });

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
  if (searchOverlay) {
    searchOverlay.addEventListener('click', (e) => {
      if (e.target === searchOverlay) {
        toggleSearchOverlay();
      }
    });
  }

  // Handle search input - make sure searchInput exists
  if (searchInput) {
    // Handle search input
    searchInput.addEventListener('input', performSearch);

    // Setup autocomplete for search input
    enhanceSearchInputWithAutocomplete();

    // Track which navigation keys are currently pressed
    const pressedKeys = {
      ArrowUp: false,
      ArrowDown: false
    };

    // Add keyboard navigation for results using a continuous navigation model
    document.addEventListener('keydown', (e) => {

      // Only process arrow keys
      if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown' && e.key !== 'Enter' && e.key !== 'Escape') {
        return;
      }

      e.preventDefault();
      e.stopPropagation();

      const results = document.querySelectorAll('.search-result-item');
      if (results.length === 0) return;

      const resultsArray = Array.from(results);

      // Get currently focused result or -1 if none is focused
      const currentIndex = resultsArray.findIndex(el => document.activeElement === el);

      // Handle different key presses
      switch (e.key) {
        case 'ArrowDown':
          if (currentIndex < 0) {
            // No item focused yet, focus the first one
            results[0].focus();
            highlightResult(results, 0);
          } else if (currentIndex < results.length - 1) {
            // Not at the end, move to the next item
            const nextIndex = currentIndex + 1;
            results[nextIndex].focus();
            highlightResult(results, nextIndex);
            scrollIfNeeded(results[nextIndex], 'down');
          }
          break;

        case 'ArrowUp':
          if (currentIndex <= 0) {
            // No item focused or at the beginning, focus the first item
            results[0].focus();
            highlightResult(results, 0);
          } else {
            // Move to the previous item
            const prevIndex = currentIndex - 1;
            results[prevIndex].focus();
            highlightResult(results, prevIndex);
            scrollIfNeeded(results[prevIndex], 'up');
          }
          break;

        case 'Enter':
          if (currentIndex >= 0) {
            window.location.href = results[currentIndex].href;
          }
          break;

        case 'Escape':
          // Remove focus from results
          document.activeElement.blur();
          break;
      }
    });

    // Helper function to highlight the current result
    function highlightResult(results, index) {
      results.forEach((item, idx) => {
        if (idx === index) {
          item.classList.add('highlighted');
        } else {
          item.classList.remove('highlighted');
        }
      });
    }

    // Helper function to scroll if the selected item is not fully visible
    function scrollIfNeeded(element, direction) {
      const container = element.parentElement;
      const containerRect = container.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();

      if (direction === 'down' && elementRect.bottom > containerRect.bottom - 50) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      } else if (direction === 'up' && elementRect.top < containerRect.top + 50) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    }
  } else {
    console.error('searchInput element not found - search functionality will be limited');
  }

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
    .search-result-item:focus,
    .search-result-item.highlighted {
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
  searchStatusElement.style.color = '#777';
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