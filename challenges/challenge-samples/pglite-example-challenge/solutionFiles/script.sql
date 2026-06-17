-- Reference solution. Edit any .sql file; on save every non-test .sql file
-- runs against the same in-memory database, in lex order. The last SELECT
-- renders in the Preview panel.

CREATE TABLE greetings (
  id      INTEGER PRIMARY KEY,
  message TEXT NOT NULL
);

INSERT INTO greetings (id, message) VALUES (1, 'Hello, World!');

SELECT message FROM greetings;
