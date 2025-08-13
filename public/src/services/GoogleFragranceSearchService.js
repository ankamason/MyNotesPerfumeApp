// src/services/GoogleFragranceSearchService.js - Complete & Working Version

import { NoteClassifier } from '../data/NoteClassification.js';
import { NoteNormalizer } from '../utils/NoteNormalizer.js';

class GoogleFragranceSearchService {
  
  // 🎯 Comprehensive Mock Database - The AI's Knowledge Base
  static mockFragranceDatabase = [
      
    ///CHANEL PERFUMES///
   {
    id: 'chanel-no-5-parfum',
    name: 'N°5 Parfum',
    brand: 'Chanel',
    notes: {
      top: ['Aldehydes', 'Ylang-Ylang', 'Neroli', 'Bergamot', 'Lemon'],
      middle: ['Iris', 'Jasmine', 'Rose', 'Orris Root', 'Lily-of-the-Valley'],
      base: ['Civet', 'Musk', 'Sandalwood', 'Amber', 'Moss', 'Vanilla', 'Vetiver', 'Patchouli']
    },
    fragranceFamily: 'Floral Aldehyde',
    year: 1921,
    source: 'fragrantica.com',
    description: 'The legendary floral-aldehyde masterpiece by Ernest Beaux. The first perfume in the floral-aldehyde group with unprecedented use of aldehydes.',
    confidence: 1.0,
    perfumer: 'Ernest Beaux'
  },
  {
    id: 'chanel-no-5-eau-de-parfum',
    name: 'N°5 Eau de Parfum',
    brand: 'Chanel',
    notes: {
      top: ['Aldehydes', 'Ylang-Ylang', 'Neroli', 'Bergamot', 'Peach'],
      middle: ['Iris', 'Jasmine', 'Rose', 'Lily-of-the-Valley'],
      base: ['Sandalwood', 'Oakmoss', 'Vanilla', 'Patchouli', 'Vetiver']
    },
    fragranceFamily: 'Floral Aldehyde',
    year: 1986,
    source: 'fragrantica.com',
    description: 'Jacques Polge\'s 1986 interpretation of the iconic original fragrance, fuller and more voluminous.',
    confidence: 1.0,
    perfumer: 'Jacques Polge'
  },
  {
    id: 'chanel-no-5-leau',
    name: 'N°5 L\'Eau',
    brand: 'Chanel',
    notes: {
      top: ['Aldehydes', 'Lemon', 'Neroli', 'Bergamot', 'Mandarin Orange', 'Lime', 'Orange'],
      middle: ['Ylang-Ylang', 'Jasmine', 'May Rose'],
      base: ['White Musk', 'Orris Root', 'Cedar', 'Vanilla']
    },
    fragranceFamily: 'Floral Aldehyde',
    year: 2016,
    source: 'fragrantica.com',
    description: 'A light and fresh interpretation aimed at younger, millennial audience. Features prominent May rose from Grasse.',
    confidence: 1.0,
    perfumer: 'Olivier Polge'
  },
  {
    id: 'bleu-de-chanel-eau-de-toilette',
    name: 'Bleu de Chanel Eau de Toilette',
    brand: 'Chanel',
    notes: {
      top: ['Grapefruit', 'Lemon', 'Mint', 'Pink Pepper'],
      middle: ['Ginger', 'Nutmeg', 'Jasmine', 'Iso E Super'],
      base: ['Incense', 'Vetiver', 'Cedar', 'Sandalwood', 'Patchouli', 'Labdanum', 'White Musk']
    },
    fragranceFamily: 'Woody Aromatic',
    year: 2010,
    source: 'fragrantica.com',
    description: 'A sophisticated woody aromatic fragrance representing the colour of freedom. Fresh citrus opening with aromatic herbs.',
    confidence: 1.0,
    perfumer: 'Jacques Polge'
  },

  {
    id: 'bleu-de-chanel-eau-de-parfum',
    name: 'Bleu de Chanel Eau de Parfum',
    brand: 'Chanel',
    notes: {
      top: ['Grapefruit', 'Lemon', 'Bergamot', 'Mint'],
      middle: ['Ginger', 'Jasmine', 'Incense', 'Nutmeg'],
      base: ['Sandalwood', 'Cedar', 'Amber', 'Patchouli', 'Labdanum']
    },
    fragranceFamily: 'Woody Aromatic',
    year: 2014,
    source: 'fragrantica.com',
    description: 'Enhanced version with deeper amber-woody characteristics. More sensual and oriental than the EDT.',
    confidence: 1.0,
    perfumer: 'Jacques Polge'
  },
  {
    id: 'bleu-de-chanel-parfum',
    name: 'Bleu de Chanel Parfum',
    brand: 'Chanel',
    notes: {
      top: ['Citrus Zest', 'Lemon', 'Bergamot'],
      middle: ['Lavender', 'Geranium', 'Green Notes'],
      base: ['Sandalwood', 'Cedar', 'Amber', 'Iso E Super', 'Tonka Bean']
    },
    fragranceFamily: 'Woody Aromatic',
    year: 2018,
    source: 'fragrantica.com',
    description: 'The most intense variant with emphasis on woody notes. Creamy sandalwood and dry cedar create a warm, refined trail.',
    confidence: 1.0,
    perfumer: 'Olivier Polge'
  },
  {
    id: 'coco-mademoiselle-eau-de-parfum',
    name: 'Coco Mademoiselle Eau de Parfum',
    brand: 'Chanel',
    notes: {
      top: ['Orange', 'Mandarin Orange', 'Bergamot', 'Orange Blossom'],
      middle: ['Turkish Rose', 'Jasmine', 'Mimosa', 'Ylang-Ylang'],
      base: ['Patchouli', 'White Musk', 'Vanilla', 'Vetiver', 'Tonka Bean', 'Opoponax']
    },
    fragranceFamily: 'Oriental Floral',
    year: 2001,
    source: 'fragrantica.com',
    description: 'A modern Oriental Floral capturing the spirit of young Coco Chanel. Fresh citrus opening with sophisticated patchouli base.',
    confidence: 1.0,
    perfumer: 'Jacques Polge'
  },

  {
    id: 'coco-mademoiselle-eau-de-toilette',
    name: 'Coco Mademoiselle Eau de Toilette',
    brand: 'Chanel',
    notes: {
      top: ['Orange', 'Bergamot', 'Grapefruit'],
      middle: ['Litchi', 'Rose', 'Italian Jasmine'],
      base: ['Patchouli', 'Tahitian Vetiver', 'Bourbon Vanilla', 'White Musk']
    },
    fragranceFamily: 'Oriental Floral',
    year: 2002,
    source: 'fragrantica.com',
    description: 'Lighter and sweeter version with cooling citrus freshness and sparkling litchi for fruity brightness.',
    confidence: 1.0,
    perfumer: 'Jacques Polge'
  },

  {
    id: 'coco-mademoiselle-parfum',
    name: 'Coco Mademoiselle Parfum',
    brand: 'Chanel',
    notes: {
      top: ['Bergamot', 'Orange', 'Grapefruit'],
      middle: ['Rose', 'Litchi', 'Jasmine'],
      base: ['Patchouli', 'Vanilla', 'Musk', 'Vetiver']
    },
    fragranceFamily: 'Oriental Floral',
    year: 2001,
    source: 'fragrantica.com',
    description: 'The pure perfume essence with richer composition focused on jasmine absolute and May rose absolute.',
    confidence: 1.0,
    perfumer: 'Jacques Polge'
  },

  {
    id: 'coco-mademoiselle-leau-privee',
    name: 'Coco Mademoiselle L\'Eau Privée',
    brand: 'Chanel',
    notes: {
      top: ['Mandarin Orange'],
      middle: ['Rose', 'Jasmine'],
      base: ['White Musk']
    },
    fragranceFamily: 'Oriental Floral',
    year: 2020,
    source: 'fragrantica.com',
    description: 'A light oriental "night scent" designed for intimate wearing in bed. Watercolor version of Coco Mademoiselle.',
    confidence: 1.0,
    perfumer: 'Olivier Polge'
  },

  {
    id: 'gabrielle-chanel',
    name: 'Gabrielle',
    brand: 'Chanel',
    notes: {
      top: ['Grapefruit', 'Mandarin Orange', 'Black Currant'],
      middle: ['Orange Blossom', 'Jasmine', 'Ylang-Ylang', 'Tuberose', 'Lily-of-the-Valley', 'Pear'],
      base: ['White Musk', 'Sandalwood', 'Cashmeran']
    },
    fragranceFamily: 'Floral',
    year: 2017,
    source: 'fragrantica.com',
    description: 'An imaginary flower - radiant and sparkling feminine Chanel blossom. Clean, fresh, and purely feminine scent.',
    confidence: 1.0,
    perfumer: 'Olivier Polge'
  },

  {
    id: 'chance-eau-de-parfum',
    name: 'Chance Eau de Parfum',
    brand: 'Chanel',
    notes: {
      top: ['Pink Pepper', 'Lemon', 'Pineapple'],
      middle: ['Jasmine', 'Rose', 'Iris'],
      base: ['Patchouli', 'Vanilla', 'Vetiver', 'White Musk', 'Amber']
    },
    fragranceFamily: 'Chypre Floral',
    year: 2005,
    source: 'fragrantica.com',
    description: 'Classic Chanel scent with distinctive pink pepper and patchouli. More serious and formal than the EDT version.',
    confidence: 1.0,
    perfumer: 'Jacques Polge'
  },

  {
    id: 'chance-eau-splendide',
    name: 'Chance Eau Splendide',
    brand: 'Chanel',
    notes: {
      top: ['Raspberry'],
      middle: ['Rose Geranium', 'Iris'],
      base: ['Cedar', 'White Musk']
    },
    fragranceFamily: 'Floral Fruity',
    year: 2025,
    source: 'fragrantica.com',
    description: 'A radiant and magnetic scent with vibrant raspberry accord and exclusive rose geranium from Chanel\'s Grasse fields.',
    confidence: 1.0,
    perfumer: 'Olivier Polge'
  },

  {
    id: 'coco-eau-de-parfum',
    name: 'Coco Eau de Parfum',
    brand: 'Chanel',
    notes: {
      top: ['Bulgarian Rose', 'Coriander', 'Peach', 'Jasmine', 'Mandarin Orange'],
      middle: ['Cloves', 'Rose', 'Orange Blossom', 'Mimosa', 'Clover'],
      base: ['Amber', 'Sandalwood', 'Tonka Bean', 'Opoponax', 'Civet', 'Vanilla', 'Labdanum']
    },
    fragranceFamily: 'Oriental Spicy',
    year: 1984,
    source: 'fragrantica.com',
    description: 'An opulent, elegant and sophisticated fragrance for mature women. Rich, bold, and sensual with luxury appeal.',
    confidence: 1.0,
    perfumer: 'Jacques Polge'
  },
    {
    id: 'comete-chanel',
    name: 'Comète',
    brand: 'Chanel',
    notes: {
      top: ['Cherry Blossom', 'Aldehydes'],
      middle: ['Heliotrope', 'Iris'],
      base: ['White Musk']
    },
    fragranceFamily: 'Floral',
    year: 2024,
    source: 'fragrantica.com',
    description: 'Inspired by stardust and comet symbolism. Intensely floral and luminous with cherry blossoms and heliotrope.',
    confidence: 1.0,
    perfumer: 'Olivier Polge'
  },
 
  ///Hermès Perfumes///
  
  {
    id: 'hermes-terre-dhermes',
    name: 'Terre d\'Hermès',
    brand: 'Hermès',
    notes: {
      top: ['Orange', 'Grapefruit'],
      middle: ['Pepper', 'Pelargonium', 'Flint'],
      base: ['Vetiver', 'Cedar', 'Patchouli', 'Benzoin']
    },
    fragranceFamily: 'Woody Spicy',
    year: 2006,
    source: 'fragrantica.com',
    description: 'A metaphor for materials, a matrix that speaks of territory as well as matter, earth, and roots. This vertically structured scent is based on an alchemy of wood, introducing the gaiety of orange, the bitterness of grapefruit and the vivacity of pepper and fresh spices. Winner of FiFi Award Fragrance Of The Year Men\'s Luxe 2007.',
    confidence: 1.0,
    perfumer: 'Jean-Claude Ellena'
  },
  
  {
    id: 'hermes-terre-dhermes-parfum',
    name: 'Terre d\'Hermès Parfum',
    brand: 'Hermès',
    notes: {
      top: ['Orange', 'Grapefruit'],
      middle: ['Flint'],
      base: ['Woody Notes', 'Oak Moss', 'Benzoin']
    },
    fragranceFamily: 'Woody Chypre',
    year: 2009,
    source: 'fragrantica.com',
    description: 'A more intense and refined interpretation of the classic Terre d\'Hermès. It maintains the sophisticated DNA of the original version, but with a denser, warmer and more resinously woody structure — making it an even more contemplative and mature olfactory work.',
    confidence: 1.0,
    perfumer: 'Jean-Claude Ellena'
  },

  {
    id: 'hermes-h24',
    name: 'H24',
    brand: 'Hermès',
    notes: {
      top: ['Clary Sage'],
      middle: ['Narcissus'],
      base: ['Rosewood', 'Sclarene']
    },
    fragranceFamily: 'Aromatic Green',
    year: 2021,
    source: 'fragrantica.com',
    description: 'A high-tech fougère fragrance that bridges tradition and modernity, nature and technology. H stands for Hermès, Homme and Hours, while 24 references the House\'s flagship address. Features the synthetic molecule sclarene that evokes warm metallic steam from an iron.',
    confidence: 1.0,
    perfumer: 'Christine Nagel'
  },

  {
    id: 'hermes-h24-eau-de-parfum',
    name: 'H24 Eau de Parfum',
    brand: 'Hermès',
    notes: {
      top: ['Clary Sage'],
      middle: ['Narcissus', 'Oak Moss'],
      base: ['Sclarene', 'Brazilian Rosewood']
    },
    fragranceFamily: 'Woody',
    year: 2022,
    source: 'fragrantica.com',
    description: 'The concept remains the same as the original H24 but with reinforced intensity. Christine Nagel emphasizes the vegetal element which, unlike the woody element, is more malleable and fluid. A modern masculine chypre with metallic and professional elegance.',
    confidence: 1.0,
    perfumer: 'Christine Nagel'
  },

  {
    id: 'hermes-h24-herbes-vives',
    name: 'H24 Herbes Vives',
    brand: 'Hermès',
    notes: {
      top: ['Herbal Notes'],
      middle: ['Pear'],
      base: ['Physcool®']
    },
    fragranceFamily: 'Aromatic Green',
    year: 2024,
    source: 'fragrantica.com',
    description: 'The third part of the H24 line that transcribes rediscovered urban nature after a rain shower. Combines the power of a fresh herbal bouquet with the texture of pear granita and the liveliness of the high-tech molecule Physcool®.',
    confidence: 1.0,
    perfumer: 'Christine Nagel'
  },

  {
    id: 'hermes-barenia',
    name: 'Barénia',
    brand: 'Hermès',
    notes: {
      top: ['Miracle Berry', 'Bergamot'],
      middle: ['White Ginger Lily'],
      base: ['Patchouli', 'Akigalawood', 'Oak']
    },
    fragranceFamily: 'Chypre',
    year: 2024,
    source: 'fragrantica.com',
    description: 'Hermès\' first-ever chypre fragrance, inspired by the rare Barénia calfskin leather. Combines the intoxicating lily with delicate berry, enveloped in oak and deep patchouli notes. Expresses the personality of an instinctive and fascinating woman, embodying freedom.',
    confidence: 1.0,
    perfumer: 'Christine Nagel'
  },

  {
    id: 'hermes-terre-dhermes-eau-givree',
    name: 'Terre d\'Hermès Eau Givrée',
    brand: 'Hermès',
    notes: {
      top: ['Citron'],
      middle: ['Juniper Berries', 'Timur'],
      base: ['Mineral Notes', 'Woody Notes']
    },
    fragranceFamily: 'Citrus Aromatic',
    year: 2022,
    source: 'fragrantica.com',
    description: 'A fresh interpretation of the Terre d\'Hermès DNA with ice-cold photorealistic citrus supported by juniper and pepper with a woody, mineral base. Sharp, clean, fresh, and more modern than the original with an edgier character.',
    confidence: 1.0,
    perfumer: 'Christine Nagel'
  },

  {
    id: 'hermes-terre-dhermes-intense',
    name: 'Terre d\'Hermès Intense',
    brand: 'Hermès',
    notes: {
      top: ['Bergamot', 'Black Pepper'],
      middle: ['Coffee', 'Licorice'],
      base: ['Woody Notes', 'Lava', 'Stone']
    },
    fragranceFamily: 'Woody Spicy',
    year: 2025,
    source: 'fragrantica.com',
    description: 'The newest addition to the Terre line that opens with a lovely coffee note then seamlessly transitions into the classic Terre d\'Hermès DNA. Like standing on the edge of a volcano crater - dark, exotic, and borderline niche with polarizing character.',
    confidence: 1.0,
    perfumer: 'Christine Nagel'
  },

  {
    id: 'hermes-eau-dhermes',
    name: 'Eau d\'Hermès',
    brand: 'Hermès',
    notes: {
      top: ['Citrus', 'Coriander', 'Cumin'],
      middle: ['Spicy Notes', 'Cinnamon'],
      base: ['Leather', 'Myrrh', 'Resins']
    },
    fragranceFamily: 'Leather Spicy',
    year: 1951,
    source: 'fragrantica.com',
    description: 'The first perfume created by Hermès, composed by the legendary Edmond Roudnitska. Inspired by the interior of a Hermès bag with a note of fine leather, wrapped in slightly spicy citrus. A spicy, floral hesperidian theme with raw, carnal animalic nature.',
    confidence: 1.0,
    perfumer: 'Edmond Roudnitska'
  },

  {
    id: 'hermes-parfum-dhermes',
    name: 'Parfum d\'Hermès',
    brand: 'Hermès',
    notes: {
      top: ['Aldehydes', 'Galbanum', 'Hyacinth'],
      middle: ['Rose', 'Jasmine', 'Ylang-Ylang', 'Iris'],
      base: ['Oakmoss', 'Myrrh', 'Resins', 'Benzoin']
    },
    fragranceFamily: 'Floral Aldehyde',
    year: 1984,
    source: 'fragrantica.com',
    description: 'Created by Akiko Kamei and Raymond Chaillan, later renamed Rouge Hermès in 2000. A hybrid oriental chypre with powdery, sweet iris reminiscent of candied violets. Features aldehydes, rose, jasmine, and a sophisticated incense-amber drydown.',
    confidence: 1.0,
    perfumer: 'Akiko Kamei, Raymond Chaillan'
  },

    //ROJA DOVE PERFUMES///

    {
    id: 'elysium-pour-homme-parfum-cologne-roja-dove',
    name: 'Elysium Pour Homme Parfum Cologne',
    brand: 'Roja Dove',
    notes: {
      top: ['Grapefruit', 'Lemon', 'Bergamot', 'Lime', 'Thyme', 'Artemisia', 'Galbanum'],
      middle: ['Vetiver', 'Juniper Berries', 'Black Currant', 'Apple', 'Cedar', 'Pink Pepper', 'Cypriol Oil', 'Lily-of-the-Valley', 'Jasmine', 'Rose'],
      base: ['Ambergris', 'Leather', 'Vanilla', 'Benzoin', 'Labdanum']
    },
    fragranceFamily: 'Aromatic Fougere',
    year: 2017,
    source: 'fragrantica.com',
    description: 'A remarkably clean and sophisticated aromatic fougere that opens with a moderate projection of citrus, green, woody, spicy, and musky accords. Features a soft but sparkling citrus blend that opens into an herbal aroma, with vetiver smoothed by fruity and floral notes. Despite poor longevity issues reported by many users, it\'s praised for its refined complexity and airiness when compared to typical blue fragrances.',
    confidence: 1.0,
    perfumer: 'Roja Dove'
  },
  {
    id: 'burlington-1819-roja-dove',
    name: 'Burlington 1819',
    brand: 'Roja Dove',
    notes: {
      top: ['Grapefruit', 'Mint', 'Lime', 'Bitter Orange', 'Mandarin Orange'],
      middle: [],
      base: ['Tobacco', 'Ambergris', 'Ginger', 'Oakmoss', 'Cashmere Wood', 'Rum', 'Cedar', 'Patchouli', 'Musk', 'Cumin', 'Benzoin', 'Labdanum', 'Cinnamon', 'Vanilla', 'Saffron']
    },
    fragranceFamily: 'Oriental',
    year: 2020,
    source: 'fragrantica.com',
    description: 'Celebrates 5 years of London\'s Burlington Arcade being home to the flagship Roja Parfums boutique. Opens with an incredibly bright and juicy burst of grapefruit and lime, enhanced by mint. Features a spicy spark of ginger and rum that continues the dynamic energy, while distinctive qualities of patchouli and cashmere wood mingle with tobacco and benzoin to form a bright but enduring creation rich in personality.',
    confidence: 1.0,
    perfumer: 'Roja Dove'
  },
  {
    id: 'enigma-pour-homme-parfum-cologne-roja-dove',
    name: 'Enigma Pour Homme Parfum Cologne',
    brand: 'Roja Dove',
    notes: {
      top: ['Bergamot'],
      middle: ['Heliotrope', 'Jasmine', 'Neroli', 'Geranium', 'Rose de Mai'],
      base: ['Cognac', 'Vanilla', 'Benzoin', 'Tobacco', 'Ginger', 'Ambergris', 'Cardamom', 'Sandalwood', 'Pepper', 'Patchouli']
    },
    fragranceFamily: 'Oriental Spicy',
    year: 2019,
    source: 'fragrantica.com',
    description: 'A fragrance that expertly balances the balsamic sweetness of benzoin and vanilla with the dry masculinity of tobacco and cognac. Features an unusual effect where the slightly powdery and cherry-like tones of heliotrope mingle with vanilla and benzoin to create a fizzing cocktail effect. Often described as having a distinctive cola accord, creating a mysterious and sophisticated scent profile.',
    confidence: 1.0,
    perfumer: 'Roja Dove'
  },
  {
    id: 'apex-roja-dove',
    name: 'Apex',
    brand: 'Roja Dove',
    notes: {
      top: ['Bergamot', 'Orange', 'Mandarin Orange', 'Lemon'],
      middle: ['Pineapple', 'Cistus Incanus', 'Jasmine'],
      base: ['Cypress', 'Balsam Fir', 'Oakmoss', 'Leather', 'Patchouli', 'Juniper Berries', 'Tobacco', 'Olibanum', 'Cashmere Wood', 'Musk', 'Galbanum', 'Amber', 'Labdanum', 'Ambergris', 'Elemi resin', 'Rum', 'Sandalwood', 'Benzoin']
    },
    fragranceFamily: 'Leather',
    year: 2022,
    source: 'fragrantica.com',
    description: 'Designed to connect wearers to Earth and its spiritual energies, unleashing instincts and abilities that lay dormant within. Grounded in inspiration from the world\'s apex animals, this creation aims to unearth your connection to nature\'s most powerful creatures. Features strong projection for the first few hours and has been compared to Sauvage Elixir but with more polish and expert blending.',
    confidence: 1.0,
    perfumer: 'Roja Dove'
  },
  {
    id: 'oceania-roja-dove',
    name: 'Oceania',
    brand: 'Roja Dove',
    notes: {
      top: ['Lavender', 'Grapefruit', 'Lemon', 'Lime', 'Bergamot', 'Mandarin Orange', 'Rosemary', 'Thyme', 'Litsea Cubeba'],
      middle: ['Violet', 'Jasmine', 'Jasmine Sambac', 'Geranium', 'Ylang-Ylang'],
      base: ['Iris', 'Musk', 'Cedar', 'Moss', 'Juniper Berries', 'Vetiver', 'Sandalwood', 'Galbanum', 'Benzoin', 'Labdanum', 'Vanilla']
    },
    fragranceFamily: 'Woody Aromatic',
    year: 2019,
    source: 'fragrantica.com',
    description: 'A sophisticated fresh fragrance that starts with bright citrus and aromatics with a hint of lavender, opening to a floral bouquet where jasmine and violet are the stars. The dry down maintains the jasmine/violet interplay while adding woods and aromatics. Despite its floral components, it\'s completely unisex and works well as an office scent, more suited for spring/summer but can be worn indoors year-round.',
    confidence: 1.0,
    perfumer: 'Roja Dove'
  },
  {
    id: 'diaghilev-roja-dove',
    name: 'Diaghilev',
    brand: 'Roja Dove',
    notes: {
      top: ['Cumin', 'Bergamot', 'Tarragon', 'Lemon', 'Orange', 'Lime'],
      middle: ['Peach', 'Ylang-Ylang', 'Jasmine', 'Rose', 'Heliotrope', 'Violet', 'Tuberose', 'Black Currant'],
      base: ['Oakmoss', 'Civet', 'Leather', 'Musk', 'Labdanum', 'Cloves', 'Ambrette', 'Benzoin', 'Patchouli', 'Peru Balsam', 'Guaiac Wood', 'Vanilla', 'Styrax', 'Vetiver', 'Cedar', 'Nutmeg', 'Sandalwood']
    },
    fragranceFamily: 'Chypre Fruity',
    year: 2013,
    source: 'fragrantica.com',
    description: 'Roja Dove\'s tribute to Sergei Diaghilev, the visionary behind the Ballets Russes. A modern interpretation of the classic chypre genre, blending elements of vintage perfumery with contemporary nuances. Opens with citrusy bergamot, lime, and orange, leading into a floral heart of jasmine, tuberose, and rose. The base is anchored by oakmoss, patchouli, and leather, with civet adding animalic depth reminiscent of traditional chypres.',
    confidence: 1.0,
    perfumer: 'Roja Dove'
  },

    //HUGO BOSS PERFUMES ///

     {
    id: 'hugo-boss-hugo',
    name: 'Hugo',
    brand: 'Hugo Boss',
    notes: {
      top: ['Green Apple', 'Lavender', 'Mint', 'Grapefruit', 'Basil'],
      middle: ['Sage', 'Geranium', 'Carnation', 'Jasmine'],
      base: ['Fir', 'Cedar', 'Patchouli']
    },
    fragranceFamily: 'Aromatic Green',
    year: 1995,
    source: 'fragrantica.com',
    description: 'A mix of crisp apples, herbal aromas and wild forest scents. Feel the freshness and boost your confidence. Features distinctive green apple and mint opening with woody forest base. Many men had this as their first designer perfume, creating lasting memories.',
    confidence: 1.0,
    perfumer: 'Bob Aliano'
  },

  {
    id: 'hugo-boss-boss-bottled',
    name: 'Boss Bottled',
    brand: 'Hugo Boss',
    notes: {
      top: ['Apple', 'Plum', 'Bergamot', 'Lemon', 'Oakmoss', 'Geranium'],
      middle: ['Cinnamon', 'Mahogany', 'Carnation'],
      base: ['Vanilla', 'Sandalwood', 'Cedar', 'Vetiver', 'Olive Tree']
    },
    fragranceFamily: 'Woody Spicy',
    year: 1998,
    source: 'fragrantica.com',
    description: 'The abstract of Hugo Boss style captured in a bottle. Fresh and sharp with warm woody base. Fresh and fruity top notes of apple and citrus perfectly balanced with floral and spicy heart dominated by cinnamon. A modern masterpiece with distinctive apple-cinnamon pie character.',
    confidence: 1.0,
    perfumer: 'Annick Menardo, Christian Dussoulier'
  },

  {
    id: 'hugo-boss-boss-in-motion',
    name: 'Boss in Motion',
    brand: 'Hugo Boss',
    notes: {
      top: ['Sweet Orange', 'Basil Flower', 'Bergamot', 'Violet Leaves'],
      middle: ['Cinnamon', 'Nutmeg', 'Cardamom', 'Pink Pepper'],
      base: ['Sandalwood', 'Vetiver', 'Woody Accord', 'Musk']
    },
    fragranceFamily: 'Oriental Spicy',
    year: 2002,
    source: 'fragrantica.com',
    description: 'An early pink pepper adopter with unique spherical bottle perfect for gym bags. A citrus-woody at heart with robust spices giving orange note a chai tea-like kick. Creates the dream of an orange creamsicle glazed in maple syrup, melting in a suede handbag.',
    confidence: 1.0,
    perfumer: 'Domitille Michalon Bertier'
  },

  {
    id: 'hugo-boss-boss-orange-woman',
    name: 'Boss Orange',
    brand: 'Hugo Boss',
    notes: {
      top: ['Sweet Apple', 'Orange'],
      middle: ['Orange Blossom', 'White Flowers'],
      base: ['Sandalwood', 'Olive Wood', 'Vanilla']
    },
    fragranceFamily: 'Floral Fruity',
    year: 2009,
    source: 'fragrantica.com',
    description: 'Represents urban, natural, modern woman completing her spring image with cheerful aromas. Beautiful, intriguing, free, charismatic and spontaneous Boss woman. Sweet apple reveals delicate feminine passions with white flowers and warm vanilla finish.',
    confidence: 1.0,
    perfumer: 'Alberto Morillas'
  },

  {
    id: 'hugo-boss-boss-ma-vie',
    name: 'Boss Ma Vie Pour Femme',
    brand: 'Hugo Boss',
    notes: {
      top: ['Cactus Flower'],
      middle: ['Pink Freesia', 'Rose', 'Jasmine'],
      base: ['Woody Notes', 'Cedar']
    },
    fragranceFamily: 'Floral',
    year: 2014,
    source: 'fragrantica.com',
    description: 'Inspired by the independent spirit of a woman as she pauses to indulge in simple moments in life. The distinctive cactus flower offers fresh, intriguing opening that differentiates it from generic florals. Embodies calm yet invigorating presence that blooms from within.',
    confidence: 1.0,
    perfumer: 'Calice Becker'
  },

  {
    id: 'hugo-boss-boss-the-scent',
    name: 'Boss The Scent',
    brand: 'Hugo Boss',
    notes: {
      top: ['Ginger'],
      middle: ['Maninka Fruit', 'Lavender'],
      base: ['Leather']
    },
    fragranceFamily: 'Leather',
    year: 2015,
    source: 'fragrantica.com',
    description: 'A masterful orchestration of all the senses that lasts and is not easily forgotten. Unique scent because of Maninka fruit with incomparable flavor. Spicy ginger opening with sensual lavender heart and intensive leather base symbolizing magnetic masculinity.',
    confidence: 1.0,
    perfumer: 'Bruno Jovanovic, Pascal Gaurin'
  },

  {
    id: 'hugo-boss-boss-alive',
    name: 'Boss Alive',
    brand: 'Hugo Boss',
    notes: {
      top: ['Madagascar Vanilla', 'Plum', 'Cinnamon', 'Apple', 'Black Currant'],
      middle: ['Jasmine Sambac', 'Thyme'],
      base: ['Woody Notes', 'Sandalwood', 'Cedar', 'Olive Tree']
    },
    fragranceFamily: 'Oriental Floral',
    year: 2020,
    source: 'fragrantica.com',
    description: 'Designed to celebrate the bliss of being immersed in the moment. A phenomenal fruity explosion with sparkling burst of fruits offering radiant and addictive start. Addictive, magnetic and strong, giving confidence to pursue your path and define your own success.',
    confidence: 1.0,
    perfumer: 'Annick Menardo'
  },

  {
    id: 'hugo-boss-hugo-man',
    name: 'Hugo Man',
    brand: 'Hugo Boss',
    notes: {
      top: ['Green Apple'],
      middle: ['Lavender'],
      base: ['Pine', 'Woody Notes', 'Balsam Fir']
    },
    fragranceFamily: 'Woody Aromatic',
    year: 2021,
    source: 'fragrantica.com',
    description: 'An aromatic, fresh and woody fragrance that seems to be an update of the classic Hugo fragrance. Just like Hugo from the 90s before reformulation. Evokes outdoors and camping with wood, pine and fir trees creating masculine forest vibe.',
    confidence: 1.0,
    perfumer: 'Steve Guo'
  },

  {
    id: 'hugo-boss-boss-in-motion-2022',
    name: 'Boss In Motion (2022)',
    brand: 'Hugo Boss',
    notes: {
      top: ['Bergamot', 'Violet Leaves', 'Pink Pepper', 'Basil'],
      middle: ['Cinnamon', 'Nutmeg', 'Cardamom'],
      base: ['Sandalwood', 'Musk', 'Woody Notes', 'Vetiver']
    },
    fragranceFamily: 'Oriental Spicy',
    year: 2022,
    source: 'fragrantica.com',
    description: 'The confident guy in the orange sphere is back with new bottle but still radiating good vibes, now with slightly better manners. Creamy lovely orange that smells exactly the same as the original Boss in Motion from 2002 but more grown up.',
    confidence: 1.0,
    perfumer: 'Louise Turner'
  },

  {
    id: 'hugo-boss-boss-bottled-parfum',
    name: 'Boss Bottled Parfum',
    brand: 'Hugo Boss',
    notes: {
      top: ['Olibanum', 'Mandarin Orange'],
      middle: ['Fig Tree', 'Orris'],
      base: ['Cedar', 'Leather']
    },
    fragranceFamily: 'Leather',
    year: 2022,
    source: 'fragrantica.com',
    description: 'A precursor to the Elixir and Absolu flankers. Opens citrusy, woody, and leathery with mandarin orange and olibanum. The orris grants cozy warm feeling while fig gives slightly woody, spicy character. Handsome professional working by day.',
    confidence: 1.0,
    perfumer: 'Suzy Le Helley, Annick Menardo'
  },

  {
    id: 'hugo-boss-boss-bottled-elixir',
    name: 'Boss Bottled Elixir',
    brand: 'Hugo Boss',
    notes: {
      top: ['Frankincense', 'Cardamom'],
      middle: ['Patchouli', 'Vetiver'],
      base: ['Labdanum', 'Cedar']
    },
    fragranceFamily: 'Oriental Spicy',
    year: 2023,
    source: 'fragrantica.com',
    description: 'Ambery and smoky Arabic/Middle Eastern fragrance that is dark and seductive with nice incense note. Beast mode performance and longevity. Perfect for colder weather. In the same family as Grand Soir with warm, inviting, mysterious, and cozy character.',
    confidence: 1.0,
    perfumer: 'Annick Menardo, Suzy Le Helley'
  },

  {
    id: 'hugo-boss-boss-alive-parfum',
    name: 'Boss Alive Parfum',
    brand: 'Hugo Boss',
    notes: {
      top: ['Jasmine'],
      middle: ['Vetiver'],
      base: ['Leather']
    },
    fragranceFamily: 'Oriental Floral',
    year: 2023,
    source: 'fragrantica.com',
    description: 'An underrated perfume that appeals to leather/sexy fragrance lovers. Incredibly sensual and sexy but in a very masculine way. After hours, slowly fades into powdery, soft notes while retaining its sexy side. For independent, feminine women.',
    confidence: 1.0,
    perfumer: 'Honorine Blanc, Marie Salamagne'
  },

  {
    id: 'hugo-boss-boss-bottled-absolu',
    name: 'Boss Bottled Absolu',
    brand: 'Hugo Boss',
    notes: {
      top: ['Incense', 'Leather'],
      middle: ['Patchouli', 'Myrrh'],
      base: ['Cedarwood', 'Davana']
    },
    fragranceFamily: 'Woody Aromatic',
    year: 2024,
    source: 'fragrantica.com',
    description: 'A bold Eau de Parfum featuring irresistible roasted signature. This woody-leathery scent opens with textured leather harmonized with invigorating incense. Niche quality with complex, unusual yet strongly projecting and long-lasting character.',
    confidence: 1.0,
    perfumer: 'Annick Menardo, Suzy Le Helley'
  },

  {
    id: 'hugo-boss-boss-the-scent-elixir',
    name: 'Boss The Scent Elixir For Him',
    brand: 'Hugo Boss',
    notes: {
      top: ['Red Pepper'],
      middle: ['Lavender'],
      base: ['Sandalwood']
    },
    fragranceFamily: 'Oriental Woody',
    year: 2024,
    source: 'fragrantica.com',
    description: 'Temperature dependent fragrance - pimento comes on top with lavender in cold weather, but warm temperature suppresses pimento revealing beautiful spicy sandalwood with hint of lavender. Dark masculine fragrance that is fresh and spicy simultaneously.',
    confidence: 1.0,
    perfumer: 'Nelly Hachem-Ruiz'
  },

  {
    id: 'hugo-boss-boss-bottled-bold-citrus',
    name: 'Boss Bottled Bold Citrus',
    brand: 'Hugo Boss',
    notes: {
      top: ['Lemon', 'Bergamot'],
      middle: ['Bourbon Geranium', 'Elemi Resin'],
      base: ['Vetiver', 'Patchouli']
    },
    fragranceFamily: 'Woody Aromatic',
    year: 2025,
    source: 'fragrantica.com',
    description: 'Make a vibrant splash this summer with fresh limited-edition that radiates energy and confidence. Bursting with luminous citrus notes capturing the spirit of the dynamic Boss man. Electrifying duo of primofiore lemon and bergamot delivering zesty start.',
    confidence: 1.0,
    perfumer: 'Honorine Blanc, Sophie Labbé'
  },

    ///Lancôme Perfumes///

    {
    id: 'idole-lancome',
    name: 'Idôle',
    brand: 'Lancôme',
    notes: {
      top: ['Pear', 'Bergamot', 'Pink Pepper'],
      middle: ['Rose', 'Jasmine'],
      base: ['White Musk', 'Vanilla', 'Patchouli', 'Cedar']
    },
    fragranceFamily: 'Chypre Floral',
    year: 2019,
    source: 'fragrantica.com',
    description: 'A modern musky chypre floral fragrance created by three female perfumers. Features sustainably sourced Isparta Rose Petal Essence from Turkey and Centifolia Rose from France with a clean and glow accord.',
    confidence: 1.0,
    perfumer: 'Shyamala Maisondieu, Adriana Medina-Baez, Nadège Le Garlantezec, Sonia Constant'
  },
  {
    id: 'idole-power-lancome',
    name: 'Idôle Power',
    brand: 'Lancôme',
    notes: {
      top: ['Apple'],
      middle: ['May Rose'],
      base: ['Sandalwood']
    },
    fragranceFamily: 'Floral Fruity',
    year: 2024,
    source: 'fragrantica.com',
    description: 'A powerful woody base complemented by the signature Idôle rose. Features a fruity pomarose reminiscent of candied apple with creamy, vibrant sandalwood from Western Australia.',
    confidence: 1.0,
    perfumer: 'Not specified'
  },
  {
    id: 'idole-nectar-lancome',
    name: 'Idôle Nectar',
    brand: 'Lancôme',
    notes: {
      top: ['Grasse Rose', 'Rose', 'Turkish Rose'],
      middle: ['Caramel', 'Popcorn'],
      base: ['Vanilla']
    },
    fragranceFamily: 'Oriental Vanilla',
    year: 2022,
    source: 'fragrantica.com',
    description: 'A gourmand rose fragrance with caramel and popcorn notes creating a sweet nectar-like scent. Features multiple rose extracts for a rich floral gourmand experience.',
    confidence: 1.0,
    perfumer: 'Not specified'
  },
  {
    id: 'idole-edt-lancome',
    name: 'Idôle Eau de Toilette',
    brand: 'Lancôme',
    notes: {
      top: ['Green Tea', 'Bergamot'],
      middle: ['Damask Rose', 'Rose Water'],
      base: ['Musk', 'Patchouli', 'Bourbon Vanilla', 'Cedar']
    },
    fragranceFamily: 'Oriental Floral',
    year: 2024,
    source: 'fragrantica.com',
    description: 'Combines the freshness and energy of green tea with rose water and Damask rose. A bright and fresh interpretation of the original Idôle with more zing and less sweetness.',
    confidence: 1.0,
    perfumer: 'Shyamala Maisondieu, Nadège Le Garlantezec, Adriana Medina-Baez'
  },
  {
    id: 'la-vie-est-belle-lancome',
    name: 'La Vie Est Belle',
    brand: 'Lancôme',
    notes: {
      top: ['Black Currant', 'Pear'],
      middle: ['Iris', 'Jasmine', 'Orange Blossom'],
      base: ['Praline', 'Vanilla', 'Patchouli', 'Tonka Bean']
    },
    fragranceFamily: 'Floral Fruity Gourmand',
    year: 2012,
    source: 'fragrantica.com',
    description: 'A gourmand yet elegant composition centered on natural beauty and freedom from conventions. The final formula was the result of three years of development and 5000 versions. Features precious Iris as the key ingredient.',
    confidence: 1.0,
    perfumer: 'Olivier Polge, Dominique Ropion, Anne Flipo'
  },
  {
    id: 'la-vie-est-belle-lelixir-lancome',
    name: 'La Vie Est Belle L\'Elixir',
    brand: 'Lancôme',
    notes: {
      top: ['Raspberry Accord', 'Calabrian Bergamot'],
      middle: ['Violet Leaf Absolute', 'Rose Heart Absolute'],
      base: ['Cocoa Butter Absolute', 'Leather Accord', 'Virginia Cedarwood']
    },
    fragranceFamily: 'Floral Fruity Gourmand',
    year: 2024,
    source: 'fragrantica.com',
    description: 'A floral, fruity, gourmand fragrance designed to evoke deep liberation and self-confidence. Features violet leaf that smells like Parma Violet candies with rich cocoa butter and leather accords.',
    confidence: 1.0,
    perfumer: 'Not specified'
  },
  {
    id: 'la-vie-est-belle-en-rose-lancome',
    name: 'La Vie Est Belle en Rose',
    brand: 'Lancôme',
    notes: {
      top: ['Raspberry', 'Red Berries', 'Pink Pepper', 'Bergamot'],
      middle: ['Damask Rose', 'Rose', 'Peony', 'Lily-of-the-Valley'],
      base: ['Patchouli', 'Musk', 'Iris', 'Sandalwood']
    },
    fragranceFamily: 'Floral Fruity',
    year: 2019,
    source: 'fragrantica.com',
    description: 'A fresher, more luminous and floral interpretation of the original La Vie Est Belle. Opens with red berries and features multiple rose varieties for a feminine, berry-forward fragrance.',
    confidence: 1.0,
    perfumer: 'Anne Flipo, Dominique Ropion'
  },
  {
    id: 'la-vie-est-belle-rose-extraordinaire-lancome',
    name: 'La Vie Est Belle Rose Extraordinaire',
    brand: 'Lancôme',
    notes: {
      top: ['Bergamot', 'Orange', 'Stem Greens'],
      middle: ['Damask Rose', 'Rose', 'Rose Water', 'Iris'],
      base: ['Ambroxan', 'Musk', 'Woody Notes', 'Sandalwood', 'Moss']
    },
    fragranceFamily: 'Floral',
    year: 2024,
    source: 'fragrantica.com',
    description: 'A reinterpretation of the rose built around Iris Concrete and three different rose extracts: fresh rose water, sensual damascena absolute and space rose accord. A modern interpretation of the iconic flower of perfumery.',
    confidence: 1.0,
    perfumer: 'Three French master perfumers'
  },
  {
    id: 'la-vie-est-belle-vanille-nude-lancome',
    name: 'La Vie Est Belle Vanille Nude',
    brand: 'Lancôme',
    notes: {
      top: ['Solar Jasmine'],
      middle: ['Glazed Vanilla'],
      base: ['Creamy White Musk']
    },
    fragranceFamily: 'Vanilla Musk',
    year: 2025,
    source: 'fragrantica.com',
    description: 'A musky vanilla fragrance featuring solar jasmine sourced from Lancôme\'s own Domain de la Rose. A vanilla-forward white floral with rich, gourmand vanilla that\'s warm and refined.',
    confidence: 1.0,
    perfumer: 'Not specified'
  },
  {
    id: 'tresor-lancome',
    name: 'Trésor',
    brand: 'Lancôme',
    notes: {
      top: ['Peach', 'Rose', 'Apricot Blossom', 'Lilac', 'Pineapple', 'Lily-of-the-Valley', 'Bergamot'],
      middle: ['Rose', 'Iris', 'Heliotrope', 'Jasmine'],
      base: ['Peach', 'Apricot', 'Vanilla', 'Sandalwood', 'Amber', 'Musk']
    },
    fragranceFamily: 'Oriental Floral',
    year: 1990,
    source: 'fragrantica.com',
    description: 'A treasure among perfume creations (\'trésor\' means \'treasure\' in French). Exceptionally warm floral-oriental with a fine composition of rose, heliotrope, orris, apricot and iris. One of the best-selling perfumes worldwide.',
    confidence: 1.0,
    perfumer: 'Sophia Grojsman'
  },
  {
    id: 'la-nuit-tresor-lancome',
    name: 'La Nuit Trésor',
    brand: 'Lancôme',
    notes: {
      top: ['Pear', 'Tangerine', 'Bergamot'],
      middle: ['Strawberry', 'Vanilla Orchid', 'Black Rose', 'Passionfruit'],
      base: ['Praline', 'Caramel', 'Litchi', 'Vanilla', 'Patchouli', 'Incense', 'Coffee', 'Licorice', 'Coumarin', 'Papyrus']
    },
    fragranceFamily: 'Oriental Vanilla',
    year: 2015,
    source: 'fragrantica.com',
    description: 'A gourmand aphrodisiac and love potion described as a flanker of the original Trésor. Features black rose essence with vanilla orchid from Tahiti and complex gourmand base notes including coffee and incense.',
    confidence: 1.0,
    perfumer: 'Christophe Raynaud, Amandine Clerc-Marie'
  },
  {
    id: 'tresor-in-love-lancome',
    name: 'Trésor In Love',
    brand: 'Lancôme',
    notes: {
      top: ['Nectarine', 'Pear', 'Pink Pepper', 'Bergamot'],
      middle: ['Taif Rose', 'Peach', 'Violet', 'Jasmine'],
      base: ['Musk', 'Virginia Cedar']
    },
    fragranceFamily: 'Floral Fruity',
    year: 2010,
    source: 'fragrantica.com',
    description: 'A fragrant composition incorporating fruity-floral notes on a cedar wood base. Opens with nectarine, bergamot, peach and sour pear, with Turkish rose and elegant jasmine at the heart.',
    confidence: 1.0,
    perfumer: 'Dominique Ropion, Veronique Nyberg'
  },
  {
    id: 'poeme-lancome',
    name: 'Poême',
    brand: 'Lancôme',
    notes: {
      top: ['Narcissus', 'Datura', 'Peach', 'Plum', 'Himalayan Poppy', 'Mandarin Orange', 'Black Currant', 'Bergamot', 'Green Notes'],
      middle: ['Mimosa', 'Vanilla Flower', 'Tuberose', 'Ylang-Ylang', 'Orange Blossom', 'Jasmine', 'Freesia', 'Heliotrope', 'Rose', 'Leather'],
      base: ['Vanilla', 'Orange Blossom', 'Amber', 'Tonka Bean', 'Musk', 'Cedar']
    },
    fragranceFamily: 'Floral',
    year: 1995,
    source: 'fragrantica.com',
    description: 'Classic floral oriental with original structure that doesn\'t follow traditional top, middle, base notes. Features intoxicating Himalayan blue poppy and contrasts of bitter and sweet that create a special sensual aura.',
    confidence: 1.0,
    perfumer: 'Jacques Cavallier Belletrud'
  },
  {
    id: 'absolue-le-parfum-lancome',
    name: 'Absolue Le Parfum',
    brand: 'Lancôme',
    notes: {
      top: ['Citrus'],
      middle: ['Rose', 'White Tea', 'Jasmine'],
      base: ['Musk']
    },
    fragranceFamily: 'Aromatic Aquatic',
    year: 2024,
    source: 'fragrantica.com',
    description: 'A luxury spa-like fragrance with naturalistic rose scent. Compared to Chrome Azzaro for its fresh, citrusy, unisex quality. Features white tea and musk with a clean, feminine, youthful character.',
    confidence: 1.0,
    perfumer: 'Alienor Massenet, Karoline Vieth-Buxton'
  },

    ///Diptyque PERFUMES///

    {
    id: 'orpheon-eau-de-parfum-diptyque',
    name: 'Orphéon Eau de Parfum',
    brand: 'Diptyque',
    notes: {
      top: ['Juniper Berries'],
      middle: ['Jasmine'],
      base: ['Powdery Notes', 'Cedar', 'Tonka Bean']
    },
    fragranceFamily: 'Woody Chypre',
    year: 2021,
    source: 'fragrantica.com',
    description: 'A tribute to a legendary Parisian jazz club from the 1960s. Features luminous floral woody scent with powdery jasmine, aromatic juniper berries, and warm woods. Created to honor the nightclub Orphéon where Diptyque founders would meet. Unisex fragrance with excellent longevity and sophisticated, clean character.',
    confidence: 1.0,
    perfumer: 'Olivier Pescheux'
  },
  
  {
    id: 'fleur-de-peau-eau-de-parfum-diptyque',
    name: 'Fleur de Peau Eau de Parfum',
    brand: 'Diptyque',
    notes: {
      top: ['Aldehydes', 'Pink Pepper', 'Angelica', 'Bergamot'],
      middle: ['Iris', 'Turkish Rose'],
      base: ['Musk', 'Ambrette', 'Carrot', 'Ambergris', 'Sandalwood', 'Leather', 'Amberwood']
    },
    fragranceFamily: 'Floral Aldehyde',
    year: 2018,
    source: 'fragrantica.com',
    description: 'Inspired by the myth of Psyche and Eros, this skin-like fragrance celebrates musk in a soft, powdery composition. Features sparkling aldehydes, earthy iris, and intimate musks that create a second-skin effect. Often compared to Glossier You but more refined and complex. Perfect for those seeking an elegant, powdery-floral scent.',
    confidence: 1.0,
    perfumer: 'Olivier Pescheux'
  },
  
  {
    id: 'philosykos-eau-de-parfum-diptyque',
    name: 'Philosykos Eau de Parfum', 
    brand: 'Diptyque',
    notes: {
      top: ['Fig Leaf', 'Fig'],
      middle: ['Green Notes', 'Coconut'],
      base: ['Fig Tree', 'Woody Notes', 'Cedar']
    },
    fragranceFamily: 'Woody Aromatic',
    year: 1996,
    source: 'fragrantica.com',
    description: 'A photorealistic interpretation of the entire fig tree - fruit, leaves, branches, and milky sap. Created by pioneering perfumer Olivia Giacobetti who popularized fig in perfumery. Captures the Mediterranean experience of sitting under a fig tree. Very green and natural, linear composition that evolves from leafy to creamy-fruity.',
    confidence: 1.0,
    perfumer: 'Olivia Giacobetti'
  },
  
  {
    id: 'eau-duelle-eau-de-parfum-diptyque',
    name: 'Eau Duelle Eau de Parfum',
    brand: 'Diptyque',
    notes: {
      top: ['Elemi', 'Cypress', 'Cardamom', 'Saffron'],
      middle: ['Calamus', 'Black Tea', 'Juniper'],
      base: ['Bourbon Vanilla', 'Vanilla Pod', 'Ambroxan', 'Rock Rose']
    },
    fragranceFamily: 'Aromatic Spicy',
    year: 2013,
    source: 'fragrantica.com',
    description: 'A journey of vanilla along the spice route. Non-gourmand vanilla that is woody, smoky, and sophisticated rather than sweet. Features raw Bourbon vanilla awakened by ambroxan and labdanum. Perfect for those who want vanilla without the typical sweet dessert-like quality. Dry, aromatic, and unisex.',
    confidence: 1.0,
    perfumer: 'Fabrice Pellegrin'
  },
  
  {
    id: 'do-son-eau-de-toilette-diptyque',
    name: 'Do Son Eau de Toilette',
    brand: 'Diptyque',
    notes: {
      top: ['African Orange Flower', 'Iris', 'Rose'],
      middle: ['Tuberose', 'Pink Pepper'],
      base: ['Benzoin', 'Musk']
    },
    fragranceFamily: 'Floral',
    year: 2005,
    source: 'fragrantica.com',
    description: 'Inspired by founder Yves Coueslant\'s childhood summers in Vietnam. Centers around the intoxicating scent of tuberose flowers carried by sea breeze. Features photorealistic white florals without being overpowering. Clean, creamy tuberose with subtle marine accord. Perfect for tuberose lovers seeking a refined, non-cloying interpretation.',
    confidence: 1.0,
    perfumer: 'Fabrice Pellegrin'
  },

    ///JO MALONE FRAGRANCES///

     {
    id: 'wood-sage-sea-salt-jo-malone',
    name: 'Wood Sage & Sea Salt',
    brand: 'Jo Malone London',
    notes: {
      top: ['Ambrette Seeds'],
      middle: ['Sea Salt', 'Mineral Notes'],
      base: ['Sage']
    },
    fragranceFamily: 'Fresh Aquatic',
    year: 2014,
    source: 'fragrantica.com',
    description: 'Inspired by the British coast with windswept shores and mineral scent of rugged cliffs. Features ambrette seeds, sea salt, and woody sage with red algae and grapefruit. Evokes freedom, natural spirit, and the bracing air of English seaside. Light, airy fragrance perfect for layering. Known for weak performance but beloved scent profile.',
    confidence: 1.0,
    perfumer: 'Christine Nagel'
  },
  
  {
    id: 'lime-basil-mandarin-jo-malone',
    name: 'Lime Basil & Mandarin',
    brand: 'Jo Malone London',
    notes: {
      top: ['Lime', 'Mandarin Orange', 'Bergamot'],
      middle: ['Basil', 'Thyme', 'Lilac', 'Iris'],
      base: ['Vetiver', 'Patchouli']
    },
    fragranceFamily: 'Citrus Aromatic',
    year: 1999,
    source: 'fragrantica.com',
    description: 'Jo Malone\'s signature fragrance and modern classic. Features peppery basil and white thyme bringing unexpected twist to zesty lime and mandarin. One of the first to use herbs in high-end perfumery. Tantalizing, addictive, and sophisticated. Perfect example of Jo Malone\'s philosophy of simple yet striking compositions designed for layering.',
    confidence: 1.0,
    perfumer: 'Jo Malone'
  },
  
  {
    id: 'english-pear-freesia-jo-malone',
    name: 'English Pear & Freesia',
    brand: 'Jo Malone London',
    notes: {
      top: ['Pear', 'Melon'],
      middle: ['Freesia', 'Rose'],
      base: ['Musk', 'Patchouli', 'Rhubarb', 'Amber']
    },
    fragranceFamily: 'Fruity Floral',
    year: 2010,
    source: 'fragrantica.com',
    description: 'Inspired by English orchards and John Keats\' "Ode to Autumn." Captures sensuous freshness of just-ripe pears wrapped in white freesias. Features perfectly named combination that exactly evokes the promised notes. One of Jo Malone\'s bestsellers, beloved for its juicy, sophisticated take on pear with elegant floral heart and grounding patchouli.',
    confidence: 1.0,
    perfumer: 'Christine Nagel'
  },
  
  {
    id: 'myrrh-tonka-cologne-intense-jo-malone',
    name: 'Myrrh & Tonka Cologne Intense',
    brand: 'Jo Malone London',
    notes: {
      top: ['Lavender'],
      middle: ['Myrrh'],
      base: ['Tonka Bean', 'Vanilla', 'Almond']
    },
    fragranceFamily: 'Oriental',
    year: 2016,
    source: 'fragrantica.com',
    description: 'Part of Cologne Intense collection with better longevity than regular Jo Malone colognes. Inspired by Namib Desert myrrh trees. Rich, hand-harvested Namibian myrrh with warm almond and vanilla tonka bean. Carnal richness and addiction according to perfumer. Cozy, winter fragrance with excellent layering potential. More substantial than typical Jo Malone offerings.',
    confidence: 1.0,
    perfumer: 'Mathilde Bijaoui'
  },
  
  {
    id: 'pomegranate-noir-jo-malone',
    name: 'Pomegranate Noir',
    brand: 'Jo Malone London',
    notes: {
      top: ['Pomegranate', 'Rhubarb', 'Plum', 'Raspberry', 'Watermelon'],
      middle: ['Cloves', 'Pink Pepper', 'Guaiac Wood', 'Rose', 'Jasmine', 'Lily-of-the-Valley'],
      base: ['Virginia Cedar', 'Patchouli', 'Amber', 'Musk']
    },
    fragranceFamily: 'Aromatic Fruity',
    year: 2005,
    source: 'fragrantica.com',
    description: 'Seductive and enigmatic fragrance inspired by ruby-rich pomegranate juices and Casablanca lily. Features complex spicy-fruity profile with prominent clove and patchouli. More substantial and long-lasting than typical Jo Malone offerings. Perfect holiday scent with sophisticated, slightly masculine drydown. Beloved by celebrities including Meghan Markle and Sofia Richie.',
    confidence: 1.0,
    perfumer: 'Beverley Bayne'
  },

    ///TOM FORD FRAGRANCES///
    {
      id: 'tom-ford-black-orchid',
      name: 'Black Orchid',
      brand: 'Tom Ford',
      notes: {
        top: ['Truffle', 'Gardenia', 'Black Currant', 'Ylang Ylang'],
        middle: ['Orchid', 'Spicy Notes', 'Fruity Notes', 'Lotus Wood'],
        base: ['Patchouli', 'Vanilla', 'Incense', 'Sandalwood']
      },
      fragranceFamily: 'Oriental',
      year: 2006,
      source: 'fragrantica.com',
      description: 'A luxurious oriental fragrance with dark, mysterious allure.',
      confidence: 1.0
    },
    
    {
    id: 'tom-ford-tobacco-vanille',
    name: 'Tobacco Vanille',
    brand: 'Tom Ford',
    notes: {
      top: ['Tobacco Leaf', 'Spicy Notes'],
      middle: ['Vanilla', 'Cacao', 'Tonka Bean', 'Tobacco Blossom'],
      base: ['Dried Fruits', 'Woody Notes']
    },
    fragranceFamily: 'Oriental Spicy',
    year: 2007,
    source: 'fragrantica.com',
    description: 'An opulent amber gourmand fragrance inspired by the very finest of private clubs. A rich blend of spice, tobacco flower and vanilla accords that exudes confidence and recalls the most exclusive members-only clubs.',
    confidence: 1.0,
    perfumer: 'Olivier Gillotin'
  },
  {
    id: 'tom-ford-lost-cherry',
    name: 'Lost Cherry',
    brand: 'Tom Ford',
    notes: {
      top: ['Bitter Almond', 'Black Cherry', 'Cherry Liqueur'],
      middle: ['Sour Cherry', 'Plum', 'Turkish Rose', 'Jasmine Sambac'],
      base: ['Vanilla', 'Tonka Bean', 'Cinnamon', 'Peru Balsam', 'Sandalwood', 'Benzoin', 'Cloves', 'Cedar', 'Patchouli', 'Vetiver']
    },
    fragranceFamily: 'Oriental Floral',
    year: 2018,
    source: 'fragrantica.com',
    description: 'A full-bodied journey into the once-forbidden. A contrasting scent that reveals a tempting dichotomy of playful, candy-like gleam on the outside and luscious flesh on the inside. Lost Cherry mingles black cherry with cherry liqueur accords.',
    confidence: 1.0,
    perfumer: 'Louise Turner'
  },
  {
    id: 'tom-ford-oud-wood',
    name: 'Oud Wood',
    brand: 'Tom Ford',
    notes: {
      top: ['Rosewood', 'Cardamom', 'Chinese Pepper'],
      middle: ['Agarwood (Oud)', 'Sandalwood', 'Vetiver'],
      base: ['Tonka Bean', 'Vanilla', 'Amber']
    },
    fragranceFamily: 'Oriental Woody',
    year: 2007,
    source: 'fragrantica.com',
    description: 'A groundbreaking composition of oud notes, exotic woods and warm amber. One of the most approachable oud-based fragrances, making it accessible to those who might find traditional oud fragrances too intense.',
    confidence: 1.0,
    perfumer: 'Richard Herpin'
  },
  {
    id: 'tom-ford-black-lacquer',
    name: 'Black Lacquer',
    brand: 'Tom Ford',
    notes: {
      top: ['Ink', 'Vinyl', 'Black Pepper', 'Rum'],
      middle: ['Ebony Wood', 'Elemi', 'Apricot', 'Peony'],
      base: ['Olibanum']
    },
    fragranceFamily: 'Oriental Woody',
    year: 2024,
    source: 'fragrantica.com',
    description: 'The fragrance shines with two exclusive innovations in modern perfumery: an incandescent black lacquer accord that captures a smoky, dimensional opulence, and a Makassar ebony wood note that evokes aspects of leather and birch.',
    confidence: 1.0,
    perfumer: 'Guillaume Flavigny'
  },
  {
    id: 'tom-ford-bois-pacifique',
    name: 'Bois Pacifique',
    brand: 'Tom Ford',
    notes: {
      top: ['Cardamom', 'Akigalawood', 'Turmeric'],
      middle: ['Frankincense', 'Oak', 'Cedar', 'White Sandalwood', 'Iris'],
      base: ['Amber', 'Vanilla']
    },
    fragranceFamily: 'Woody Aromatic',
    year: 2024,
    source: 'fragrantica.com',
    description: 'A spicy woody fragrance that embraces earthy woods and invigorating spices. Notes of silvery pink cardamom, fresh saffron and akigalawood warm the resin of fiery frankincense. A journey to a sense of infinite freedom and vitality.',
    confidence: 1.0,
    perfumer: 'Not specified'
  },
  {
    id: 'tom-ford-oud-voyager',
    name: 'Oud Voyager',
    brand: 'Tom Ford',
    notes: {
      top: ['Geranium', 'Pink Pepper', 'Citrus'],
      middle: ['Red Peony', 'Cardamom', 'Saffron'],
      base: ['Oud', 'Patchouli', 'Vetiver', 'Cypriol', 'Musk']
    },
    fragranceFamily: 'Oriental Woody',
    year: 2025,
    source: 'fragrantica.com',
    description: 'A woody-floral scent centered on oud essential oil obtained through a unique triple distillation process. Explores the intersection of oud with intensely floral notes, highlighting the vibrant hues of geranium and peony.',
    confidence: 1.0,
    perfumer: 'Not specified'
  },
  {
    id: 'tom-ford-eau-de-soleil-blanc-2025',
    name: 'Eau de Soleil Blanc 2025',
    brand: 'Tom Ford',
    notes: {
      top: ['Neroli', 'Citron', 'Bitter Orange', 'Bergamot', 'Petitgrain', 'Pistachio', 'Cardamom', 'Pink Pepper', 'Caraway'],
      middle: ['Tunisian Orange Blossom', 'Tuberose', 'Ylang Ylang', 'Jasmine', 'Galbanum'],
      base: ['Coconut', 'Benzoin', 'Vanilla', 'Amber', 'Tonka Bean']
    },
    fragranceFamily: 'Floral Fruity',
    year: 2025,
    source: 'fragrantica.com',
    description: 'A sophisticated reinterpretation that enhances the radiant and sun-kissed essence of Eau de Soleil Blanc. A unisex fragrance housed in an elegant white bottle with vertical ridges and a golden nameplate.',
    confidence: 1.0,
    perfumer: 'Not specified'
  },
  {
    id: 'tom-ford-cherry-smoke',
    name: 'Cherry Smoke',
    brand: 'Tom Ford',
    notes: {
      top: ['Sour Cherry', 'Saffron'],
      middle: ['Leather', 'Olive', 'Chinese Osmanthus', 'Apricot'],
      base: ['Smoke', 'Woody Notes', 'Cypriol Oil']
    },
    fragranceFamily: 'Oriental Spicy',
    year: 2022,
    source: 'fragrantica.com',
    description: 'Opens with the exquisite scent of Dark Cherry enhanced by exotic saffron notes. The fragrant white flowers of osmanthus exude facets of apricot, olive and leather, while a precious smoked wood accord tantalizes with heated vibrancy.',
    confidence: 1.0,
    perfumer: 'Not specified'
  },
  {
    id: 'tom-ford-electric-cherry',
    name: 'Electric Cherry',
    brand: 'Tom Ford',
    notes: {
      top: ['Cherry', 'Ginger'],
      middle: ['Jasmine Sambac'],
      base: ['Pink Pepper', 'Musk', 'Ambrettolide']
    },
    fragranceFamily: 'Floral Fruity',
    year: 2023,
    source: 'fragrantica.com',
    description: 'A vibrant and energetic take on cherry with sparkling ginger. More simplified and straightforward than Lost Cherry, featuring clean cherry notes with floral and musky undertones.',
    confidence: 1.0,
    perfumer: 'Not specified'
  },
  {
    id: 'tom-ford-for-men',
    name: 'Tom Ford for Men',
    brand: 'Tom Ford',
    notes: {
      top: ['Lemon Leaf Oil', 'Ginger', 'Mandarin Orange', 'Bergamot', 'Basil', 'Violet Leaf'],
      middle: ['Tobacco Leaf', 'Pepper', 'Tunisian Orange Blossom', 'Grapefruit Blossom'],
      base: ['Amber', 'Cedar', 'Vetiver', 'Virginian Patchouli', 'Oakmoss', 'Leather', 'Cypriol Oil']
    },
    fragranceFamily: 'Woody Floral Musk',
    year: 2007,
    source: 'fragrantica.com',
    description: 'A classic and sophisticated masculine fragrance with fresh citrus opening that develops into warm tobacco and wood notes. Known for being versatile and wearable year-round with excellent longevity.',
    confidence: 1.0,
    perfumer: 'Yves Cassar'
  },
  {
    id: 'tom-ford-oud-wood-parfum',
    name: 'Oud Wood Parfum',
    brand: 'Tom Ford',
    notes: {
      top: ['Cardamom', 'Pink Pepper', 'Rosemary'],
      middle: ['Sandalwood', 'Agarwood (Oud)', 'Patchouli', 'Vetiver'],
      base: ['Vanilla', 'Tonka', 'Amber']
    },
    fragranceFamily: 'Oriental Woody',
    year: 2024,
    source: 'fragrantica.com',
    description: 'An enriched version of the original Oud Wood with fresh spices of cardamom and pink pepper. Various woods including intense patchouli, sandalwood, vetiver, and oud combined with underlying tones of amber, tonka bean and vanilla.',
    confidence: 1.0,
    perfumer: 'Not specified'
  },
  {
    id: 'tom-ford-vanille-fatale-2017',
    name: 'Vanille Fatale',
    brand: 'Tom Ford',
    notes: {
      top: ['Rum', 'Myrrh', 'Olibanum', 'Saffron', 'Coriander', 'Orange', 'Lime'],
      middle: ['Barley', 'Coffee', 'Plum', 'Frangipani', 'Narcissus', 'Artemisia', 'Rose'],
      base: ['Madagascar Vanilla', 'Suede', 'Tobacco', 'Mahogany', 'Patchouli', 'Oakmoss', 'Violet']
    },
    fragranceFamily: 'Oriental Vanilla',
    year: 2017,
    source: 'fragrantica.com',
    description: 'A beguiling tempest that takes over like a rush of blood to the head. The stirring spice of saffron and coriander opens the scent, infiltrating the senses with the gripping incense of myrrh and olibanum.',
    confidence: 1.0,
    perfumer: 'Yann Vasnier'
  },

    {
      id: 'creed-aventus',
      name: 'Aventus',
      brand: 'Creed',
      notes: {
        top: ['Pineapple', 'Bergamot', 'Black Currant', 'Apple'],
        middle: ['Rose', 'Dry Birch', 'Moroccan Jasmine', 'Patchouli'],
        base: ['Oak Moss', 'Musk', 'Ambergris', 'Vanilla']
      },
      fragranceFamily: 'Woody',
      year: 2010,
      source: 'fragrantica.com',
      description: 'A sophisticated woody fragrance inspired by Napoleon\'s strength.',
      confidence: 1.0
    },
    
    ///DIOR PERFUMES///
    {
    id: 'sauvage-eau-de-toilette',
    name: 'Sauvage Eau de Toilette',
    brand: 'Dior',
    notes: {
      top: ['Calabrian Bergamot', 'Pepper'],
      middle: ['Sichuan Pepper', 'Lavender', 'Pink Pepper', 'Geranium', 'Elemi'],
      base: ['Ambroxan', 'Cedar', 'Patchouli', 'Vetiver']
    },
    fragranceFamily: 'Aromatic Fougere',
    year: 2015,
    source: 'fragrantica.com',
    description: 'A fresh-spicy fragrance inspired by wide-open spaces. Raw and noble with powerful freshness, the most successful cologne globally with Johnny Depp as the face.',
    confidence: 1.0,
    perfumer: 'François Demachy'
  },
  {
    id: 'sauvage-eau-de-parfum',
    name: 'Sauvage Eau de Parfum',
    brand: 'Dior',
    notes: {
      top: ['Bergamot'],
      middle: ['Sichuan Pepper', 'Lavender', 'Star Anise', 'Nutmeg'],
      base: ['Ambroxan', 'Vanilla']
    },
    fragranceFamily: 'Oriental Fougere',
    year: 2018,
    source: 'fragrantica.com',
    description: 'An enveloping, suave, mysterious and sensual interpretation with oriental and vanilla facets. More rounded than the EDT.',
    confidence: 1.0,
    perfumer: 'François Demachy'
  },
  {
    id: 'sauvage-elixir',
    name: 'Sauvage Elixir',
    brand: 'Dior',
    notes: {
      top: ['Nutmeg', 'Cinnamon', 'Cardamom', 'Grapefruit'],
      middle: ['Lavender'],
      base: ['Licorice', 'Sandalwood', 'Amber', 'Patchouli', 'Haitian Vetiver']
    },
    fragranceFamily: 'Aromatic',
    year: 2021,
    source: 'fragrantica.com',
    description: 'The most concentrated and powerful Sauvage with spicy, woody notes and extreme longevity. Features prominent licorice and spices.',
    confidence: 1.0,
    perfumer: 'François Demachy'
  },
  {
    id: 'jadore-eau-de-parfum',
    name: 'J\'adore Eau de Parfum',
    brand: 'Dior',
    notes: {
      top: ['Pear', 'Melon', 'Magnolia', 'Peach', 'Mandarin Orange', 'Bergamot'],
      middle: ['Jasmine', 'Lily-of-the-Valley', 'Tuberose', 'Freesia', 'Rose', 'Orchid', 'Violet', 'Plum'],
      base: ['Musk', 'Vanilla', 'Cedar', 'Blackberry']
    },
    fragranceFamily: 'Floral Fruity',
    year: 1999,
    source: 'fragrantica.com',
    description: 'A modern, glamorous fragrance that became incredibly popular. A luminous, golden scent that shimmers like sunbeams, housed in an amphora bottle.',
    confidence: 1.0,
    perfumer: 'Calice Becker'
  },
  {
    id: 'jadore-lor-2023',
    name: 'J\'adore L\'Or',
    brand: 'Dior',
    notes: {
      top: ['Orange Blossom'],
      middle: ['Jasmine Grandiflorum', 'Centifolia Rose'],
      base: ['Vanilla', 'Tonka Bean']
    },
    fragranceFamily: 'Floral',
    year: 2023,
    source: 'fragrantica.com',
    description: 'Francis Kurkdjian\'s masterful balance of absolutes. A full and voluptuous perfume essence showcasing the gold of J\'adore flowers.',
    confidence: 1.0,
    perfumer: 'Francis Kurkdjian'
  },
  {
    id: 'miss-dior-eau-de-parfum-2021',
    name: 'Miss Dior Eau de Parfum',
    brand: 'Dior',
    notes: {
      top: ['Iris', 'Peony', 'Lily-of-the-Valley'],
      middle: ['Rose', 'Apricot', 'Peach'],
      base: ['Vanilla', 'Musk', 'Tonka Bean', 'Sandalwood', 'Benzoin']
    },
    fragranceFamily: 'Oriental Floral',
    year: 2021,
    source: 'fragrantica.com',
    description: 'Based on Centifolia rose with honey and peppery notes. A velvety heart with powdery iris notes, like an olfactory millefiori.',
    confidence: 1.0,
    perfumer: 'François Demachy'
  },
  {
    id: 'miss-dior-parfum-2024',
    name: 'Miss Dior Parfum',
    brand: 'Dior',
    notes: {
      top: ['Apricot', 'Peach', 'Mandarin Orange'],
      middle: ['Wild Strawberry', 'Floral Notes', 'Jasmine'],
      base: ['Patchouli', 'Amberwood', 'Amber', 'Moss', 'Atlas Cedar']
    },
    fragranceFamily: 'Oriental Floral',
    year: 2024,
    source: 'fragrantica.com',
    description: 'A special rendition by Francis Kurkdjian with a sensual woody base. Features wild strawberry and a sophisticated amber accord.',
    confidence: 1.0,
    perfumer: 'Francis Kurkdjian, François Demachy'
  },
  {
    id: 'hypnotic-poison',
    name: 'Hypnotic Poison',
    brand: 'Dior',
    notes: {
      top: ['Coconut', 'Plum', 'Apricot'],
      middle: ['Brazilian Rosewood', 'Jasmine', 'Caraway', 'Tuberose', 'Rose', 'Lily-of-the-Valley'],
      base: ['Vanilla', 'Almond', 'Sandalwood', 'Musk']
    },
    fragranceFamily: 'Oriental Vanilla',
    year: 1998,
    source: 'fragrantica.com',
    description: 'A magnetic oriental vanilla that revolutionized perfumery. Seductive and intoxicating with bitter almond and creamy vanilla.',
    confidence: 1.0,
    perfumer: 'Annick Menardo, Christian Dussoulier'
  },
  {
    id: 'poison',
    name: 'Poison',
    brand: 'Dior',
    notes: {
      top: ['Coriander', 'Wild Berries', 'Orange Honey'],
      middle: ['Tuberose', 'Jasmine', 'Rose'],
      base: ['Opoponax', 'Amber', 'Sandalwood', 'Musk']
    },
    fragranceFamily: 'Oriental Floral',
    year: 1985,
    source: 'fragrantica.com',
    description: 'The revolutionary forbidden fruit that became a legend. Dark, mysterious and elegant with enigmatic profoundness.',
    confidence: 1.0,
    perfumer: 'Edouard Flechier'
  },
  {
    id: 'dior-homme-intense-2011',
    name: 'Dior Homme Intense',
    brand: 'Dior',
    notes: {
      top: ['Lavender'],
      middle: ['Iris', 'Ambrette', 'Pear'],
      base: ['Virginia Cedar', 'Vetiver', 'Vanilla']
    },
    fragranceFamily: 'Oriental Woody',
    year: 2011,
    source: 'fragrantica.com',
    description: 'The epitome of elegance with lipsticky iris and vanilla. A powdery, sophisticated masterpiece considered the designer GOAT by many.',
    confidence: 1.0,
    perfumer: 'François Demachy'
  },
  {
    id: 'dior-homme-2020',
    name: 'Dior Homme',
    brand: 'Dior',
    notes: {
      top: ['Bergamot', 'Pink Pepper', 'Elemi'],
      middle: ['Atlas Cedar', 'Cashmere Wood', 'Patchouli'],
      base: ['Iso E Super', 'Haitian Vetiver', 'White Musk']
    },
    fragranceFamily: 'Woody Aromatic',
    year: 2020,
    source: 'fragrantica.com',
    description: 'A modern, clean interpretation abandoning the iris for a woody aromatic profile. Features prominent Iso E Super for muskiness.',
    confidence: 1.0,
    perfumer: 'François Demachy'
  },
  {
    id: 'dior-homme-parfum',
    name: 'Dior Homme Parfum',
    brand: 'Dior',
    notes: {
      top: ['Iris'],
      middle: ['Leather', 'Ambrette'],
      base: ['Sandalwood', 'Woody Notes', 'Vetiver']
    },
    fragranceFamily: 'Leather',
    year: 2014,
    source: 'fragrantica.com',
    description: 'The very essence of Dior Homme in unusual concentration. Noble Tuscan iris with Sri Lankan sandalwood and dark leather.',
    confidence: 1.0,
    perfumer: 'François Demachy'
  },
  {
    id: 'eau-sauvage',
    name: 'Eau Sauvage',
    brand: 'Dior',
    notes: {
      top: ['Lemon', 'Bergamot', 'Basil', 'Rosemary', 'Caraway', 'Fruity Notes'],
      middle: ['Jasmine', 'Coriander', 'Carnation', 'Patchouli', 'Orris Root', 'Sandalwood', 'Rose', 'Lavender', 'Hedione'],
      base: ['Oakmoss', 'Vetiver', 'Musk', 'Amber']
    },
    fragranceFamily: 'Citrus Aromatic',
    year: 1966,
    source: 'fragrantica.com',
    description: 'A legendary fresh perfume by Edmond Roudnitska. Clear lemon and bitter-fresh rosemary with masculine woody base. An institution.',
    confidence: 1.0,
    perfumer: 'Edmond Roudnitska'
  },
  {
    id: 'eau-sauvage-parfum-2017',
    name: 'Eau Sauvage Parfum',
    brand: 'Dior',
    notes: {
      top: ['Calabrian Bergamot', 'Citron'],
      middle: ['Lavender', 'Haitian Vetiver'],
      base: ['Elemi', 'Woody Notes']
    },
    fragranceFamily: 'Citrus Woody',
    year: 2017,
    source: 'fragrantica.com',
    description: 'A modern reinterpretation closer to the original signature. Fresh balsamic masterpiece blending citrus with vetiver and elemi.',
    confidence: 1.0,
    perfumer: 'François Demachy'
  },
  {
    id: 'jadore-parfum-deau',
    name: 'J\'adore Parfum d\'Eau',
    brand: 'Dior',
    notes: {
      top: ['Jasmine Sambac', 'Magnolia'],
      middle: ['Rose', 'Honeysuckle', 'Neroli'],
      base: ['Orange Blossom', 'White Musk']
    },
    fragranceFamily: 'Floral',
    year: 2022,
    source: 'fragrantica.com',
    description: 'An alcohol-free, water-based interpretation. A smooth white floral veil that smells like silk sheets on a spring night.',
    confidence: 1.0,
    perfumer: 'François Demachy'
  },
  {
    id: 'dior-homme-cologne-2022',
    name: 'Dior Homme Cologne',
    brand: 'Dior',
    notes: {
      top: ['Calabrian Bergamot'],
      middle: ['Grapefruit Blossom'],
      base: ['White Musk']
    },
    fragranceFamily: 'Citrus Aromatic',
    year: 2022,
    source: 'fragrantica.com',
    description: 'Minimalist fresh fragrance with realistic lemon and creamy musk. Light, clean DNA perfect for casual everyday wear.',
    confidence: 1.0,
    perfumer: 'François Demachy'
  },

  ///GUERLAIN PERFUMES///
  {
    id: 'shalimar-parfum',
    name: 'Shalimar',
    brand: 'Guerlain',
    notes: {
      top: ['Bergamot', 'Lemon', 'Mandarin Orange', 'Floral Notes'],
      middle: ['Iris', 'Rose', 'Jasmine', 'Vetiver', 'Patchouli'],
      base: ['Vanilla', 'Tonka Bean', 'Incense', 'Leather', 'Sandalwood', 'Opoponax', 'Civet', 'Musk']
    },
    fragranceFamily: 'Oriental',
    year: 1925,
    source: 'fragrantica.com',
    description: 'The first oriental perfume in history. A legendary creation inspired by the love story between Emperor Shah Jahan and Princess Mumtaz Mahal. Features revolutionary use of ethyl vanillin.',
    confidence: 1.0,
    perfumer: 'Jacques Guerlain'
  },
  {
    id: 'lheure-bleue',
    name: 'L\'Heure Bleue',
    brand: 'Guerlain',
    notes: {
      top: ['Anise', 'Bergamot', 'Coriander', 'Neroli', 'Lemon'],
      middle: ['Heliotrope', 'Carnation', 'Violet', 'Cloves', 'Neroli', 'Ylang-Ylang', 'Bulgarian Rose', 'Jasmine', 'Orchid', 'Tuberose'],
      base: ['Iris', 'Vanilla', 'Tonka Bean', 'Benzoin', 'Sandalwood', 'Musk', 'Vetiver']
    },
    fragranceFamily: 'Oriental Floral',
    year: 1912,
    source: 'fragrantica.com',
    description: 'The scent of twilight, "the suspended hour" when day meets night. A powdery, romantic masterpiece with anise and violet accents.',
    confidence: 1.0,
    perfumer: 'Jacques Guerlain'
  },
  {
    id: 'mitsouko',
    name: 'Mitsouko',
    brand: 'Guerlain',
    notes: {
      top: ['Bergamot', 'Citruses', 'Jasmine', 'Rose'],
      middle: ['Peach', 'Ylang-Ylang', 'Jasmine', 'Rose', 'Lilac'],
      base: ['Oakmoss', 'Spices', 'Cinnamon', 'Vetiver', 'Amber', 'Patchouli', 'Labdanum']
    },
    fragranceFamily: 'Chypre Fruity',
    year: 1919,
    source: 'fragrantica.com',
    description: 'Revolutionary chypre combining fruity peach with woody patchouli for the first time. Named after a character in Claude Farrère\'s novel. Symbol of strong femininity.',
    confidence: 1.0,
    perfumer: 'Jacques Guerlain'
  },
  {
    id: 'jicky',
    name: 'Jicky',
    brand: 'Guerlain',
    notes: {
      top: ['Lemon', 'Bergamot', 'Mandarin', 'Rosemary'],
      middle: ['Lavender', 'Rosemary', 'Basil'],
      base: ['Vanilla', 'Tonka Bean', 'Benzoin', 'Amber', 'Sandalwood', 'Civet', 'Spices']
    },
    fragranceFamily: 'Oriental Fougere',
    year: 1889,
    source: 'fragrantica.com',
    description: 'The first modern perfume and first to use synthetic coumarin. A groundbreaking aromatic lavender-vanilla creation that transcends gender.',
    confidence: 1.0,
    perfumer: 'Aimé Guerlain'
  },
  {
    id: 'mon-guerlain',
    name: 'Mon Guerlain',
    brand: 'Guerlain',
    notes: {
      top: ['Lavender', 'Bergamot'],
      middle: ['Iris', 'Jasmine Sambac', 'Rose'],
      base: ['Tahitian Vanilla', 'Coumarin', 'Australian Sandalwood', 'Licorice', 'Benzoin', 'Patchouli']
    },
    fragranceFamily: 'Oriental Woody',
    year: 2017,
    source: 'fragrantica.com',
    description: 'A modern manifesto of femininity with Angelina Jolie as the face. Features exceptional lavender and vanilla in perfect balance.',
    confidence: 1.0,
    perfumer: 'Thierry Wasser, Delphine Jelk'
  },
  {
    id: 'habit-rouge',
    name: 'Habit Rouge',
    brand: 'Guerlain',
    notes: {
      top: ['Lemon', 'Orange', 'Bergamot', 'Basil', 'Rosewood', 'Pimento'],
      middle: ['Carnation', 'Sandalwood', 'Patchouli', 'Cedar', 'Rose', 'Cinnamon'],
      base: ['Vanilla', 'Amber', 'Leather', 'Oakmoss', 'Benzoin', 'Labdanum']
    },
    fragranceFamily: 'Oriental Woody',
    year: 1965,
    source: 'fragrantica.com',
    description: 'The first amber fragrance for men, inspired by equestrian red jackets. A mix of earth, warm leather and forest notes.',
    confidence: 1.0,
    perfumer: 'Jean-Paul Guerlain'
  },
  {
    id: 'vetiver-guerlain',
    name: 'Vétiver',
    brand: 'Guerlain',
    notes: {
      top: ['Bergamot', 'Lemon', 'Neroli', 'Coriander', 'Mandarin'],
      middle: ['Vetiver', 'Cedar', 'Pepper'],
      base: ['Vetiver', 'Tobacco', 'Nutmeg', 'Tonka Bean', 'Oakmoss']
    },
    fragranceFamily: 'Woody Aromatic',
    year: 1959,
    source: 'fragrantica.com',
    description: 'Jean-Paul Guerlain\'s first solo creation. The reference vetiver fragrance with earthy, fresh and sophisticated character.',
    confidence: 1.0,
    perfumer: 'Jean-Paul Guerlain'
  },
  {
    id: 'samsara',
    name: 'Samsara',
    brand: 'Guerlain',
    notes: {
      top: ['Bergamot', 'Lemon', 'Tarragon', 'Peach'],
      middle: ['Jasmine', 'Rose', 'Ylang-Ylang', 'Narcissus', 'Orris', 'Violet'],
      base: ['Sandalwood', 'Vanilla', 'Tonka Bean', 'Amber', 'Musk']
    },
    fragranceFamily: 'Oriental Woody',
    year: 1989,
    source: 'fragrantica.com',
    description: 'A harmonious, enveloping perfume centered on sandalwood and jasmine. Named after the Sanskrit word for eternal rebirth.',
    confidence: 1.0,
    perfumer: 'Jean-Paul Guerlain'
  },
  {
    id: 'la-petite-robe-noire',
    name: 'La Petite Robe Noire',
    brand: 'Guerlain',
    notes: {
      top: ['Black Cherry', 'Berries', 'Almond', 'Bergamot'],
      middle: ['Rose', 'Licorice', 'Smoked Tea'],
      base: ['Vanilla', 'Anise', 'Tonka Bean', 'Patchouli', 'Iris']
    },
    fragranceFamily: 'Oriental Floral',
    year: 2012,
    source: 'fragrantica.com',
    description: 'Inspired by the little black dress. A modern gourmand with cherry and licorice, Guerlain\'s best-selling fragrance as of 2017.',
    confidence: 1.0,
    perfumer: 'Thierry Wasser'
  },
  {
    id: 'tobacco-honey',
    name: 'Tobacco Honey',
    brand: 'Guerlain',
    notes: {
      top: ['Honey', 'Tobacco'],
      middle: ['Sesame', 'Clove', 'Anise'],
      base: ['Sandalwood', 'Oud', 'Vanilla', 'Tonka Bean']
    },
    fragranceFamily: 'Oriental',
    year: 2023,
    source: 'fragrantica.com',
    description: 'Part of L\'Art & La Matière collection. Photorealistic honey dripped over expensive tobacco with exceptional longevity and projection.',
    confidence: 1.0,
    perfumer: 'Delphine Jelk'
  },
  {
    id: 'shalimar-souffle-de-parfum',
    name: 'Shalimar Souffle de Parfum',
    brand: 'Guerlain',
    notes: {
      top: ['Lemon', 'Bergamot', 'Mandarin Orange'],
      middle: ['Orange Blossom', 'Jasmine Sambac'],
      base: ['Indian Vanilla', 'Tahitian Vanilla', 'White Musk']
    },
    fragranceFamily: 'Oriental Floral',
    year: 2014,
    source: 'fragrantica.com',
    description: 'A modern, airy interpretation of classic Shalimar in a blue bottle. Fluffy lemon tart with delicate florals and vanilla.',
    confidence: 1.0,
    perfumer: 'Thierry Wasser'
  },
  {
    id: 'lhomme-ideal',
    name: 'L\'Homme Idéal',
    brand: 'Guerlain',
    notes: {
      top: ['Citrus', 'Rosemary', 'Orange Blossom'],
      middle: ['Almond', 'Tonka Bean'],
      base: ['Leather', 'Cedar', 'Vetiver']
    },
    fragranceFamily: 'Oriental Woody',
    year: 2014,
    source: 'fragrantica.com',
    description: 'The ideal man fragrance with captivating almond amaretto heart. Intelligence meets sensuality in this modern masculine.',
    confidence: 1.0,
    perfumer: 'Thierry Wasser'
  },
  {
    id: 'aqua-allegoria-mandarine-basilic',
    name: 'Aqua Allegoria Mandarine Basilic',
    brand: 'Guerlain',
    notes: {
      top: ['Mandarin Orange', 'Orange', 'Bergamot'],
      middle: ['Basil', 'Green Tea', 'Petitgrain'],
      base: ['Sandalwood', 'Amber', 'Woody Notes']
    },
    fragranceFamily: 'Citrus Aromatic',
    year: 1999,
    source: 'fragrantica.com',
    description: 'Part of the Aqua Allegoria collection celebrating nature. A sparkling citrus with aromatic basil and green tea accents.',
    confidence: 1.0,
    perfumer: 'Mathilde Laurent'
  },

  {
    id: 'aqua-allegoria-orange-soleia',
    name: 'Aqua Allegoria Orange Soleia',
    brand: 'Guerlain',
    notes: {
      top: ['Blood Orange', 'Bergamot', 'Pink Pepper'],
      middle: ['Petitgrain', 'Mint'],
      base: ['Musk', 'Tonka Bean']
    },
    fragranceFamily: 'Citrus',
    year: 2020,
    source: 'fragrantica.com',
    description: 'Part of the Aqua Allegoria collection celebrating nature. A sparkling citrus with floral accents.',
    confidence: 1.0,
    perfumer: 'Mathilde Laurent'
  },

  {
    id: 'terracotta-le-parfum',
    name: 'Terracotta Le Parfum',
    brand: 'Guerlain',
    notes: {
      top: ['Tiare Flower', 'Coconut', 'Bergamot'],
      middle: ['Jasmine', 'Ylang-Ylang', 'Orange Blossom'],
      base: ['Vanilla', 'Musk']
    },
    fragranceFamily: 'Floral',
    year: 2014,
    source: 'fragrantica.com',
    confidence: 1.0,
    perfumer: 'Mathilde Laurent'
  },

  {
    id: 'insolence',
    name: 'Insolence',
    brand: 'Guerlain',
    notes: {
      top: ['Bergamot', 'Red Berries', 'Lemon'],
      middle: ['Violet', 'Rose', 'Orange Blossom'],
      base: ['Iris', 'Tonka Bean', 'Sandalwood', 'Musk']
    },
    fragranceFamily: 'Oriental Floral',
    year: 2006,
    source: 'fragrantica.com',
    description: 'A bold, powdery violet fragrance with iris. Playful and impertinent, designed for audacious women.',
    confidence: 1.0,
    perfumer: 'Maurice Roucel, Sylvaine Delacourte'
  },

  {
    id: 'apres-londee',
    name: 'Après l\'Ondée',
    brand: 'Guerlain',
    notes: {
      top: ['Anise', 'Bergamot', 'Neroli'],
      middle: ['Violet', 'Heliotrope', 'Iris', 'Rose'],
      base: ['Vanilla', 'Benzoin', 'Musk', 'Vetiver']
    },
    fragranceFamily: 'Floral',
    year: 1906,
    source: 'fragrantica.com',
    description: 'The scent after a spring rain shower. A delicate, melancholic violet and iris composition with ethereal beauty.',
    confidence: 1.0,
    perfumer: 'Jacques Guerlain'
  },

  {
    id: 'nahema',
    name: 'Nahéma',
    brand: 'Guerlain',
    notes: {
      top: ['Peach', 'Bergamot', 'Aldehydes', 'Green Notes'],
      middle: ['Rose', 'Jasmine', 'Lily-of-the-Valley', 'Ylang-Ylang', 'Hyacinth'],
      base: ['Sandalwood', 'Vanilla', 'Balsam Peru', 'Vetiver', 'Benzoin']
    },
    fragranceFamily: 'Oriental Floral',
    year: 1979,
    source: 'fragrantica.com',
    description: 'A passionate rose oriental inspired by Arabian Nights. Opulent, fruity rose with aldehydes and rich balsamic base.',
    confidence: 1.0,
    perfumer: 'Jean-Paul Guerlain'
  },
    
    ///Yves Saint Laurent PERFUMES///
     {
    id: 'ysl-kouros',
    name: 'Kouros',
    brand: 'Yves Saint Laurent',
    notes: {
      top: ['Aldehydes', 'Coriander', 'Clary Sage', 'Artemisia'],
      middle: ['Lavender', 'Geranium', 'Cinnamon', 'Jasmine'],
      base: ['Honey', 'Leather', 'Oakmoss', 'Musk', 'Patchouli', 'Vetiver']
    },
    fragranceFamily: 'Aromatic Fougère',
    year: 1981,
    source: 'fragrantica.com',
    description: 'A legendary animalic masterpiece inspired by Greek youth and masculinity. Known as "The Scent of the Gods," it combines aromatic and leathery notes with an overdose of lavender for a bold, subversive signature. Raw and powerful with exceptional longevity.',
    confidence: 1.0,
    perfumer: 'Pierre Bourdon'
  },

  {
    id: 'ysl-opium-parfum',
    name: 'Opium Parfum',
    brand: 'Yves Saint Laurent',
    notes: {
      top: ['Cloves', 'Pepper', 'Mandarin Orange', 'Coriander', 'Plum', 'Bergamot'],
      middle: ['Carnation', 'Cinnamon', 'Patchouli', 'Sandalwood', 'Rose', 'Orris Root'],
      base: ['Myrrh', 'Incense', 'Amber', 'Tolu Balsam', 'Vanilla', 'Opoponax', 'Benzoin']
    },
    fragranceFamily: 'Oriental',
    year: 1977,
    source: 'fragrantica.com',
    description: 'The controversial masterpiece that elevated the Oriental family to another level. A construction of luxury, lust, and extreme elegance with notes of myrrh, vanilla, woods, and extremely spicy accents. Created as a smell of fragrance addiction and sensuality.',
    confidence: 1.0,
    perfumer: 'Jean Amic, Jean-Louis Sieuzac'
  },

  {
    id: 'ysl-paris',
    name: 'Paris',
    brand: 'Yves Saint Laurent',
    notes: {
      top: ['Rose', 'Mimosa', 'Hyacinth', 'Geranium', 'Green Notes', 'Orange Blossom', 'Bergamot'],
      middle: ['Rose', 'Violet', 'Lily', 'Ylang-Ylang', 'Lime Blossom', 'Lily-of-the-Valley', 'Jasmine'],
      base: ['Iris', 'Heliotrope', 'Musk', 'Sandalwood', 'Oakmoss', 'Amber', 'Cedar']
    },
    fragranceFamily: 'Floral',
    year: 1983,
    source: 'fragrantica.com',
    description: 'A tribute to Parisiennes who are elegant, romantic, vivacious, and charming. The embodiment of femininity in a bottle, featuring a complex rose-violet composition that smells like joy, hope, and innocence. A painterly fragrance that captures the blinding beauty of Paris in spring.',
    confidence: 1.0,
    perfumer: 'Sophia Grojsman'
  },

  {
    id: 'ysl-la-nuit-de-lhomme',
    name: 'La Nuit de l\'Homme',
    brand: 'Yves Saint Laurent',
    notes: {
      top: ['Cardamom', 'Bergamot'],
      middle: ['Lavender', 'Cedar'],
      base: ['Cumin', 'Vetiver']
    },
    fragranceFamily: 'Oriental Spicy',
    year: 2009,
    source: 'fragrantica.com',
    description: 'A fragrance full of contrasts and tensions with a veil of mystery. Features explosive spicy accord revealing cardamom with sparkling bergamot, lavender and cedar for masculine strength. Cumin and vetiver ensure a sensual, elegant closure. Known for being incredibly appealing to women despite poor performance.',
    confidence: 1.0,
    perfumer: 'Anne Flipo, Pierre Wargnye, Dominique Ropion'
  },

  {
    id: 'ysl-black-opium',
    name: 'Black Opium',
    brand: 'Yves Saint Laurent',
    notes: {
      top: ['Pink Pepper', 'Orange Blossom', 'Pear'],
      middle: ['Coffee', 'Jasmine', 'Bitter Almond'],
      base: ['Vanilla', 'Patchouli', 'Cedar']
    },
    fragranceFamily: 'Oriental Gourmand',
    year: 2014,
    source: 'fragrantica.com',
    description: 'A rock\'n\'roll interpretation of the classic Opium, highlighting the dark, mysterious side of YSL. Features dominant coffee notes with sweet vanilla and white flowers. The seductively intoxicating fragrance plays on the radical tension between dark coffee bitterness and luminous femininity.',
    confidence: 1.0,
    perfumer: 'Nathalie Lorson, Marie Salamagne, Olivier Cresp, Honorine Blanc'
  },

  {
    id: 'ysl-mon-paris',
    name: 'Mon Paris',
    brand: 'Yves Saint Laurent',
    notes: {
      top: ['Strawberry', 'Raspberry', 'Pear', 'Orange', 'Calabrian Bergamot'],
      middle: ['Peony', 'Jasmine Sambac', 'Datura', 'Orange Blossom'],
      base: ['Indonesian Patchouli', 'White Musk', 'Vanilla', 'Ambroxan', 'Cedar']
    },
    fragranceFamily: 'Chypre Fruity',
    year: 2016,
    source: 'fragrantica.com',
    description: 'A dazzling fragrance representing modern olfactory interpretation of love, free from obstacles. Opens with juicy fruits, intoxicating floral heart, and dark chypre base. A passionate declaration of love like shouting "JE T\'AIME" from the Eiffel Tower.',
    confidence: 1.0,
    perfumer: 'Olivier Cresp, Harry Fremont, Dora Baghriche'
  },

  {
    id: 'ysl-y-eau-de-parfum',
    name: 'Y Eau de Parfum',
    brand: 'Yves Saint Laurent',
    notes: {
      top: ['Bergamot', 'Ginger', 'Apple'],
      middle: ['Sage', 'Geranium', 'Juniper Berries'],
      base: ['Vetiver', 'Cedar', 'Tonka Bean', 'Amberwood', 'Olibanum']
    },
    fragranceFamily: 'Aromatic Fougère',
    year: 2018,
    source: 'fragrantica.com',
    description: 'A seductive fragrance interpretation of YSL\'s iconic white T-shirt and black jacket. Deep, fresh and masculine with aromatic, spicy, woody features. Represents a white-collar Y generation man: urban, dynamic, stylish and self-confident.',
    confidence: 1.0,
    perfumer: 'Dominique Ropion'
  },

  {
    id: 'ysl-libre',
    name: 'Libre',
    brand: 'Yves Saint Laurent',
    notes: {
      top: ['Lavender', 'Mandarin Orange', 'Black Currant', 'Petitgrain'],
      middle: ['Lavender', 'Orange Blossom', 'Jasmine'],
      base: ['Madagascar Vanilla', 'Musk', 'Cedar', 'Ambergris']
    },
    fragranceFamily: 'Oriental Fougère',
    year: 2019,
    source: 'fragrantica.com',
    description: 'A daring scent for a daring woman. The tension between the burning sensuality of orange blossom from Morocco and the boldness of French lavender. The hottest fragrance ever created, capturing the spirit of freedom and self-expression.',
    confidence: 1.0,
    perfumer: 'Anne Flipo, Carlos Benaïm'
  },

  {
    id: 'ysl-y-le-parfum',
    name: 'Y Le Parfum',
    brand: 'Yves Saint Laurent',
    notes: {
      top: ['Grapefruit', 'Apple Accord', 'Ginger', 'Aldehydes'],
      middle: ['Sage', 'Lavender Essence', 'Geranium Absolute'],
      base: ['Cedar', 'Olibanum', 'Tonka Bean', 'Patchouli Essence']
    },
    fragranceFamily: 'Oriental Fougère',
    year: 2021,
    source: 'fragrantica.com',
    description: 'A more intensive version of Y, announced as a powerful and dark fougère composition. Combines freshness and intensity resulting in elegance. Features bright opening with rich, sophisticated blend creating a smooth and clean beach vibe experience.',
    confidence: 1.0,
    perfumer: 'Dominique Ropion'
  },

  {
    id: 'ysl-myslf-eau-de-parfum',
    name: 'MYSLF Eau de Parfum',
    brand: 'Yves Saint Laurent',
    notes: {
      top: ['Calabrian Bergamot', 'Bergamot'],
      middle: ['Tunisian Orange Blossom'],
      base: ['Ambrofix™', 'Patchouli']
    },
    fragranceFamily: 'Aromatic',
    year: 2023,
    source: 'fragrantica.com',
    description: 'The expression of the man you are, with all emotions and nuances. A twist of traditional woody fragrance family with flowers. A statement of modern masculinity to celebrate your true self. Beautiful fresh citrus floral with modern appeal.',
    confidence: 1.0,
    perfumer: 'Christophe Raynaud, Antoine Maisondieu, Daniela Andrier'
  },

  {
    id: 'ysl-y-elixir',
    name: 'Y Elixir',
    brand: 'Yves Saint Laurent',
    notes: {
      top: ['Lavender'],
      middle: ['Geranium'],
      base: ['Frankincense', 'Oud']
    },
    fragranceFamily: 'Oriental Woody',
    year: 2024,
    source: 'fragrantica.com',
    description: 'The elixir of Y, the elixir of success. The quintessential fragrance for the self-accomplished man with the highest concentration of Y. Features exceptional quality Diva lavender from Provence and geranium from Ourika Community Gardens in Morocco, captured at 9:40 AM.',
    confidence: 1.0,
    perfumer: 'Dominique Ropion'
  },

  {
    id: 'ysl-myslf-le-parfum',
    name: 'MYSLF Le Parfum',
    brand: 'Yves Saint Laurent',
    notes: {
      top: ['Black Pepper'],
      middle: ['Orange Blossom'],
      base: ['Bourbon Vanilla', 'Amber', 'Woody Notes', 'Patchouli']
    },
    fragranceFamily: 'Oriental Woody',
    year: 2024,
    source: 'fragrantica.com',
    description: 'A more intense interpretation of MYSLF Eau de Parfum offering a deeper and more powerful experience. Not as bright as the original but just as alluring, featuring seductive mix of vanilla, patchouli and orange blossom that is utterly entrancing.',
    confidence: 1.0,
    perfumer: 'Daniela Andrier, Antoine Maisondieu, Christophe Raynaud'
  },

  {
    id: 'ysl-body-kouros',
    name: 'Body Kouros',
    brand: 'Yves Saint Laurent',
    notes: {
      top: ['Eucalyptus', 'Incense'],
      middle: ['Rose', 'Lavender', 'Sage'],
      base: ['Benzoin', 'Vetiver', 'Vanilla']
    },
    fragranceFamily: 'Oriental Spicy',
    year: 2000,
    source: 'fragrantica.com',
    description: 'A completely different take from the original Kouros. Reminiscent of spa and body massage oil, very soothing and comforting. Sleek, masculine class with cozy, sexy appeal. Features eucalyptus and incense opening with warm, peaceful drydown.',
    confidence: 1.0,
    perfumer: 'Annick Menardo'
  },

  {
    id: 'ysl-muse',
    name: 'Muse',
    brand: 'Yves Saint Laurent',
    notes: {
      top: ['Ink Accord', 'Bergamot'],
      middle: ['Iris Concrete', 'Lavender'],
      base: ['Bourbon Vanilla Absolute', 'Woody Notes']
    },
    fragranceFamily: 'Woody Aromatic',
    year: 2025,
    source: 'fragrantica.com',
    description: 'From Le Vestiaire des Parfums, characterized by enigmatic ink accord. Features woody notes with smoky facets, complemented by iris concrete and vanilla absolute. A \'skin perfume\' that stimulates imagination with creative and mysterious colors.',
    confidence: 1.0,
    perfumer: 'Marie Salamagne'
  },

  {
    id: 'ysl-y-le-parfum-2025',
    name: 'Y Le Parfum 2025',
    brand: 'Yves Saint Laurent',
    notes: {
      top: ['Bergamot', 'Ginger'],
      middle: ['Fir Balsam', 'Midnight Pine Accord', 'Ourika Geranium'],
      base: ['Patchouli', 'Amber']
    },
    fragranceFamily: 'Aromatic Woody',
    year: 2025,
    source: 'fragrantica.com',
    description: 'A daring addition to the Y collection redefining sophistication with bold, nature-inspired composition. Features resinous fir balsam with balsamic and fruity nuances paired with unique midnight pine accord and exceptional Moroccan geranium.',
    confidence: 1.0,
    perfumer: 'Dominique Ropion'
  },

      ///VERSACE PERFUMES///
    {
      id: 'versace-bright-crystal',
      name: 'Bright Crystal',
      brand: 'Versace',
      notes: {
        top: ['Pomegranate', 'Yuzu', 'Ice'],
        middle: ['Peony', 'Magnolia', 'Lotus'],
        base: ['Plant Amber', 'Musk', 'Mahogany']
      },
      fragranceFamily: 'Floral',
      year: 2006,
      source: 'fragrantica.com',
      description: 'A luminous and voluptuous fragrance with crystalline transparency.',
      confidence: 1.0
    },

    {
    id: 'versace-eros',
    name: 'Eros',
    brand: 'Versace',
    notes: {
      top: ['Mint', 'Green Apple', 'Lemon'],
      middle: ['Tonka Bean', 'Ambroxan', 'Geranium'],
      base: ['Madagascar Vanilla', 'Virginian Cedar', 'Atlas Cedar', 'Vetiver', 'Oakmoss']
    },
    fragranceFamily: 'Aromatic Fougere',
    year: 2012,
    source: 'fragrantica.com',
    description: 'Inspired by and deeply connected with Greek mythology. The aim of this edition is to reveal and release unrestrained passion and to accentuate desire. Named after Greek god of love and son of goddess Aphrodite – Eros.',
    confidence: 1.0,
    perfumer: 'Aurélien Guichard'
  },
  {
    id: 'versace-dylan-blue-pour-homme',
    name: 'Dylan Blue Pour Homme',
    brand: 'Versace',
    notes: {
      top: ['Calabrian Bergamot', 'Water Notes', 'Grapefruit', 'Fig Leaf'],
      middle: ['Ambroxan', 'Black Pepper', 'Patchouli', 'Violet Leaf', 'Papyrus'],
      base: ['Incense', 'Musk', 'Tonka Bean', 'Saffron']
    },
    fragranceFamily: 'Aromatic Fougere',
    year: 2016,
    source: 'fragrantica.com',
    description: 'An aromatic, woody-fougere composition with fresh aquatic notes. Encapsulates the sensual scents of the Mediterranean with strong aquatic notes refreshed with citrus hints and enriched with spicy notes of rare saffron.',
    confidence: 1.0,
    perfumer: 'Alberto Morillas'
  },
  {
    id: 'versace-crystal-noir',
    name: 'Crystal Noir',
    brand: 'Versace',
    notes: {
      top: ['Pepper', 'Ginger', 'Cardamom'],
      middle: ['Coconut', 'Gardenia', 'Orange Blossom', 'Peony'],
      base: ['Sandalwood', 'Musk', 'Amber']
    },
    fragranceFamily: 'Oriental Floral',
    year: 2004,
    source: 'fragrantica.com',
    description: 'A rare essence, sensual and delicate. The central note is mysterious gardenia, fresh, sensual, luminous and creamy, reproduced by headspace technology. Oriental and musk in the base make the scent dark and mysterious.',
    confidence: 1.0,
    perfumer: 'Antoine Lie'
  },
  {
    id: 'versace-bright-crystal',
    name: 'Bright Crystal',
    brand: 'Versace',
    notes: {
      top: ['Yuzu', 'Pomegranate', 'Ice'],
      middle: ['Peony', 'Lotus', 'Magnolia'],
      base: ['Musk', 'Mahogany', 'Amber']
    },
    fragranceFamily: 'Floral Fruity',
    year: 2006,
    source: 'fragrantica.com',
    description: 'A softer and more luminous fragrance compared to Crystal Noir. The fruity note gives the composition a slightly gourmand nuance. Peony and magnolia are at the center, while watery fresh lotus moderates the intensity.',
    confidence: 1.0,
    perfumer: 'Alberto Morillas'
  },
  {
    id: 'versace-pour-homme',
    name: 'Versace Pour Homme',
    brand: 'Versace',
    notes: {
      top: ['Lemon', 'Bergamot', 'Neroli', 'Rose de Mai'],
      middle: ['Hyacinth', 'Cedar', 'Clary Sage', 'Geranium'],
      base: ['Musk', 'Tonka Bean', 'Amber']
    },
    fragranceFamily: 'Aromatic Fougere',
    year: 2008,
    source: 'fragrantica.com',
    description: 'A classic fresh masculine fragrance with a sophisticated and elegant character. Clean, business-appropriate scent with citrus opening that develops into warm, musky base notes. Universally wearable year-round.',
    confidence: 1.0,
    perfumer: 'Alberto Morillas'
  },
  {
    id: 'versace-man-eau-fraiche',
    name: 'Versace Man Eau Fraiche',
    brand: 'Versace',
    notes: {
      top: ['Lemon', 'Bergamot', 'Carambola (Star Fruit)', 'Cardamom', 'Brazilian Rosewood'],
      middle: ['Cedar', 'Tarragon', 'Sage', 'Pepper'],
      base: ['Musk', 'Woody Notes', 'Saffron', 'Amber', 'Sycamore']
    },
    fragranceFamily: 'Aromatic Aquatic',
    year: 2006,
    source: 'fragrantica.com',
    description: 'A fresher and more aquatic version of Versace Man. Has a Mediterranean quality with some woody notes. The star fruit note makes this perfume very easy to be liked by everyone.',
    confidence: 1.0,
    perfumer: 'Olivier Cresp'
  },
  {
    id: 'versace-eros-edp',
    name: 'Eros Eau de Parfum',
    brand: 'Versace',
    notes: {
      top: ['Mint', 'Candy Apple', 'Lemon', 'Mandarin Orange'],
      middle: ['Ambroxan', 'Geranium', 'Clary Sage'],
      base: ['Vanilla', 'Cedar', 'Sandalwood', 'Bitter Orange', 'Patchouli', 'Leather']
    },
    fragranceFamily: 'Oriental Woody',
    year: 2020,
    source: 'fragrantica.com',
    description: 'A more sophisticated and mature version of the original Eros. Replaces green apple with candy apple and adds more woods and leather to the base for increased maturity and elegance.',
    confidence: 1.0,
    perfumer: 'Not specified'
  },
  {
    id: 'versace-eros-flame',
    name: 'Eros Flame',
    brand: 'Versace',
    notes: {
      top: ['Italian Lemon', 'Mandarin Orange', 'Black Pepper', 'Rosemary'],
      middle: ['Geranium', 'Rose', 'Pepperwood'],
      base: ['Vanilla', 'Tonka Bean', 'Sandalwood', 'Patchouli']
    },
    fragranceFamily: 'Oriental Woody',
    year: 2018,
    source: 'fragrantica.com',
    description: 'A flanker to the original Eros. Goes into a totally different direction with citrusy, spicy, woody composition. The head notes are vivacious and fresh with Italian citruses, black pepper and rosemary.',
    confidence: 1.0,
    perfumer: 'Olivier Pescheux'
  },
  {
    id: 'versace-versense',
    name: 'Versense',
    brand: 'Versace',
    notes: {
      top: ['Bergamot', 'Green Mandarin', 'Fig Zest'],
      middle: ['Sea Lily', 'Jasmine Petals', 'Cardamom'],
      base: ['Sandalwood', 'Cedar', 'Olive Wood', 'Musk']
    },
    fragranceFamily: 'Woody Floral Musk',
    year: 2009,
    source: 'fragrantica.com',
    description: 'A modern fragrance composed of elements of the Mediterranean. Represents awakening of nature, evoking feelings of freedom, movement and balance. A walk in a fragrant garden with sparkling citruses mixed with fruity aromas.',
    confidence: 1.0,
    perfumer: 'Not specified'
  },
  {
    id: 'versace-dylan-blue-pour-femme',
    name: 'Dylan Blue Pour Femme',
    brand: 'Versace',
    notes: {
      top: ['Granny Smith Apple', 'Black Currant', 'Clover', 'Forget Me Not', 'Shiso'],
      middle: ['Peach', 'Petalia', 'Rose Hip', 'Rose', 'Jasmine'],
      base: ['Musk', 'White Woods', 'Patchouli', 'Styrax']
    },
    fragranceFamily: 'Floral Fruity',
    year: 2017,
    source: 'fragrantica.com',
    description: 'The female companion to Dylan Blue pour Homme. A floral-fruity-woody composition conceived so that uniqueness, strength, sensuality and elegance are represented by the upper, middle and base notes.',
    confidence: 1.0,
    perfumer: 'Calice Becker, Natalie Gracia-Cetto'
  },
  {
    id: 'versace-eros-parfum',
    name: 'Eros Parfum',
    brand: 'Versace',
    notes: {
      top: ['Mint', 'Lemon', 'Black Pepper', 'Elemi', 'Litsea Cubeba'],
      middle: ['Green Apple', 'Geranium', 'Lavender', 'Sage', 'Pomarose'],
      base: ['Tonka Bean', 'Amber', 'Vanilla', 'Patchouli', 'Benzoin']
    },
    fragranceFamily: 'Oriental Fougere',
    year: 2021,
    source: 'fragrantica.com',
    description: 'The most concentrated version of Eros with enhanced performance and complexity. Features additional spices in the opening and more sophisticated heart and base development.',
    confidence: 1.0,
    perfumer: 'Not specified'
  },
  {
    id: 'versace-eros-energy',
    name: 'Eros Energy',
    brand: 'Versace',
    notes: {
      top: ['Lemon', 'Lime', 'Grapefruit', 'Blood Orange', 'Sicilian Bergamot', 'Mandarin Orange'],
      middle: ['White Amber', 'Pink Pepper', 'Black Currant'],
      base: ['Musk', 'Oakmoss', 'Patchouli']
    },
    fragranceFamily: 'Citrus Aromatic',
    year: 2024,
    source: 'fragrantica.com',
    description: 'Inspired by the breathtaking beauty of the Mediterranean coastline. Features the freshness of its scenery, the wildness of the air, and the luxury of a vast Italian vacation. A unique freshness and sensuality.',
    confidence: 1.0,
    perfumer: 'Not specified'
  },
  {
    id: 'versace-woman',
    name: 'Versace Woman',
    brand: 'Versace',
    notes: {
      top: ['Rose', 'Jasmine Leaf', 'Bergamot'],
      middle: ['Raspberry', 'Plum', 'Lotus', 'Cedar'],
      base: ['Musk', 'Amber']
    },
    fragranceFamily: 'Floral Woody Musk',
    year: 2000,
    source: 'fragrantica.com',
    description: 'A modern light floral with fruity and woody nuances. The intense floral opening includes jasmine, wild rose, and bergamot. The powerful heart note is composed of lotus, plum, raspberry and Lebanese blue cedar.',
    confidence: 1.0,
    perfumer: 'Christine Nagel'
  },
  {
    id: 'versace-dylan-turquoise',
    name: 'Dylan Turquoise Pour Femme',
    brand: 'Versace',
    notes: {
      top: ['Lemon', 'Mandarin Orange', 'Pink Pepper'],
      middle: ['Guava', 'Freesia', 'Cassis', 'Jasmine'],
      base: ['Musk', 'Clearwood', 'Cedar']
    },
    fragranceFamily: 'Floral Fruity',
    year: 2020,
    source: 'fragrantica.com',
    description: 'A flanker of Dylan Blue inspired by an escape to the distant islands. Described as sensual, youthful and fresh, featuring tropical guava note that takes it into a more exotic direction.',
    confidence: 1.0,
    perfumer: 'Sophie Labbe'
  },
  {
    id: 'versace-eros-najim',
    name: 'Eros Najim',
    brand: 'Versace',
    notes: {
      top: ['Caramel', 'Italian Mandarin'],
      middle: ['Cardamom', 'Oud'],
      base: ['Incense', 'Patchouli', 'Vetiver']
    },
    fragranceFamily: 'Oriental Woody',
    year: 2024,
    source: 'fragrantica.com',
    description: 'A Middle East exclusive release offering a radiant olfactory experience with spicy cardamom, opulent oud, and the smoky elegance of incense complemented by the luscious embrace of caramel.',
    confidence: 1.0,
    perfumer: 'Not specified'
  },

    {
      id: 'armani-acqua-di-gio',
      name: 'Acqua di Gio',
      brand: 'Giorgio Armani',
      notes: {
        top: ['Lime', 'Lemon', 'Bergamot', 'Jasmine'],
        middle: ['Calone', 'Peach', 'Jasmine', 'Freesia'],
        base: ['White Musk', 'Cedar', 'Oakmoss', 'Patchouli']
      },
      fragranceFamily: 'Fresh',
      year: 1996,
      source: 'fragrantica.com',
      description: 'An aquatic fragrance inspired by the freshness of sea, sun and earth.',
      confidence: 1.0
    },

    {
      id: 'dolce-gabbana-light-blue',
      name: 'Light Blue',
      brand: 'Dolce & Gabbana',
      notes: {
        top: ['Lime', 'Cedar', 'Granny Smith Apple', 'Bellflower'],
        middle: ['Bamboo', 'Jasmine', 'White Rose'],
        base: ['Cedar', 'Amber', 'Musk']
      },
      fragranceFamily: 'Fresh',
      year: 2001,
      source: 'fragrantica.com',
      description: 'A fresh floral fragrance that evokes the spirit of the sensual Mediterranean summer.',
      confidence: 1.0
    },

    ///MARC JACOBS PERFUME ///
    {
      id: 'marc-jacobs-daisy',
      name: 'Daisy',
      brand: 'Marc Jacobs',
      notes: {
        top: ['Wild Berries', 'Grapefruit', 'Leaves'],
        middle: ['Violet Leaves', 'Jasmine', 'Gardenia'],
        base: ['Musk', 'Vanilla', 'White Woods']
      },
      fragranceFamily: 'Floral',
      year: 2007,
      source: 'fragrantica.com',
      description: 'A radiant floral bouquet that is whimsical and charming.',
      confidence: 1.0
    },

     {
    id: 'marc-jacobs-perfect',
    name: 'Perfect',
    brand: 'Marc Jacobs',
    notes: {
      top: ['Rhubarb', 'Narcissus'],
      middle: ['Almond Milk'],
      base: ['Cashmeran', 'Cedar']
    },
    fragranceFamily: 'Oriental Floral',
    year: 2020,
    source: 'fragrantica.com',
    description: 'A pleasant, sweet, and rich floral perfume. Easy to wear with moderate lasting power and provides a joyful, feminine, and sophisticated atmosphere. Perfect for the cool girl who watches Spike Jonze skate videos.',
    confidence: 1.0,
    perfumer: 'Domitille Michalon Bertier'
  },
  {
    id: 'marc-jacobs-lola',
    name: 'Lola',
    brand: 'Marc Jacobs',
    notes: {
      top: ['Pink Pepper', 'Pear', 'Grapefruit'],
      middle: ['Rose', 'Peony', 'Geranium'],
      base: ['Vanilla', 'Musk', 'Tonka Bean']
    },
    fragranceFamily: 'Floral Fruity',
    year: 2009,
    source: 'fragrantica.com',
    description: 'A strikingly rich rose fragrance with retro glamour. The rich and faceted quality attests to beautiful raw materials with a warm sensual base. Winner of FiFi Award Fragrance Foundation Women\'s Luxe 2010.',
    confidence: 1.0,
    perfumer: 'Yann Vasnier, Calice Becker'
  },
  {
    id: 'marc-jacobs-decadence',
    name: 'Decadence',
    brand: 'Marc Jacobs',
    notes: {
      top: ['Plum', 'Saffron', 'Iris'],
      middle: ['Orris', 'Jasmine Sambac', 'Bulgarian Rose'],
      base: ['Vetiver', 'Papyrus', 'Liquidambar']
    },
    fragranceFamily: 'Oriental Floral',
    year: 2015,
    source: 'fragrantica.com',
    description: 'Marc Jacobs\' first "mature" fragrance. While Daisy is the sweet girl next door and Lola is quirky, Decadence is sexy and sophisticated. A rich and elegant composition that transports you to a deep, dark jungle.',
    confidence: 1.0,
    perfumer: 'Annie Buzantian, Ann Gottlieb'
  },
  {
    id: 'marc-jacobs-bang',
    name: 'Bang',
    brand: 'Marc Jacobs',
    notes: {
      top: ['Pink Pepper', 'Pepperwood'],
      middle: ['Woody Notes'],
      base: ['Vetiver', 'Elemi Resin', 'Benzoin', 'Oakmoss', 'Patchouli']
    },
    fragranceFamily: 'Woody Spicy',
    year: 2010,
    source: 'fragrantica.com',
    description: 'Created for a contemporary guy who has a younger spirit. A fragrant explosion featuring intense pepper notes. Marc Jacobs wanted to do something spicy, especially pepper, as the starting place.',
    confidence: 1.0,
    perfumer: 'Ann Gottlieb, Yann Vasnier'
  },
  {
    id: 'marc-jacobs-original',
    name: 'Marc Jacobs',
    brand: 'Marc Jacobs',
    notes: {
      top: ['Gardenia', 'Bergamot'],
      middle: ['Tuberose', 'Jasmine', 'Honeysuckle', 'White Pepper'],
      base: ['Ginger', 'Cedar', 'Musk']
    },
    fragranceFamily: 'Floral Green',
    year: 2001,
    source: 'fragrantica.com',
    description: 'The first fragrance offering from Marc Jacobs. A sophisticated white floral that smells like the real thing - concentrated gardenia and tuberose. Like taking a shower in the middle of a gardenia rainforest.',
    confidence: 1.0,
    perfumer: 'Steve DeMercado, Loc Dong'
  },
  {
    id: 'marc-jacobs-perfect-elixir',
    name: 'Perfect Elixir',
    brand: 'Marc Jacobs',
    notes: {
      top: ['Plum', 'Honey', 'Rhubarb'],
      middle: ['Amber', 'Orange Blossom'],
      base: ['Vanilla', 'Resin', 'Patchouli']
    },
    fragranceFamily: 'Oriental Vanilla',
    year: 2024,
    source: 'fragrantica.com',
    description: 'A rich but balanced gourmand fragrance that\'s different and slightly addictive. Features strong notes of honey with a touch of vanilla and fruity plum. The only Perfect fragrance many would repurchase.',
    confidence: 1.0,
    perfumer: 'Domitille Michalon Bertier'
  },
  {
    id: 'marc-jacobs-oh-lola',
    name: 'Oh Lola!',
    brand: 'Marc Jacobs',
    notes: {
      top: ['Raspberry', 'Pear', 'Strawberry'],
      middle: ['Peony', 'Magnolia', 'Cyclamen'],
      base: ['Vanilla', 'Sandalwood', 'Tonka Bean']
    },
    fragranceFamily: 'Floral Fruity',
    year: 2011,
    source: 'fragrantica.com',
    description: 'Juicy and youthful, designed to refresh hot summer days. Described as lively, playful, irresistible, stylish and cheerful. Smells like Sweet-Tart candy - innocent, girly, and fruity with realistic notes.',
    confidence: 1.0,
    perfumer: 'Ann Gottlieb, Calice Becker, Yann Vasnier'
  },
  {
    id: 'marc-jacobs-daisy-wild',
    name: 'Daisy Wild',
    brand: 'Marc Jacobs',
    notes: {
      top: ['Banana Blossom'],
      middle: ['Jasmine', 'Macadamia'],
      base: ['Sandalwood', 'Vetiver des Sables']
    },
    fragranceFamily: 'Floral Woody',
    year: 2024,
    source: 'fragrantica.com',
    description: 'Bold, feminine, and fearless. Features banana blossom (never seen before in prestige perfumery) with exquisite jasmine and nutty vetiver. The first fully refillable Daisy fragrance that creates a new addictive scent.',
    confidence: 1.0,
    perfumer: 'Sonia Constant, Roxanne Kirkpatrick, Adriana Medina-Baez'
  },
  {
    id: 'marc-jacobs-bang-bang',
    name: 'Bang Bang',
    brand: 'Marc Jacobs',
    notes: {
      top: ['Cardamom', 'Watercress', 'Amalfi Lemon'],
      middle: ['Sandalwood'],
      base: ['Musk']
    },
    fragranceFamily: 'Woody Aromatic',
    year: 2011,
    source: 'fragrantica.com',
    description: 'A refreshing version of the original Bang. Described as dynamic, confident and cool, designed for independent men who strive for perfection. Much more well-rounded and smoother than the original.',
    confidence: 1.0,
    perfumer: 'Yann Vasnier'
  },
  {
    id: 'marc-jacobs-perfect-absolute',
    name: 'Perfect Absolute',
    brand: 'Marc Jacobs',
    notes: {
      top: ['Fig', 'Caramel'],
      middle: ['Jasmine'],
      base: ['Amber']
    },
    fragranceFamily: 'Oriental Floral',
    year: 2025,
    source: 'fragrantica.com',
    description: 'Features a caramelized fig accord in the top, a heart of jasmine absolute, and a rich amber base. Presented as a more intense and concentrated version within the Perfect collection. Probably the best Marc Jacobs fragrance according to many reviewers.',
    confidence: 1.0,
    perfumer: 'Not specified'
  },
  {
    id: 'marc-jacobs-daisy-wild-intense',
    name: 'Daisy Wild Eau So Intense',
    brand: 'Marc Jacobs',
    notes: {
      top: ['Banana Blossom'],
      middle: ['Jasmine Extract'],
      base: ['Amber', 'Sandalwood']
    },
    fragranceFamily: 'Floral Woody',
    year: 2025,
    source: 'fragrantica.com',
    description: 'A floral-woody composition that blends the delicate sweetness of banana blossom with the richness of jasmine extract. Inspired by vibrant and surprising encounters in the forest, delivering a bright and lively experience.',
    confidence: 1.0,
    perfumer: 'Not specified'
  },
  {
    id: 'marc-jacobs-men',
    name: 'Marc Jacobs Men',
    brand: 'Marc Jacobs',
    notes: {
      top: ['Cypress', 'Cardamom', 'Ginger', 'Bergamot', 'Cumin'],
      middle: ['Fig Leaf', 'Water Notes', 'Cyclamen', 'Rose'],
      base: ['Cedar', 'Tonka Bean', 'Oakmoss', 'Patchouli']
    },
    fragranceFamily: 'Woody Floral Musk',
    year: 2002,
    source: 'fragrantica.com',
    description: 'The companion men\'s scent to the original Marc Jacobs for Women. Features prominent fig leaf creating a soft, lactonic heaven. Imagine you are at the beach - has an aquatic, beachy quality.',
    confidence: 1.0,
    perfumer: 'Ralf Schwieger'
  },
  {
    id: 'marc-jacobs-divine-decadence',
    name: 'Divine Decadence',
    brand: 'Marc Jacobs',
    notes: {
      top: ['Champagne', 'Orange Blossom', 'Bergamot'],
      middle: ['Honeysuckle', 'Hortensia', 'Gardenia'],
      base: ['Vanilla', 'Saffron', 'Amber']
    },
    fragranceFamily: 'Oriental Floral',
    year: 2016,
    source: 'fragrantica.com',
    description: 'A lighter version of Decadence. A sparkling expression of glamour and luxury that gives indulgence a touch of brightness. Features effervescent champagne notes with elegant floral heart.',
    confidence: 1.0,
    perfumer: 'Not specified'
  },
  {
    id: 'marc-jacobs-decadence-eau-so-decadent',
    name: 'Decadence Eau So Decadent',
    brand: 'Marc Jacobs',
    notes: {
      top: ['Pear', 'Black Currant', 'Ivy'],
      middle: ['Magnolia', 'Lily-of-the-Valley', 'Jasmine'],
      base: ['White Amber', 'Raspberry', 'Cashmere Wood']
    },
    fragranceFamily: 'Floral Fruity',
    year: 2017,
    source: 'fragrantica.com',
    description: 'A much lighter, more floral and fruity version of Decadence. Perfect for day or night, provides a new way to indulge. Like strolling through a garden in springtime while eating a juicy pear.',
    confidence: 1.0,
    perfumer: 'Annie Buzantian'
  },  
    
    ///Chloé PERFUMES///
    
    {
    id: 'chloe-eau-de-parfum',
    name: 'Chloé Eau de Parfum',
    brand: 'Chloé',
    notes: {
      top: ['Peony', 'Litchi', 'Freesia'],
      middle: ['Rose', 'Lily-of-the-Valley', 'Magnolia'],
      base: ['Virginia Cedar', 'Amber']
    },
    fragranceFamily: 'Floral',
    year: 2008,
    source: 'fragrantica.com',
    description: 'A light and fresh yet seductively strong scent, the modern Chloé signature fragrance is feminine in a non-traditional way. A versatile everyday fragrance featuring a powdery rose.',
    confidence: 1.0,
    perfumer: 'Amandine Clerc-Marie, Michel Almairac'
  },
  {
    id: 'chloe-nomade',
    name: 'Nomade',
    brand: 'Chloé',
    notes: {
      top: ['Mirabelle', 'Bergamot', 'Lemon', 'Orange'],
      middle: ['Freesia', 'Peach', 'Jasmine', 'Rose'],
      base: ['Oakmoss', 'Patchouli', 'Amberwood', 'White Musk', 'Sandalwood']
    },
    fragranceFamily: 'Chypre Floral',
    year: 2018,
    source: 'fragrantica.com',
    description: 'Created to evoke the bold, adventurous side of Chloé women. A perfectly-sweet, juicy and fruity floral fragrance with an earthy, head-turning edge from oakmoss.',
    confidence: 1.0,
    perfumer: 'Quentin Bisch'
  },
  {
    id: 'chloe-roses-de-chloe',
    name: 'Roses de Chloé',
    brand: 'Chloé',
    notes: {
      top: ['Litchi', 'Bergamot', 'Tarragon', 'Lemon'],
      middle: ['Damask Rose', 'Magnolia', 'Cedar', 'Apple', 'Black Currant', 'Peach'],
      base: ['White Musk', 'Amber', 'Woody Notes']
    },
    fragranceFamily: 'Floral',
    year: 2013,
    source: 'fragrantica.com',
    description: 'A gentle and graceful fragrance celebrating a walk through Parisian rose gardens. Fresh bergamot and damask rose essence with modern magnolia.',
    confidence: 1.0,
    perfumer: 'Not specified'
  },
  {
    id: 'chloe-leau-de-parfum-lumineuse',
    name: 'L\'Eau de Parfum Lumineuse',
    brand: 'Chloé',
    notes: {
      top: ['Jasmine Sambac'],
      middle: ['Rose'],
      base: ['Vanilla', 'Balsamic Notes', 'Amber']
    },
    fragranceFamily: 'Oriental Floral',
    year: 2023,
    source: 'fragrantica.com',
    description: 'A new combination of rose with the exuberance of jasmine and warmth of amber. Features buttery, velvety jasmine with a sunlit rose sensation.',
    confidence: 1.0,
    perfumer: 'Ane Ayo'
  },
  {
    id: 'chloe-leau-de-parfum-intense-2024',
    name: 'L\'Eau de Parfum Intense',
    brand: 'Chloé',
    notes: {
      top: ['Raspberry'],
      middle: ['Rose'],
      base: ['Cashmeran', 'Cedar']
    },
    fragranceFamily: 'Floral Fruity',
    year: 2024,
    source: 'fragrantica.com',
    description: 'A jammier, more intense interpretation of the signature Chloé rose. Features raspberry with woody depth from cashmeran and cedar.',
    confidence: 1.0,
    perfumer: 'Not specified'
  },
  {
    id: 'chloe-eau-de-parfum-naturelle',
    name: 'Eau de Parfum Naturelle',
    brand: 'Chloé',
    notes: {
      top: ['Citron', 'Black Currant'],
      middle: ['Rose', 'Neroli'],
      base: ['Mimosa', 'Cedar']
    },
    fragranceFamily: 'Floral',
    year: 2021,
    source: 'fragrantica.com',
    description: 'A fresh scent featuring organic roses. The citrus essence of cedar blends with green, sparkling black currant accents.',
    confidence: 1.0,
    perfumer: 'Michel Almairac'
  },
  {
    id: 'chloe-nomade-nuit-degypte',
    name: 'Nomade Nuit d\'Egypte',
    brand: 'Chloé',
    notes: {
      top: ['Myrrh', 'Cinnamon', 'Ginger'],
      middle: ['Orange Blossom', 'Broom', 'Kyphi'],
      base: ['Vanilla', 'Opoponax', 'Cypriol Oil']
    },
    fragranceFamily: 'Oriental Floral',
    year: 2024,
    source: 'fragrantica.com',
    description: 'A tribute to Egypt, birthplace of the House\'s creator. An ancient, mythic quality with spicy and balsamic nuances, paying homage to kyphi.',
    confidence: 1.0,
    perfumer: 'Juliette Karagueuzoglou'
  },
  {
    id: 'chloe-rose-naturelle-intense',
    name: 'Rose Naturelle Intense',
    brand: 'Chloé',
    notes: {
      top: ['Neroli', 'Bergamot'],
      middle: ['Rose', 'Oak Tree'],
      base: ['Sandalwood', 'Cedar']
    },
    fragranceFamily: 'Floral',
    year: 2022,
    source: 'fragrantica.com',
    description: 'A woody fresh romantic fragrance with rose enhanced by oak and sandalwood. Perfect for those who love fresh woody fragrances.',
    confidence: 1.0,
    perfumer: 'Alexis Dadier'
  },
  {
    id: 'chloe-rose-tangerine',
    name: 'Rose Tangerine',
    brand: 'Chloé',
    notes: {
      top: ['Tangerine', 'Black Currant'],
      middle: ['Rose'],
      base: ['Cedar', 'White Amber']
    },
    fragranceFamily: 'Floral',
    year: 2020,
    source: 'fragrantica.com',
    description: 'An Eau de Toilette with a bolder, more energetic character. Fresh rose refreshed with sunny mandarin and sparkling black currant.',
    confidence: 1.0,
    perfumer: 'Sidonie Lancesseur, Michel Almairac'
  },
  {
    id: 'chloe-leau-eau-de-toilette',
    name: 'L\'Eau Eau de Toilette',
    brand: 'Chloé',
    notes: {
      top: ['Rose', 'Grapefruit', 'Litchi'],
      middle: ['Damask Rose'],
      base: ['Musk', 'Cedar'] // Based on typical Chloé base notes
    },
    fragranceFamily: 'Floral',
    year: 2019,
    source: 'fragrantica.com',
    description: 'A lighter, fresher interpretation of the Chloé signature with citrusy grapefruit and delicate rose.',
    confidence: 0.9,
    perfumer: 'Not specified'
  },
  {
    id: 'chloe-eau-de-toilette-2015',
    name: 'Eau de Toilette (2015)',
    brand: 'Chloé',
    notes: {
      top: ['Bergamot', 'Magnolia', 'Lemon'],
      middle: ['White Rose', 'Rose', 'Gardenia'],
      base: ['Cotton Flower', 'Musk']
    },
    fragranceFamily: 'Floral',
    year: 2015,
    source: 'fragrantica.com',
    description: 'A dewy floral fragrance of white roses with airy freshness. Features delicate roses enriched with citrus and cotton flower.',
    confidence: 1.0,
    perfumer: 'Michel Almairac, Sidonie Lancesseur'
  },
  {
    id: 'chloe-original-1975',
    name: 'Chloé (Original)',
    brand: 'Chloé',
    notes: {
      top: ['Aldehydes', 'Ylang-Ylang', 'Honeysuckle', 'Galbanum'],
      middle: ['Tuberose', 'Narcissus', 'Carnation', 'Jasmine', 'Rose'],
      base: ['Amber', 'Musk', 'Sandalwood', 'Oakmoss']
    },
    fragranceFamily: 'Floral Aldehyde',
    year: 1975,
    source: 'fragrantica.com',
    description: 'The original Chloé fragrance by Karl Lagerfeld. A lush, creamy aldehyde with fruity and spicy tuberose, an enduring feminine classic.',
    confidence: 0.95,
    perfumer: 'Betty Busse'
  }

  ];
  
  // 🔍 Main Search Method - Smart & Fast
  static async searchPerfume(query) {
    console.log('🔍 Searching for:', query);
    
    // Simulate realistic API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    if (!query || query.trim() === '') {
      // Return popular perfumes when no query
      return this.mockFragranceDatabase.slice(0, 300);
    }
    
    let searchName, searchBrand;
    
    // Handle different query formats
    if (typeof query === 'string') {
      searchName = query.trim();
      searchBrand = null;
    } else {
      searchName = query.name || '';
      searchBrand = query.brand || null;
    }
    
    // Smart search with confidence scoring
    const results = this.mockFragranceDatabase
      .map(perfume => ({
        ...perfume,
        confidence: this.calculateMatchConfidence(perfume, searchName, searchBrand)
      }))
      .filter(perfume => perfume.confidence > 0)
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, 15); // Return top 15 matches
    
    console.log('✅ Found', results.length, 'matches for:', searchName);
    return results;
  }
  
  // 🧮 Smart Confidence Calculation
  static calculateMatchConfidence(perfume, searchName, searchBrand) {
    let confidence = 0;
    
    const perfumeName = perfume.name.toLowerCase();
    const perfumeBrand = perfume.brand.toLowerCase();
    const queryName = searchName.toLowerCase();
    const queryBrand = searchBrand ? searchBrand.toLowerCase() : null;
    
    // 🎯 Name Matching Logic
    if (perfumeName === queryName) {
      confidence += 0.6; // Exact name match
    } else if (perfumeName.includes(queryName) || queryName.includes(perfumeName)) {
      confidence += 0.4; // Partial name match
    } else if (this.fuzzyMatch(perfumeName, queryName)) {
      confidence += 0.3; // Fuzzy match (handles typos)
    }
    
    // 🏷️ Brand Matching Logic
    if (!queryBrand) {
      // When no specific brand is provided, check if search term matches brand
      if (perfumeBrand === queryName) {
        confidence += 0.7; // Exact brand match
      } else if (perfumeBrand.includes(queryName) || queryName.includes(perfumeBrand)) {
        confidence += 0.9; // Partial brand match
      }
    }
    
    // 🏢 Specific Brand Matching
    if (queryBrand) {
      if (perfumeBrand === queryBrand) {
        confidence += 0.8; // Exact brand match
      } else if (perfumeBrand.includes(queryBrand) || queryBrand.includes(perfumeBrand)) {
        confidence += 0.8; // Partial brand match
      }
    } else if (confidence > 0) {
      // Small bonus for having any match when no brand specified
      confidence += 0.1;
    }
    
    return Math.min(confidence, 1.0);
  }
  
  // 🔤 Fuzzy Matching for Typos
  static fuzzyMatch(str1, str2) {
    const distance = this.levenshteinDistance(str1, str2);
    const maxLength = Math.max(str1.length, str2.length);
    return distance <= maxLength * 0.3; // Allow 30% character differences
  }
  
  // 📏 Calculate Edit Distance Between Strings
  static levenshteinDistance(str1, str2) {
    const matrix = [];
    
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }
    
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }
    
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    
    return matrix[str2.length][str1.length];
  }
  
  // 📝 Extract Notes from Natural Language Text
  // (Keeping this for future Google API integration)
  static extractNotesFromText(text) {
    const notes = { top: [], middle: [], base: [] };
    
    // Enhanced patterns for real web content
    const patterns = {
      structured: /(?:top|head)\s*notes?[:\s]+([^;.]+)[;.]?\s*(?:middle|heart)\s*notes?[:\s]+([^;.]+)[;.]?\s*(?:base|dry\s*down)\s*notes?[:\s]+([^;.]+)/i,
      topOnly: /(?:top|head)\s*notes?[:\s]+([^;.]+)/i,
      heartOnly: /(?:middle|heart)\s*notes?[:\s]+([^;.]+)/i,
      baseOnly: /(?:base|dry\s*down)\s*notes?[:\s]+([^;.]+)/i
    };
    
    // Try structured format first
    let match = text.match(patterns.structured);
    if (match) {
      notes.top = this.parseNotesList(match[1]);
      notes.middle = this.parseNotesList(match[2]);
      notes.base = this.parseNotesList(match[3]);
      return notes;
    }
    
    // Try individual patterns
    match = text.match(patterns.topOnly);
    if (match) notes.top = this.parseNotesList(match[1]);
    
    match = text.match(patterns.heartOnly);
    if (match) notes.middle = this.parseNotesList(match[1]);
    
    match = text.match(patterns.baseOnly);
    if (match) notes.base = this.parseNotesList(match[1]);
    
    return notes;
  }
  
  // 🔧 Parse Comma-Separated Notes Lists
  static parseNotesList(notesString) {
    if (!notesString) return [];
    
    // Handle different separators
    let notes;
    if (notesString.includes(',')) {
      notes = notesString.split(',');
    } else if (notesString.includes(' and ')) {
      notes = notesString.split(' and ');
    } else if (notesString.includes(';')) {
      notes = notesString.split(';');
    } else {
      notes = [notesString];
    }
    
    return notes
      .map(note => note.trim())
      .filter(note => note.length > 0 && note.length < 30) // Filter out overly long "notes"
      .map(note => note.replace(/^(a |an |the )/i, '')) // Remove articles
      .slice(0, 8); // Limit to reasonable number of notes
  }
  
  // 🏷️ Extract Fragrance Family from Description Text
  static extractFragranceFamily(text) {
    const familyKeywords = {
      'Floral': ['floral', 'flower', 'rose', 'jasmine', 'lily', 'peony', 'gardenia'],
      'Woody': ['woody', 'wood', 'cedar', 'sandalwood', 'vetiver', 'oud'],
      'Citrus': ['citrus', 'fresh', 'lemon', 'bergamot', 'orange', 'grapefruit'],
      'Oriental': ['oriental', 'spicy', 'amber', 'vanilla', 'exotic', 'incense'],
      'Gourmand': ['gourmand', 'sweet', 'chocolate', 'caramel', 'honey'],
      'Fresh': ['fresh', 'aquatic', 'marine', 'ocean', 'sea', 'water', 'clean'],
      'Green': ['green', 'herbal', 'grass', 'mint', 'basil', 'leaves'],
      'Chypre': ['chypre', 'mossy', 'oakmoss', 'patchouli']
    };
    
    const lowerText = text.toLowerCase();
    const scores = {};
    
    // Score each family based on keyword matches
    Object.entries(familyKeywords).forEach(([family, keywords]) => {
      scores[family] = keywords.reduce((score, keyword) => {
        return score + (lowerText.includes(keyword) ? 1 : 0);
      }, 0);
    });
    
    // Return family with highest score
    const bestFamily = Object.keys(scores).reduce((a, b) => 
      scores[a] > scores[b] ? a : b
    );
    
    return scores[bestFamily] > 0 ? bestFamily : 'Unclassified';
  }
  
  // 🎯 Get Random Sample of Perfumes (for testing)
  static getRandomPerfumes(count = 5, fromArray = null) {
  const sourceArray = fromArray || this.mockFragranceDatabase;
  const shuffled = [...sourceArray].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
  
  // 📊 Get All Available Perfumes (for recommendations)
  static getAllPerfumes() {
    return [...this.mockFragranceDatabase];
  }
  
  // 🔍 Get Perfume by ID
  static getPerfumeById(id) {
    return this.mockFragranceDatabase.find(perfume => perfume.id === id);
  }
  
  // 🏷️ Get Perfumes by Brand
  static getPerfumesByBrand(brand) {
    const brandLower = brand.toLowerCase();
    return this.mockFragranceDatabase.filter(perfume => 
      perfume.brand.toLowerCase().includes(brandLower)
    );
  }
  
  // 🌸 Get Perfumes by Family
  static getPerfumesByFamily(family) {
    return this.mockFragranceDatabase.filter(perfume => 
      perfume.fragranceFamily === family
    );
  }
}

export { GoogleFragranceSearchService };