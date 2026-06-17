-- 02-data.sql — seed sample rows.
-- Runs after 01-schema.sql, so the tables already exist.

INSERT INTO artists (name, country) VALUES
  ('Daft Punk',      'France'),
  ('Radiohead',      'United Kingdom'),
  ('Tame Impala',    'Australia');

-- artist_id values reference the AUTOINCREMENT ids assigned above
-- (1 = Daft Punk, 2 = Radiohead, 3 = Tame Impala).
INSERT INTO albums (title, year, artist_id) VALUES
  ('Discovery',            2001, 1),
  ('Random Access Memories', 2013, 1),
  ('OK Computer',          1997, 2),
  ('In Rainbows',          2007, 2),
  ('Kid A',                2000, 2),
  ('Currents',             2015, 3);
