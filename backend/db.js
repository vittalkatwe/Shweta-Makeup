// Single shared Prisma client for the whole backend.
// Reused across all route handlers so we hold one connection pool.
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({ log: ['warn', 'error'] });

module.exports = prisma;
