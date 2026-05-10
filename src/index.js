#!/usr/bin/env node
const logger = require('./aquariumLogger');

const [, , cmd, ...args] = process.argv;

function parseArgs(arr) {
  const out = {};
  arr.forEach(a => {
    const m = a.match(/^--([^=]+)=(.*)$/);
    if (m) out[m[1]] = m[2];
  });
  return out;
}

async function main() {
  if (!cmd || cmd === 'help') {
    console.log('Usage: node src/index.js <command> [--key=value]\nCommands: add, list, export');
    console.log('Examples:');
    console.log('  node src/index.js add --temp=25.5 --ph=7.8 --notes="After water change"');
    console.log('  node src/index.js list');
    console.log('  node src/index.js export');
    return;
  }

  if (cmd === 'add') {
    const opts = parseArgs(args);
    const entry = logger.addEntry({ date: opts.date, tempC: opts.temp, ph: opts.ph, notes: opts.notes });
    console.log('Added:', entry);
  } else if (cmd === 'list') {
    const entries = logger.listEntries();
    console.log(JSON.stringify(entries, null, 2));
  } else if (cmd === 'export') {
    const csv = logger.exportCSV();
    console.log(csv);
  } else {
    console.error('Unknown command:', cmd);
    process.exit(1);
  }
}

main();
