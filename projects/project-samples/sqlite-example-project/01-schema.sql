-- 01-schema.sql — define the music library tables (SQLite dialect).
-- Runs first (lexicographic order) against the shared in-memory database.

-- Drop existing tables so this file is safe to re-run on every save.
DROP TABLE IF EXISTS albums;
DROP TABLE IF EXISTS artists;

-- Artists: one row per musician/band.
-- SQLite uses INTEGER PRIMARY KEY AUTOINCREMENT (not Postgres SERIAL).
CREATE TABLE artists (
  id      INTEGER PRIMARY KEY AUTOINCREMENT,
  name    TEXT NOT NULL,
  country TEXT
);

-- Albums: each album belongs to exactly one artist via a foreign key.
CREATE TABLE albums (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  title      TEXT NOT NULL,
  year       INTEGER,
  artist_id  INTEGER NOT NULL,
  FOREIGN KEY (artist_id) REFERENCES artists (id)
);
