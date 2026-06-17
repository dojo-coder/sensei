-- 02-data.sql — sample data (runs after the schema).

INSERT INTO authors (name) VALUES
  ('Ursula K. Le Guin'), -- id 1
  ('Terry Pratchett'),   -- id 2
  ('Octavia E. Butler'); -- id 3

INSERT INTO books (title, author_id, price_cents, published) VALUES
  ('A Wizard of Earthsea',     1, 1299, 1968),
  ('The Left Hand of Darkness', 1, 1499, 1969),
  ('The Dispossessed',          1, 1599, 1974),
  ('Guards! Guards!',           2, 1199, 1989),
  ('Mort',                      2,  999, 1987),
  ('Kindred',                   3, 1399, 1979),
  ('Parable of the Sower',      3, 1699, 1993);
