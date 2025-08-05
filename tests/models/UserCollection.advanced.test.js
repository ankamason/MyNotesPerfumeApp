// tests/models/UserCollection.advanced.test.js

const { UserCollection } = require('../../src/models/UserCollection.js');
const { Perfume } = require('../../src/models/Perfume.js');
const { NoteClassifier } = require('../../src/data/NoteClassification.js');

describe('UserCollection - Advanced Note Analysis', () => {
  
  test('should analyze subcategory preferences in floral family', () => {
    const collection = new UserCollection();
    
    // Create perfumes with different floral subcategories
    const whiteFlowerPerfume = new Perfume({
      id: 1,
      name: 'Jasmine Intoxication',
      brand: 'White Flower House',
      notes: {
        top: ['Bergamot'],
        middle: ['Jasmine', 'Tuberose', 'Orange Blossom'], // White flowers!
        base: ['Sandalwood']
      },
      fragranceFamily: 'Floral'
    });
    
    const dustyFlowerPerfume = new Perfume({
      id: 2,
      name: 'Violet Dreams',
      brand: 'Dusty House',
      notes: {
        top: ['Lemon'],
        middle: ['Violet', 'Iris', 'Orris'],  // Dusty flowers!
        base: ['Musk']
      },
      fragranceFamily: 'Floral'
    });
    
    const rosyPerfume = new Perfume({
      id: 3,
      name: 'Rose Garden',
      brand: 'Rose House',
      notes: {
        top: ['Pink Pepper'],
        middle: ['Damascus Rose', 'Centifolia Rose'], // Rose varieties!
        base: ['Cedar']
      },
      fragranceFamily: 'Floral'
    });
    
    collection.addPerfume(whiteFlowerPerfume);
    collection.addPerfume(dustyFlowerPerfume);
    collection.addPerfume(rosyPerfume);
    
    // Act: Analyze subcategory preferences
    const subcategoryAnalysis = collection.analyzeSubcategoryPreferences();
    
    // Assert: Should identify floral subcategory preferences
    expect(subcategoryAnalysis.FLORAL).toBeDefined();
    expect(subcategoryAnalysis.FLORAL.WHITE_FLOWERS.count).toBe(2); // Jasmine, Tuberose
    expect(subcategoryAnalysis.FLORAL.DUSTY_FLOWERS.count).toBe(3); // Violet, Iris, Orris
    expect(subcategoryAnalysis.FLORAL.ROSY_NOTES.count).toBe(2);    // Damascus Rose, Centifolia Rose
    
    // Should provide percentage breakdowns
    expect(subcategoryAnalysis.FLORAL.WHITE_FLOWERS.percentage).toBeGreaterThan(0);
  });
  
  test('should identify intensity preferences across collection', () => {
    const collection = new UserCollection();
    
    const highIntensityPerfume = new Perfume({
      id: 4,
      name: 'Intense White Flowers',
      brand: 'Intensity House',
      notes: {
        top: ['Bergamot'],
        middle: ['Jasmine', 'Tuberose'],      // High intensity white flowers
        base: ['Oud', 'Amber']                // High intensity orientals
      },
      fragranceFamily: 'Floral'
    });
    
    const lightIntensityPerfume = new Perfume({
      id: 5,
      name: 'Gentle Breeze',
      brand: 'Light House',
      notes: {
        top: ['Lemon', 'Lime'],               // Light citrus
        middle: ['Lily of the Valley'],       // Light green flower
        base: ['White Musk']                  // Light musk
      },
      fragranceFamily: 'Fresh'
    });
    
    collection.addPerfume(highIntensityPerfume);
    collection.addPerfume(lightIntensityPerfume);
    
    // Act: Analyze intensity profile
    const intensityProfile = collection.getIntensityProfile();
    
    // Assert: Should show intensity distribution
    expect(intensityProfile.High.count).toBeGreaterThan(0);
    expect(intensityProfile.Light.count).toBeGreaterThan(0);
    expect(intensityProfile.dominantIntensity).toBeDefined();
    expect(intensityProfile.description).toContain('intensity');
  });
  
  test('should suggest complementary note subcategories', () => {
    const collection = new UserCollection();
    
    // User loves white flowers
    const whiteFlowerPerfume = new Perfume({
      id: 6,
      name: 'White Flower Paradise',
      brand: 'Floral House',
      notes: {
        top: ['Bergamot'],
        middle: ['Jasmine', 'Orange Blossom', 'Gardenia'],
        base: ['Sandalwood']
      },
      fragranceFamily: 'Floral'
    });
    
    collection.addPerfume(whiteFlowerPerfume);
    
    // Act: Get complementary suggestions
    const suggestions = collection.getComplementarySubcategories();
    
    // Assert: Should suggest complementary subcategories
    expect(suggestions).toContain('DUSTY_FLOWERS');    // Contrast to white flowers
    expect(suggestions).toContain('WARM_WOODS');       // Classic pairing
    expect(suggestions).toContain('SOFT_AMBER');    // Harmonious blend
    expect(suggestions.length).toBeGreaterThan(0);
  });

      // Test to see the 9 families in action
    test('should correctly classify notes into the 9 main fragrance families', () => {
    const { NoteClassifier } = require('../../src/data/NoteClassification.js');
  
  // Test one note from each family
  const testNotes = [
    { note: 'Bergamot', expectedFamily: 'CITRUS' },
    { note: 'Jasmine', expectedFamily: 'FLORAL' },
    { note: 'Strawberry', expectedFamily: 'FRUITY' },
    { note: 'Cinnamon', expectedFamily: 'SPICY' },
    { note: 'Green Leaves', expectedFamily: 'GREEN' },
    { note: 'Sandalwood', expectedFamily: 'WOODY' },
    { note: 'Amber', expectedFamily: 'AMBER_BALSAMIC' },
    { note: 'Chocolate', expectedFamily: 'GOURMAND' },
    { note: 'Sea Salt', expectedFamily: 'MARINE_OZONIC' }
  ];
  
  testNotes.forEach(({ note, expectedFamily }) => {
    const classification = NoteClassifier.classifyNote(note);
    expect(classification.familyKey).toBe(expectedFamily);
    expect(classification.isMainFamily).toBe(true);
  });
  
  // Test the main families list
  const mainFamilies = NoteClassifier.getMainFamilies();
  expect(mainFamilies).toHaveLength(9);
  expect(mainFamilies).toContain('CITRUS');
  expect(mainFamilies).toContain('FRUITY'); // This was missing before!
  expect(mainFamilies).toContain('MARINE_OZONIC');
});

      // Test to verify aldehydes work perfectly
    test('should correctly classify aldehyde notes and their vintage character', () => {
    const { NoteClassifier } = require('../../src/data/NoteClassification.js');
  
  // Test aldehyde classification
  const aldehydeClassification = NoteClassifier.classifyNote('Aldehydes');
  expect(aldehydeClassification.familyKey).toBe('ALDEHYDE');
  expect(aldehydeClassification.subcategoryKey).toBe('FATTY_ALDEHYDES');
  expect(aldehydeClassification.character).toContain('Soapy');
  
  // Test complementary relationships
  const complements = NoteClassifier.getComplementarySubcategories('VINTAGE_ALDEHYDES');
  expect(complements).toContain('WHITE_FLOWERS');  // Classic Chanel No. 5 pairing!
  expect(complements).toContain('ROSY_NOTES');     // Another classic combo
  expect(complements).toContain('SOFT_AMBER');     // Warm, powdery base
  
  // Test that aldehydes are recognized in the full system
  const allFamilies = NoteClassifier.getAllFamilies();
  expect(allFamilies).toContain('ALDEHYDE');
  expect(allFamilies).toHaveLength(11); // 9 main + aldehydes + musks
});

  test('should handle notes that belong to multiple categories', () => {
  const { NoteClassifier } = require('../../src/data/NoteClassification.js');
  
  // Orange Blossom gets classified as the first match (SOPHISTICATED_CITRUS)
  const orangeBlossomClassification = NoteClassifier.classifyNote('Orange Blossom');
  expect(orangeBlossomClassification.familyKey).toBe('CITRUS');
  expect(orangeBlossomClassification.subcategoryKey).toBe('SOPHISTICATED_CITRUS');
  
  // But it also exists in WHITE_FLOWERS notes array
  const whiteFlowerNotes = NoteClassifier.getNotesInSubcategory('FLORAL', 'WHITE_FLOWERS');
  expect(whiteFlowerNotes).toContain('Orange Blossom');
});
  
});