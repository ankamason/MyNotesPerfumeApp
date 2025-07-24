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
    this.id = id;
    this.name = name;
    this.brand = brand;
    this.notes = notes;
    this.fragranceFamily = fragranceFamily;
    this.year = year;
    this.rating = rating;
    this.dateAdded = new Date();
  }
}

// CommonJS export
module.exports = { Perfume };