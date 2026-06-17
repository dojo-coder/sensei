import { describe, it, expect, beforeAll } from 'vitest';
import { createPgliteTestDb, type PgliteTestDb } from '@dojocode/sql-test-helpers/pglite';

let db: PgliteTestDb;

beforeAll(async () => {
  db = await createPgliteTestDb(import.meta.url);
});

describe('greetings', () => {
  it("contains the row with message 'Hello, World!'", async () => {
    const rows = await db.query<{ message: string }>(
      'SELECT message FROM greetings WHERE id = 1'
    );
    expect(rows[0]?.message).toBe('Hello, World!');
  });

  it('has at least one row', async () => {
    const rows = await db.query<{ n: number }>('SELECT COUNT(*)::int AS n FROM greetings');
    expect(rows[0].n).toBeGreaterThanOrEqual(1);
  });

  it("does NOT contain the comma-less variant", async () => {
    const rows = await db.query<{ n: number }>(
      "SELECT COUNT(*)::int AS n FROM greetings WHERE message = 'Hello World!'"
    );
    expect(rows[0].n).toBe(0);
  });
});
