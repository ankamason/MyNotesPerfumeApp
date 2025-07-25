// demo.js - Beautiful Collection Intelligence Demo

const { UserCollection } = require('./src/models/UserCollection.js');
const { Perfume } = require('./src/models/Perfume.js');

// Create a demonstration collection
const collection = new UserCollection();

const perfumes = [
  new Perfume({
    id: 1,
    name: 'Rose Garden Supreme', 
    brand: 'Floral House',
    notes: { top: ['Bergamot'], middle: ['Rose', 'Peony'], base: ['Sandalwood', 'Musk'] },
    fragranceFamily: 'Floral'
  }),
  
  new Perfume({
    id: 2,
    name: 'Jasmine Nights',
    brand: 'Romantic House', 
    notes: { top: ['Lemon', 'Bergamot'], middle: ['Jasmine', 'Rose'], base: ['Sandalwood', 'Amber'] },
    fragranceFamily: 'Floral'
  }),
  
  new Perfume({
    id: 3,
    name: 'Garden Party',
    brand: 'Fresh House',
    notes: { top: ['Bergamot', 'Green Leaves'], middle: ['Lily', 'Freesia'], base: ['Musk', 'Cedar'] },
    fragranceFamily: 'Floral'
  }),
  
  new Perfume({
    id: 4,
    name: 'Sandalwood Dreams',
    brand: 'Woody House',
    notes: { top: ['Bergamot', 'Pink Pepper'], middle: ['Cedar', 'Vetiver'], base: ['Sandalwood', 'Patchouli'] },
    fragranceFamily: 'Woody'
  }),
  
  new Perfume({
    id: 5,
    name: 'Forest Walk',
    brand: 'Nature House',
    notes: { top: ['Pine'], middle: ['Cedar', 'Juniper'], base: ['Sandalwood', 'Moss'] },
    fragranceFamily: 'Woody'
  }),
  
  new Perfume({
    id: 6,
    name: 'Spice Market',
    brand: 'Oriental House',
    notes: { top: ['Cardamom'], middle: ['Rose', 'Cinnamon'], base: ['Sandalwood', 'Vanilla', 'Oud'] },
    fragranceFamily: 'Oriental'
  }),
  
  new Perfume({
    id: 7,
    name: 'Mediterranean Breeze', 
    brand: 'Fresh House',
    notes: { top: ['Bergamot', 'Lemon', 'Grapefruit'], middle: ['Neroli'], base: ['White Musk'] },
    fragranceFamily: 'Citrus'
  })
];

// Add all perfumes
perfumes.forEach(perfume => collection.addPerfume(perfume));

// Get intelligence data
const popularNotes = collection.getMostPopularNotes();
const familyDistribution = collection.getFamilyDistribution();

// Beautiful output
console.log('\n' + '='.repeat(50));
console.log('🌟    PERFUME COLLECTION INTELLIGENCE    🌟');
console.log('='.repeat(50));

console.log(`\n📊 Collection Overview:`);
console.log(`   Total Perfumes: ${collection.getSize()}`);
console.log(`   Unique Families: ${Object.keys(familyDistribution.families).length}`);

console.log('\n🎯 Top 5 Most Popular Notes:');
popularNotes.slice(0, 5).forEach((item, index) => {
  const stars = '★'.repeat(Math.min(item.count, 5));
  console.log(`   ${index + 1}. ${item.note.padEnd(15)} ${stars} (${item.count} perfumes)`);
});

console.log('\n📈 Fragrance Family Distribution:');
familyDistribution.sortedByPopularity.forEach((family, index) => {
  const bar = '█'.repeat(Math.round(family.percentage / 5));
  console.log(`   ${(index + 1)}. ${family.family.padEnd(12)} ${bar} ${family.percentage}% (${family.count} perfumes)`);
});

console.log('\n💡 Personal Style Insights:');
const topNote = popularNotes[0];
const topFamily = familyDistribution.sortedByPopularity[0];
console.log(`   🌟 Signature Note: ${topNote.note} (appears in ${topNote.count}/${collection.getSize()} perfumes)`);
console.log(`   🎨 Dominant Style: ${topFamily.percentage}% ${topFamily.family}`);

// Cross-family analysis
const bergamotCount = popularNotes.find(n => n.note === 'Bergamot')?.count || 0;
if (bergamotCount >= 3) {
  console.log(`   ✨ You love bright openings - Bergamot appears in ${bergamotCount} different families!`);
}

console.log('\n' + '='.repeat(50));
console.log('🎯 Your collection shows sophisticated taste! 🎯');
console.log('='.repeat(50) + '\n');