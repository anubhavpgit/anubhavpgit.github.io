/**
 * Search index builder
 * Creates an inverted index for site search functionality
 */
import fs from "fs";
import matter from "gray-matter";

/**
 * Builds an inverted index of all content files
 * @param {Array} files - Array of files to index
 * @returns {Object} - Inverted index mapping tokens to files
 */
export const buildInvertedIndex = (files) => {
  // console.info("Building inverted index...");

  // Inverted index: token -> [files containing token]
  const invertedIndex = {};
  // File index: file -> [tokens in file]
  const fileIndex = {};
  let totalDocumentLength = 0;
  let documentCount = 0;
  const documentLengths = {};

  // Common words to filter out (expanded list)
  const stopWords = [
    'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'aren\'t', 'as', 'at',
    'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by',
    'can', 'can\'t', 'cannot', 'could', 'couldn\'t',
    'did', 'didn\'t', 'do', 'does', 'doesn\'t', 'doing', 'don\'t', 'down', 'during',
    'each',
    'few', 'for', 'from', 'further',
    'had', 'hadn\'t', 'has', 'hasn\'t', 'have', 'haven\'t', 'having', 'he', 'he\'d', 'he\'ll', 'he\'s', 'her', 'here', 'here\'s', 'hers', 'herself', 'him', 'himself', 'his', 'how', 'how\'s',
    'i', 'i\'d', 'i\'ll', 'i\'m', 'i\'ve', 'if', 'in', 'into', 'is', 'isn\'t', 'it', 'it\'s', 'its', 'itself',
    'let\'s',
    'me', 'more', 'most', 'mustn\'t', 'my', 'myself',
    'no', 'nor', 'not',
    'of', 'off', 'on', 'once', 'only', 'or', 'other', 'ought', 'our', 'ours', 'ourselves', 'out', 'over', 'own',
    'same', 'shan\'t', 'she', 'she\'d', 'she\'ll', 'she\'s', 'should', 'shouldn\'t', 'so', 'some', 'such',
    'than', 'that', 'that\'s', 'the', 'their', 'theirs', 'them', 'themselves', 'then', 'there', 'there\'s', 'these', 'they', 'they\'d', 'they\'ll', 'they\'re', 'they\'ve', 'this', 'those', 'through', 'to', 'too',
    'under', 'until', 'up',
    'very',
    'was', 'wasn\'t', 'we', 'we\'d', 'we\'ll', 'we\'re', 'we\'ve', 'were', 'weren\'t', 'what', 'what\'s', 'when', 'when\'s', 'where', 'where\'s', 'which', 'while', 'who', 'who\'s', 'whom', 'why', 'why\'s', 'with', 'won\'t', 'would', 'wouldn\'t',
    'you', 'you\'d', 'you\'ll', 'you\'re', 'you\'ve', 'your', 'yours', 'yourself', 'yourselves'
  ];

  // Process each file
  files.forEach((filename) => {
    try {
      const rawFile = fs.readFileSync(filename, "utf8");
      const parsed = matter(rawFile);

      // Skip draft posts
      if (parsed.data.draft) {
        return;
      }

      // Strip markdown formatting from content
      const plainText = parsed.content
        .replace(/```(?:[\w]*)\n([\s\S]*?)```/g, '$1')
        .replace(/`(.*?)`/g, '$1')
        .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Replace links with just text (fixed regex)
        .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold formatting
        .replace(/\*(.*?)\*/g, '$1')     // Remove italic formatting
        .replace(/#{1,6}\s+/g, '')      // Remove headings
        .replace(/^\s*>+\s*/gm, '')     // Remove blockquote markers
        .replace(/^\s*[-+*]\s+/gm, '')  // Remove unordered list markers
        .replace(/^\s*\d+\.\s+/gm, '')  // Remove ordered list markers
        .replace(/\n/g, ' ')            // Replace newlines with spaces
        .toLowerCase();                  // Convert to lowercase

      // Include front matter in tokenization
      const titleText = parsed.data.title ? parsed.data.title.toLowerCase() : '';
      const descriptionText = parsed.data.description ? parsed.data.description.toLowerCase() : '';
      const tagText = parsed.data.tag ? Array.isArray(parsed.data.tag)
        ? parsed.data.tag.join(' ').toLowerCase()
        : parsed.data.tag.toLowerCase()
        : '';

      // Combine all text
      const allText = `${titleText} ${descriptionText} ${tagText} ${plainText}`;

      // Tokenize (split by non-alphanumeric chars and filter empty strings)
      const tokens = allText
        .split(/[^a-z0-9]+/)
        .filter(token => token && token.length > 2) // Only tokens with length > 2
        .filter(token => !stopWords.includes(token)); // Filter common words

      // Record unique tokens for this file
      const uniqueTokens = [...new Set(tokens)];

      // Create short filename for display
      let shortFilename = filename.split('/').slice(-2).join('/');

      shortFilename = shortFilename
        .replace(/\.md$/, '.html')
        .replace(/^content\//, '')
        .replace(/^posts\//, 'blog/');

      const documentLength = tokens.length;
      documentLengths[shortFilename] = documentLength;
      totalDocumentLength += documentLength;
      documentCount++;

      // Add to file index
      fileIndex[shortFilename] = tokens.reduce((freq, token) => {
        freq[token] = (freq[token] || 0) + 1;
        return freq;
      }, {});

      // Add to inverted index
      uniqueTokens.forEach(token => {
        if (!invertedIndex[token]) {
          invertedIndex[token] = [];
        }
        invertedIndex[token].push(shortFilename);
      });

    } catch (error) {
      console.error(`Error indexing file ${filename}: ${error.message}`);
    }
  });

  const avgDocumentLength = totalDocumentLength / documentCount;

  console.info(`Indexed ${Object.keys(fileIndex).length} files with ${Object.keys(invertedIndex).length} unique tokens`);

  // Create the final index structure
  return {
    invertedIndex,
    fileIndex,
    documentLengths,
    avgDocumentLength
  };
};