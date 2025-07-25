// tests/models/UserCollection.test.js

const { UserCollection } = require('../../src/models/UserCollection.js');
const { Perfume } = require('../../src/models/Perfume.js');

describe('UserCollection', () => {
  
  // Test 1: Basic collection creation and perfume addition
  test('should create empty collection and add perfumes', () => {
    // Arrange: Create collection and sample perfume
    const collection = new UserCollection();
    const chanel = new Perfume({
      id: 1,
      name: 'Chanel No. 5',
      brand: 'Chanel',
      notes: {
        top: ['Aldehydes', 'Lemon'],
        middle: ['Jasmine', 'Rose'],
        base: ['Sandalwood', 'Vanilla']
      },
      fragranceFamily: 'Floral'
    });
    
    // Act: Add perfume to collection
    collection.addPerfume(chanel);
    
    // Assert: Collection should contain the perfume
    expect(collection.getSize()).toBe(1);
    expect(collection.getAllPerfumes()).toContain(chanel);
    expect(collection.hasPerfume(1)).toBe(true);
  });
 
// Test 2: Prevent duplicate perfumes
  test('should prevent adding duplicate perfumes', () => {
    const collection = new UserCollection();
    const perfume = new Perfume({
      id: 2,
      name: 'Dior Sauvage',
      brand: 'Dior',
      fragranceFamily: 'Fresh Spicy'
    });
    
    // Act: Try to add same perfume twice
    collection.addPerfume(perfume);
    const result = collection.addPerfume(perfume);
    
    // Assert: Should only have one copy
    expect(collection.getSize()).toBe(1);
    expect(result).toBe(false); // Addition should fail
  });

  // Test 3: Remove perfumes from collection
  test('should remove perfumes by ID', () => {
    const collection = new UserCollection();
    const perfume1 = new Perfume({ id: 3, name: 'Test 1', brand: 'Brand A' });
    const perfume2 = new Perfume({ id: 4, name: 'Test 2', brand: 'Brand B' });
    
    collection.addPerfume(perfume1);
    collection.addPerfume(perfume2);
    
    // Act: Remove one perfume
    const removed = collection.removePerfume(3);
    
    // Assert: Should remove correct perfume
    expect(removed).toBe(true);
    expect(collection.getSize()).toBe(1);
    expect(collection.hasPerfume(3)).toBe(false);
    expect(collection.hasPerfume(4)).toBe(true);
  });

  // Test 4: Find perfumes by fragrance family (your domain expertise!)
  test('should find perfumes by fragrance family', () => {
    const collection = new UserCollection();
    
    const floral1 = new Perfume({ id: 5, name: 'Rose Garden', brand: 'House A', fragranceFamily: 'Floral' });
    const floral2 = new Perfume({ id: 6, name: 'Jasmine Dream', brand: 'House B', fragranceFamily: 'Floral' });
    const woody = new Perfume({ id: 7, name: 'Cedar Forest', brand: 'House C', fragranceFamily: 'Woody' });
    
    collection.addPerfume(floral1);
    collection.addPerfume(floral2);
    collection.addPerfume(woody);
    
    // Act: Find florals
    const florals = collection.getPerfumesByFamily('Floral');
    
    // Assert: Should return only floral perfumes
    expect(florals).toHaveLength(2);
    expect(florals).toContain(floral1);
    expect(florals).toContain(floral2);
    expect(florals).not.toContain(woody);
  });

  // Test 5: Complex search by notes (leveraging your note expertise!)
  test('should find perfumes containing specific notes', () => {
    const collection = new UserCollection();
    
    const bergamotPerfume1 = new Perfume({
      id: 8,
      name: 'Citrus Bergamot',
      brand: 'Citrus House',
      notes: { top: ['Bergamot', 'Lemon'], middle: ['Neroli'], base: ['Musk'] },
      fragranceFamily: 'Citrus'
    });
    
    const bergamotPerfume2 = new Perfume({
      id: 9,
      name: 'Woody Bergamot',
      brand: 'Woody House',
      notes: { top: ['Pink Pepper'], middle: ['Bergamot', 'Cedar'], base: ['Sandalwood'] },
      fragranceFamily: 'Woody'
    });
    
    const noBergamot = new Perfume({
      id: 10,
      name: 'Pure Rose',
      brand: 'Floral House',
      notes: { top: ['Rose'], middle: ['Peony'], base: ['Musk'] },
      fragranceFamily: 'Floral'
    });
    
    collection.addPerfume(bergamotPerfume1);
    collection.addPerfume(bergamotPerfume2);
    collection.addPerfume(noBergamot);
    
    // Act: Find all perfumes with bergamot (regardless of position!)
    const bergamotPerfumes = collection.getPerfumesWithNote('Bergamot');
    
    // Assert: Should find bergamot in both citrus and woody families
    expect(bergamotPerfumes).toHaveLength(2);
    expect(bergamotPerfumes).toContain(bergamotPerfume1);
    expect(bergamotPerfumes).toContain(bergamotPerfume2);
    expect(bergamotPerfumes).not.toContain(noBergamot);
  });  

  // Test 6: Identify most popular notes across collection
  test('should identify most popular notes in collection', () => {
    const collection = new UserCollection();
    
    // Arrange: Create perfumes with overlapping notes
    const perfume1 = new Perfume({
      id: 11,
      name: 'Rose Romance',
      brand: 'Floral House',
      notes: {
        top: ['Bergamot', 'Lemon'],           // Bergamot appears
        middle: ['Rose', 'Jasmine'],          // Rose appears  
        base: ['Sandalwood', 'Musk']          // Sandalwood appears
      },
      fragranceFamily: 'Floral'
    });
    
    const perfume2 = new Perfume({
      id: 12,
      name: 'Woody Bergamot',
      brand: 'Woody House', 
      notes: {
        top: ['Bergamot', 'Pink Pepper'],     // Bergamot appears again!
        middle: ['Cedar', 'Vetiver'],
        base: ['Sandalwood', 'Amber']         // Sandalwood appears again!
      },
      fragranceFamily: 'Woody'
    });
    
    const perfume3 = new Perfume({
      id: 13,
      name: 'Oriental Mystery',
      brand: 'Oriental House',
      notes: {
        top: ['Cardamom'],
        middle: ['Rose', 'Oud'],              // Rose appears again!
        base: ['Sandalwood', 'Vanilla']       // Sandalwood appears 3rd time!
      },
      fragranceFamily: 'Oriental'
    });
    
    collection.addPerfume(perfume1);
    collection.addPerfume(perfume2);
    collection.addPerfume(perfume3);
    
    // Act: Get most popular notes
    const popularNotes = collection.getMostPopularNotes();
    
    // Assert: Should identify frequency correctly
    expect(popularNotes[0]).toEqual({ note: 'Sandalwood', count: 3 });  // Most popular
    expect(popularNotes[1]).toEqual({ note: 'Bergamot', count: 2 });    // Second most
    expect(popularNotes[2]).toEqual({ note: 'Rose', count: 2 });        // Also second most
    
    // Should be sorted by frequency (descending)
    expect(popularNotes[0].count).toBeGreaterThanOrEqual(popularNotes[1].count);
    expect(popularNotes[1].count).toBeGreaterThanOrEqual(popularNotes[2].count);
    
    // Should include all unique notes
    const noteNames = popularNotes.map(item => item.note);
    expect(noteNames).toContain('Sandalwood');
    expect(noteNames).toContain('Bergamot');
    expect(noteNames).toContain('Rose');
    expect(noteNames).toContain('Lemon');
    expect(noteNames).toContain('Musk');
  });


  // Test 7: Business Logic: Show fragrance family breakdown with statistics
  test('should show fragrance family breakdown with percentages', () => {
    const collection = new UserCollection();
    
    // Arrange: Create diverse collection (6 perfumes for clean percentages)
    const florals = [
      new Perfume({ id: 14, name: 'Floral 1', brand: 'House A', fragranceFamily: 'Floral' }),
      new Perfume({ id: 15, name: 'Floral 2', brand: 'House B', fragranceFamily: 'Floral' }),
      new Perfume({ id: 16, name: 'Floral 3', brand: 'House C', fragranceFamily: 'Floral' })
    ];
    
    const woody = [
      new Perfume({ id: 17, name: 'Woody 1', brand: 'House D', fragranceFamily: 'Woody' }),
      new Perfume({ id: 18, name: 'Woody 2', brand: 'House E', fragranceFamily: 'Woody' })
    ];
    
    const citrus = [
      new Perfume({ id: 19, name: 'Citrus 1', brand: 'House F', fragranceFamily: 'Citrus' })
    ];
    
    // Add all perfumes to collection
    [...florals, ...woody, ...citrus].forEach(perfume => collection.addPerfume(perfume));
    
    // Act: Get family distribution
    const distribution = collection.getFamilyDistribution();
    
    // Assert: Should calculate counts and percentages correctly
    expect(distribution.total).toBe(6);
    expect(distribution.families).toEqual({
      'Floral': { count: 3, percentage: 50.0 },      // 3/6 = 50%
      'Woody': { count: 2, percentage: 33.33 },      // 2/6 = 33.33%
      'Citrus': { count: 1, percentage: 16.67 }      // 1/6 = 16.67%
    });
    
    // Should be sorted by count (most popular first)
    const sortedFamilies = distribution.sortedByPopularity;
    expect(sortedFamilies[0]).toEqual({ family: 'Floral', count: 3, percentage: 50.0 });
    expect(sortedFamilies[1]).toEqual({ family: 'Woody', count: 2, percentage: 33.33 });
    expect(sortedFamilies[2]).toEqual({ family: 'Citrus', count: 1, percentage: 16.67 });
  });


});

// Test 8: Demonstrate collection intelligence (CLEAN VERSION)
  test('should demonstrate collection intelligence with diverse perfumes', () => {
    const collection = new UserCollection();
    
        // Add a diverse collection to see the intelligence in action
    const perfumes = [
      // Floral perfumes with overlapping notes
      new Perfume({
        id: 20,
        name: 'Rose Garden Supreme', 
        brand: 'Floral House',
        notes: { top: ['Bergamot'], middle: ['Rose', 'Peony'], base: ['Sandalwood', 'Musk'] },
        fragranceFamily: 'Floral'
      }),
      
      new Perfume({
        id: 21,
        name: 'Jasmine Nights',
        brand: 'Romantic House', 
        notes: { top: ['Lemon', 'Bergamot'], middle: ['Jasmine', 'Rose'], base: ['Sandalwood', 'Amber'] },
        fragranceFamily: 'Floral'
      }),
      
      new Perfume({
        id: 22,
        name: 'Garden Party',
        brand: 'Fresh House',
        notes: { top: ['Bergamot', 'Green Leaves'], middle: ['Lily', 'Freesia'], base: ['Musk', 'Cedar'] },
        fragranceFamily: 'Floral'
      }),
      
      // Woody perfumes with some shared notes
      new Perfume({
        id: 23,
        name: 'Sandalwood Dreams',
        brand: 'Woody House',
        notes: { top: ['Bergamot', 'Pink Pepper'], middle: ['Cedar', 'Vetiver'], base: ['Sandalwood', 'Patchouli'] },
        fragranceFamily: 'Woody'
      }),
      
      new Perfume({
        id: 24,
        name: 'Forest Walk',
        brand: 'Nature House',
        notes: { top: ['Pine'], middle: ['Cedar', 'Juniper'], base: ['Sandalwood', 'Moss'] },
        fragranceFamily: 'Woody'
      }),
      
      // Oriental perfumes
      new Perfume({
        id: 25,
        name: 'Spice Market',
        brand: 'Oriental House',
        notes: { top: ['Cardamom'], middle: ['Rose', 'Cinnamon'], base: ['Sandalwood', 'Vanilla', 'Oud'] },
        fragranceFamily: 'Oriental'
      }),
      
      // Citrus perfume
      new Perfume({
        id: 26,
        name: 'Mediterranean Breeze', 
        brand: 'Fresh House',
        notes: { top: ['Bergamot', 'Lemon', 'Grapefruit'], middle: ['Neroli'], base: ['White Musk'] },
        fragranceFamily: 'Citrus'
      })
    ];
    
    // Add all perfumes to collection
    perfumes.forEach(perfume => collection.addPerfume(perfume));
    
    // Act: Get the intelligence data
    const popularNotes = collection.getMostPopularNotes();
    const familyDistribution = collection.getFamilyDistribution();
    
    // Assert: Test the intelligence without console output
    expect(collection.getSize()).toBe(7);
    expect(popularNotes[0].note).toBe('Bergamot');
    expect(popularNotes[0].count).toBe(5);
    expect(popularNotes[1].note).toBe('Sandalwood');
    expect(popularNotes[1].count).toBe(5);
    expect(familyDistribution.sortedByPopularity[0].family).toBe('Floral');
    expect(familyDistribution.total).toBe(7);
    expect(Object.keys(familyDistribution.families).length).toBe(4);
  });



