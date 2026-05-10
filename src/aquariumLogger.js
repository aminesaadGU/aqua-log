const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const DATA_FILE = path.join(DATA_DIR, 'entries.json');

function ensureData() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '[]', 'utf8');
}

function readEntries() {
  ensureData();
  const raw = fs.readFileSync(DATA_FILE, 'utf8') || '[]';
  try { return JSON.parse(raw); } catch (e) { return []; }
}

function writeEntries(entries) {
  ensureData();
  fs.writeFileSync(DATA_FILE, JSON.stringify(entries, null, 2), 'utf8');
}

function addEntry({ date = new Date().toISOString(), tempC = null, ph = null, notes = '' } = {}) {
  const entries = readEntries();
  const entry = {
    id: Date.now(),
    date,
    tempC: tempC === null ? null : Number(tempC),
    ph: ph === null ? null : Number(ph),
    notes
  };
  entries.push(entry);
  writeEntries(entries);
  return entry;
}

function listEntries() {
  return readEntries();
}

function exportCSV() {
  const entries = readEntries();
  if (!entries.length) return '';
  const headers = Object.keys(entries[0]);
  const rows = entries.map(e => headers.map(h => {
    const v = e[h] === null || e[h] === undefined ? '' : String(e[h]);
    return '"' + v.replace(/"/g, '""') + '"';
  }).join(','));
  return [headers.join(','), ...rows].join('\n');
}

module.exports = { addEntry, listEntries, exportCSV };
