// src/data/NoteClassification.js
// Complete Perfume Note Classification System - All 11 Families

import { NoteNormalizer } from '../utils/NoteNormalizer.js';

const NOTE_CATEGORIES = {
  // 1. CITRUS FAMILY
  CITRUS: {
    name: 'Citrus',
    subcategories: {
      BRIGHT_CITRUS: {
        name: 'Bright Citrus',
        character: 'Sparkling, energizing, uplifting',
        intensity: 'High',
        notes: [
          'Lemon', 'Lime', 'Grapefruit', 'Yuzu', 'Citron',
          'Meyer Lemon', 'Key Lime', 'Pink Grapefruit', 'White Grapefruit'
        ]
      },
      
      SOPHISTICATED_CITRUS: {
        name: 'Sophisticated Citrus',
        character: 'Complex, refined, sometimes bitter',
        intensity: 'Medium',
        notes: [
          'Bergamot', 'Neroli', 'Petit Grain', 'Orange Blossom',
          'Bitter Orange', 'Earl Grey', 'Bergamot Tea', 'Calabrian Bergamot'
        ]
      },
      
      SWEET_CITRUS: {
        name: 'Sweet Citrus',
        character: 'Juicy, gourmand, playful',
        intensity: 'Medium',
        notes: [
          'Sweet Orange', 'Mandarin', 'Tangerine', 'Clementine',
          'Blood Orange', 'Orange Zest', 'Kumquat', 'Sicilian Orange'
        ]
      }
    }
  },

  // 2. FLORAL FAMILY
  FLORAL: {
    name: 'Floral',
    subcategories: {
      WHITE_FLOWERS: {
        name: 'White Flowers',
        character: 'Intoxicating, creamy, often narcotic',
        intensity: 'High',
        notes: [
          'Jasmine', 'Tuberose', 'Orange Blossom', 'Gardenia', 
          'Ylang Ylang', 'Magnolia', 'Stephanotis', 'White Tea',
          'Lily', 'Freesia', 'Honeysuckle', 'Frangipani'
        ]
      },
      
      ROSY_NOTES: {
        name: 'Rose Varieties',
        character: 'From fresh to jammy, powdery to spicy',
        intensity: 'Medium to High',
        notes: [
          'Damascus Rose', 'Centifolia Rose', 'Bulgarian Rose',
          'Tea Rose', 'Rose Petals', 'Rose Hip', 'Wild Rose',
          'Pink Rose', 'Red Rose', 'White Rose', 'Rose Absolute'
        ]
      },
      
      DUSTY_FLOWERS: {
        name: 'Dusty Flowers',
        character: 'Powdery, soft, sometimes melancholic',
        intensity: 'Low to Medium',
        notes: [
          'Violet', 'Iris', 'Orris', 'Heliotrope', 'Mimosa',
          'Cassie', 'Violet Leaf', 'Sweet Pea', 'Wisteria'
        ]
      },
      
      GREEN_FLOWERS: {
        name: 'Green Flowers',
        character: 'Fresh, dewy, natural',
        intensity: 'Light to Medium',
        notes: [
          'Lily of the Valley', 'Peony', 'Cyclamen', 'Hyacinth',
          'Daffodil', 'Green Rose', 'Peach Blossom', 'Apple Blossom'
        ]
      },
      
      EXOTIC_FLOWERS: {
        name: 'Exotic Flowers',
        character: 'Complex, unusual, often tropical',
        intensity: 'Medium to High',
        notes: [
          'Champaca', 'Frangipani', 'Tiare', 'Sambac Jasmine',
          'Night Blooming Cereus', 'Osmanthus', 'Plumeria'
        ]
      }
    }
  },

  // 3. FRUITY FAMILY
  FRUITY: {
    name: 'Fruity',
    subcategories: {
      STONE_FRUITS: {
        name: 'Stone Fruits',
        character: 'Juicy, soft, summery',
        intensity: 'Medium',
        notes: [
          'Peach', 'Apricot', 'Plum', 'Nectarine', 'Cherry',
          'White Peach', 'Yellow Peach', 'Black Cherry', 'Maraschino Cherry'
        ]
      },
      
      TROPICAL_FRUITS: {
        name: 'Tropical Fruits',
        character: 'Exotic, lush, vacation-like',
        intensity: 'Medium to High',
        notes: [
          'Mango', 'Pineapple', 'Papaya', 'Passion Fruit', 'Coconut',
          'Guava', 'Lychee', 'Dragon Fruit', 'Kiwi'
        ]
      },
      
      BERRIES: {
        name: 'Berries',
        character: 'Tart, sweet, playful',
        intensity: 'Medium',
        notes: [
          'Strawberry', 'Raspberry', 'Blackberry', 'Blueberry', 'Cranberry',
          'Wild Strawberry', 'Black Currant', 'Red Currant', 'Gooseberry'
        ]
      },
      
      CRISP_FRUITS: {
        name: 'Crisp Fruits',
        character: 'Fresh, clean, energizing',
        intensity: 'Light to Medium',
        notes: [
          'Apple', 'Pear', 'Green Apple', 'Red Apple', 'Crisp Pear',
          'Asian Pear', 'Quince', 'Pomegranate'
        ]
      }
    }
  },

  // 4. SPICY FAMILY
  SPICY: {
    name: 'Spicy',
    subcategories: {
      WARM_SPICES: {
        name: 'Warm Spices',
        character: 'Comforting, cozy, enveloping',
        intensity: 'Medium to High',
        notes: [
          'Cinnamon', 'Nutmeg', 'Cloves', 'Allspice', 'Ginger',
          'Cardamom', 'Star Anise', 'Vanilla Spice', 'Cassia'
        ]
      },
      
      HOT_SPICES: {
        name: 'Hot Spices',
        character: 'Fiery, intense, attention-grabbing',
        intensity: 'High',
        notes: [
          'Black Pepper', 'Pink Pepper', 'White Pepper', 'Chili',
          'Cayenne', 'Paprika', 'Red Pepper', 'Szechuan Pepper'
        ]
      },
      
      EXOTIC_SPICES: {
        name: 'Exotic Spices',
        character: 'Complex, mysterious, sophisticated',
        intensity: 'Medium to High',
        notes: [
          'Saffron', 'Turmeric', 'Fenugreek', 'Curry Leaf',
          'Garam Masala', 'Ras el Hanout', 'Baharat', 'Sumac'
        ]
      }
    }
  },

  // 5. GREEN NOTES FAMILY
  GREEN: {
    name: 'Green Notes',
    subcategories: {
      FRESH_GREEN: {
        name: 'Fresh Green',
        character: 'Natural, crisp, outdoorsy',
        intensity: 'Light to Medium',
        notes: [
          'Green Leaves', 'Grass', 'Mint', 'Basil', 'Green Stems',
          'Cut Grass', 'Wet Leaves', 'Spring Air', 'Garden Greens'
        ]
      },
      
      HERBAL_GREEN: {
        name: 'Herbal Green',
        character: 'Aromatic, therapeutic, Mediterranean',
        intensity: 'Medium',
        notes: [
          'Rosemary', 'Thyme', 'Oregano', 'Sage', 'Bay Leaves',
          'Tarragon', 'Herbes de Provence', 'Wild Herbs', 'Lavender'
        ]
      },
      
      FOREST_GREEN: {
        name: 'Forest Green',
        character: 'Deep, woody, mysterious',
        intensity: 'Medium to High',
        notes: [
          'Pine Needles', 'Fern', 'Moss', 'Ivy', 'Forest Floor',
          'Tree Bark', 'Conifer', 'Evergreen', 'Wood Sorrel'
        ]
      }
    }
  },

  // 6. WOODY FAMILY
  WOODY: {
    name: 'Woody',
    subcategories: {
      WARM_WOODS: {
        name: 'Warm Woods',
        character: 'Comforting, enveloping, sensual',
        intensity: 'Medium to High',
        notes: [
          'Sandalwood', 'Cedarwood', 'Rosewood', 'Guaiac Wood',
          'Papyrus', 'Cashmere Wood', 'Blonde Woods'
        ]
      },
      
      DRY_WOODS: {
        name: 'Dry Woods',
        character: 'Austere, modern, minimalist',
        intensity: 'Medium',
        notes: [
          'Cedar', 'Cypress', 'Pine', 'Juniper', 'Hemlock',
          'White Cedar', 'Atlas Cedar', 'Virginia Cedar'
        ]
      },
      
      EXOTIC_WOODS: {
        name: 'Exotic Woods',
        character: 'Rich, complex, mysterious',
        intensity: 'High',
        notes: [
          'Oud', 'Agarwood', 'Ebony', 'Teak', 'Mahogany',
          'Palisander', 'Koa Wood', 'Brazilian Rosewood'
        ]
      },
      
      SMOKY_WOODS: {
        name: 'Smoky Woods',
        character: 'Intense, dramatic, sometimes medicinal',
        intensity: 'High',
        notes: [
          'Birch Tar', 'Burning Wood', 'Charcoal', 'Ash',
          'Smoked Wood', 'Campfire', 'Burnt Cedar'
        ]
      }
    }
  },

  // 7. AMBER AND BALSAMIC FAMILY
  AMBER_BALSAMIC: {
    name: 'Amber and Balsamic',
    subcategories: {
      SOFT_AMBER: {
        name: 'Soft Amber',
        character: 'Powdery, comforting, elegant',
        intensity: 'Medium',
        notes: [
          'Vanilla', 'Benzoin', 'Soft Amber', 'Heliotrope',
          'Tonka Bean', 'Coumarin', 'Powdery Amber', 'Sweet Amber'
        ]
      },
      
      RESINOUS_BALSAMIC: {
        name: 'Resinous Balsamic',
        character: 'Deep, spiritual, meditative',
        intensity: 'High',
        notes: [
          'Frankincense', 'Myrrh', 'Amber', 'Labdanum',
          'Olibanum', 'Elemi', 'Copal', 'Pine Resin', 'Benzoin'
        ]
      },
      
      WARM_BALSAMIC: {
        name: 'Warm Balsamic',
        character: 'Enveloping, rich, luxurious',
        intensity: 'Medium to High',
        notes: [
          'Peru Balsam', 'Tolu Balsam', 'Styrax', 'Opoponax',
          'Liquidambar', 'Balsam Fir', 'Sweet Myrrh'
        ]
      }
    }
  },

  // 8. GOURMAND FAMILY
  GOURMAND: {
    name: 'Gourmand',
    subcategories: {
      SWEET_GOURMAND: {
        name: 'Sweet Gourmand',
        character: 'Dessert-like, comforting, indulgent',
        intensity: 'Medium to High',
        notes: [
          'Chocolate', 'Caramel', 'Honey', 'Praline', 'Cotton Candy',
          'Marshmallow', 'Nougat', 'Toffee', 'Butterscotch'
        ]
      },
      
      BAKERY_GOURMAND: {
        name: 'Bakery Gourmand',
        character: 'Fresh-baked, warm, nostalgic',
        intensity: 'Medium',
        notes: [
          'Bread', 'Croissant', 'Brioche', 'Cake', 'Cookie Dough',
          'Pie Crust', 'Biscuit', 'Pastry', 'Yeast'
        ]
      },
      
      BEVERAGE_GOURMAND: {
        name: 'Beverage Gourmand',
        character: 'Liquid comfort, sophisticated indulgence',
        intensity: 'Medium to High',
        notes: [
          'Coffee', 'Tea', 'Hot Chocolate', 'Rum', 'Cognac',
          'Wine', 'Champagne', 'Whiskey', 'Espresso', 'Chai'
        ]
      }
    }
  },

  // 9. MARINE AND OZONIC FAMILY
  MARINE_OZONIC: {
    name: 'Marine and Ozonic',
    subcategories: {
      MARINE_AQUATIC: {
        name: 'Marine Aquatic',
        character: 'Clean, expansive, oceanic',
        intensity: 'Light to Medium',
        notes: [
          'Sea Salt', 'Ocean Breeze', 'Seaweed', 'Marine Notes',
          'Calone', 'Ambergris', 'Driftwood', 'Sea Spray'
        ]
      },
      
      OZONIC_FRESH: {
        name: 'Ozonic Fresh',
        character: 'Airy, clean, expansive',
        intensity: 'Light',
        notes: [
          'Ozone', 'Fresh Air', 'Rain', 'Petrichor', 'Storm',
          'Ionone', 'Hedione', 'Clean Breeze', 'Mountain Air'
        ]
      },
      
      AQUATIC_FLORAL: {
        name: 'Aquatic Floral',
        character: 'Water lily-like, serene, spa-like',
        intensity: 'Light to Medium',
        notes: [
          'Water Lily', 'Lotus', 'Water Hyacinth', 'Aquatic Rose',
          'Sea Breeze', 'Dewy Florals', 'Water Jasmine'
        ]
      }
    }
  },

  // 10. ALDEHYDE FAMILY
  ALDEHYDE: {
    name: 'Aldehyde',
    subcategories: {
      FATTY_ALDEHYDES: {
        name: 'Fatty Aldehydes',
        character: 'Soapy, waxy, clean, sometimes metallic',
        intensity: 'Medium to High',
        notes: [
          'Aldehydes', 'C-10 Aldehyde', 'C-11 Aldehyde', 'C-12 Aldehyde',
          'Lauric Aldehyde', 'Soapy Aldehydes', 'Waxy Aldehydes', 'Clean Aldehydes'
        ]
      },
      
      AROMATIC_ALDEHYDES: {
        name: 'Aromatic Aldehydes',
        character: 'Powdery, vintage, sophisticated',
        intensity: 'Medium',
        notes: [
          'Benzaldehyde', 'Vanillin', 'Heliotropin', 'Anisaldehyde',
          'Cinnamic Aldehyde', 'Citral', 'Aromatic Aldehydes'
        ]
      },
      
      VINTAGE_ALDEHYDES: {
        name: 'Vintage Aldehydes',
        character: 'Classic, powdery, timeless elegance',
        intensity: 'Medium to High',
        notes: [
          'Chanel No. 5 Aldehydes', 'Vintage Aldehydes', 'Powdery Aldehydes',
          'Classic Aldehydes', 'Golden Age Aldehydes', 'Retro Aldehydes'
        ]
      }
    }
  },

  // 11. MUSK FAMILY
  MUSK: {
    name: 'Musk',
    subcategories: {
      CLEAN_MUSKS: {
        name: 'Clean Musks',
        character: 'Soft, skin-like, intimate',
        intensity: 'Light to Medium',
        notes: [
          'White Musk', 'Cotton Musk', 'Skin Musk',
          'Baby Powder', 'Clean Laundry', 'Soap', 'Fresh Musk'
        ]
      },
      
      SENSUAL_MUSKS: {
        name: 'Sensual Musks',
        character: 'Warm, magnetic, seductive',
        intensity: 'Medium to High',
        notes: [
          'Red Musk', 'Black Musk', 'Deer Musk',
          'Civet', 'Castoreum', 'Ambergris', 'Animal Musk'
        ]
      }
    }
  }
};

// Helper functions for working with the classification system
const NoteClassifier = {
  
  // Get the 11 main fragrance families
  getMainFamilies() {
    return [
      'CITRUS', 'FLORAL', 'FRUITY', 'SPICY', 'GREEN', 
      'WOODY', 'AMBER_BALSAMIC', 'GOURMAND', 'MARINE_OZONIC',
      'MUSK', 'ALDEHYDE'
    ];
  },
  
  // Get all families (including aldehydes and musks)
  getAllFamilies() {
    return [
      'CITRUS', 'FLORAL', 'FRUITY', 'SPICY', 'GREEN', 
      'WOODY', 'AMBER_BALSAMIC', 'GOURMAND', 'MARINE_OZONIC',
      'ALDEHYDE', 'MUSK'
    ];
  },
  
  // Check if a family is one of the main 11
  isMainFamily(familyKey) {
    return this.getMainFamilies().includes(familyKey);
  },
  
  // Find which category and subcategory a note belongs to (with normalization)
  classifyNote(noteName) {
    // Normalize the input note for consistent comparison
    const normalizedInput = NoteNormalizer.normalize(noteName);
    
    for (const [familyKey, family] of Object.entries(NOTE_CATEGORIES)) {
      for (const [subKey, subcategory] of Object.entries(family.subcategories)) {
        if (subcategory.notes.some(note => 
          NoteNormalizer.normalize(note).toLowerCase() === normalizedInput.toLowerCase()
        )) {
          return {
            family: family.name,
            familyKey: familyKey,
            subcategory: subcategory.name,
            subcategoryKey: subKey,
            character: subcategory.character,
            intensity: subcategory.intensity,
            isMainFamily: this.isMainFamily(familyKey)
          };
        }
      }
    }
    return {
      family: 'Unclassified',
      familyKey: 'UNCLASSIFIED',
      subcategory: 'Complex',
      subcategoryKey: 'COMPLEX',
      character: 'Complex character',
      intensity: 'Complex',
      isMainFamily: false
    };
  },

  // Get family distribution focusing on the main 11 families (with normalization)
  getMainFamilyDistribution(notes) {
    const familyCount = {};
    const mainFamilies = this.getMainFamilies();
    
    // Initialize main families
    mainFamilies.forEach(family => {
      familyCount[family] = 0;
    });
    
    // Normalize notes before counting
    const normalizedNotes = NoteNormalizer.normalizeArray(notes);
    
    // Count notes by main family
    normalizedNotes.forEach(note => {
      const classification = this.classifyNote(note);
      if (classification.isMainFamily) {
        familyCount[classification.familyKey]++;
      }
    });
    
    return familyCount;
  },

  // Get all notes in a specific subcategory (returns normalized notes)
  getNotesInSubcategory(familyKey, subcategoryKey) {
    const notes = NOTE_CATEGORIES[familyKey]?.subcategories[subcategoryKey]?.notes || [];
    return NoteNormalizer.normalizeArray(notes);
  },

  // Find related notes (same subcategory) with normalization
  findRelatedNotes(noteName) {
    const normalizedInput = NoteNormalizer.normalize(noteName);
    const classification = this.classifyNote(normalizedInput);
    
    if (classification.familyKey === 'UNCLASSIFIED') return [];
    
    return this.getNotesInSubcategory(
      classification.familyKey, 
      classification.subcategoryKey
    ).filter(note => note.toLowerCase() !== normalizedInput.toLowerCase());
  },

  // Get all subcategories for a family
  getSubcategoriesForFamily(familyKey) {
    return NOTE_CATEGORIES[familyKey]?.subcategories || {};
  },

  // Analyze intensity distribution of notes (with normalization)
  analyzeIntensityProfile(notes) {
    const intensityCount = { 'Light': 0, 'Medium': 0, 'High': 0, 'Complex': 0 };
    
    // Normalize notes before analysis
    const normalizedNotes = NoteNormalizer.normalizeArray(notes);
    
    normalizedNotes.forEach(note => {
      const classification = this.classifyNote(note);
      const intensity = classification.intensity.split(' ')[0]; // Handle "Light to Medium"
      intensityCount[intensity] = (intensityCount[intensity] || 0) + 1;
    });
    
    return intensityCount;
  },

  // Find complementary subcategories based on perfumery principles
  getComplementarySubcategories(subcategoryKey) {
    const complements = {
      // Floral complements
      'WHITE_FLOWERS': ['WARM_WOODS', 'SOFT_AMBER', 'CLEAN_MUSKS', 'VINTAGE_ALDEHYDES'],
      'DUSTY_FLOWERS': ['SOPHISTICATED_CITRUS', 'RESINOUS_BALSAMIC', 'FOREST_GREEN'],
      'ROSY_NOTES': ['WARM_SPICES', 'WARM_WOODS', 'SWEET_GOURMAND', 'FATTY_ALDEHYDES'],
      
      // Citrus complements
      'BRIGHT_CITRUS': ['HERBAL_GREEN', 'MARINE_AQUATIC', 'CLEAN_MUSKS'],
      'SOPHISTICATED_CITRUS': ['WARM_WOODS', 'DUSTY_FLOWERS', 'WARM_SPICES'],
      
      // Fruity complements
      'TROPICAL_FRUITS': ['MARINE_OZONIC', 'FRESH_GREEN', 'SWEET_GOURMAND'],
      'BERRIES': ['SWEET_GOURMAND', 'SOFT_AMBER', 'CRISP_FRUITS'],
      
      // Spicy complements
      'WARM_SPICES': ['ROSY_NOTES', 'WARM_WOODS', 'RESINOUS_BALSAMIC'],
      'HOT_SPICES': ['SWEET_CITRUS', 'WOODY', 'AMBER_BALSAMIC'],
      
      // Green complements
      'FRESH_GREEN': ['BRIGHT_CITRUS', 'MARINE_AQUATIC', 'CRISP_FRUITS'],
      'HERBAL_GREEN': ['SOPHISTICATED_CITRUS', 'WARM_WOODS', 'MEDITERRANEAN_HERBS'],
      
      // Woody complements
      'WARM_WOODS': ['WHITE_FLOWERS', 'WARM_SPICES', 'SOFT_AMBER'],
      'DRY_WOODS': ['BRIGHT_CITRUS', 'FRESH_GREEN', 'OZONIC_FRESH'],
      
      // Amber/Balsamic complements
      'SOFT_AMBER': ['WHITE_FLOWERS', 'SWEET_GOURMAND', 'CLEAN_MUSKS'],
      'RESINOUS_BALSAMIC': ['EXOTIC_SPICES', 'DUSTY_FLOWERS', 'WARM_WOODS'],
      
      // Gourmand complements
      'SWEET_GOURMAND': ['SOFT_AMBER', 'BERRIES', 'WARM_SPICES'],
      'BEVERAGE_GOURMAND': ['WARM_SPICES', 'RESINOUS_BALSAMIC', 'DRY_WOODS'],
      
      // Marine/Ozonic complements
      'MARINE_AQUATIC': ['BRIGHT_CITRUS', 'FRESH_GREEN', 'AQUATIC_FLORAL'],
      'OZONIC_FRESH': ['DRY_WOODS', 'CLEAN_MUSKS', 'CRISP_FRUITS'],
      
      // Aldehyde complements (the classics!)
      'FATTY_ALDEHYDES': ['ROSY_NOTES', 'WHITE_FLOWERS', 'SOFT_AMBER'],
      'AROMATIC_ALDEHYDES': ['DUSTY_FLOWERS', 'WARM_WOODS', 'VINTAGE_ALDEHYDES'],
      'VINTAGE_ALDEHYDES': ['WHITE_FLOWERS', 'ROSY_NOTES', 'SOFT_AMBER', 'CLEAN_MUSKS'],
      
      // Musk complements
      'CLEAN_MUSKS': ['WHITE_FLOWERS', 'SOFT_AMBER', 'OZONIC_FRESH'],
      'SENSUAL_MUSKS': ['WARM_WOODS', 'RESINOUS_BALSAMIC', 'SPICY']
    };

    return complements[subcategoryKey] || [];
  },

  // Get a summary of all families with descriptions
  getMainFamilySummary() {
    return {
      // The Essential 11 Fragrance Families
      CITRUS: 'Bright, fresh, energizing - the sparkling opening of many perfumes',
      FLORAL: 'Romantic, feminine, diverse - from delicate to intoxicating',
      FRUITY: 'Juicy, playful, modern - adding sweetness and vitality',
      SPICY: 'Warm, exotic, complex - bringing heat and sophistication',
      GREEN: 'Natural, crisp, outdoorsy - evoking gardens and forests',
      WOODY: 'Warm, grounding, elegant - providing depth and structure',
      AMBER_BALSAMIC: 'Rich, resinous, spiritual - adding warmth and luxury',
      GOURMAND: 'Edible, comforting, indulgent - like dessert in a bottle',
      MARINE_OZONIC: 'Clean, airy, expansive - bringing freshness and space',
      ALDEHYDE: 'Soapy, powdery, vintage elegance - the signature of classic perfumery',
      MUSK: 'Skin-like, intimate, foundational - the invisible embrace'
    };
  },

  // Utility: Normalize all notes in the NOTE_CATEGORIES (one-time cleanup)
  normalizeAllCategoryNotes() {
    let updatedCount = 0;
    
    Object.keys(NOTE_CATEGORIES).forEach(familyKey => {
      Object.keys(NOTE_CATEGORIES[familyKey].subcategories).forEach(subcategoryKey => {
        const originalNotes = NOTE_CATEGORIES[familyKey].subcategories[subcategoryKey].notes;
        const normalizedNotes = NoteNormalizer.normalizeArray(originalNotes);
        
        // Check if any notes were actually changed
        const changed = originalNotes.some((note, index) => 
          note !== normalizedNotes[index]
        );
        
        if (changed) {
          NOTE_CATEGORIES[familyKey].subcategories[subcategoryKey].notes = normalizedNotes;
          updatedCount++;
        }
      });
    });
    
    return {
      updatedSubcategories: updatedCount,
      message: `Normalized notes in ${updatedCount} subcategories`
    };
  },

  // Utility: Check if all notes in categories are properly normalized
  validateCategoryNormalization() {
    const issues = [];
    
    Object.entries(NOTE_CATEGORIES).forEach(([familyKey, family]) => {
      Object.entries(family.subcategories).forEach(([subcategoryKey, subcategory]) => {
        subcategory.notes.forEach((note, noteIndex) => {
          if (!NoteNormalizer.isProperlyFormatted(note)) {
            issues.push({
              family: familyKey,
              subcategory: subcategoryKey,
              noteIndex: noteIndex,
              currentNote: note,
              suggestedNote: NoteNormalizer.normalize(note)
            });
          }
        });
      });
    });
    
    return {
      isValid: issues.length === 0,
      issues: issues,
      message: issues.length === 0 
        ? 'All category notes are properly normalized' 
        : `Found ${issues.length} notes that need normalization`
    };
  }
};

export { NOTE_CATEGORIES, NoteClassifier };