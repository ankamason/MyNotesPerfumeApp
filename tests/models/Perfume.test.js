// tests/models/Perfume.test.js

// CommonJS import
const { Perfume } = require('../../src/models/Perfume.js');

describe('Perfume Model', () => {
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
  });
});