const logger = require('../src/aquariumLogger');

console.log('--- Aquarium Log Test ---');
console.log('Adding test entry...');
logger.addEntry({ tempC: 25.5, ph: 7.8, notes: 'Test entry' });
console.log('Current entries:');
console.log(logger.listEntries());
console.log('CSV export:');
console.log(logger.exportCSV());
