Create the table `greetings` in SQLite, add one row with the message `Hello, World!` and select the message.

### Rules & clarifications

- The table has two columns: `id`, of type `INTEGER PRIMARY KEY`, and `message`, of type `TEXT NOT NULL`.
- The table contains one row: `id` is `1` and `message` is exactly `Hello, World!`, with the capital letters, the comma and the exclamation mark.
- The last statement is `SELECT message FROM greetings;`.
- Write the statements in `script.sql`. Every time you save, the file is run again and the **Preview** shows the result of the last `SELECT`.

### Example

The `SELECT` statement returns one row:

```
message
-------------
Hello, World!
```
