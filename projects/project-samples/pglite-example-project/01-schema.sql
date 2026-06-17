-- 01-schema.sql — table definitions (runs first, by lex order).
-- Edit any .sql file; on save every non-test .sql file is re-executed against
-- the same in-memory PostgreSQL database, in lexicographic order.

-- Authors: one row per author.
CREATE TABLE authors (
  id   SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

-- Books: each book belongs to one author (foreign key -> authors.id).
CREATE TABLE books (
  id          SERIAL PRIMARY KEY,
  title       TEXT NOT NULL,
  author_id   INTEGER NOT NULL REFERENCES authors (id),
  price_cents INTEGER NOT NULL CHECK (price_cents >= 0),
  published   INTEGER -- year of publication
);
