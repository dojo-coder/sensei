---
name: challenge-description
description: Write or review the description of a DojoCode challenge (README.md / details.json), in English or Romanian, so it reads like a school textbook exercise. Use whenever a challenge description is created, rewritten, translated or reviewed, and when checking a Romanian translation.
---

# Challenge description

The full rules are in `style/challenge-description-style.md`. Read that file before writing a single sentence; this
skill is only the procedure.

## Writing a new description

1. **Settle the level** (beginner / intermediate / expert) and the kind (program with or without input, function, UI
   component, API). The level table in section 2 of the guide fixes the length, the number of requirements and how many
   examples.
2. **Look up the vocabulary.** If `style/textbooks/*.txt` exist (otherwise run `python style/textbooks/fetch.py`), grep
   them for the concept the challenge is about and read how two or three exercises on that topic are worded:
   `grep -n -i "divizor" style/textbooks/*.txt`. Use the wording and the structure, never the exercise itself.
3. **Write the statement**: optional context of 1-2 sentences, then the task in one sentence with a textbook opening
   ("Write a program that reads … and prints …", "Write the function `f(x)`, which receives … and returns …",
   "Build a `Name` component that shows …"). Types and limits go next to each name.
4. **Write `### Rules & clarifications`**: one fact per bullet, special cases included, the language named, platform
   notes last. Add `### Input and output` before it only when the task sentence cannot carry the data.
5. **Write `### Examples`**: the ordinary case first and explained, special cases after; a function example reads
   "`f(7)` returns `True`", without an arrow. Run every example against the
   reference solution.
6. **Run the checklist** in section 6 of the guide and remove every phrase from the "Words to avoid" table.
7. Copy the same text into `README.md` and the `description` field of `details.json`.

## Romanian

The platform translates the English description automatically, so the challenge files hold English only. Write
Romanian when the user asks for it (a review, a proposed translation, text for a teacher):

- write it as a Romanian Informatics teacher would, following section 4 of the guide: second person singular
  ("Scrie", "Determină", "Afișează"), diacritics, every term from the glossary;
- never translate anything in backticks or code blocks, nor the strings the tests compare;
- keep the structure of the English text; headings `### Restricții și precizări`, `### Exemple`.

## Reviewing an existing description or translation

Report, per challenge: the sentences that break the guide (quote them), the rewritten text, and one line on what changed.
Keep a list of the challenges you changed — the teacher who gave the feedback reviews that list.
