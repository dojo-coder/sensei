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

  it('has the expected schema (id, message)', () => {
    const columns = db.query<{ name: string }>('PRAGMA table_info("greetings")');
    const names = columns.map((row) => row.name);
    expect(names).toEqual(expect.arrayContaining(['id', 'message']));
  });

  it('id column is INTEGER PRIMARY KEY', () => {
    const columns = db.query<{ name: string; type: string; pk: number }>('PRAGMA table_info("greetings")');
    const idCol = columns.find((c) => c.name === 'id');
    expect(idCol?.type.toUpperCase()).toBe('INTEGER');
    expect(idCol?.pk).toBe(1);
  });

  it('message column is NOT NULL', () => {
    const columns = db.query<{ name: string; notnull: number }>('PRAGMA table_info("greetings")');
    const msgCol = columns.find((c) => c.name === 'message');
    expect(msgCol?.notnull).toBe(1);
  });

  it('the message value is case-sensitive', () => {
    const rows = db.query<{ n: number }>(
      "SELECT COUNT(*) AS n FROM greetings WHERE message = 'hello, world!'"
    );
    expect(rows[0].n).toBe(0);
  });
});
