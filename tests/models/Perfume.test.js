// tests/models/Perfume.test.js

const { Perfume } = require('../../src/models/Perfume.js');

describe('Perfume Model', () => {
  
  // FIRST TEST
  test('should create a perfume with basic properties', () => {
    // Arrange: Set up test data
    const perfumeData = {
      id: 1,
      name: 'Chanel No. 5',
      brand: 'Chanel',
      notes: {
        top: ['Aldehydes', 'Lemon'],
        middle: ['Jasmine', 'Rose'],
        base: ['Sandalwood', 'Vanilla']
      },
      fragranceFamily: 'Floral',
      year: 1921
    };
    
    // Act: Create the perfume
    const perfume = new Perfume(perfumeData);
    
    // Assert: Check that it was created correctly
    expect(perfume.id).toBe(1);
    expect(perfume.name).toBe('Chanel No. 5');
    expect(perfume.brand).toBe('Chanel');
    expect(perfume.fragranceFamily).toBe('Floral');
    expect(perfume.year).toBe(1921);
    expect(perfume.notes.top).toContain('Aldehydes');
    expect(perfume.notes.middle).toContain('Jasmine');
    expect(perfume.notes.base).toContain('Sandalwood');
  }); // ← IMPORTANT: First test ends here

  // SECOND TEST (notice it's at the same indentation level as the first)
  test('should create perfume with default values when optional properties are missing', () => {
    // Arrange: Create minimal data (only required fields)
    const minimalData = {
      id: 2,
      name: 'Simple Perfume',
      brand: 'Test Brand'
    };
    
    // Act: Create perfume with minimal data
    const perfume = new Perfume(minimalData);
    
    // Assert: Check that defaults are applied correctly
    expect(perfume.id).toBe(2);
    expect(perfume.name).toBe('Simple Perfume');
    expect(perfume.brand).toBe('Test Brand');
    
    // Check default values
    expect(perfume.notes).toEqual({ top: [], middle: [], base: [] });
    expect(perfume.rating).toBe(null);
    expect(perfume.fragranceFamily).toBeUndefined();
    expect(perfume.year).toBeUndefined();
    
    // Check auto-generated timestamp
    expect(perfume.dateAdded).toBeInstanceOf(Date);
  }); // ← IMPORTANT: Second test ends here

  // THIRD TEST

  test('should validate that perfume name is not empty', () => {
    // Arrange: Create data with empty name
    const invalidData = {
      id: 3,
      name: '',  // Empty name should be invalid
      brand: 'Some Brand'
    };
  // Act & Assert: Creating perfume with empty name should throw an error

    expect(() => {
      new Perfume(invalidData);
    }).toThrow('Perfume name cannot be empty');
   });

  // FOURTH TEST

  test('should validate that perfume brand is not empty', () => {
    const invalidData = {
      id: 4,
      name: 'Valid Name',
      brand: '   '  // Whitespace-only brand should be invalid
    };

    expect(() => {
      new Perfume(invalidData);
    }).toThrow('Perfume brand cannot be empty');
  });    
    
}); // ← IMPORTANT: describe block ends here