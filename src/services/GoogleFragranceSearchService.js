// src/services/GoogleFragranceSearchService.js - CLEAN VERSION (No API Calls)

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
      description: 'A luminous and voluptuous fragrance with crystalline transparency.'
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
      description: 'An aquatic fragrance inspired by the freshness of sea, sun and earth.'
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
      description: 'A fresh floral fragrance that evokes the spirit of the sensual Mediterranean summer.'
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
      description: 'A radiant floral bouquet that is whimsical and charming.'
    }
  ];
  
  // 🔍 Main Search Method - ONLY MOCK DATA (No API calls!)
  static async searchPerfume(query) {
    console.log('🔍 Searching mock database for:', query);
    
    // Simulate realistic API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    if (!query || query.trim() === '') {
      // Return popular perfumes when no query
      console.log('✅ Returning popular perfumes');
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
}

export { GoogleFragranceSearchService };