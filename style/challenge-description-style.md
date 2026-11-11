# Challenge description style guide

How to word the description of a challenge (`README.md` / `details.json`) in English and in Romanian, so that it reads
like an exercise from a school textbook: a clear task, the data that goes in and comes out, one small example, and the
vocabulary students already know from class.

The reference is the pair of Romanian 9th-grade Informatics textbooks (Intuitext and CD Press, Python, 2026) described in
`style/textbooks/README.md`. Their text is searchable in `style/textbooks/*.txt` after running `fetch.py` — look up how a
concept is worded there before you write about it.

This guide covers **wording only**. What a description must contain (it has to be self-contained, because solvers see only
the initial tests, never the full suite), the file layout and the tests are specified in `AGENTS.md`.

## 1. The shape of a statement

Every textbook exercise has the same four parts, in the same order. So does every description.

| Part | Heading | Content |
| --- | --- | --- |
| **Statement** | none — the description starts with it | An optional context (1-2 sentences for beginners, a short paragraph at most for the higher levels), then the task in **one** sentence that says what the program or function receives and what it produces. Nothing else before the first heading, except lettered requirements or the block with the expected output. |
| **Input and output** | `### Input and output` | Only when the task sentence cannot carry it: more than two values, structured data, several lines of input. One bullet per value: name, type, range. |
| **Rules & clarifications** | `### Rules & clarifications` | Everything else the solver needs: special cases, exact formats, errors, where to write the code. One rule per bullet. |
| **Examples** | `### Examples` (`### Example` when there is only one) | Worked examples: given data → result, with a short explanation of the first one. Nothing comes after them. |

`### What the tests check` may follow the rules when the tests also check **how** the code is written (structure checks).
Write-the-tests challenges keep the backbone described in `AGENTS.md` (intro, rules, examples). No other `###` heading.

### The task sentence

Textbooks always use one of a few fixed openings. Use them.

| Kind of challenge | English | Romanian |
| --- | --- | --- |
| Program that reads input | **Write a program that reads** a natural number `n` **and prints** all its divisors. | **Scrie un program care citește de la tastatură** un număr natural `n` **și afișează pe ecran** toți divizorii săi. |
| Program without input | **Write a program that prints** the numbers from 1 to 10, one per line. | **Scrie un program care afișează** numerele de la 1 la 10, câte unul pe linie. |
| Function | **Write the function** `is_prime(n)`, **which receives** a natural number `n` **and returns** `True` if `n` is prime and `False` otherwise. | **Scrie funcția** `is_prime(n)`, **care primește ca parametru** un număr natural `n` **și returnează** `True` dacă `n` este prim și `False` în caz contrar. |
| Given data, short form | **Given** two natural numbers `a` and `b`, **find** their greatest common divisor. | **Se dau** două numere naturale `a` și `b`. **Determină** cel mai mare divizor comun al lor. |
| UI component | **Build** a `Counter` component **that shows** a number and two buttons, **−** and **+**. | **Creează** componenta `Counter`, **care afișează** un număr și două butoane, **−** și **+**. |
| UI behaviour | **When** the **+** button **is clicked**, the number increases by 1. | **La apăsarea** butonului **+**, numărul crește cu 1. |
| API route | **Add** a `GET /notes` route to the app, **which answers with** the list of notes as JSON. | **Adaugă** în aplicație ruta `GET /notes`, **care răspunde cu** lista notițelor în format JSON. |
| Fix a given program | The function `average(grades)` in `main.py` **should** return the average of the grades, **but** it returns a wrong value for a list with one grade. **Fix it** without changing its name or its parameters. | Funcția `average(grades)` din `main.py` **ar trebui** să returneze media notelor, **dar** returnează o valoare greșită pentru o listă cu o singură notă. **Corectează** funcția fără să îi schimbi numele sau parametrii. |

Rules for the statement:

- **A definition comes before the task that uses it.** "A natural number is *almost perfect* if the sum of its proper
  divisors equals the number minus 1. Write a program that reads a number and checks whether it is almost perfect."
- **Context is optional and sized to the level.** It comes from a student's world (grades, a school trip, pocket money
  in lei, temperatures, a bus timetable) and is followed directly by the task.
  - Beginner: one or two sentences.
  - Intermediate and expert: up to a short paragraph (about five sentences), the way the textbooks set up their longer
    problems, **provided every sentence states a fact the solver needs** (a quantity, a constraint, how things relate).
    A sentence that only sets the scene is cut.
- **Types and limits sit next to the name**, the way textbooks write them: "a natural number `n` (`n ≤ 100`)",
  "un număr natural nenul `n` (`1 ≤ n ≤ 100`)".
- **The signature is written once.** The task sentence names the function in its call form, `finish_time(durations,
  dependencies)`. The types appear in one place only: next to the names in the task sentence, or as the bullets of
  `### Input and output` when that section exists. Do not add a separate line with the typed signature
  (`def f(a: dict[str, int]) -> int`) after the task sentence, and do not repeat the types in both places. A language
  where the solver must reproduce the exact signature (C, Java, Rust, TypeScript, ...) gets it as one bullet in
  `### Input and output`. The file to write in is a platform note: it goes last in the rules, never in the statement.
- **Names must not collide with the words of the description.** Do not call a parameter, function or variable `rules`,
  `input`, `output`, `examples`, `tests`, `result` or `data`: the text already uses these words for its own sections and
  for the platform, and "the rules" would mean two things. Take the name from the problem: `dependencies`, `prices`,
  `heights`.
- **Speak to one student**: imperative, second person singular. English "Write", "Find", "Print"; Romanian "Scrie",
  "Determină", "Afișează" — never "Scrieți", "Implementați", "Să se scrie".
- **Say "program", "function", "problem", "exercise".** Not "solution", "script", "snippet", "challenge", "kata".
- **Several requirements are lettered** `a.`, `b.`, `c.`, each one a complete instruction, as in the textbooks. Letters
  are only for separate things the solver has to do, and they sit in the statement, right after the task sentence.
  Definitions and rules are never lettered: a definition is a sentence before the task, a rule is a bullet.
- **Context must carry information.** "A film lasts a number of minutes" tells the solver nothing; drop such a sentence
  and start with the task.

### Rules & clarifications

- One fact per bullet, in a full sentence. The most important rules first.
- Say what happens in the special cases a student would ask about: the empty list, zero, two equal values, invalid data.
- Name the language. Write "In Python, `7 // 2` gives `3`", never "In this language". A description belongs to one
  template, so it always knows its language.
- Explain a construct in one line only if the lesson has not introduced it yet; otherwise just name it.
- Say **what** the result must be, not **how** to code it. Prescribe a construct, a method or an internal detail
  (`querySelector`, a `key` for list items, a particular loop) only when the tests check it or the lesson is about it.
- When counting starts at 0, say "position": "the Fibonacci number at position `n`, where positions start at 0" and
  "position 5 holds 5". Never "the n-th" or "the 5th" for a 0-based position — the 5th number of a sequence is the one
  at position 4.
- A recursive or repeated definition is written with the calls themselves: "For `n ≥ 2`, `fibonacci(n)` is the sum of
  `fibonacci(n - 1)` and `fibonacci(n - 2)`", not "every other value returns the sum of the two before it".
- **Speed.** Before writing, find the largest input in the test files. If the most obvious way to write the code (plain
  recursion, trying every combination, a loop inside a loop) would not finish in time for that input, one rule must say
  so, naming the input: "The tests call the function with `n` up to 100; computing the same values again and again is
  too slow." Leave the rule out only when the obvious way passes every test.
- UI challenges have their own required parts and order: see "UI challenges" below.
- State the exact output format once, with the textbook phrases: "separated by one space", "one per line",
  "on the same line" / "separate prin câte un spațiu", "câte unul pe linie", "pe aceeași linie".
- Platform notes go last and stay short: the file to write in, and that the tests compare the output exactly.

### UI challenges

Every description of a browser, full-stack or mobile challenge must have **all** of the parts below. The tests find
elements by what the description names, so before writing, read the test files and list every text, role, label,
placeholder, `data-testid` and key they use. Name the component the way the code and the tests do: read the author solution and the test imports, and for a default export write "Build the `App` component … Write the component in `App.jsx` and export it as the default export". Never take the name from the request or from the model below. Then write `### Rules & clarifications` with its bullets in exactly this
order:

1. **What the page shows at the start**: every element the tests look for, with its exact visible text in backticks
   (capital letters and punctuation included), the label or placeholder of every field, the role or tag when a test
   queries by it (`button`, `list`, `<ul>`, `<li>`), each `data-testid`, the props the component receives with their
   types, and the initial state (empty field, empty list, disabled button). A text that differs by one character fails
   the tests.
2. **Behaviour**, one bullet per interaction, as action and visible result: "When the **Add** button is clicked, the
   text is added to the end of the list and the field is emptied."
3. **Keys**: one bullet for every key the tests press (`keyDown`, `keyUp`, `keyboard` calls) and what it does: "When
   **Enter** is pressed in the field, the text is added, the same as a click on **Add**."
4. **What must not happen** and the disabled or hidden states: "A field that is empty or holds only spaces adds
   nothing."
5. **The file to write in.**
6. **What is not checked**, in one sentence: what the tests ignore (styling, layout, texts other than the ones named)
   and what the learner may change freely. When it says what must stay, it names only the kinds of things the bullets above actually named (texts, labels, placeholders, roles, `data-testid`) — do not write "roles" when no role was named. Keep it true to the tests: do not promise freedom over markup the tests
   query by structure.
7. **The expected HTML**, always, as the last bullet: "The rendered HTML has this structure:" followed by a fenced
   `html` block with the markup the author solution renders, in its initial state (or after one item was added, when
   the initial state is empty), reduced to the elements, texts, attributes and order the tests rely on. A React Native
   challenge shows the JSX of its primitives instead, introduced by "The component renders this structure:".

Nothing comes after `### Examples`. A model of the form (take every text, label, role and file name from the
challenge's own files, never from this model):

````markdown
Build the `App` component, a poll with two options that counts the votes.

### Rules & clarifications

- The page shows a heading with the text `Cats or dogs?`, two buttons with the texts `Cats` and `Dogs`, the two counts as `Cats: 0` and `Dogs: 0`, and a button with the text `Reset`. At the start, both counts are 0 and the **Reset** button is disabled.
- When the **Cats** or the **Dogs** button is clicked, the count of that option increases by 1.
- When the **Reset** button is clicked, both counts go back to 0.
- When **Escape** is pressed, both counts go back to 0, the same as a click on **Reset**.
- The **Reset** button is disabled while both counts are 0, and **Escape** then changes nothing.
- Write the component in `App.jsx` and export it as the default export.
- The tests check the behaviour, not the styling: no CSS is needed, and you may add elements around the ones below, as long as the texts above stay the same.
- The rendered HTML has this structure:

```html
<div>
  <h1>Cats or dogs?</h1>
  <button>Cats</button>
  <p>Cats: 0</p>
  <button>Dogs</button>
  <p>Dogs: 0</p>
  <button disabled>Reset</button>
</div>
```

### Examples

- Click **Cats** twice → the page shows `Cats: 2` and `Dogs: 0` _(each click adds one vote to that option)_.
- Then click **Dogs** once → the page shows `Cats: 2` and `Dogs: 1`.
- Then click **Reset** → the page shows `Cats: 0` and `Dogs: 0`, and the **Reset** button is disabled.
- Press **Escape** at the start → nothing changes.
````

### API challenges

Every description of a NestJS, Fastify or Hono challenge, or of the routes of a full-stack app, must have **all** of the
parts below. The tests call the app directly and compare the status and the body exactly, so before writing, read the
test files and list every request they make. Then write `### Rules & clarifications` with its bullets in this order:

1. **Every endpoint the tests call**, one bullet each, as method and path (`POST /api/notes`), with the request body
   or query it receives (keys and types), the status of the answer and its exact body: plain text, or JSON with its
   keys.
2. **Every error answer**, one bullet each: when it happens, its status and its exact message or body, exactly as the
   test files have them.
3. **What must not happen** and the answers for requests the tests make outside the ordinary case (unknown route,
   missing body).
4. **The file to write in and how the app is tested**: say which file exports the app and that the tests build it
   without starting a server. Name the pitfall of the template: in Fastify, `src/app.ts` exports `buildApp()` and must
   not call `listen`; in Hono, a handler must return `c.json(...)` or `c.text(...)`; in NestJS, a new controller or
   provider must be registered in `src/app.module.ts`.

No HTML block and no styling sentence in an API challenge. A model of the form (take every route, key, status and file from the challenge's own files, never from this model):

````markdown
A notes service keeps short notes in memory, in the order in which they were added.

Add two routes to the Fastify app: `POST /notes`, which stores a note, and `GET /notes`, which answers with all the notes.

### Rules & clarifications

- `POST /notes` receives a JSON body with the key `text`, a string. It answers status `201` and the stored note as JSON: `{ "id": 1, "text": "Hello" }`. The first note has `id` 1 and every next note has the next number.
- `GET /notes` answers status `200` and a JSON array with all the notes, in the order in which they were added. With no notes, the array is `[]`.
- A `POST /notes` body without `text`, or with a `text` that is empty or holds only spaces, answers status `400` and `{ "error": "text is required" }`. Nothing is stored.
- Spaces at the start and at the end of `text` are removed before the note is stored.
- Write the routes in the function `buildApp()` in `src/app.ts`. The tests call `buildApp()` and send requests to the app without starting a server, so do not call `listen` in this file.

### Examples

- `POST /notes` with the body `{ "text": "Hello" }` answers status `201` and `{ "id": 1, "text": "Hello" }` _(the first note gets `id` 1)_.
- Then `GET /notes` answers status `200` and `[{ "id": 1, "text": "Hello" }]`.
- `POST /notes` with the body `{ "text": "   " }` answers status `400` and `{ "error": "text is required" }`.
````

### Database challenges

The tests run the learner's `.sql` files and then query the database, so before writing, read the test files and list
every table, column, type, constraint and row they check. The task sentence names what to create or to select: "Create
the table `grades`, add the three rows below and select the average grade of every student." Then write
`### Rules & clarifications` in this order:

1. **Every table**, with each column, its type and its constraints, exactly as the tests check them
   (`id INTEGER PRIMARY KEY`, `name TEXT NOT NULL`).
2. **The rows** the database must contain, with their exact values.
3. **The query** the learner writes last: the columns of its result, their order and names, and the order of the rows.
   Say that the result of the last `SELECT` is shown in the **Preview**.
4. **The file to write in** and that the file is run again every time it is saved.

The example shows the result of the query as a small table in a fenced block. No HTML block and no sentence about
styling. A model of the form (take every table, column and value from the challenge's own files, never from this
model):

````markdown
Create the table `grades`, add the three rows below and select the average grade of every student.

### Rules & clarifications

- The table `grades` has three columns: `id`, of type `INTEGER PRIMARY KEY`, `student`, of type `TEXT NOT NULL`, and `grade`, of type `INTEGER NOT NULL`.
- The table contains three rows: `(1, 'Ana', 9)`, `(2, 'Ana', 7)` and `(3, 'Dan', 10)`.
- The last statement selects two columns, `student` and `average`, one row for every student, ordered by `student`.
- Write the statements in `script.sql`. Every time you save, the file is run again and the **Preview** shows the result of the last `SELECT`.

### Example

The `SELECT` statement returns two rows _(Ana has the grades 9 and 7, so her average is 8)_:

```
student | average
--------+--------
Ana     | 8
Dan     | 10
```
````

### Examples

- Write the examples as a bulleted list, one example per bullet (a single example may be a plain sentence).
- Use the textbook form: **given data → result**. The first example is the ordinary case and it is the one explained,
  in a few words; special cases (zero, the empty list) come after it. For a function write "returns", never an arrow;
  an arrow appears only between an action and what the page shows.
  - Program: "Example: for `n = 20`, the program prints `1 2 4 5 10 20`." /
    "Exemplu: pentru `n = 20`, se afișează `1 2 4 5 10 20`."
  - Function: "`is_prime(7)` returns `True` _(7 is divisible only by 1 and 7)_." /
    "`is_prime(7)` returnează `True` _(7 se divide doar cu 1 și cu 7)_."
  - API: "`POST /api/notes` with the body `{ "text": "Hello" }` answers status `201` and `{ "id": 1, "text": "Hello" }`." /
    "`POST /api/notes` cu corpul `{ "text": "Hello" }` răspunde cu starea `201` și `{ "id": 1, "text": "Hello" }`."
  - UI: "Click **+** three times → the number shown is `3`." / "Apasă de trei ori butonul **+** → se afișează `3`."
- A program with several lines of input or output gets an input/output pair in two fenced blocks, labelled
  **Input** / **Output** (**Date de intrare** / **Date de ieșire**).
- Small numbers a student can check by hand. The first example is the ordinary case; a special case comes after it.
- Never show a wrong answer as an example ("prints `3.4` → fail"). State the rule instead.
- Every example must be verified against the reference solution.

## 2. Three levels, one register

The register is always the textbook's. What changes with the level is how much the statement carries.

| | Beginner | Intermediate | Expert |
| --- | --- | --- | --- |
| Who | First months of programming (9th grade) | Knows functions, lists, strings | Comfortable with algorithms and data structures |
| Task | One requirement | Two or three, lettered | A specification: definitions, then requirements |
| Sentences | Short (about 20 words at most), one idea each | Normal | Precise; may use formal notation (`1 ≤ n ≤ 10⁵`) |
| New terms | None beyond the current lesson; a new word is explained in the same sentence | Named, not explained | Named, not explained |
| Context | Everyday, concrete (grades, lei, slices of pizza); 1-2 sentences | Everyday or technical; up to a short paragraph of facts | Technical is fine; up to a short paragraph of facts |
| Rules | 3-6 bullets | 5-8 bullets | As many as the specification needs; group them |
| Examples | One, explained step by step, plus at most one more | Two or three, one special case | Three or more, covering the limits and the error cases |
| Length | 600-1200 characters | 1000-2500 | up to 5000 |

For beginners in particular:

- Give the numbers in the statement instead of abstractions: "17 slices are shared equally by 5 people", not
  "given `slices` and `people`".
- Do not explain the testing machinery. One closing bullet is enough: "The tests run your program and compare what it
  prints with the expected text, character by character."
- Do not stack hints. If the lesson before the challenge taught `//` and `%`, the description names them and moves on.

## 3. Words to avoid (English)

These are the phrasings that make a description sound machine-written. The left column must not appear.

| Avoid | Write |
| --- | --- |
| "Your task is to…", "In this challenge you will…", "Your goal is…" | Start with the task: "Write a program that…" |
| "Implement a solution that…", "Create a function to…" | "Write the function `name(…)`, which receives … and returns …" |
| "In this language…" | "In Python…" (name it) |
| "Let the program do the maths", "Let the program decide" | "Compute both values from the variables; do not type the results yourself." |
| "outputs", "logs", "emits" (for showing text) | "prints" |
| "takes", "accepts", "is passed" (for parameters) | "receives" |
| "Result: `fail`", "should fail" as an example | State the rule that is broken. |
| "edge case", "happy path", "gotcha" | "special case" |
| "Note that…", "Keep in mind that…", "Make sure to…", "Remember to…" | The plain instruction. |
| "simply", "just", "easily", "of course" | Delete. |
| "robust", "leverage", "utilize", "seamlessly", "ensure" | A plain word, or delete. |
| "Have fun!", "Good luck!", "Let's dive in" | Delete. |
| "Learning outcomes", "What you will practise" sections | Delete — that is the lesson's job. |

Punctuation: plain sentences. No dash-joined clauses, no arrows inside sentences (arrows belong only in examples), no
emoji, no exclamation marks.

## 4. Romanian

The platform translates every English description into Romanian automatically, so challenge files hold English only.
This section is for the cases where Romanian is written or checked by hand: a review of a live translation, a proposed
text for a teacher, and the terminology the automatic translation is expected to follow. English that follows section 1
translates cleanly, because each textbook opening has a fixed Romanian counterpart.

The Romanian text is **written**, not translated word by word: take the English statement, then write the sentence a
Romanian Informatics teacher would write on the board. Check every term against the glossary and, when in doubt, against
the textbooks.

### Rules

- Second person singular imperative: **Scrie**, **Determină**, **Afișează**, **Calculează**, **Verifică**, **Completează**,
  **Modifică**, **Creează**. Not "Scrieți" / "Implementați", not "Să se scrie", not "Va trebui să".
- Possessives are singular and informal: "programul tău", "codul tău". Never "dumneavoastră", "dvs.".
- Always with diacritics (ă, â, î, ș, ț — the comma-below forms).
- Mathematics uses school notation: "număr natural", "număr natural nenul", "număr întreg", "număr real", "cifră",
  "divizor", "multiplu", "restul împărțirii lui `a` la `b`", "câtul împărțirii", "media aritmetică", "cel mult",
  "cel puțin", "interval `[1, 500]`".
- Decimal numbers shown in output keep the form the program prints (`3.5`); in running text say "număr real".
- **Never translate what the tests compare or what the solver types**: anything in backticks or code blocks, file names,
  function and variable names, the exact strings the program prints, button labels checked by tests, error messages.
  If a program must print `Each person gets 3 slices`, that line stays in English in the Romanian description too.
- Keep the same structure, bullets and examples as the English text, in the same order — the two versions describe the
  same challenge. Headings: `### Date de intrare și date de ieșire`, `### Restricții și precizări`, `### Exemple`
  (`### Exemplu` for a single one), `### Ce verifică testele`.
- Example formula: "Exemplu: pentru `n = 20`, se afișează `1 2 4 5 10 20`." Explanations in examples start lower-case
  inside italics, as in English.

### Glossary (EN → RO)

Terms are the ones used in the two textbooks. Where the textbooks differ, the first form is preferred.

| English | Romanian | Not |
| --- | --- | --- |
| the thing to solve, inside a description | problemă, exercițiu | provocare (that is the platform's name for its items in the Romanian UI, not a word for the task) |
| statement / requirement | enunț / cerință | declarație, sarcină |
| program, source code | program, cod sursă | script, aplicație (for a short program) |
| to print, to display | a afișa (pe ecran): "afișează", "se afișează" | a printa, a tipări, a imprima, a scoate |
| to read (input) | a citi (de la tastatură): "citește", "se citește" | a prelua, a lua ca intrare |
| input data / output data | date de intrare / date de ieșire | intrare / ieșire (alone), input / output |
| the user types | utilizatorul introduce | utilizatorul tastează |
| variable | variabilă | — |
| to store (in a variable) | a memora: "numărul memorat în variabila `a`" | a stoca, a salva |
| to assign / assignment | a atribui / atribuire | a asigna |
| value | valoare | — |
| data type | tip de date | — |
| integer | număr întreg | întreg (alone), integer |
| non-negative integer | număr natural | întreg non-negativ, întreg pozitiv |
| positive integer | număr natural nenul | întreg pozitiv, număr pozitiv |
| floating-point number, decimal | număr real | număr cu virgulă mobilă, float, zecimală |
| digit | cifră | — |
| string | șir de caractere | șir (alone — "șir" is a sequence of numbers), string, text (when the type is meant) |
| character, letter, space | caracter, literă, spațiu | — |
| uppercase / lowercase letter | literă mare / literă mică | majusculă / minusculă |
| list, array | listă | matrice, tablou, vector, șir |
| element, item | element | articol, obiect |
| index, position | index, poziție ("elementul de pe poziția `i`"); "indice" is also correct, the textbooks use "index" more | — |
| length (of a list / string) | lungime; "numărul de elemente" | mărime, dimensiune |
| dictionary / key / value | dicționar / cheie / valoare | hartă, mapă |
| condition | condiție | — |
| `if` / `else` statement | instrucțiunea `if`, structură alternativă; ramura `else` | declarația if, clauza else |
| loop | structură repetitivă; instrucțiunea `for` / `while`; "buclă" is acceptable | ciclu, iterație (for the loop itself) |
| to traverse, to iterate over | a parcurge: "parcurge lista" | a itera prin |
| counter | contor | numărător |
| to initialize | a inițializa | — |
| statement, instruction | instrucțiune | declarație, comandă |
| indentation | indentare | aliniere |
| operator, expression | operator, expresie | — |
| remainder / quotient | restul împărțirii / câtul împărțirii | modulo, rest (alone) |
| even / odd | par / impar | — |
| sum / product / average | suma / produsul / media aritmetică | total (for a sum) |
| the largest / smallest value | cea mai mare / cea mai mică valoare; maximul / minimul | cea mai înaltă valoare |
| ascending / descending | crescător / descrescător | ascendent / descendent |
| to sort | a sorta, a ordona | a aranja |
| function | funcție ("subprogram" is the general term in the textbooks) | metodă (unless it belongs to a class) |
| parameter / argument | parametru / argument | — |
| receives (a parameter) | primește ca parametru | ia, acceptă |
| to return | a returna: "returnează" | a întoarce, a înapoia, a da înapoi |
| to call / a call | a apela / apel | a chema, a invoca |
| to run / to execute | a rula (programul), a executa (instrucțiunile) | a porni |
| to test | a testa | a încerca |
| error / exception | eroare / excepție | greșeală (for an error message) |
| to raise (an exception) | a genera o excepție, a semnala o eroare | a arunca, a ridica |
| message | mesaj: `afișează mesajul "…"` | — |
| special case | caz particular, caz special | caz de margine, caz limită (for "edge case") |
| otherwise | în caz contrar, altfel | altminteri |
| separated by one space | separate prin câte un spațiu | spațiate |
| one per line / on the same line | câte unul pe linie / pe aceeași linie | pe rânduri noi |
| file | fișier | — |
| class / object / method / attribute | clasă / obiect / metodă / atribut | proprietate (for an attribute in Python) |
| module, library | modul, bibliotecă | librărie |
| comment | comentariu | — |
| button / window / label / text field | buton / fereastră / etichetă / câmp de text | — |
| to click / on click | a apăsa (butonul) / la apăsarea butonului | a da clic, la click |
| component, page, element (web) | componentă, pagină, element | — |
| prop (component) | proprietate (`prop`): "primește proprietatea `images`" | recuzită, prop (alone, first mention) |
| state (component) | stare | stat |
| to render | a afișa | a reda, a randa |
| event | eveniment | — |
| request / response (HTTP) | cerere / răspuns | solicitare |
| test / the tests check | test / testele verifică | — |

Web and framework names stay in English: HTML, CSS, `div`, `class`, React, Vue, hook, endpoint, JSON.

### Typical machine-translation mistakes

| Machine translation | Correct |
| --- | --- |
| "Scrieți un program care imprimă…" | "Scrie un program care afișează…" |
| "Funcția ia un șir și întoarce…" | "Funcția primește ca parametru un șir de caractere și returnează…" |
| "Având în vedere un tablou de numere întregi…" | "Se dă o listă de numere întregi…" |
| "Returnați adevărat dacă…" | "Returnează `True` dacă…" |
| "un număr întreg pozitiv" | "un număr natural nenul" |
| "Ieșire: 5" | "Date de ieșire: `5`" or "se afișează `5`" |
| "cazuri de margine" | "cazuri particulare" |
| "În această provocare…" | start with the task |
| "Asigurați-vă că…", "Rețineți că…" | the plain instruction |
| "buclă pentru", "dacă-altfel" (translated keywords) | "instrucțiunea `for`", "instrucțiunea `if` … `else`" |
| "Faceți clic pe butonul" | "Apasă butonul" |
| translated output strings and identifiers | left exactly as in the code |

## 5. Before and after

**Before** (live description, beginner, Python):

> 17 pizza slices are shared fairly between 5 people: everyone gets the same number of whole slices, and the slices that
> are left stay in the box. Write a program that prints exactly: […]
>
> - Store the numbers in two variables. The names are up to you; the rules below call them `slices` (`17`) and `people`
>   (`5`). In this language a variable is created like this: `apples = 4`.
> - Let the program do the maths: work out both numbers from the variables instead of typing the results yourself.
> - Prints `Each person gets 3.4 slices` -> Result: `fail` _(only whole slices are handed out)_

**After** — English:

````markdown
A pizza is cut into 17 slices and shared equally by 5 friends. Each friend gets the same number of whole slices, and the
slices that cannot be shared stay in the box.

Write a program that computes and prints how many slices each friend gets and how many slices are left:

```
Each person gets 3 slices
Left over: 2
```

### Rules & clarifications

- Store the two numbers in variables, for example `slices = 17` and `people = 5`.
- The number of slices for each friend is the quotient of dividing `slices` by `people`. In Python, the operator `//`
  gives the quotient: `7 // 2` is `3`.
- The number of slices left is the remainder of the same division. In Python, the operator `%` gives the remainder:
  `7 % 2` is `1`.
- Compute both values from the variables; do not type the results yourself.
- Write the program in `main.py`. The tests run it and compare what it prints with the text above, character by
  character.

### Example

For 17 slices and 5 friends, each friend gets `3` slices _(3 × 5 = 15 slices are shared)_ and `2` slices are left
_(17 − 15)_.
````

**After** — Romanian:

````markdown
O pizza este tăiată în 17 felii și împărțită în mod egal între 5 prieteni. Fiecare prieten primește același număr de
felii întregi, iar feliile care nu pot fi împărțite rămân în cutie.

Scrie un program care calculează și afișează câte felii primește fiecare prieten și câte felii rămân:

```
Each person gets 3 slices
Left over: 2
```

### Restricții și precizări

- Memorează cele două numere în variabile, de exemplu `slices = 17` și `people = 5`.
- Numărul de felii primite de fiecare prieten este câtul împărțirii lui `slices` la `people`. În Python, operatorul `//`
  calculează câtul: `7 // 2` are valoarea `3`.
- Numărul de felii rămase este restul aceleiași împărțiri. În Python, operatorul `%` calculează restul: `7 % 2` are
  valoarea `1`.
- Calculează ambele valori folosind variabilele; nu scrie direct rezultatele.
- Scrie programul în `main.py`. Testele rulează programul și compară textul afișat cu cel de mai sus, caracter cu
  caracter.

### Exemplu

Pentru 17 felii și 5 prieteni, fiecare prieten primește `3` felii _(se împart 3 × 5 = 15 felii)_ și rămân `2` felii
_(17 − 15)_.
````

## 6. Checklist

Run through it for every description, in both languages.

1. The first or second sentence is the task, and it starts with a textbook opening ("Write a program that…",
   "Write the function…", "Build…").
2. Every value has a name, a type and its limits, stated once; no name repeats a word the text uses for something else
   (`rules`, `input`, `output`, `tests`); the file to write in is the last rule, not part of the statement.
3. One rule per bullet; the special cases are covered; the language is named.
4. There is at least one example a student can check by hand, in the given data → result form, verified against the
   solution.
5. UI challenge: every text, role, label, placeholder and `data-testid` the tests look for is in the description,
   character for character; the initial state of the page is stated; every key the tests press is named; one sentence
   says what the tests do not check.
6. Nothing from the "Words to avoid" table is left.
7. The level matches the table in section 2 (length, number of requirements, new terms).
8. Romanian: second person singular, diacritics, every term from the glossary, nothing in backticks translated, same
   structure as the English text.
9. Read it aloud once. If a sentence would sound odd from a teacher at the board, rewrite it.
