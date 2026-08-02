#!/usr/bin/env node
/**
 * One-time ETL: MongoDB (payments, profiles) -> PostgreSQL (customers, orders).
 *
 * Run from the backend/ directory so both `mongoose` (devDependency) and the
 * generated Prisma client resolve from backend/node_modules:
 *
 *   cd backend
 *   npm install                 # installs mongoose (dev) + @prisma/client
 *   npx prisma migrate deploy   # create the Postgres schema first
 *   MONGODB_URI="mongodb+srv://..." \
 *   DATABASE_URL="postgres://..." DIRECT_URL="postgres://..." \
 *     node scripts/migrate-mongo-to-pg.js [--wipe]
 *
 * Idempotent: customers upsert by phone, orders upsert by id (the legacy Payment
 * _id is preserved). Safe to re-run to capture a delta right before cutover.
 * Pass --wipe to truncate customers+orders first for a clean reload.
 *
 * Normalization rules (see the migration plan):
 *   - customers are deduped by normalized phone (\D stripped)
 *   - identity (name/email/source): prefer latest PAID order, else latest order,
 *     else latest profile (COALESCE of the old $ifNull rule)
 *   - demographics: latest non-empty value across that phone's profiles
 *   - created_at = MIN(timestamp) across the phone's payments + profiles
 *   - hasPurchasedCourse = any paid order OR any profile flag
 *   - a customer is marked isDeleted only if EVERY source record was deleted
 */
const mongoose = require('mongoose');
const prisma = require('../db');

const WIPE = process.argv.includes('--wipe');
const COURSE_NAME = '3-Day Hairstyle Masterclass';

const VALID_STATUS = new Set(['pending', 'created', 'paid', 'failed']);
const VALID_SOURCE = new Set(['website', 'whatsapp']);
const coerceStatus = (s) => (VALID_STATUS.has(s) ? s : 'pending');
const coerceSource = (s) => (VALID_SOURCE.has(s) ? s : 'website');

function normalizePhone(phone) {
  return String(phone || '').replace(/\D/g, '');
}
const isEmpty = (v) => v === undefined || v === null || v === '';
const firstNonEmpty = (...vals) => {
  for (const v of vals) if (!isEmpty(v)) return v;
  return null;
};

async function main() {
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI env var is required (source database).');
    process.exit(1);
  }

  await mongoose.connect(MONGODB_URI);
  const db = mongoose.connection.db;
  console.log('✅ Connected to MongoDB');

  const payments = await db.collection('payments').find({}).toArray();
  const profiles = await db.collection('profiles').find({}).toArray();
  console.log(`📥 Loaded ${payments.length} payments, ${profiles.length} profiles`);

  // Pre-check: duplicate non-null razorpayOrderId would violate the PG unique index.
  const seenRzp = new Set();
  const dupRzp = [];
  for (const p of payments) {
    if (!p.razorpayOrderId) continue;
    if (seenRzp.has(p.razorpayOrderId)) dupRzp.push(p.razorpayOrderId);
    else seenRzp.add(p.razorpayOrderId);
  }
  if (dupRzp.length) {
    console.warn(`⚠️  ${dupRzp.length} duplicate non-null razorpayOrderId in payments — the unique index will reject the later ones:`, dupRzp.slice(0, 10));
  }

  if (WIPE) {
    await prisma.order.deleteMany({});
    await prisma.customer.deleteMany({});
    console.log('🧹 Wiped existing customers + orders');
  }

  // ── Build customer aggregates keyed by normalized phone ──
  const customers = new Map();
  const ensure = (phone) => {
    const key = normalizePhone(phone);
    if (!key) return null;
    if (!customers.has(key)) {
      customers.set(key, {
        phone: key,
        age: null, whatsappPhone: null, gender: null, city: null,
        state: null, occupation: null, reason: null,
        hasPurchasedCourse: false,
        createdAt: null,
        legacyProfileIds: [],
        hadActive: false,
        identity: { paid: null, any: null, profile: null },
      });
    }
    return customers.get(key);
  };
  const bumpCreatedAt = (c, ts) => {
    const d = ts ? new Date(ts) : new Date();
    if (!c.createdAt || d < c.createdAt) c.createdAt = d;
  };

  // Payments (sorted asc so "latest identity wins")
  const ts = (x) => new Date(x.timestamp || 0).getTime();
  for (const p of [...payments].sort((a, b) => ts(a) - ts(b))) {
    const c = ensure(p.phone);
    if (!c) continue;
    bumpCreatedAt(c, p.timestamp);
    const status = coerceStatus(p.status);
    if (status === 'paid') c.hasPurchasedCourse = true;
    if (p.isDeleted !== true && p.active !== false) c.hadActive = true;
    const ident = { name: p.name ?? null, email: p.email ?? null, source: coerceSource(p.source) };
    c.identity.any = ident;
    if (status === 'paid') c.identity.paid = ident;
  }

  // Profiles (sorted asc so "latest non-empty demographic wins")
  for (const pr of [...profiles].sort((a, b) => ts(a) - ts(b))) {
    const c = ensure(pr.phone);
    if (!c) continue;
    bumpCreatedAt(c, pr.timestamp);
    if (pr._id) c.legacyProfileIds.push(pr._id.toString());
    for (const f of ['age', 'whatsappPhone', 'gender', 'city', 'state', 'occupation', 'reason']) {
      if (!isEmpty(pr[f])) c[f] = pr[f];
    }
    if (pr.hasPurchasedCourse) c.hasPurchasedCourse = true;
    if (pr.isDeleted !== true) c.hadActive = true;
    c.identity.profile = { name: pr.name ?? null, email: pr.email ?? null, source: coerceSource(pr.source) };
  }

  // ── Upsert customers, remember phone -> id ──
  const phoneToId = new Map();
  for (const c of customers.values()) {
    const data = {
      phone: c.phone,
      name: firstNonEmpty(c.identity.paid?.name, c.identity.any?.name, c.identity.profile?.name),
      email: firstNonEmpty(c.identity.paid?.email, c.identity.any?.email, c.identity.profile?.email),
      source: firstNonEmpty(c.identity.paid?.source, c.identity.any?.source, c.identity.profile?.source),
      age: isEmpty(c.age) ? null : (parseInt(c.age, 10) || null),
      whatsappPhone: c.whatsappPhone || null,
      gender: c.gender || null,
      city: c.city || null,
      state: c.state || null,
      occupation: c.occupation || null,
      reason: c.reason || null,
      hasPurchasedCourse: !!c.hasPurchasedCourse,
      isDeleted: !c.hadActive, // deleted only if every source record was deleted
      createdAt: c.createdAt || new Date(),
      legacyProfileIds: c.legacyProfileIds,
    };
    const saved = await prisma.customer.upsert({
      where: { phone: c.phone },
      create: data,
      update: data,
    });
    phoneToId.set(c.phone, saved.id);
  }
  console.log(`👤 Upserted ${phoneToId.size} customers`);

  // ── Insert orders (preserve legacy _id), attaching course fields from profile ──
  const profileByOrderId = new Map();
  const manualProfilesByPhone = new Map();
  for (const pr of profiles) {
    if (pr.razorpayOrderId) profileByOrderId.set(pr.razorpayOrderId, pr);
    else {
      const k = normalizePhone(pr.phone);
      if (k && !manualProfilesByPhone.has(k)) manualProfilesByPhone.set(k, pr);
    }
  }

  const fractional = [];
  let orderCount = 0;
  let orphaned = 0;
  for (const p of payments) {
    const normPhone = normalizePhone(p.phone);
    const customerId = phoneToId.get(normPhone);
    if (!customerId) {
      orphaned++;
      console.warn('⚠️  Orphan payment (no resolvable customer phone):', p._id?.toString());
      continue;
    }

    const rawAmount = Number(p.amount);
    if (!Number.isInteger(rawAmount)) fractional.push(p._id?.toString());
    const amount = Number.isFinite(rawAmount) ? Math.round(rawAmount) : 0;
    const status = coerceStatus(p.status);

    const linked = p.razorpayOrderId
      ? profileByOrderId.get(p.razorpayOrderId)
      : manualProfilesByPhone.get(normPhone);
    const courseName = linked?.courseName ?? (status === 'paid' ? COURSE_NAME : null);
    const coursePurchasePrice = !isEmpty(linked?.coursePurchasePrice)
      ? Math.round(Number(linked.coursePurchasePrice))
      : (status === 'paid' ? amount : null);

    const data = {
      id: p._id.toString(),
      customerId,
      amount,
      currency: p.currency || 'INR',
      razorpayOrderId: p.razorpayOrderId || null,
      razorpayPaymentId: p.razorpayPaymentId || null,
      status,
      source: coerceSource(p.source),
      createdAt: p.timestamp ? new Date(p.timestamp) : new Date(),
      errorCode: p.errorCode || null,
      errorDescription: p.errorDescription || null,
      emailSent: p.emailSent === true,
      remark: p.remark || null,
      active: p.active !== false,
      isDeleted: p.isDeleted === true,
      fbc: p.fbc || null,
      fbp: p.fbp || null,
      clientIp: p.clientIp || null,
      userAgent: p.userAgent || null,
      courseName,
      coursePurchasePrice,
    };

    try {
      await prisma.order.upsert({ where: { id: data.id }, create: data, update: data });
      orderCount++;
    } catch (err) {
      console.error(`❌ Failed to upsert order ${data.id}:`, err.message);
    }
  }
  console.log(`🧾 Upserted ${orderCount} orders (${orphaned} orphaned/skipped)`);

  // ── Verification ──
  const [pgOrders, pgCustomers, pgPaid] = await Promise.all([
    prisma.order.count(),
    prisma.customer.count(),
    prisma.order.aggregate({ where: { status: 'paid' }, _sum: { amount: true }, _count: true }),
  ]);
  const paidMongo = payments.filter((p) => coerceStatus(p.status) === 'paid');
  const paidRevenueMongo = paidMongo.reduce((s, p) => s + (Number.isFinite(Number(p.amount)) ? Math.round(Number(p.amount)) : 0), 0);
  const distinctPhones = new Set();
  for (const p of payments) { const k = normalizePhone(p.phone); if (k) distinctPhones.add(k); }
  for (const pr of profiles) { const k = normalizePhone(pr.phone); if (k) distinctPhones.add(k); }

  console.log('\n── Verification ─────────────────────────');
  console.log(`orders     : mongo payments=${payments.length}  ->  pg orders=${pgOrders}  (orphaned ${orphaned})`);
  console.log(`customers  : distinct phones=${distinctPhones.size}  ->  pg customers=${pgCustomers}`);
  console.log(`paid orders: mongo=${paidMongo.length} rev=₹${paidRevenueMongo}  ->  pg=${pgPaid._count} rev=₹${pgPaid._sum.amount || 0}`);
  if (fractional.length) console.warn(`⚠️  ${fractional.length} payments had non-integer amounts (rounded):`, fractional.slice(0, 10));
  if (dupRzp.length) console.warn(`⚠️  ${dupRzp.length} duplicate razorpayOrderId(s) may have been skipped by the unique index.`);
  const ok = pgOrders === payments.length - orphaned && pgCustomers === distinctPhones.size
    && pgPaid._count === paidMongo.length && (pgPaid._sum.amount || 0) === paidRevenueMongo;
  console.log(ok ? '✅ Counts match.' : '⚠️  Counts differ — review the warnings above before cutover.');
  console.log('─────────────────────────────────────────\n');

  await mongoose.disconnect();
  await prisma.$disconnect();
}

main().catch(async (err) => {
  console.error(err);
  try { await mongoose.disconnect(); } catch {}
  try { await prisma.$disconnect(); } catch {}
  process.exit(1);
});
