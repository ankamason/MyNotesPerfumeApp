// src/models/UserCollection.js

class UserCollection {
  constructor() {
    this.perfumes = [];
    this.createdAt = new Date();
  }
  
  // Add a perfume to the collection (with duplicate prevention)
  addPerfume(perfume) {
    // Check for duplicates by ID
    if (this.hasPerfume(perfume.id)) {
      return false; // Don't add duplicate
    }
    
    this.perfumes.push(perfume);
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
  
  // Find perfumes containing a specific note (in any position!)
  getPerfumesWithNote(note) {
    return this.perfumes.filter(perfume => {
      const allNotes = [
        ...perfume.notes.top,
        ...perfume.notes.middle,
        ...perfume.notes.base
      ];
      return allNotes.includes(note);
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
        noteCount[note] = (noteCount[note] || 0) + 1;
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
}


module.exports = { UserCollection };

