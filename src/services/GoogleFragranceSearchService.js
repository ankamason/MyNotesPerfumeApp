// src/services/GoogleFragranceSearchService.js

class GoogleFragranceSearchService {
  
  // Comprehensive mock database with popular perfumes
  static mockFragranceDatabase = [
    {
      id: 'chanel-no5',
      name: 'Chanel No. 5',
      brand: 'Chanel',
      notes: {
        top: ['Aldehydes', 'Lemon', 'Neroli', 'Bergamot'],
        middle: ['Jasmine', 'Rose', 'Lily of the Valley', 'Iris'],
        base: ['Sandalwood', 'Vanilla', 'Musk', 'Cedar']
      },
      fragranceFamily: 'Floral',
      year: 1921,
      source: 'fragrantica.com',
      description: 'The world\'s most iconic perfume, a floral bouquet with aldehydic sparkle.'
    },
    
    {
      id: 'tom-ford-black-orchid',
      name: 'Black Orchid',
      brand: 'Tom Ford',
      notes: {
        top: ['Truffle', 'Gardenia', 'Black Currant', 'Ylang Ylang'],
        middle: ['Orchid', 'Spicy Notes', 'Fruity Notes', 'Lotus Wood'],
        base: ['Patchouli', 'Vanilla', 'Incense', 'Sandalwood']
      },
      fragranceFamily: 'Oriental',
      year: 2006,
      source: 'fragrantica.com',
      description: 'A luxurious oriental fragrance with dark, mysterious allure.'
    },
    
    {
      id: 'creed-aventus',
      name: 'Aventus',
      brand: 'Creed',
      notes: {
        top: ['Pineapple', 'Bergamot', 'Black Currant', 'Apple'],
        middle: ['Rose', 'Dry Birch', 'Moroccan Jasmine', 'Patchouli'],
        base: ['Oak Moss', 'Musk', 'Ambergris', 'Vanilla']
      },
      fragranceFamily: 'Woody',
      year: 2010,
      source: 'fragrantica.com',
      description: 'A sophisticated woody fragrance inspired by Napoleon\'s strength.'
    },
    
    {
      id: 'dior-sauvage',
      name: 'Sauvage',
      brand: 'Dior',
      notes: {
        top: ['Calabrian Bergamot', 'Pepper'],
        middle: ['Sichuan Pepper', 'Lavender', 'Pink Pepper', 'Vetiver'],
        base: ['Ambroxan', 'Cedar', 'Labdanum']
      },
      fragranceFamily: 'Woody',
      year: 2015,
      source: 'fragrantica.com',
      description: 'A radically fresh composition with woody and spicy accords.'
    },
    
    {
      id: 'chanel-coco-mademoiselle',
      name: 'Coco Mademoiselle',
      brand: 'Chanel',
      notes: {
        top: ['Orange', 'Mandarin Orange', 'Orange Blossom', 'Bergamot'],
        middle: ['Mimosa', 'Jasmine', 'Turkish Rose', 'Ylang Ylang'],
        base: ['White Musk', 'Opoponax', 'Tonka Bean', 'Patchouli']
      },
      fragranceFamily: 'Floral',
      year: 2001,
      source: 'fragrantica.com',
      description: 'A spirited, voluptuous fragrance with a floral heart and woody base.'
    },
    
    {
      id: 'ysl-libre',
      name: 'Libre',
      brand: 'Yves Saint Laurent',
      notes: {
        top: ['Mandarin Orange', 'Black Currant', 'Petitgrain'],
        middle: ['Jasmine', 'Orange Blossom', 'Lavender'],
        base: ['Madagascar Vanilla', 'Ambergris', 'Cedar', 'Musk']
      },
      fragranceFamily: 'Floral',
      year: 2019,
      source: 'fragrantica.com',
      description: 'The tension between a burning floral bouquet and a masculine lavender.'
    },

    // Add these to your mockFragranceDatabase array:

{
  id: 'rose-de-mai',
  name: 'Rose de Mai',
  brand: 'L\'Artisan Parfumeur',
  notes: {
    top: ['Rose', 'Pink Pepper'],
    middle: ['Rose Petals', 'Peony'],
    base: ['White Musk', 'Cedar']
  },
  fragranceFamily: 'Floral',
  year: 2005,
  source: 'fragrantica.com',
  description: 'A pure rose fragrance capturing the essence of May roses.'
},

{
  id: 'rose-oud',
  name: 'Rose Oud',
  brand: 'Maison Francis Kurkdjian',
  notes: {
    top: ['Rose', 'Saffron'],
    middle: ['Damascus Rose', 'Oud'],
    base: ['Rose Wood', 'Amber']
  },
  fragranceFamily: 'Oriental',
  year: 2014,
  source: 'fragrantica.com',
  description: 'An opulent blend of rose and oud.'
}
       
    // Add more popular perfumes as needed...
  ];
  
  // Main search method - handles both string and object queries
  static async searchPerfume(query) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    let searchName, searchBrand;
    
    // Handle different query formats
    if (typeof query === 'string') {
      searchName = query;
      searchBrand = null;
    } else {
      searchName = query.name;
      searchBrand = query.brand;
    }
    
    // Search the mock database
    const results = this.mockFragranceDatabase
      .map(perfume => ({
        ...perfume,
        confidence: this.calculateMatchConfidence(perfume, searchName, searchBrand)
      }))
      .filter(perfume => perfume.confidence > 0)
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, 5); // Return top 5 matches
    
    return results;
  }
  
 static calculateMatchConfidence(perfume, searchName, searchBrand) {
  let confidence = 0;
  
  const perfumeName = perfume.name.toLowerCase();
  const perfumeBrand = perfume.brand.toLowerCase();
  const queryName = searchName.toLowerCase();
  const queryBrand = searchBrand ? searchBrand.toLowerCase() : null;
  
  // Name matching logic
  if (perfumeName === queryName) {
    confidence += 0.6; // Exact name match
  } else if (perfumeName.includes(queryName) || queryName.includes(perfumeName)) {
    confidence += 0.4; // Partial name match
  } else if (this.fuzzyMatch(perfumeName, queryName)) {
    confidence += 0.3; // Fuzzy match (typos, etc.)
  }
  
  // NEW: Also check if the search term matches the brand name (when no specific brand provided)
  if (!queryBrand) {
    // When no specific brand is provided, check if search term matches brand
    if (perfumeBrand === queryName) {
      confidence += 0.5; // Exact brand match
    } else if (perfumeBrand.includes(queryName) || queryName.includes(perfumeBrand)) {
      confidence += 0.3; // Partial brand match
    }
  }
  
  // Brand matching logic (when specific brand IS provided)
  if (queryBrand) {
    if (perfumeBrand === queryBrand) {
      confidence += 0.4; // Exact brand match
    } else if (perfumeBrand.includes(queryBrand) || queryBrand.includes(perfumeBrand)) {
      confidence += 0.2; // Partial brand match
    }
  } else if (confidence > 0) {
    // Small bonus for having any match when no brand specified
    confidence += 0.1;
  }
  
  return Math.min(confidence, 1.0);
}
  
  // Simple fuzzy matching for typos
  static fuzzyMatch(str1, str2) {
    const distance = this.levenshteinDistance(str1, str2);
    const maxLength = Math.max(str1.length, str2.length);
    return distance <= maxLength * 0.3; // Allow 30% character differences
  }
  
  // Calculate edit distance between strings
  static levenshteinDistance(str1, str2) {
    const matrix = [];
    
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }
    
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }
    
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    
    return matrix[str2.length][str1.length];
  }
  
  // Extract notes from natural language text (for future Google API integration)
  static extractNotesFromText(text) {
    const notes = { top: [], middle: [], base: [] };
    
    // Regular expressions for different formats
    const patterns = {
      structured: /Top notes?:\s*([^;]+);\s*Middle notes?:\s*([^;]+);\s*Base notes?:\s*([^;.]+)/i,
      narrative: /Opens with\s+([^.]+)\.\s*Heart of\s+([^.]+)\.\s*Dries down to\s+([^.]+)\./i
    };
    
    // Try structured format first
    let match = text.match(patterns.structured);
    if (match) {
      notes.top = this.parseNotesList(match[1]);
      notes.middle = this.parseNotesList(match[2]);
      notes.base = this.parseNotesList(match[3]);
      return notes;
    }
    
    // Try narrative format
    match = text.match(patterns.narrative);
    if (match) {
      notes.top = this.parseNotesList(match[1]);
      notes.middle = this.parseNotesList(match[2]);
      notes.base = this.parseNotesList(match[3]);
      return notes;
    }
    
    // Return empty structure if no patterns match
    return notes;
  }
  
  // Replace the parseNotesList method:

static parseNotesList(notesString) {
  // Handle different formats: "rose, jasmine, lily" or "rose and jasmine"
  let notes;
  
  if (notesString.includes(',')) {
    // Comma-separated format
    notes = notesString.split(',');
  } else if (notesString.includes(' and ')) {
    // "and" separated format
    notes = notesString.split(' and ');
  } else {
    // Single note or space-separated
    notes = [notesString];
  }
  
  return notes
    .map(note => note.trim())
    .filter(note => note.length > 0)
    .map(note => note.replace(/^(a |an |the )/i, '')); // Remove articles
}
  
  // Extract fragrance family from description text
  static extractFragranceFamily(text) {
    const familyKeywords = {
      'Floral': ['floral', 'flower', 'rose', 'jasmine', 'lily', 'peony'],
      'Woody': ['woody', 'wood', 'cedar', 'sandalwood', 'vetiver'],
      'Citrus': ['citrus', 'fresh', 'lemon', 'bergamot', 'orange'],
      'Oriental': ['oriental', 'spicy', 'amber', 'vanilla', 'exotic'],
      'Gourmand': ['gourmand', 'sweet', 'chocolate', 'caramel', 'honey'],
      'Aquatic': ['aquatic', 'marine', 'ocean', 'sea', 'water'],
      'Green': ['green', 'herbal', 'grass', 'mint', 'basil']
    };
    
    const lowerText = text.toLowerCase();
    
    // Score each family based on keyword matches
    const scores = {};
    Object.entries(familyKeywords).forEach(([family, keywords]) => {
      scores[family] = keywords.reduce((score, keyword) => {
        return score + (lowerText.includes(keyword) ? 1 : 0);
      }, 0);
    });
    
    // Return family with highest score, or 'Unclassified' if no matches
    const bestFamily = Object.keys(scores).reduce((a, b) => 
      scores[a] > scores[b] ? a : b
    );
    
    return scores[bestFamily] > 0 ? bestFamily : 'Unclassified';
  }
}

module.exports = { GoogleFragranceSearchService };