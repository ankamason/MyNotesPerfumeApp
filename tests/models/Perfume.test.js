// tests/models/Perfume.test.js

const { Perfume } = require('../../src/models/Perfume.js');

describe('Perfume Model', () => {
  
  // Test 1
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

  // Test 2 (notice it's at the same indentation level as the first)
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

  // Test 3

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

  // Test 4

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

  // Test 5 | Cross-Family Note Compatibility

  test('should allow citrus notes in non-citrus fragrance families', () => {
    // Arrange: Woody fragrances with bergamot top note
    const woodyWithCitrusTop = new Perfume({
      id: 5,
      name: 'Bergamot & Sandalwood',
      brand: 'Test House',
      notes: {
        top: ['Bergamot', 'Lemon'],    // Citrus notes
        middle: ['Cedar', 'Vertiver'], // Woody notes
        base: ['Sandalwood', 'Musk']   // Woody base
      },
      fragranceFamily: 'Woody'         // Family determined by dominant character

    });
    
    // Act & Assert: Should create successfully
    expect(woodyWithCitrusTop.fragranceFamily).toBe('Woody');
    expect(woodyWithCitrusTop.notes.top).toContain('Bergamot');
    
    // The fragrance family reflects the dominant character, not just top notes
    expect(woodyWithCitrusTop.notes.middle).toContain('Cedar');
    expect(woodyWithCitrusTop.notes.base).toContain('Sandalwood');


  });

  // Test 6 | Multi-Faceted Fragrance Families
  
  test('should handle multi-faceted fragrance classifications', () => {
    // Arrange: Floriental (Floral + Oriental) perfume
    const floriental = new Perfume({
      id: 6,
      name: 'Rose Oud Fantasy',
      brand: 'Multi-Faceted House',
      notes: {
        top: ['Bergamot', 'Pink Pepper'],
        middle: ['Rose', 'Jasmine'],        // Floral
        base: ['Oud', 'Amber', 'Vanilla']   // Oriental
      },
      fragranceFamily: 'Floriental'         // Hybrid classification
    });

    expect(floriental.fragranceFamily).toBe('Floriental');
    expect(floriental.notes.top).toContain('Bergamot');  // Citrus opener
    expect(floriental.notes.middle).toContain('Rose');   // Floral heart
    expect(floriental.notes.base).toContain('Oud');      // Oriental base
  });
    

  // Test 7 |Fragrance Family Independence from Individual Notes
  test('should not automatically determine family from single notes', () => {
    // Arrange: Three different perfumes with the same bergamot note
    const citrusPerfume = new Perfume({
      id: 7,
      name: 'Pure Citrus',
      brand: 'Bright House',
      notes: { top: ['Bergamot', 'Lemon', 'Grapefruit'], middle: ['Neroli'], base: ['White Musk'] },
      fragranceFamily: 'Citrus'
    });
    
    const floralPerfume = new Perfume({
      id: 8, 
      name: 'Garden Party',
      brand: 'Floral House',
      notes: { top: ['Bergamot'], middle: ['Rose', 'Peony', 'Lily'], base: ['White Musk'] },
      fragranceFamily: 'Floral'
    });
    
    const woodyPerfume = new Perfume({
      id: 9,
      name: 'Forest Walk', 
      brand: 'Woody House',
      notes: { top: ['Bergamot'], middle: ['Cedar', 'Pine'], base: ['Sandalwood', 'Patchouli'] },
      fragranceFamily: 'Woody'
    });
    
    // Act & Assert: Same note, different families
    expect(citrusPerfume.fragranceFamily).toBe('Citrus');
    expect(floralPerfume.fragranceFamily).toBe('Floral');
    expect(woodyPerfume.fragranceFamily).toBe('Woody');
    
    // All contain bergamot but belong to different families
    expect(citrusPerfume.notes.top).toContain('Bergamot');
    expect(floralPerfume.notes.top).toContain('Bergamot');
    expect(woodyPerfume.notes.top).toContain('Bergamot');
  });

  // Test 8 | Traditional Top Notes in Middle Positions

  test('should handle traditional top notes used as middle notes', () => {
    // Arrange: Bergamot (traditional top note) used as middle note
    const traditionalTopNoteAsMiddle = new Perfume({
      id: 10,
      name: 'Reversed Bergamot',
      brand: 'Artisan House',
      notes: {
        top: ['Pink Pepper', 'Cardamom'],           // Spicy opening
        middle: ['Bergamot', 'Geranium', 'Lavender'], // Bergamot as HEART note
        base: ['Vetiver', 'Cedarwood', 'Ambergris']   // Woody foundation
      },
      fragranceFamily: 'Aromatic Woody'              // Family determined by overall blend
    });
    
    // Act & Assert: Bergamot in middle position should work
    expect(traditionalTopNoteAsMiddle.notes.middle).toContain('Bergamot');
    expect(traditionalTopNoteAsMiddle.notes.top).not.toContain('Bergamot');
    expect(traditionalTopNoteAsMiddle.fragranceFamily).toBe('Aromatic Woody');
    
    // The fragrance is woody despite citrus presence in heart
    expect(traditionalTopNoteAsMiddle.notes.base).toContain('Vetiver');
    expect(traditionalTopNoteAsMiddle.notes.base).toContain('Cedarwood');
  });
  
  
  // Test 9 | Multiple Note Position Flexibility

  test('should allow flexible note positioning across all levels', () => {
    // Arrange: Notes used in non-traditional positions
    const flexibleComposition = new Perfume({
      id: 11,
      name: 'Composition Libre',
      brand: 'Avant-Garde House',
      notes: {
        top: ['Sandalwood', 'Rose'],              // Traditional base/middle as top
        middle: ['Lemon', 'Bergamot', 'Iris'],    // Traditional top notes as middle  
        base: ['Neroli', 'Jasmine', 'Vanilla']    // Traditional middle notes as base
      },
      fragranceFamily: 'Experimental Floral'
    });
    
    // Act & Assert: Unconventional positioning should be allowed
    expect(flexibleComposition.notes.top).toContain('Sandalwood');     // Wood as opener
    expect(flexibleComposition.notes.top).toContain('Rose');           // Floral as opener
    expect(flexibleComposition.notes.middle).toContain('Lemon');       // Citrus as heart
    expect(flexibleComposition.notes.middle).toContain('Bergamot');    // Citrus as heart
    expect(flexibleComposition.notes.base).toContain('Neroli');        // Floral as base
    expect(flexibleComposition.notes.base).toContain('Jasmine');       // Floral as base
    
    // Family reflects overall artistic vision, not traditional rules
    expect(flexibleComposition.fragranceFamily).toBe('Experimental Floral');
  });

  // Test 10 | Scent Journey Progression

  test('should reflect scent journey where middle notes define character', () => {
    // Arrange: Fragrance where middle notes are the "star"
    const middleDominant = new Perfume({
      id: 12,
      name: 'Heart of the Garden',
      brand: 'Journey House',
      notes: {
        top: ['Bergamot'],                           // Brief citrus intro
        middle: ['Rose', 'Peony', 'Lily of Valley', // Dominant floral heart
                'Jasmine', 'Freesia'],                   
        base: ['White Musk']                         // Subtle foundation
      },
      fragranceFamily: 'Floral'                     // Classification by dominant middle
    });
    
    // Act & Assert: Middle-heavy composition
    expect(middleDominant.notes.top).toHaveLength(1);         // Minimal opening
    expect(middleDominant.notes.middle).toHaveLength(5);      // Rich heart
    expect(middleDominant.notes.base).toHaveLength(1);        // Simple base
    expect(middleDominant.fragranceFamily).toBe('Floral');    // Heart defines family
    
    // Bergamot present but not dominant
    expect(middleDominant.notes.top).toContain('Bergamot');
    expect(middleDominant.notes.middle).toContain('Rose');
  });
  
  
  
}); // ← IMPORTANT: describe block ends here