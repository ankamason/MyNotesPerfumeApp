// src/services/GoogleFragranceSearchService.js - NOW WITH REAL GOOGLE SEARCH!

import { CONFIG } from '../../config.js';

class GoogleFragranceSearchService {
  
  // Your existing mock database as fallback
  static mockFragranceDatabase = [
    // ... keep your existing mock data as fallback
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
      source: 'mock-data'
    }
    // ... add your other mock perfumes
  ];
  
  // Main search method - NOW USES REAL GOOGLE API!
  static async searchPerfume(query, useRealAPI = true) {
    console.log('🔍 Searching for:', query);
    
    if (!query || !useRealAPI) {
      // Fallback to mock data
      return this.searchMockData(query);
    }
    
    try {
      // 🚀 REAL GOOGLE SEARCH!
      const googleResults = await this.googleCustomSearch(query);
      const parsedPerfumes = this.parseGoogleResults(googleResults, query);
      
      if (parsedPerfumes.length > 0) {
        console.log('✅ Found', parsedPerfumes.length, 'perfumes via Google API');
        return parsedPerfumes;
      } else {
        console.log('⚠️ No Google results, falling back to mock data');
        return this.searchMockData(query);
      }
      
    } catch (error) {
      console.error('❌ Google API error, falling back to mock data:', error);
      return this.searchMockData(query);
    }
  }
  
  // Real Google Custom Search API call
  static async googleCustomSearch(query) {
    const searchUrl = new URL(CONFIG.GOOGLE_CUSTOM_SEARCH_URL);
    
    // Build search query targeting perfume information
    const perfumeQuery = `${query} perfume fragrance notes "top notes" "base notes"`;
    
    searchUrl.searchParams.append('key', CONFIG.GOOGLE_API_KEY);
    searchUrl.searchParams.append('cx', CONFIG.GOOGLE_SEARCH_ENGINE_ID);
    searchUrl.searchParams.append('q', perfumeQuery);
    searchUrl.searchParams.append('num', '10'); // Get up to 10 results
    
    console.log('🌐 Making Google API call...');
    
    const response = await fetch(searchUrl.toString());
    
    if (!response.ok) {
      throw new Error(`Google API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('📊 Google API response:', data);
    
    return data;
  }
  
  // Parse Google search results into perfume objects
  static parseGoogleResults(googleData, originalQuery) {
    if (!googleData.items || googleData.items.length === 0) {
      return [];
    }
    
    const perfumes = [];
    
    googleData.items.forEach((item, index) => {
      try {
        const perfume = this.extractPerfumeFromSearchResult(item, originalQuery, index);
        if (perfume) {
          perfumes.push(perfume);
        }
      } catch (error) {
        console.warn('⚠️ Could not parse search result:', error);
      }
    });
    
    return perfumes;
  }
  
  // Extract perfume information from a single Google search result
  static extractPerfumeFromSearchResult(searchResult, originalQuery, index) {
    const title = searchResult.title || '';
    const snippet = searchResult.snippet || '';
    const url = searchResult.link || '';
    
    // Try to extract perfume name and brand from title
    const perfumeInfo = this.extractNameAndBrand(title, originalQuery);
    
    if (!perfumeInfo.name) {
      return null; // Skip if we can't extract basic info
    }
    
    // Extract notes from snippet
    const notes = this.extractNotesFromText(snippet);
    
    // Extract fragrance family
    const family = this.extractFragranceFamily(snippet + ' ' + title);
    
    // Generate confidence score based on how well it matches
    const confidence = this.calculateGoogleResultConfidence(perfumeInfo, originalQuery, notes);
    
    return {
      id: `google-${Date.now()}-${index}`,
      name: perfumeInfo.name,
      brand: perfumeInfo.brand,
      notes: notes.top.length > 0 || notes.middle.length > 0 || notes.base.length > 0 ? notes : {
        top: ['Information not available'],
        middle: ['Check source for details'],
        base: ['See original listing']
      },
      fragranceFamily: family || 'Unclassified',
      source: 'google-search',
      sourceUrl: url,
      confidence: confidence,
      description: snippet.substring(0, 200) + '...'
    };
  }
  
  // Extract perfume name and brand from search result title
  static extractNameAndBrand(title, query) {
    // Common patterns in fragrance search results
    const patterns = [
      // "Perfume Name by Brand Name"
      /^(.+?)\s+by\s+(.+?)(?:\s*[-|]|$)/i,
      // "Brand Name Perfume Name"
      /^([A-Z][a-zA-Z\s&]+?)\s+([A-Z].+?)(?:\s*[-|]|$)/i,
      // "Perfume Name - Brand Name"
      /^(.+?)\s*[-–]\s*(.+?)(?:\s*[-|]|$)/i,
      // Fallback - use query as name
      new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'i')
    ];
    
    for (const pattern of patterns) {
      const match = title.match(pattern);
      if (match) {
        if (match.length >= 3) {
          return {
            name: match[1].trim(),
            brand: match[2].trim()
          };
        } else if (match.length >= 2) {
          return {
            name: match[1].trim(),
            brand: 'Unknown Brand'
          };
        }
      }
    }
    
    // Ultimate fallback
    return {
      name: query,
      brand: 'Search Result'
    };
  }
  
  // Calculate confidence for Google search results
  static calculateGoogleResultConfidence(perfumeInfo, originalQuery, notes) {
    let confidence = 0.3; // Base confidence for Google results
    
    const queryLower = originalQuery.toLowerCase();
    const nameLower = perfumeInfo.name.toLowerCase();
    const brandLower = perfumeInfo.brand.toLowerCase();
    
    // Name matching
    if (nameLower.includes(queryLower) || queryLower.includes(nameLower)) {
      confidence += 0.4;
    }
    
    // Brand matching  
    if (brandLower.includes(queryLower) || queryLower.includes(brandLower)) {
      confidence += 0.2;
    }
    
    // Has detailed notes information
    if (notes.top.length > 0 && notes.middle.length > 0 && notes.base.length > 0) {
      confidence += 0.1;
    }
    
    return Math.min(confidence, 1.0);
  }
  
  // Fallback to mock data (your existing method)
  static async searchMockData(query) {
    if (!query) return this.mockFragranceDatabase.slice(0, 6);
    
    // Your existing mock search logic
    const queryLower = query.toLowerCase();
    
    return this.mockFragranceDatabase
      .map(perfume => ({
        ...perfume,
        confidence: this.calculateMockConfidence(perfume, query)
      }))
      .filter(perfume => perfume.confidence > 0)
      .sort((a, b) => b.confidence - a.confidence);
  }
  
  static calculateMockConfidence(perfume, query) {
    // Your existing confidence calculation for mock data
    let confidence = 0;
    const queryLower = query.toLowerCase();
    
    if (perfume.name.toLowerCase().includes(queryLower)) confidence += 0.6;
    if (perfume.brand.toLowerCase().includes(queryLower)) confidence += 0.4;
    
    return confidence;
  }
  
  // Your existing helper methods (keep these)
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
      .map(note => note.replace(/^(a |an |the )/i, ''))
      .slice(0, 8); // Limit to reasonable number of notes
  }
  
  static extractFragranceFamily(text) {
    const familyKeywords = {
      'Floral': ['floral', 'flower', 'rose', 'jasmine', 'lily', 'peony', 'gardenia'],
      'Woody': ['woody', 'wood', 'cedar', 'sandalwood', 'vetiver', 'oud'],
      'Citrus': ['citrus', 'fresh', 'lemon', 'bergamot', 'orange', 'grapefruit'],
      'Oriental': ['oriental', 'spicy', 'amber', 'vanilla', 'exotic', 'incense'],
      'Gourmand': ['gourmand', 'sweet', 'chocolate', 'caramel', 'honey', 'vanilla'],
      'Fresh': ['fresh', 'aquatic', 'marine', 'ocean', 'sea', 'water', 'clean'],
      'Green': ['green', 'herbal', 'grass', 'mint', 'basil', 'leaves'],
      'Chypre': ['chypre', 'mossy', 'oakmoss', 'patchouli']
    };
    
    const lowerText = text.toLowerCase();
    const scores = {};
    
    Object.entries(familyKeywords).forEach(([family, keywords]) => {
      scores[family] = keywords.reduce((score, keyword) => {
        return score + (lowerText.includes(keyword) ? 1 : 0);
      }, 0);
    });
    
    const bestFamily = Object.keys(scores).reduce((a, b) => 
      scores[a] > scores[b] ? a : b
    );
    
    return scores[bestFamily] > 0 ? bestFamily : 'Unclassified';
  }
}

export { GoogleFragranceSearchService };