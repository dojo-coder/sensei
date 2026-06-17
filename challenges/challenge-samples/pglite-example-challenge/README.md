Create a PostgreSQL `greetings` table, seed it with the row `(1, 'Hello, World!')`, and SELECT the message so it renders in the Preview panel.

The template runs PostgreSQL in WebAssembly via [`@electric-sql/pglite`](https://pglite.dev). Edit `script.sql`; on save every non-test `.sql` file is re-executed against the same in-memory database (in lex order — prefix files like `01-schema.sql`, `02-data.sql` if you need ordering).

## Schema requirements

```sql
CREATE TABLE greetings (
  id      INTEGER PRIMARY KEY,
  message TEXT NOT NULL
);
```

## Expected SELECT result

The last `SELECT` statement in `script.sql` renders in the Preview. Yours should return one row with `message = 'Hello, World!'`.

## Expected solution

```sql
CREATE TABLE greetings (
  id      INTEGER PRIMARY KEY,
  message TEXT NOT NULL
);

INSERT INTO greetings (id, message) VALUES (1, 'Hello, World!');

SELECT message FROM greetings;
```

Tests use the `@dojocode/sql-test-helpers/pglite` package: `createPgliteTestDb(import.meta.url)` returns a fresh PGlite instance pre-seeded by running every project `.sql` file in lex order, then exposes `db.query<T>(sql)` for assertions.
