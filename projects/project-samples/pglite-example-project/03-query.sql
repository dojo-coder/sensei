-- 03-query.sql — the reporting query (runs last).
-- The last SELECT statement renders in the Preview panel.

-- For each author: how many books they have, plus the average price (in dollars)
-- and the year of their earliest title. Ordered by most books first.
SELECT
  a.name                                   AS author,
  COUNT(b.id)                              AS book_count,
  ROUND(AVG(b.price_cents) / 100.0, 2)     AS avg_price_usd,
  MIN(b.published)                         AS first_published
FROM authors a
JOIN books b ON b.author_id = a.id
GROUP BY a.id, a.name
ORDER BY book_count DESC, author ASC;
