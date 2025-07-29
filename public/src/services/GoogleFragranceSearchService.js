// src/services/GoogleFragranceSearchService.js - Complete & Working Version

import { NoteClassifier } from '../data/NoteClassification.js';

class GoogleFragranceSearchService {
  
  // 🎯 Comprehensive Mock Database - Your AI's Knowledge Base
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
      description: 'The world\'s most iconic perfume, a floral bouquet with aldehydic sparkle.',
      confidence: 1.0
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
      description: 'A luxurious oriental fragrance with dark, mysterious allure.',
      confidence: 1.0
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
      description: 'A sophisticated woody fragrance inspired by Napoleon\'s strength.',
      confidence: 1.0
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
      description: 'A radically fresh composition with woody and spicy accords.',
      confidence: 1.0
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
      description: 'A spirited, voluptuous fragrance with a floral heart and woody base.',
      confidence: 1.0
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
      description: 'The tension between a burning floral bouquet and a masculine lavender.',
      confidence: 1.0
    },

    {
      id: 'versace-bright-crystal',
      name: 'Bright Crystal',
      brand: 'Versace',
      notes: {
        top: ['Pomegranate', 'Yuzu', 'Ice'],
        middle: ['Peony', 'Magnolia', 'Lotus'],
        base: ['Plant Amber', 'Musk', 'Mahogany']
      },
      fragranceFamily: 'Floral',
      year: 2006,
      source: 'fragrantica.com',
      description: 'A luminous and voluptuous fragrance with crystalline transparency.',
      confidence: 1.0
    },

    {
      id: 'armani-acqua-di-gio',
      name: 'Acqua di Gio',
      brand: 'Giorgio Armani',
      notes: {
        top: ['Lime', 'Lemon', 'Bergamot', 'Jasmine'],
        middle: ['Calone', 'Peach', 'Jasmine', 'Freesia'],
        base: ['White Musk', 'Cedar', 'Oakmoss', 'Patchouli']
      },
      fragranceFamily: 'Fresh',
      year: 1996,
      source: 'fragrantica.com',
      description: 'An aquatic fragrance inspired by the freshness of sea, sun and earth.',
      confidence: 1.0
    },

    {
      id: 'dolce-gabbana-light-blue',
      name: 'Light Blue',
      brand: 'Dolce & Gabbana',
      notes: {
        top: ['Lime', 'Cedar', 'Granny Smith Apple', 'Bellflower'],
        middle: ['Bamboo', 'Jasmine', 'White Rose'],
        base: ['Cedar', 'Amber', 'Musk']
      },
      fragranceFamily: 'Fresh',
      year: 2001,
      source: 'fragrantica.com',
      description: 'A fresh floral fragrance that evokes the spirit of the sensual Mediterranean summer.',
      confidence: 1.0
    },

    {
      id: 'marc-jacobs-daisy',
      name: 'Daisy',
      brand: 'Marc Jacobs',
      notes: {
        top: ['Wild Berries', 'Grapefruit', 'Leaves'],
        middle: ['Violet Leaves', 'Jasmine', 'Gardenia'],
        base: ['Musk', 'Vanilla', 'White Woods']
      },
      fragranceFamily: 'Floral',
      year: 2007,
      source: 'fragrantica.com',
      description: 'A radiant floral bouquet that is whimsical and charming.',
      confidence: 1.0
    }
  ];
  
  // 🔍 Main Search Method - Smart & Fast
  static async searchPerfume(query) {
    console.log('🔍 Searching for:', query);
    
    // Simulate realistic API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    if (!query || query.trim() === '') {
      // Return popular perfumes when no query
      return this.mockFragranceDatabase.slice(0, 6);
    }
    
    let searchName, searchBrand;
    
    // Handle different query formats
    if (typeof query === 'string') {
      searchName = query.trim();
      searchBrand = null;
    } else {
      searchName = query.name || '';
      searchBrand = query.brand || null;
    }
    
    // Smart search with confidence scoring
    const results = this.mockFragranceDatabase
      .map(perfume => ({
        ...perfume,
        confidence: this.calculateMatchConfidence(perfume, searchName, searchBrand)
      }))
      .filter(perfume => perfume.confidence > 0)
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, 10); // Return top 10 matches
    
    console.log('✅ Found', results.length, 'matches for:', searchName);
    return results;
  }
  
  // 🧮 Smart Confidence Calculation
  static calculateMatchConfidence(perfume, searchName, searchBrand) {
    let confidence = 0;
    
    const perfumeName = perfume.name.toLowerCase();
    const perfumeBrand = perfume.brand.toLowerCase();
    const queryName = searchName.toLowerCase();
    const queryBrand = searchBrand ? searchBrand.toLowerCase() : null;
    
    // 🎯 Name Matching Logic
    if (perfumeName === queryName) {
      confidence += 0.6; // Exact name match
    } else if (perfumeName.includes(queryName) || queryName.includes(perfumeName)) {
      confidence += 0.4; // Partial name match
    } else if (this.fuzzyMatch(perfumeName, queryName)) {
      confidence += 0.3; // Fuzzy match (handles typos)
    }
    
    // 🏷️ Brand Matching Logic
    if (!queryBrand) {
      // When no specific brand is provided, check if search term matches brand
      if (perfumeBrand === queryName) {
        confidence += 0.5; // Exact brand match
      } else if (perfumeBrand.includes(queryName) || queryName.includes(perfumeBrand)) {
        confidence += 0.3; // Partial brand match
      }
    }
    
    // 🏢 Specific Brand Matching
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
  
  // 🔤 Fuzzy Matching for Typos
  static fuzzyMatch(str1, str2) {
    const distance = this.levenshteinDistance(str1, str2);
    const maxLength = Math.max(str1.length, str2.length);
    return distance <= maxLength * 0.3; // Allow 30% character differences
  }
  
  // 📏 Calculate Edit Distance Between Strings
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
  
  // 📝 Extract Notes from Natural Language Text
  // (Keeping this for future Google API integration)
  static extractNotesFromText(text) {
    const notes = { top: [], middle: [], base: [] };
    
    // Enhanced patterns for real web content
    const patterns = {
      structured: /(?:top|head)\s*notes?[:\s]+([^;.]+)[;.]?\s*(?:middle|heart)\s*notes?[:\s]+([^;.]+)[;.]?\s*(?:base|dry\s*down)\s*notes?[:\s]+([^;.]+)/i,
      topOnly: /(?:top|head)\s*notes?[:\s]+([^;.]+)/i,
      heartOnly: /(?:middle|heart)\s*notes?[:\s]+([^;.]+)/i,
      baseOnly: /(?:base|dry\s*down)\s*notes?[:\s]+([^;.]+)/i
    };
    
    // Try structured format first
    let match = text.match(patterns.structured);
    if (match) {
      notes.top = this.parseNotesList(match[1]);
      notes.middle = this.parseNotesList(match[2]);
      notes.base = this.parseNotesList(match[3]);
      return notes;
    }
    
    // Try individual patterns
    match = text.match(patterns.topOnly);
    if (match) notes.top = this.parseNotesList(match[1]);
    
    match = text.match(patterns.heartOnly);
    if (match) notes.middle = this.parseNotesList(match[1]);
    
    match = text.match(patterns.baseOnly);
    if (match) notes.base = this.parseNotesList(match[1]);
    
    return notes;
  }
  
  // 🔧 Parse Comma-Separated Notes Lists
  static parseNotesList(notesString) {
    if (!notesString) return [];
    
    // Handle different separators
    let notes;
    if (notesString.includes(',')) {
      notes = notesString.split(',');
    } else if (notesString.includes(' and ')) {
      notes = notesString.split(' and ');
    } else if (notesString.includes(';')) {
      notes = notesString.split(';');
    } else {
      notes = [notesString];
    }
    
    return notes
      .map(note => note.trim())
      .filter(note => note.length > 0 && note.length < 30) // Filter out overly long "notes"
      .map(note => note.replace(/^(a |an |the )/i, '')) // Remove articles
      .slice(0, 8); // Limit to reasonable number of notes
  }
  
  // 🏷️ Extract Fragrance Family from Description Text
  static extractFragranceFamily(text) {
    const familyKeywords = {
      'Floral': ['floral', 'flower', 'rose', 'jasmine', 'lily', 'peony', 'gardenia'],
      'Woody': ['woody', 'wood', 'cedar', 'sandalwood', 'vetiver', 'oud'],
      'Citrus': ['citrus', 'fresh', 'lemon', 'bergamot', 'orange', 'grapefruit'],
      'Oriental': ['oriental', 'spicy', 'amber', 'vanilla', 'exotic', 'incense'],
      'Gourmand': ['gourmand', 'sweet', 'chocolate', 'caramel', 'honey'],
      'Fresh': ['fresh', 'aquatic', 'marine', 'ocean', 'sea', 'water', 'clean'],
      'Green': ['green', 'herbal', 'grass', 'mint', 'basil', 'leaves'],
      'Chypre': ['chypre', 'mossy', 'oakmoss', 'patchouli']
    };
    
    const lowerText = text.toLowerCase();
    const scores = {};
    
    // Score each family based on keyword matches
    Object.entries(familyKeywords).forEach(([family, keywords]) => {
      scores[family] = keywords.reduce((score, keyword) => {
        return score + (lowerText.includes(keyword) ? 1 : 0);
      }, 0);
    });
    
    // Return family with highest score
    const bestFamily = Object.keys(scores).reduce((a, b) => 
      scores[a] > scores[b] ? a : b
    );
    
    return scores[bestFamily] > 0 ? bestFamily : 'Unclassified';
  }
  
  // 🎯 Get Random Sample of Perfumes (for testing)
  static getRandomPerfumes(count = 5) {
    const shuffled = [...this.mockFragranceDatabase].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
  
  // 📊 Get All Available Perfumes (for recommendations)
  static getAllPerfumes() {
    return [...this.mockFragranceDatabase];
  }
  
  // 🔍 Get Perfume by ID
  static getPerfumeById(id) {
    return this.mockFragranceDatabase.find(perfume => perfume.id === id);
  }
  
  // 🏷️ Get Perfumes by Brand
  static getPerfumesByBrand(brand) {
    const brandLower = brand.toLowerCase();
    return this.mockFragranceDatabase.filter(perfume => 
      perfume.brand.toLowerCase().includes(brandLower)
    );
  }
  
  // 🌸 Get Perfumes by Family
  static getPerfumesByFamily(family) {
    return this.mockFragranceDatabase.filter(perfume => 
      perfume.fragranceFamily === family
    );
  }
}

export { GoogleFragranceSearchService };