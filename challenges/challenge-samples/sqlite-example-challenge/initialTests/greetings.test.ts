import { describe, it, expect, beforeAll } from 'vitest';
import { createSqliteTestDb, type SqliteTestDb } from '@dojocode/sql-test-helpers/sqlite';

let db: SqliteTestDb;

beforeAll(async () => {
  db = await createSqliteTestDb(import.meta.url);
});

describe('greetings', () => {
  it("contains the row with message 'Hello, World!'", () => {
    const rows = db.query<{ message: string }>(
      'SELECT message FROM greetings WHERE id = 1'
    );
    expect(rows[0]?.message).toBe('Hello, World!');
  });

  it('has at least one row', () => {
    const rows = db.query<{ n: number }>('SELECT COUNT(*) AS n FROM greetings');
    expect(rows[0].n).toBeGreaterThanOrEqual(1);
  });

  it('does NOT contain the comma-less variant', () => {
    const rows = db.query<{ n: number }>(
      "SELECT COUNT(*) AS n FROM greetings WHERE message = 'Hello World!'"
    );
    expect(rows[0].n).toBe(0);
  });
});
