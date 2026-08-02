// Normalize a phone number to digits only (matches scripts/import-csv-orders.js).
// This is the dedup key for customers and the link key for manual orders.
function normalizePhone(phone) {
  return String(phone || '').replace(/\D/g, '');
}

// Drop null/undefined/'' keys so an upsert `update` never clobbers existing
// customer data with blanks (important after phone-based dedup merges people).
function pruneEmpty(obj) {
  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v !== undefined && v !== null && v !== '') out[k] = v;
  }
  return out;
}

module.exports = { normalizePhone, pruneEmpty };
