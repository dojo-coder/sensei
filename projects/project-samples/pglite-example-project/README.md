# PGlite Bookstore

A small, self-contained PostgreSQL demo: a bookstore with related `authors` and
`books` tables, seeded with a handful of rows, and a JOIN + aggregate query that
summarizes each author's catalog.

The template runs PostgreSQL in WebAssembly via
[`@electric-sql/pglite`](https://pglite.dev).

## Files

- `01-schema.sql` — creates the `authors` and `books` tables (`books.author_id`
  is a foreign key into `authors.id`).
- `02-data.sql` — inserts sample authors and books.
- `03-query.sql` — a `JOIN` with `COUNT`/`AVG`/`MIN` aggregates; its rows render
  in the Preview.

## How auto-run & preview work

Edit any `.sql` file. On save, every `.sql` file is re-executed against the same
in-memory PostgreSQL database, in **lexicographic order** — so the `01-`, `02-`,
`03-` prefixes guarantee schema runs before data runs before the query. The
**last `SELECT`** statement that executes renders as rows in the Preview panel.

Try changing the `ORDER BY` in `03-query.sql`, adding more rows to `02-data.sql`,
or extending the schema in `01-schema.sql`.
