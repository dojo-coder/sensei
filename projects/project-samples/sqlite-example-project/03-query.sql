-- 03-query.sql — the reporting query.
-- This is the LAST file to run, and its final SELECT renders in the Preview.

-- For each artist, count their albums and find their earliest release year.
-- LEFT JOIN keeps artists even if they had no albums.
SELECT
  a.name                         AS artist,
  a.country                      AS country,
  COUNT(al.id)                   AS album_count,
  MIN(al.year)                   AS first_release
FROM artists AS a
LEFT JOIN albums AS al ON al.artist_id = a.id
GROUP BY a.id, a.name, a.country
ORDER BY album_count DESC, artist ASC;
