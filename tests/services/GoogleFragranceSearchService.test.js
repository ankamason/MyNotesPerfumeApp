// tests/services/GoogleFragranceSearchService.test.js

const { GoogleFragranceSearchService } = require('../../src/services/GoogleFragranceSearchService.js');
const { Perfume } = require('../../src/models/Perfume.js');

describe('GoogleFragranceSearchService', () => {
  
  test('should search for perfume by name only', async () => {
    // Arrange: User just knows the perfume name
    const searchQuery = 'Chanel No. 5';
    
    // Act: Search for perfume information
    const results = await GoogleFragranceSearchService.searchPerfume(searchQuery);
    
    // Assert: Should return search results with confidence scores
    expect(results).toBeInstanceOf(Array);
    expect(results[0]).toHaveProperty('name');
    expect(results[0]).toHaveProperty('brand');
    expect(results[0]).toHaveProperty('notes');
    expect(results[0]).toHaveProperty('fragranceFamily');
    expect(results[0]).toHaveProperty('confidence'); // How sure we are this is the right match
    expect(results[0]).toHaveProperty('source'); // Where we got the data
    expect(results[0]).toHaveProperty('year');
  });
  
  test('should search with name and brand for better accuracy', async () => {
    // Arrange: User provides both name and brand
    const searchQuery = {
      name: 'Black Orchid',
      brand: 'Tom Ford'
    };
    
    // Act: Search
    const results = await GoogleFragranceSearchService.searchPerfume(searchQuery);
    
    // Assert: Should have higher confidence with more specific search
    expect(results[0].confidence).toBeGreaterThan(0.8);
    expect(results[0].name).toContain('Black Orchid');
    expect(results[0].brand).toBe('Tom Ford');
  });
  
  // Passing test:

test('should handle multiple potential matches', async () => {
  // Arrange: Search for "Chanel" (should match "Chanel No. 5" and "Coco Mademoiselle")
  const searchQuery = 'Chanel';
  
  // Act: Search
  const results = await GoogleFragranceSearchService.searchPerfume(searchQuery);
  
  // Assert: Should return multiple Chanel perfumes sorted by confidence
  expect(results.length).toBeGreaterThan(1);
  expect(results[0].confidence).toBeGreaterThanOrEqual(results[1].confidence);
  
  // All results should be Chanel perfumes
  results.forEach(result => {
    expect(result.brand).toBe('Chanel');
    expect(result).toHaveProperty('name');
    expect(result).toHaveProperty('notes');
  });
});
    
  
  test('should return empty array for unknown perfumes', async () => {
    // Arrange: Search for non-existent perfume
    const searchQuery = 'This Perfume Definitely Does Not Exist 12345';
    
    // Act: Search
    const results = await GoogleFragranceSearchService.searchPerfume(searchQuery);
    
    // Assert: Should handle gracefully
    expect(results).toEqual([]);
  });
  
  test('should create valid Perfume objects from search results', async () => {
    // Arrange: Search for a known perfume
    const searchQuery = 'Creed Aventus';
    
    // Act: Get results and create Perfume objects
    const results = await GoogleFragranceSearchService.searchPerfume(searchQuery);
    const perfumeData = results[0];
    
    // Assert: Should be able to create a valid Perfume object
    expect(() => new Perfume(perfumeData)).not.toThrow();
    
    const perfume = new Perfume(perfumeData);
    expect(perfume.name).toBe(perfumeData.name);
    expect(perfume.brand).toBe(perfumeData.brand);
    expect(perfume.notes).toEqual(perfumeData.notes);
  });
  
  // Updated test cases for use of comma-separated format:
test('should extract notes from fragrance description text', () => {
  const testCases = [
    {
      text: "Top notes: Bergamot, Lemon, Pink Pepper; Middle notes: Rose, Jasmine; Base notes: Sandalwood, Musk",
      expected: {
        top: ['Bergamot', 'Lemon', 'Pink Pepper'],
        middle: ['Rose', 'Jasmine'],
        base: ['Sandalwood', 'Musk']
      }
    },
    {
      text: "Opens with bergamot, lemon. Heart of rose, jasmine. Dries down to sandalwood, musk.",
      expected: {
        top: ['bergamot', 'lemon'],
        middle: ['rose', 'jasmine'],
        base: ['sandalwood', 'musk']
      }
    }
  ];
  
  testCases.forEach(testCase => {
    const result = GoogleFragranceSearchService.extractNotesFromText(testCase.text);
    expect(result).toEqual(testCase.expected);
  });
});
    
  
  test('should extract fragrance family from description', () => {
    // Arrange: Test different description styles
    const testCases = [
      { text: "This floral fragrance opens with...", expected: 'Floral' },
      { text: "A woody and aromatic composition...", expected: 'Woody' },
      { text: "Fresh citrus notes dominate...", expected: 'Citrus' },
      { text: "Oriental spices and amber...", expected: 'Oriental' }
    ];
    
    testCases.forEach(testCase => {
      // Act: Extract family
      const result = GoogleFragranceSearchService.extractFragranceFamily(testCase.text);
      
      // Assert: Should classify correctly
      expect(result).toBe(testCase.expected);
    });
  });
  
});