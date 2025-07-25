// src/models/Perfume.js

class Perfume {
  constructor({
    id,
    name,
    brand,
    notes = { top: [], middle: [], base: [] },
    fragranceFamily,
    year,
    rating = null
  }) {
    // Validation: Check for empty name
    if (!name || name.trim() === '') {
      throw new Error('Perfume name cannot be empty');
    }
    
    // Validation: Check for empty brand
    if (!brand || brand.trim() === '') {
      throw new Error('Perfume brand cannot be empty');
    }

    this.id = id;
    this.name = name.trim(); // Clean up whitespace
    this.brand = brand.trim();
    this.notes = notes;
    this.fragranceFamily = fragranceFamily;
    this.year = year;
    this.rating = rating;
    this.dateAdded = new Date();
  }
}

module.exports = { Perfume };