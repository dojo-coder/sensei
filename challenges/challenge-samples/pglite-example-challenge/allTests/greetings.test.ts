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

  it('does NOT contain the comma-less variant', async () => {
    const rows = await db.query<{ n: number }>(
      "SELECT COUNT(*)::int AS n FROM greetings WHERE message = 'Hello World!'"
    );
    expect(rows[0].n).toBe(0);
  });

  it('has the expected schema (id, message)', async () => {
    const columns = await db.query<{ column_name: string }>(
      "SELECT column_name FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'greetings' ORDER BY ordinal_position"
    );
    const names = columns.map((row) => row.column_name);
    expect(names).toEqual(expect.arrayContaining(['id', 'message']));
  });

  it('id column is INTEGER PRIMARY KEY', async () => {
    const columns = await db.query<{ column_name: string; data_type: string }>(
      "SELECT column_name, data_type FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'greetings'"
    );
    const idCol = columns.find((c) => c.column_name === 'id');
    expect(idCol?.data_type).toBe('integer');
  });

  it('message column is NOT NULL', async () => {
    const columns = await db.query<{ column_name: string; is_nullable: string }>(
      "SELECT column_name, is_nullable FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'greetings'"
    );
    const msgCol = columns.find((c) => c.column_name === 'message');
    expect(msgCol?.is_nullable).toBe('NO');
  });

  it('the message value is case-sensitive', async () => {
    const rows = await db.query<{ n: number }>(
      "SELECT COUNT(*)::int AS n FROM greetings WHERE message = 'hello, world!'"
    );
    expect(rows[0].n).toBe(0);
  });
});
