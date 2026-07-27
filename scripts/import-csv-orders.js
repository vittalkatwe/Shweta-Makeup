#!/usr/bin/env node
/**
 * Import orders from the order-tracking CSV into the DB.
 *
 * Usage:
 *   node scripts/import-csv-orders.js [--dry-run] [--csv <path>]
 */

import fs from 'fs';
import path from 'path';
import http from 'http';
import https from 'https';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── Config ───────────────────────────────────────────────────────────────────
const DRY_RUN = process.argv.includes('--dry-run');
const csvArgIdx = process.argv.indexOf('--csv');
const CSV_PATH = csvArgIdx !== -1
  ? path.resolve(process.argv[csvArgIdx + 1])
  : path.resolve(__dirname, '..', '3-Day Hairstyle MasterClass Order Tracking (1).csv');
const BASE_URL = process.env.BACKEND_URL || 'https://shwetamakeover.online';

// ── Helpers ───────────────────────────────────────────────────────────────────

function request(method, urlStr, body) {
  return new Promise((resolve, reject) => {
    const url = new URL(urlStr);
    const lib = url.protocol === 'https:' ? https : http;
    const options = {
      hostname: url.hostname,
      port: url.port || (url.protocol === 'https:' ? 443 : 80),
      path: url.pathname + url.search,
      method,
      headers: { 'Content-Type': 'application/json' },
    };
    const req = lib.request(options, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(data) }); }
        catch (e) { resolve({ status: res.statusCode, body: data }); }
      });
    });
    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function fetchAllPhones(endpoint) {
  const phones = new Set();
  let page = 1;
  while (true) {
    const url = `${BASE_URL}${endpoint}?limit=100&page=${page}`;
    const { status, body } = await request('GET', url, null);
    if (status !== 200 || !body.success) {
      console.error(`Failed to fetch ${endpoint} page ${page}:`, body);
      break;
    }
    const items = body.orders || body.payments || body.profiles || [];
    for (const item of items) {
      if (item.phone) phones.add(item.phone.replace(/\D/g, ''));
    }
    const totalPages = body.totalPages || 1;
    if (page >= totalPages) break;
    page++;
  }
  return phones;
}

/**
 * Parse "DD/MM/YYYY" + "H.MM AM/PM" → ISO string (IST = UTC+05:30).
 * Missing time defaults to midnight IST.
 */
function parseTimestamp(dateStr, timeStr) {
  if (!dateStr) return new Date().toISOString();

  const [dd, mm, yyyy] = dateStr.trim().split('/');
  if (!dd || !mm || !yyyy) return new Date().toISOString();

  let hours = 0;
  let minutes = 0;
  const t = (timeStr || '').trim();
  if (t) {
    const ampm = t.slice(-2).trim().toUpperCase();
    const timePart = t.slice(0, -2).trim();
    const [hStr, mStr] = timePart.split('.');
    hours = parseInt(hStr, 10) || 0;
    minutes = parseInt(mStr, 10) || 0;
    if (ampm === 'PM' && hours !== 12) hours += 12;
    if (ampm === 'AM' && hours === 12) hours = 0;
  }

  // Convert IST → UTC (subtract 5h30m)
  const istOffsetMin = 5 * 60 + 30;
  let utcDay = parseInt(dd, 10);
  let utcMonth = parseInt(mm, 10);
  let utcYear = parseInt(yyyy, 10);
  let totalMin = hours * 60 + minutes - istOffsetMin;
  if (totalMin < 0) {
    totalMin += 1440;
    utcDay -= 1;
    if (utcDay < 1) {
      utcMonth -= 1;
      if (utcMonth < 1) { utcMonth = 12; utcYear -= 1; }
      utcDay = new Date(utcYear, utcMonth, 0).getDate();
    }
  }

  const d = new Date(Date.UTC(utcYear, utcMonth - 1, utcDay, Math.floor(totalMin / 60), totalMin % 60, 0));
  return d.toISOString();
}

// ── CSV parser ────────────────────────────────────────────────────────────────

function parseCSV(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const lines = raw.split(/\r?\n/);
  const rows = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Split by comma, respecting quoted fields
    const cols = [];
    let cur = '';
    let inQuote = false;
    for (const ch of line) {
      if (ch === '"') { inQuote = !inQuote; }
      else if (ch === ',' && !inQuote) { cols.push(cur.trim()); cur = ''; }
      else { cur += ch; }
    }
    cols.push(cur.trim());

    // Columns: Date(0), Time(1), Number(2), Name(3), Price(4), empty(5), Mode(6), City(7), State(8), Profession(9)
    const dateStr    = (cols[0] || '').replace(/"/g, '').trim();
    const timeStr    = (cols[1] || '').replace(/"/g, '').trim();
    const rawPhone   = (cols[2] || '').replace(/"/g, '').trim();
    const name       = (cols[3] || '').replace(/"/g, '').trim();
    const priceStr   = (cols[4] || '').replace(/"/g, '').trim();
    const mode       = (cols[6] || '').replace(/"/g, '').trim();
    const city       = (cols[7] || '').replace(/"/g, '').trim();
    const state      = (cols[8] || '').replace(/"/g, '').trim();
    const profession = (cols[9] || '').replace(/"/g, '').trim();

    const phone = rawPhone.replace(/\D/g, '');
    if (!phone || phone.length < 10) continue;

    const amount = parseFloat(priceStr) || 0;
    if (!amount) continue;

    rows.push({ dateStr, timeStr, phone, name, amount, mode, city, state, profession });
  }

  return rows;
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  if (!fs.existsSync(CSV_PATH)) {
    console.error(`CSV file not found: ${CSV_PATH}`);
    console.error('Provide path with: node scripts/import-csv-orders.js --csv /path/to/file.csv');
    process.exit(1);
  }

  console.log(`Reading CSV: ${CSV_PATH}`);
  const rows = parseCSV(CSV_PATH);
  console.log(`Parsed ${rows.length} valid rows from CSV.`);
  if (DRY_RUN) console.log('\n⚠️  DRY RUN — no orders will be created.\n');

  console.log('Fetching existing orders from DB...');
  const existingOrderPhones = await fetchAllPhones('/api/admin/orders');
  console.log(`Found ${existingOrderPhones.size} existing order phone(s).`);

  console.log('Fetching existing profiles from DB...');
  const existingProfilePhones = await fetchAllPhones('/api/admin/profiles');
  console.log(`Found ${existingProfilePhones.size} existing profile phone(s).\n`);

  let skipped = 0;
  let created = 0;
  let failed = 0;

  for (const row of rows) {
    const { phone, name, amount, mode, city, state, profession, dateStr, timeStr } = row;

    if (existingOrderPhones.has(phone)) {
      console.log(`SKIP     ${phone} (${name}) — order already exists`);
      skipped++;
      continue;
    }

    const inProfiles = existingProfilePhones.has(phone);
    const source = inProfiles ? 'website' : (mode.toLowerCase() === 'website' ? 'website' : 'whatsapp');
    const skipProfile = inProfiles;
    const timestamp = parseTimestamp(dateStr, timeStr);

    const payload = {
      phone,
      name: name || undefined,
      amount,
      source,
      city: city || undefined,
      state: state || undefined,
      occupation: profession || undefined,
      timestamp,
      skipProfile,
    };

    if (DRY_RUN) {
      console.log(`WOULD CREATE  ${phone} (${name || '—'}) | ₹${amount} | ${source} | ${dateStr} ${timeStr} | skipProfile=${skipProfile}`);
      created++;
      continue;
    }

    try {
      const { status, body } = await request('POST', `${BASE_URL}/api/admin/orders`, payload);
      if (status === 200 && body.success) {
        console.log(`CREATED  ${phone} (${name || '—'}) | ₹${amount} | ${source}`);
        created++;
        await new Promise((r) => setTimeout(r, 100));
      } else {
        console.error(`FAILED   ${phone} (${name || '—'}) | status=${status} | ${JSON.stringify(body)}`);
        failed++;
      }
    } catch (err) {
      console.error(`ERROR    ${phone} (${name || '—'}) | ${err.message}`);
      failed++;
    }
  }

  console.log('\n── Summary ─────────────────────────────');
  if (DRY_RUN) {
    console.log(`Would create : ${created}`);
    console.log(`Already exist: ${skipped}`);
  } else {
    console.log(`Created : ${created}`);
    console.log(`Skipped : ${skipped}`);
    console.log(`Failed  : ${failed}`);
  }
  console.log('────────────────────────────────────────');
}

main().catch((err) => { console.error(err); process.exit(1); });
