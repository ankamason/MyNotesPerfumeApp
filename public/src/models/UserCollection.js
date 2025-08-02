// src/models/UserCollection.js

import { NoteClassifier } from '../data/NoteClassification.js';
import { NoteNormalizer } from '../utils/NoteNormalizer.js';
  

class UserCollection {
  constructor() {
    this.perfumes = [];
    this.createdAt = new Date();
  }
  
  // Add a perfume to the collection (with duplicate prevention and note normalization)
  addPerfume(perfume) {
    // Check for duplicates by ID
    if (this.hasPerfume(perfume.id)) {
      return false; // Don't add duplicate
    }
    
    // Normalize all notes before adding to collection
    const normalizedPerfume = NoteNormalizer.normalizePerfumeNotes(perfume);
    
    this.perfumes.push(normalizedPerfume);
    return true;
  }
  
  // Remove perfume by ID
  removePerfume(perfumeId) {
    const initialLength = this.perfumes.length;
    this.perfumes = this.perfumes.filter(perfume => perfume.id !== perfumeId);
    return this.perfumes.length < initialLength; // Return true if something was removed
  }
  
  // Get collection size
  getSize() {
    return this.perfumes.length;
  }
  
  // Get all perfumes
  getAllPerfumes() {
    return this.perfumes;
  }
  
  // Check if collection has specific perfume by ID
  hasPerfume(perfumeId) {
    return this.perfumes.some(perfume => perfume.id === perfumeId);
  }
  
  // Find perfumes by fragrance family
  getPerfumesByFamily(family) {
    return this.perfumes.filter(perfume => perfume.fragranceFamily === family);
  }
  
  // Find perfumes containing a specific note (case-insensitive search)
  getPerfumesWithNote(note) {
    // Normalize the search note for consistent comparison
    const normalizedSearchNote = NoteNormalizer.normalize(note);
    
    return this.perfumes.filter(perfume => {
      const allNotes = [
        ...perfume.notes.top,
        ...perfume.notes.middle,
        ...perfume.notes.base
      ];
      
      // Case-insensitive comparison
      return allNotes.some(perfumeNote => 
        perfumeNote.toLowerCase() === normalizedSearchNote.toLowerCase()
      );
    });
  }
  
  // Get most popular notes across entire collection
  getMostPopularNotes() {
    const noteCount = {};
    
    // Count occurrences of each note across all perfumes and positions
    this.perfumes.forEach(perfume => {
      const allNotes = [
        ...perfume.notes.top,
        ...perfume.notes.middle,
        ...perfume.notes.base
      ];
      
      allNotes.forEach(note => {
        // Use normalized note name as the key for counting
        const normalizedNote = NoteNormalizer.normalize(note);
        noteCount[normalizedNote] = (noteCount[normalizedNote] || 0) + 1;
      });
    });
    
    // Convert to array of objects and sort by count (descending)
    return Object.entries(noteCount)
      .map(([note, count]) => ({ note, count }))
      .sort((a, b) => {
        // Primary sort: by count (descending)
        if (b.count !== a.count) {
          return b.count - a.count;
        }
        // Secondary sort: alphabetically for ties
        return a.note.localeCompare(b.note);
      });
  }
  
  // Get fragrance family distribution with statistics
  getFamilyDistribution() {
    const familyCount = {};
    const total = this.perfumes.length;
    
    // Count each family
    this.perfumes.forEach(perfume => {
      const family = perfume.fragranceFamily;
      familyCount[family] = (familyCount[family] || 0) + 1;
    });
    
    // Create families object with counts and percentages
    const families = {};
    Object.entries(familyCount).forEach(([family, count]) => {
      families[family] = {
        count: count,
        percentage: total > 0 ? Math.round((count / total) * 100 * 100) / 100 : 0 // Round to 2 decimals
      };
    });
    
    // Create sorted array by popularity
    const sortedByPopularity = Object.entries(families)
      .map(([family, stats]) => ({
        family: family,
        count: stats.count,
        percentage: stats.percentage
      }))
      .sort((a, b) => {
        // Primary sort: by count (descending)
        if (b.count !== a.count) {
          return b.count - a.count;
        }
        // Secondary sort: alphabetically for ties
        return a.family.localeCompare(b.family);
      });
    
    return {
      total: total,
      families: families,
      sortedByPopularity: sortedByPopularity
    };
  }

  // Analyze subcategory preferences across entire collection
  analyzeSubcategoryPreferences() {
    const subcategoryCount = {};
    let totalNotes = 0;

    // Count notes by subcategory
    this.perfumes.forEach(perfume => {
      const allNotes = [
        ...perfume.notes.top,
        ...perfume.notes.middle,
        ...perfume.notes.base
      ];
      
      allNotes.forEach(note => {
        // Ensure note is normalized before classification
        const normalizedNote = NoteNormalizer.normalize(note);
        const classification = NoteClassifier.classifyNote(normalizedNote);
        const familyKey = classification.familyKey;
        const subcategoryKey = classification.subcategoryKey;
        
        if (!subcategoryCount[familyKey]) {
          subcategoryCount[familyKey] = {};
        }
        
        if (!subcategoryCount[familyKey][subcategoryKey]) {
          subcategoryCount[familyKey][subcategoryKey] = {
            count: 0,
            notes: [],
            name: classification.subcategory, // Clean display name without underscores
            family: classification.family, // Clean family display name
            character: classification.character,
            intensity: classification.intensity
          };
        }
        
        subcategoryCount[familyKey][subcategoryKey].count++;
        subcategoryCount[familyKey][subcategoryKey].notes.push(normalizedNote);
        totalNotes++;
      });
    });
    
    // Calculate percentages
    Object.keys(subcategoryCount).forEach(familyKey => {
      Object.keys(subcategoryCount[familyKey]).forEach(subcategoryKey => {
        const count = subcategoryCount[familyKey][subcategoryKey].count;
        subcategoryCount[familyKey][subcategoryKey].percentage = 
          Math.round((count / totalNotes) * 100 * 100) / 100;
      });
    });
    
    return subcategoryCount;
  }
  
  // Get intensity profile of the collection
  getIntensityProfile() {
    const allNotes = [];
    this.perfumes.forEach(perfume => {
      allNotes.push(...perfume.notes.top, ...perfume.notes.middle, ...perfume.notes.base);
    });
    
    // Normalize notes before intensity analysis
    const normalizedNotes = NoteNormalizer.normalizeArray(allNotes);
    const intensityCount = NoteClassifier.analyzeIntensityProfile(normalizedNotes);
    const total = Object.values(intensityCount).reduce((sum, count) => sum + count, 0);
    
    // Calculate percentages and find dominant intensity
    const intensityProfile = {};
    let dominantIntensity = '';
    let maxCount = 0;
    
    Object.entries(intensityCount).forEach(([intensity, count]) => {
      const percentage = total > 0 ? Math.round((count / total) * 100 * 100) / 100 : 0;
      intensityProfile[intensity] = { count, percentage };
      
      if (count > maxCount) {
        maxCount = count;
        dominantIntensity = intensity;
      }
    });
    
    // Add summary
    intensityProfile.dominantIntensity = dominantIntensity;
    intensityProfile.description = this.getIntensityDescription(dominantIntensity, intensityProfile);
    
    return intensityProfile;
  }
  
  // Get description of intensity preference
  getIntensityDescription(dominantIntensity, profile) {
    const percentage = profile[dominantIntensity]?.percentage || 0;
    
    switch (dominantIntensity) {
      case 'High':
        return `You prefer high-intensity, dramatic fragrances (${percentage}% of your collection). You love bold, statement scents that make an impact.`;
      case 'Medium':
        return `You gravitate toward medium-intensity, balanced fragrances (${percentage}% of your collection). You appreciate complexity without overwhelming power.`;
      case 'Light':
        return `You favor light, subtle fragrances (${percentage}% of your collection). You prefer delicate, understated elegance in your scents.`;
      default:
        return `Your collection shows a diverse intensity range, suggesting you adapt your fragrance choice to different occasions.`;
    }
  }
  
  // Suggest complementary subcategories based on current preferences
  getComplementarySubcategories() {
    const subcategoryAnalysis = this.analyzeSubcategoryPreferences();
    const suggestions = new Set();
    
    // Find most preferred subcategories and get their complements
    Object.keys(subcategoryAnalysis).forEach(familyKey => {
      Object.keys(subcategoryAnalysis[familyKey]).forEach(subcategoryKey => {
        const complements = NoteClassifier.getComplementarySubcategories(subcategoryKey);
        complements.forEach(complement => suggestions.add(complement));
      });
    });
    
    return Array.from(suggestions);
  }
  
  // Find perfumes with specific subcategory characteristics
  getPerfumesBySubcategory(familyKey, subcategoryKey) {
    const targetNotes = NoteClassifier.getNotesInSubcategory(familyKey, subcategoryKey);
    
    return this.perfumes.filter(perfume => {
      const allNotes = [
        ...perfume.notes.top,
        ...perfume.notes.middle,
        ...perfume.notes.base
      ];
      
      return allNotes.some(note => 
        targetNotes.some(targetNote => 
          NoteNormalizer.normalize(targetNote).toLowerCase() === 
          NoteNormalizer.normalize(note).toLowerCase()
        )
      );
    });
  }

  // Get formatted subcategory data for UI display
  getFormattedSubcategoryData() {
    const rawData = this.analyzeSubcategoryPreferences();
    const formattedData = {};
    
    Object.keys(rawData).forEach(familyKey => {
      formattedData[familyKey] = {};
      
      Object.keys(rawData[familyKey]).forEach(subcategoryKey => {
        const subcategoryData = rawData[familyKey][subcategoryKey];
        formattedData[familyKey][subcategoryKey] = {
          ...subcategoryData,
          displayName: subcategoryData.name, // Use the clean name for display
          key: subcategoryKey // Keep the original key for internal operations
        };
      });
    });
    
    return formattedData;
  }
  
  // Get top subcategories across all families (sorted by popularity)
  getTopSubcategories(limit = 10) {
    const subcategoryData = this.analyzeSubcategoryPreferences();
    const allSubcategories = [];
    
    Object.keys(subcategoryData).forEach(familyKey => {
      Object.keys(subcategoryData[familyKey]).forEach(subcategoryKey => {
        const data = subcategoryData[familyKey][subcategoryKey];
        allSubcategories.push({
          familyKey,
          subcategoryKey,
          name: data.name, // Clean display name
          family: data.family, // Clean family name
          count: data.count,
          percentage: data.percentage,
          character: data.character,
          intensity: data.intensity
        });
      });
    });
    
    // Sort by count (descending) and return top results
    return allSubcategories
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
  }

  // Normalize all notes in existing collection (one-time cleanup utility)
  normalizeExistingCollection() {
    let updatedCount = 0;
    
    this.perfumes = this.perfumes.map(perfume => {
      const originalPerfume = JSON.stringify(perfume);
      const normalizedPerfume = NoteNormalizer.normalizePerfumeNotes(perfume);
      
      if (JSON.stringify(normalizedPerfume) !== originalPerfume) {
        updatedCount++;
      }
      
      return normalizedPerfume;
    });
    
    return {
      updated: updatedCount,
      total: this.perfumes.length,
      message: `Normalized ${updatedCount} of ${this.perfumes.length} perfumes in collection`
    };
  }

  // Validate that all notes in the collection are properly normalized
  validateNormalization() {
    const issues = [];
    
    this.perfumes.forEach((perfume, index) => {
      const allNotes = [
        ...perfume.notes.top,
        ...perfume.notes.middle,
        ...perfume.notes.base
      ];
      
      allNotes.forEach((note, noteIndex) => {
        if (!NoteNormalizer.isProperlyFormatted(note)) {
          issues.push({
            perfumeIndex: index,
            perfumeName: perfume.name,
            noteIndex: noteIndex,
            currentNote: note,
            suggestedNote: NoteNormalizer.normalize(note)
          });
        }
      });
    });
    
    return {
      isValid: issues.length === 0,
      issues: issues,
      message: issues.length === 0 
        ? 'All notes are properly normalized' 
        : `Found ${issues.length} notes that need normalization`
    };
  }
}

export { UserCollection };