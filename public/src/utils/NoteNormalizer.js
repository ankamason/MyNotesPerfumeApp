///src/utils/NoteNormalizer.js

// src/utils/NoteNormalizer.js

class NoteNormalizer {
  
  // Words that should remain lowercase (except when they start a note name)
  static LOWERCASE_WORDS = new Set([
    'and', 'or', 'of', 'the', 'in', 'on', 'at', 'to', 'for', 'with', 'by',
    'de', 'del', 'la', 'le', 'les', 'du', 'des', 'di', 'da', 'el'
  ]);
  
  // Special cases for specific note names that have unique capitalization
  static SPECIAL_CASES = new Map([
    // Fragrance house specific
    ['chanel no. 5 aldehydes', 'Chanel No. 5 Aldehydes'],
    ['chanel no.5 aldehydes', 'Chanel No. 5 Aldehydes'],
    ['chanel no5 aldehydes', 'Chanel No. 5 Aldehydes'],
    
    // Chemical compounds
    ['c-10 aldehyde', 'C-10 Aldehyde'],
    ['c-11 aldehyde', 'C-11 Aldehyde'],
    ['c-12 aldehyde', 'C-12 Aldehyde'],
    ['iso e super', 'Iso E Super'],
    
    // Geographic/Cultural terms
    ['ylang ylang', 'Ylang Ylang'],
    ['petit grain', 'Petit Grain'],
    ['petitgrain', 'Petit Grain'],
    ['bergamot tea', 'Bergamot Tea'],
    ['earl grey', 'Earl Grey'],
    ['ras el hanout', 'Ras el Hanout'],
    ['garam masala', 'Garam Masala'],
    ['herbes de provence', 'Herbes de Provence'],
    
    // Botanical terms
    ['lily of the valley', 'Lily of the Valley'],
    ['night blooming cereus', 'Night Blooming Cereus'],
    
    // Common variations
    ['rosewater', 'Rose Water'],
    ['rose water', 'Rose Water'],
    ['seawater', 'Sea Water'],
    ['sea water', 'Sea Water']
  ]);
  
  /**
   * Normalize a note name to proper capitalization
   * @param {string} noteName - The note name to normalize
   * @returns {string} - The normalized note name
   */
  static normalize(noteName) {
    if (!noteName || typeof noteName !== 'string') {
      return '';
    }
    
    // Clean up the input
    let cleaned = noteName.trim();
    if (!cleaned) return '';
    
    // Convert to lowercase for processing
    const lowercase = cleaned.toLowerCase();
    
    // Check for special cases first
    if (this.SPECIAL_CASES.has(lowercase)) {
      return this.SPECIAL_CASES.get(lowercase);
    }
    
    // Split by spaces and process each word
    const words = cleaned.toLowerCase().split(/\s+/);
    const capitalizedWords = words.map((word, index) => {
      return this.capitalizeWord(word, index === 0);
    });
    
    return capitalizedWords.join(' ');
  }
  
  /**
   * Capitalize a single word with special rules
   * @param {string} word - The word to capitalize
   * @param {boolean} isFirstWord - Whether this is the first word in the note name
   * @returns {string} - The capitalized word
   */
  static capitalizeWord(word, isFirstWord = false) {
    if (!word) return word;
    
    // Handle hyphenated words
    if (word.includes('-')) {
      return word.split('-').map(part => this.capitalizeWord(part, isFirstWord)).join('-');
    }
    
    // Handle apostrophes (like "rose's petals")
    if (word.includes("'")) {
      const parts = word.split("'");
      parts[0] = this.capitalizeWord(parts[0], isFirstWord);
      return parts.join("'");
    }
    
    // Always capitalize the first word, regardless of rules
    if (isFirstWord) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
    
    // Check if word should remain lowercase
    if (this.LOWERCASE_WORDS.has(word.toLowerCase())) {
      return word.toLowerCase();
    }
    
    // Default capitalization
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  
  /**
   * Normalize an array of note names
   * @param {string[]} notes - Array of note names to normalize
   * @returns {string[]} - Array of normalized note names
   */
  static normalizeArray(notes) {
    if (!Array.isArray(notes)) {
      return [];
    }
    
    return notes
      .map(note => this.normalize(note))
      .filter(note => note.length > 0); // Remove empty strings
  }
  
  /**
   * Normalize all notes in a perfume object
   * @param {Object} perfume - Perfume object with notes structure
   * @returns {Object} - Perfume object with normalized notes
   */
  static normalizePerfumeNotes(perfume) {
    if (!perfume || !perfume.notes) {
      return perfume;
    }
    
    return {
      ...perfume,
      notes: {
        top: this.normalizeArray(perfume.notes.top || []),
        middle: this.normalizeArray(perfume.notes.middle || []),
        base: this.normalizeArray(perfume.notes.base || [])
      }
    };
  }
  
  /**
   * Add a new special case for unique note names
   * @param {string} input - The input form (lowercase)
   * @param {string} output - The desired output form
   */
  static addSpecialCase(input, output) {
    this.SPECIAL_CASES.set(input.toLowerCase(), output);
  }
  
  /**
   * Validate that a note name follows the expected format
   * @param {string} noteName - The note name to validate
   * @returns {boolean} - Whether the note name is properly formatted
   */
  static isProperlyFormatted(noteName) {
    const normalized = this.normalize(noteName);
    return noteName === normalized;
  }
}

// Export the class
export { NoteNormalizer };