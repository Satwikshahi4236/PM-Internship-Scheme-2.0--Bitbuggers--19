import type { Config } from 'drizzle-kit';

export default {
  schema: './database/schema.ts',
  out: './database/migrations',
  driver: 'better-sqlite',
  dbCredentials: {
    url: './swaasth.db',
  },
} satisfies Config;