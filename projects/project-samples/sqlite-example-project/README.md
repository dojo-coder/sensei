# SQLite Music Library

A self-contained **SQLite** (compiled to WebAssembly via [`@sqlite.org/sqlite-wasm`](https://sqlite.org/wasm/doc/trunk/index.md)) sandbox modeling a tiny music library: `artists` and their `albums`, linked by a foreign key. The final query ranks each artist by album count and earliest release year.

## Files (run in lexicographic order)

- `01-schema.sql` — creates the `artists` and `albums` tables (`albums.artist_id` references `artists.id`).
- `02-data.sql` — inserts sample artists and albums.
- `03-query.sql` — a `LEFT JOIN` + aggregate (`COUNT`, `MIN`, `GROUP BY`) whose result renders in the Preview.

## How the auto-run / Preview works

Edit any `.sql` file. On save, **every** `.sql` file is re-executed against the same in-memory SQLite database, in lexicographic filename order (hence the `01-`, `02-`, `03-` prefixes). The rows returned by the **last `SELECT`** (here, in `03-query.sql`) are rendered in the Preview panel.

Because the schema file drops and recreates its tables at the top, the whole script stays idempotent across re-runs.

## SQLite dialect notes

- Use `INTEGER PRIMARY KEY AUTOINCREMENT` for auto-incrementing ids (not PostgreSQL's `SERIAL`).
- Introspect the schema with `SELECT name FROM sqlite_master WHERE type='table'` or `PRAGMA table_info(<table>)`.

## Try it

- Add another artist + albums in `02-data.sql` and watch the ranking update.
- Change `03-query.sql` to filter (e.g. `HAVING album_count > 1`) or sort differently.
