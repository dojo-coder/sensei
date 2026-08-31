# DojoCode Resource Curator - Agent Guidelines

This file provides comprehensive context for AI curators on how to create, structure, and manage **all DojoCode resource types** by calling the `dojocode` MCP tools: coding **challenges**, **contests**, **learning paths**, **projects**, **assignments**, and **business reports**.

The document is organized in parts. Read the **Session start** section first (it applies to every workflow), then jump to the part for the resource you are creating:

- **Part 1 — Challenges**: full file-based authoring (starter code, solutions, tests), packaging, upload, and test execution. This is the largest part and the foundation the other resources build on. Starts at "Challenge Creation Process" below.
- **Part 2 — Contests**: assemble existing challenges into a timed competition (`create_contest`).
- **Part 3 — Learning Paths**: assemble existing challenges into a guided, lesson-by-lesson path (`create_learning_path`).
- **Part 4 — Projects**: create a free-form sandbox project from a template and a file tree (`create_project`).
- **Part 5 — Assignments**: assign a learning path or a challenge to students / groups (`create_assignment`).
- **Part 6 — Business Reports**: generate persisted snapshots — groups statistics, a contest's leaderboard, or a learning path's progress leaderboard (`generate_business_report`).

> **Organizations / workspace.** Business work (contests, assignments, student groups, and the content that belongs to them) is scoped to an **organization workspace**. Establish the active workspace at session start with `get_my_organizations` → `select_organization` before any org-scoped operation — see **Organization workspace** under *Session start*.

Each resource type has its own top-level folder in this repo (`challenges/`, `contests/`, `learning-paths/`, `projects/`, `assignments/`) with a committed `*-example` descriptor inside it, while the full library of challenge template samples lives under `challenges/challenge-samples/`. Contests, learning paths, and assignments reference **existing** challenges (and learning paths) by their platform `_id` — always resolve those IDs first via `get_my_challenges` / `get_challenges` / `get_my_learning_paths` before calling a create tool. Parts 2–6 and their MCP workflows live at the **end of this file**, after the challenge workflows.

## Session start (mandatory first step)

> Applies to any workflow that needs template IDs (challenges, projects). Contests, learning paths, and assignments do not need `templatesConfiguration.json`, but running this step at session start is harmless and recommended.

**Before doing any other operation**, at the start of the chat/session:

1. **Call `get_templates`**: Use the MCP command `get_templates` with `{}` to fetch all live templates. The response returns only the fields needed for configuration: `_id`, `key`, and `language` for each template.
2. **Build templates config**: From the response array, build a JSON object where:
   - **Key**: each template's `key` (e.g. `nodejs-jest`, `python`, `reactjs-jest`)
   - **Value**: `{ "_id": "<template._id>", "selectedLanguage": "<template.language>" }`
3. **Save to `templatesConfiguration.json`**:
   - If `templatesConfiguration.json` does not exist, create it and write the built object.
   - If it already exists, replace its entire content with the built object.

Use the resulting `templatesConfiguration.json` as the source of truth for template `_id` and `selectedLanguage` in all subsequent operations (creating challenges, adding variations, etc.). Do not rely on hardcoded IDs in this document; always use values from `templatesConfiguration.json` (or from the file you just wrote at session start).

## Organization workspace (business / instructor work)

DojoCode is **organization-scoped**. A business account belongs to one or more **organizations** (workspaces); the content it creates (challenges, projects, learning paths, contests), its student **groups**, and its **assignments** all live inside the *active* workspace. Owners/admins manage an organization; students are members.

**Before any organization-scoped operation** — creating a contest or assignment, listing/creating groups or students, or managing members — make the right workspace active:

1. Call `get_my_organizations` to list the workspaces the account belongs to (each with your `role` — `owner` | `admin` | `member` — and the org `_id`). If there is exactly one, use it. If there are several, ask the user which to work in.
2. Call `select_organization` with that `organizationId` to make it active. (Omit `organizationId` to switch back to the personal workspace.) Content, group, and assignment tools then operate inside that org and stamp new resources with it.

To confirm which workspace is *currently* active without changing it, call `get_current_organization` — it returns the active org (`_id`, `name`, `role`, `plan`), or `{ workspace: 'personal' }` when none is selected. Use it to answer "which organization am I in?" and to check context before creating resources.

If a group/assignment/contest tool ever fails with *"Select an organization workspace"*, you skipped this step — run it and retry.

**Who can do what:** only the `business` tier — a Business account, or an org **owner/admin** — can create/manage organizations, groups, students, contests, and assignments. Plain members can list their orgs and select a workspace, but not manage it.

**Managing the org roster (owner/admin):**

- `list_organization_members` — see everyone in the org (owners/admins/members) with `membershipId`, `user`, `role`, `status`.
- `create_organization_user` — create a **brand-new** student (or admin) account and add them to the org in one call (`email`, `password`, `username`, `firstName`, `lastName`, optional `role`, default `member`).
- `add_organization_member` — add an **existing** DojoCode account to the org by `email` or `userId` (with `role`).
- `update_member_role` / `remove_member` — change a member's role or remove them (the owner can't be changed or removed).
- `create_organization` — bootstrap a new organization (the caller becomes its owner); only needed if the account has none.

> Assignment recipients are still resolved from **groups** (`get_my_groups` / `get_my_students`); a `studentId` must belong to one of your groups. Adding someone to the org roster makes them manageable, but put them in a group before assigning to them individually.

---

# Part 1 — Challenges

Everything from here until "Part 2 — Contests" covers authoring a coding challenge: its on-disk structure, file requirements, packaging, upload, and test execution. The other resource types (Parts 2–5) reference challenges created here, so this is the foundation.

## Challenge Creation Process

### Template Types

The system supports two main categories of challenges:

#### Terminal Challenges

- **nodejs-jest**: Node.js with Jest testing framework
- **nodets-jest**: NodeTS with Jest testing framework
- **python**: Python with pytest testing framework
- **php**: Php with PHPUnit testing framework
- **java**: Java with jupiter testing framework
- **ruby**: Ruby with rspec testing framework
- **rust**: Rust with test
- **c**: C with Criterion testing framework
- **cpp**: C++ with Catch2 testing framework
- **csharp**: C# with xUnit testing framework
- **go**: Go with testing package
- **solidity**: Solidity with Foundry (`forge test`) — Solidity-native tests via `forge-std/Test.sol`

Note: The Node templates (`nodejs-jest`, `nodets-jest`) support running an HTTP server (for example using Node's built-in `http` or `express`). This enables two optional interactive behaviors that a challenge variation may expose:

- **Live Preview**: Runs the challenge as a web app and exposes a browser preview. Useful for UI or interactive endpoint demos.
- **API Tester**: Starts a backend HTTP server so automated API tests (or a manual API tester) can call challenge endpoints.

A variation may enable only Live Preview, only the API Tester, or both. When authoring such variations.

- **When creating the challenge variation**, ensure the following `runtimeOptions` are set in the backend:
  - `runtimeOptions.browserPreviewVisibility`: Set to `true` if Live Preview should be enabled
  - `runtimeOptions.enableApiTester`: Set to `true` if API Tester should be enabled

Note: A reference sample demonstrating both Live Preview and API Tester is included at `challenges/challenge-samples/nodejs_jest_with_preview_and_apiTester-example-challenge`. Use it as a template when creating `nodejs-jest` or `nodets-jest` variations that expose a web server.

#### Browser Challenges

- **vuejs-jest**: Vue.js with Jest testing framework using @testing-library/vue
- **vuets-jest**: Vue.js TypeScript with Jest testing framework using @testing-library/vue
- **reactjs-jest**: React.js with Jest testing framework using @testing-library/react
- **reactts-jest**: React.js TypeScript with Jest testing framework using @testing-library/react
- **svelte-jest**: Svelte with Jest testing framework using @testing-library/svelte
- **vanillajs-jest**: Vanilla JavaScript with Jest testing framework using @testing-library/dom
- **vanillats-jest**: Vanilla TypeScript with Jest testing framework using @testing-library/dom
- **angular-jest**: Angular with Jest testing framework using @testing-library/angular
- **solidjs**: SolidJS with Vitest using @solidjs/testing-library
- **solidjs_ts**: SolidJS TypeScript with Vitest using @solidjs/testing-library

#### Full Stack Challenges

Full-stack templates run their framework's dev server and combine frontend rendering with server-side routes / loaders / actions / API routes. Tests use Vitest.

- **nextjs**: Next.js (App Router) JavaScript with Vitest using @testing-library/react
- **nextjs_ts**: Next.js (App Router) TypeScript with Vitest using @testing-library/react
- **astro**: Astro JavaScript with Vitest using astro/container (`experimental_AstroContainer`)
- **astro_ts**: Astro TypeScript with Vitest using astro/container (`experimental_AstroContainer`)
- **sveltekit**: SvelteKit JavaScript with Vitest using @testing-library/svelte (Svelte 5)
- **sveltekit_ts**: SvelteKit TypeScript with Vitest using @testing-library/svelte (Svelte 5)
- **remix**: Remix (Vite) JavaScript with Vitest using @testing-library/react
- **remix_ts**: Remix (Vite) TypeScript with Vitest using @testing-library/react

#### Backend Challenges

Backend templates run their framework's HTTP server and expose API endpoints. Tests use Vitest plus the framework's built-in request injector (no real port is bound during tests).

- **nestjs**: NestJS TypeScript with Vitest + @nestjs/testing (`Test.createTestingModule(...).compile()`). Author edits services / controllers; the controller's `getHello()` etc. is called directly in tests.
- **fastify**: Fastify TypeScript with Vitest using `app.inject({ method, url })` against the `FastifyInstance` returned by `buildApp()`.
- **hono**: Hono TypeScript with Vitest using `app.request(path)` against the exported Hono instance. Handlers MUST `return` `c.text()` / `c.json()` — calling without returning sends an empty response.

#### Database Challenges

Database templates run an in-browser WebAssembly database for the live Preview, and the same WASM driver in Node for tests. The user edits `.sql` files; on save, every non-test `.sql` file is re-executed against the same in-memory database in lexicographic order (prefix files like `01-schema.sql`, `02-data.sql` if you need ordering). Files named `*.test.sql` are skipped by auto-run. The Preview panel renders rows from the last `SELECT` plus a live schema sidebar.

- **pglite**: PostgreSQL in WASM via `@electric-sql/pglite`. Tests use `createPgliteTestDb(import.meta.url)` from `@dojocode/sql-test-helpers/pglite` — returns a `PgliteTestDb` instance pre-seeded by running every project `.sql` file, with `await db.query<T>(sql)` for assertions. Supports CTEs, window functions, JSON, full-text search, `SERIAL`, `ON CONFLICT`.
- **sqlite**: SQLite in WASM via `@sqlite.org/sqlite-wasm`. Tests use `createSqliteTestDb(import.meta.url)` from `@dojocode/sql-test-helpers/sqlite` — returns a `SqliteTestDb` instance (synchronous `db.query<T>(sql)`). Use `INTEGER PRIMARY KEY AUTOINCREMENT` instead of PostgreSQL's `SERIAL`; introspect schema with `sqlite_master` and `PRAGMA table_info(...)`.

#### Mobile Challenges

Mobile templates run React Native components (`View`, `Text`, `StyleSheet`, `Pressable`, etc.) in the browser via [`react-native-web`](https://necolas.github.io/react-native-web/). The same `App.{jsx,tsx}` source compiles unchanged for iOS/Android via Expo or RN CLI — only the browser preview is the differentiator. Source code imports from `'react-native'`; the Vite alias resolves to `react-native-web` at build/test time.

- **react-native**: React Native primitives in JavaScript, Vitest + @testing-library/react. Render `Text` and assert via `screen.getByText(...)` — RN web maps `Text` to a `<div>` so DOM testing-library queries work normally. Press events: use `fireEvent.click(...)` (RN web translates `onPress` → click).
- **react-native-ts**: Same as above with TypeScript. Types from `@types/react-native` (style objects: `ViewStyle`, `TextStyle`, `ImageStyle`).

Sample challenges live under `challenges/challenge-samples/react-native-example-challenge/` and `challenges/challenge-samples/react-native-ts-example-challenge/`. Copy their `package.json` when bootstrapping a new mobile challenge — they ship `react`, `react-dom`, `react-native-web`, plus the TS variant's `@types/react-native` + `typescript`.

### Challenge Structure

All challenges follow this standardized structure:

```
challenges/[challenge-name]/
└── templates/
    ├── [template-name]/
    │   ├── details.json                # Challenge description and examples
    │   ├── README.md                   # Challenge description (for zip export)
    │   ├── metadata.json               # Variation metadata (variationId, mainFilePath, activeFilePath)
    │   ├── package.json                # Node.js dependencies (browser challenges only)
    │   ├── preloadedFiles/             # Starter code for students
    │   │   └── preloaded files required to solve this challenge
    │   ├── preloadedFiles.json         # Config: file visibility, readonly, redacted, activeFilePath
    │   ├── solutionFiles/              # Complete solution implementation
    │   │   └── author solution files, similar with preloaded but fully implemented
    │   ├── solutionFiles.json          # Config: file visibility, readonly, redacted
    │   ├── initialTests/               # Basic test cases (5-7 tests)
    │   │   └── test files used to test the challenge, can work with multiple files
    │   ├── initialTests.json           # Config: file visibility, readonly, redacted
    │   ├── allTests/                   # Comprehensive test cases (8-12 tests)
    │   │   └── test files used to test the challenge, can work with multiple files, same tests from initialTests + more edge cases
    │   ├── allTests.json               # Config: file visibility, readonly, redacted
    │   └── exportedContent.zip         # Generated zip file for backend import
    └── [other-template-name]/
        └── [same structure as above]
```

### Configuration Files Format

Each directory has a corresponding JSON configuration file:

**preloadedFiles.json** (includes activeFilePath):

```json
{
  "folders": {},
  "files": {
    "/app.py": { "visible": true, "readonly": false, "redacted": false },
    "/main.py": { "visible": true, "readonly": false, "redacted": false }
  },
  "activeFilePath": "/app.py"
}
```

**solutionFiles.json / initialTests.json / allTests.json**:

```json
{
  "folders": {},
  "files": {
    "/app.py": { "visible": true, "readonly": false, "redacted": false },
    "/main.py": { "visible": true, "readonly": false, "redacted": false }
  }
}
```

**metadata.json**:

```json
{
  "variationId": "placeholder-variation-id",
  "mainFilePath": "/main.py",
  "activeFilePath": "/app.py"
}
```

- **variationId**: Placeholder ID (replaced during upload) or actual variation ID from server
- **mainFilePath**: Path to entry point file for "Run" button (terminal challenges only, omit for browser)
- **activeFilePath**: Path to file that opens first in the editor

## Challenge Creation Rules

### 1. Template-Specific Generation

- When instructed to "generate a terminal/browser challenge in [templateName]", create files **only** in `/challenges/[challenge-name]/templates/[templateName]`
- Each template is independent and self-contained
- Do not create files in other templates unless explicitly requested
- When instructed to "generate translation for [challenge-name] in [templateName]", you will proceed to generate it inside the `/challenges/[challenge-name]/templates/[templateName]`

### 2. All Translations Generation

- Only when explicitly instructed to "generate for all translations" should you create files for all available templates
- Currently supports terminal templates: nodejs-jest, nodets-jest, python, php, java, ruby, rust, c, cpp, csharp, go, solidity
- Currently supports browser templates: vuejs-jest, vuets-jest, reactjs-jest, reactts-jest, svelte-jest, vanillajs-jest, vanillats-jest, angular-jest, solidjs, solidjs_ts
- Currently supports full-stack templates: nextjs, nextjs_ts, astro, astro_ts, sveltekit, sveltekit_ts, remix, remix_ts
- Currently supports backend templates: nestjs, fastify, hono
- Currently supports database templates: pglite, sqlite
- Currently supports mobile templates: react-native, react-native-ts

### 3. Export Content Generation

- **After generating challenge files**, always run the `createExportContent.js` script to create the `exportedContent.zip` file
- This ensures the challenge is properly packaged for distribution and matches the frontend's ZIP format

### 4. README.md Requirement

- **Every template folder must contain a `README.md` file** (`challenges/[challenge-name]/templates/[template-name]/README.md`)
- The `README.md` content **must match the `description` field from `details.json`** (same markdown text)
- The `README.md` must **not be empty** — it is required by the `createExportContent.js` script and is included in the exported zip
- **Always create or verify `README.md` exists before running `createExportContent.js`** or any update/upload workflow

### 5. Browser / Full Stack / Mobile Challenge Package Setup

When creating browser, full-stack, or mobile challenges, copy `package.json` from the matching sample directory. Backend (nestjs / fastify / hono) and database (pglite / sqlite) challenges do NOT need a `package.json` — their deps are baked into the Docker image / template seed.

1. **Create challenge directory structure**: `challenges/[challenge-name]/templates/[templateName]/`
2. **Copy package.json from sample directory inside new directory**: Copy package.json from the corresponding sample challenge:

   **Browser:**
   - **Vue.js**: Copy from `challenges/challenge-samples/vuejs-example-challenge/package.json`
   - **Vue.js TypeScript**: Copy from `challenges/challenge-samples/vuets-example-challenge/package.json`
   - **React.js**: Copy from `challenges/challenge-samples/reactjs-example-challenge/package.json`
   - **React.js TypeScript**: Copy from `challenges/challenge-samples/reactts-example-challenge/package.json`
   - **Svelte**: Copy from `challenges/challenge-samples/svelte-example-challenge/package.json`
   - **VanillaJS**: Copy from `challenges/challenge-samples/vanilla-js-example-challenge/package.json`
   - **VanillaTS**: Copy from `challenges/challenge-samples/vanilla-ts-example-challenge/package.json`
   - **Angular**: Copy from `challenges/challenge-samples/angular-example-challenge/package.json`
   - **SolidJS**: Copy from `challenges/challenge-samples/solidjs-example-challenge/package.json`
   - **SolidJS TypeScript**: Copy from `challenges/challenge-samples/solidjs_ts-example-challenge/package.json`

   **Full Stack:**
   - **Next.js**: Copy from `challenges/challenge-samples/nextjs-example-challenge/package.json`
   - **Next.js TypeScript**: Copy from `challenges/challenge-samples/nextjs_ts-example-challenge/package.json`
   - **Astro**: Copy from `challenges/challenge-samples/astro-example-challenge/package.json`
   - **Astro TypeScript**: Copy from `challenges/challenge-samples/astro_ts-example-challenge/package.json`
   - **SvelteKit**: Copy from `challenges/challenge-samples/sveltekit-example-challenge/package.json`
   - **SvelteKit TypeScript**: Copy from `challenges/challenge-samples/sveltekit_ts-example-challenge/package.json`
   - **Remix**: Copy from `challenges/challenge-samples/remix-example-challenge/package.json`
   - **Remix TypeScript**: Copy from `challenges/challenge-samples/remix_ts-example-challenge/package.json`

   **Mobile:**
   - **React Native**: Copy from `challenges/challenge-samples/react-native-example-challenge/package.json`
   - **React Native TypeScript**: Copy from `challenges/challenge-samples/react-native-ts-example-challenge/package.json`

   **Backend & Database — no package.json needed:**
   - **NestJS** (`challenges/challenge-samples/nestjs-example-challenge`) — deps in Docker image
   - **Fastify** (`challenges/challenge-samples/fastify-example-challenge`) — deps in Docker image
   - **Hono** (`challenges/challenge-samples/hono-example-challenge`) — deps in Docker image
   - **PGlite** (`challenges/challenge-samples/pglite-example-challenge`) — deps in Docker image (`@electric-sql/pglite`, `@dojocode/sql-test-helpers`)
   - **SQLite** (`challenges/challenge-samples/sqlite-example-challenge`) — deps in Docker image (`@sqlite.org/sqlite-wasm`, `@dojocode/sql-test-helpers`)

_Note: Package files are pre-configured in samples with only core framework packages. Testing dependencies (@testing-library, jest, vitest, etc.) are already included in the Docker images._

### 6. Challenge Naming Convention

- Use kebab-case for challenge names: `valid-parentheses-challenge`, `two-sum-challenge`
- Challenge names should be descriptive and indicate the problem type

## File Requirements

### details.json

Contains challenge translation metadata and description. Based on translation this description can differ but should also required same for all translations.

**Critical Requirement:** Challenge descriptions must include **ALL information necessary for implementation** without requiring users to look at test files. **Users do NOT have access to test files**, so the description must be completely self-contained and comprehensive.

**Important:** Challenge descriptions must be **concise and under 5000 characters** to ensure readability and maintainability. Focus on essential information:

- Clear problem statement
- **Complete function/method signatures with all parameters, return types, and expected behavior** (only required if specific functions/methods are tested in the challenge)
- **All edge cases and error handling requirements (what errors to throw, when to throw them, error messages)**
- **Input/output format specifications (data types, constraints, validation rules)**
- **Complete examples with inputs and expected outputs for all scenarios**
- Core requirements and features
- Algorithm explanation (if applicable)
- Key implementation details
- Test selectors (for browser challenges)
- Sample test cases with expected behavior
- Learning outcomes

**What MUST be included:**

- Exact function/method signatures (parameter names, types, return types) - **only if specific functions/methods are tested**
- All edge cases and how they should be handled
- Error messages that must be thrown (exact text)
- Input validation rules and constraints
- Output format specifications
- Multiple examples covering different scenarios
- Any special requirements or constraints

**What to avoid:**

- Vague descriptions that require reading tests to understand requirements
- Missing error handling specifications
- Incomplete examples
- Assumptions that users can infer behavior from test files

Avoid lengthy implementation details or extensive code examples that can be found in the code files themselves, but ensure all functional requirements are explicitly stated.

**Format Guidelines:**

- **Do NOT include titles or headers** (e.g., "# Title", "## Problem Description") in the description field
- The `title` field already provides the challenge name
- Start the `description` directly with the challenge content as a paragraph
- The description should immediately explain what the challenge is about

**Example:**

```json
{
  "title": "Pacman Game",
  "description": "Build a simplified Pacman game where the player navigates a maze, collects dots, and tries to achieve the highest score! This challenge will help you practice Vue.js concepts..."
}
```

**Incorrect (Don't do this):**

```json
{
  "title": "Pacman Game",
  "description": "# Pacman Game: Build a Classic Arcade Game\n\n## Problem Description\n\nBuild a simplified Pacman game..."
}
```

### Preloaded Files

- Provide starter code with empty function implementations
- Include proper function signatures and return statements
- Use appropriate naming conventions for each language
- Don't add comments or hints inside preloaded files

### Main Files (Terminal Challenges Only)

**Important**: All terminal challenges (nodejs-jest, python, php, java, ruby, rust, c, cpp, csharp, go, solidity) **must include a main file** in both `preloadedFiles/` and `solutionFiles/` directories. The main file enables users to run and debug their code directly using the Run button without executing the full test suite.

**Purpose**: The main file serves as an entry point that imports/calls functions from the solution file and outputs results to the console, allowing users to:

- Quickly debug without running tests
- Test functions with custom inputs
- See intermediate outputs via print/console.log statements

**Main File Requirements**:

- **Must be included in both `preloadedFiles/` and `solutionFiles/`** (same content in both)
- Should import/require the solution file and call the main function(s) with example inputs
- Should print/output the results using appropriate language-specific output methods
- Use descriptive output messages to show what is being tested

**Main File Naming by Template**:

- **nodejs-jest**: `main.js`
- **nodets-jest**: `main.ts`,
- **python**: `main.py`
- **php**: `main.php`
- **java**: `Main.java` (in `challenge` package)
- **ruby**: `main.rb`
- **rust**: `main.rs`
- **c**: `main.c`
- **cpp**: `main.cpp`
- **csharp**: `Main.cs` (in `Challenge` namespace)
- **go**: `main.go`
- **solidity**: `Main.s.sol` (Foundry script at challenge root, extends `forge-std/Script.sol`; `run()` is the entrypoint)

**Main File Examples**:

**Node.js (main.js)**:

```javascript
const { functionName } = require("./index");

const result = functionName("example input");
console.log('functionName("example input"):', result);
```

**Python (main.py)**:

```python
from app import function_name

result = function_name('example input')
print('function_name("example input"):', result)
```

**PHP (main.php)**:

```php
<?php
require_once 'app.php';

$result = functionName('example input');
echo 'functionName("example input"): ' . $result . "\n";
```

**Java (Main.java)**:

```java
package challenge;

public class Main {
    public static void main(String[] args) {
        String result = App.functionName("example input");
        System.out.println("functionName(\"example input\"): " + result);
    }
}
```

**Ruby (main.rb)**:

```ruby
require_relative 'app'

result = function_name('example input')
puts "function_name('example input'): #{result}"
```

**Rust (main.rs)**:

```rust
mod app;
use app::function_name;

fn main() {
    let result = function_name("example input");
    println!("function_name(\"example input\"): {}", result);
}
```

**C (main.c or run.c)**:

```c
#include <stdio.h>
#include <stdlib.h>
#include "main.h"

int main() {
    char* result = longestPalindromicSubstring("example input");
    printf("longestPalindromicSubstring(\"example input\"): %s\n", result);
    free(result);
    return 0;
}
```

**Note**: If `main.c` is already used as the solution file name (as in some legacy challenges), use `run.c` as the entry point file name instead.

**C++ (main.cpp)**:

```cpp
#include <iostream>
#include "app.hpp"

int main() {
    std::string result = longestPalindromicSubstring("example input");
    std::cout << "longestPalindromicSubstring(\"example input\"): " << result << std::endl;
    return 0;
}
```

**C# (Main.cs)**:

```csharp
namespace Challenge
{
    public class Program
    {
        public static void Main(string[] args)
        {
            string result = HelloWorld.Hello();
            Console.WriteLine(result);
        }
    }
}
```

**Go (main.go)**:

```go
package main

import "fmt"

func main() {
    result := FunctionName("example input")
    fmt.Println("FunctionName(\"example input\"):", result)
}
```

**Solidity (Main.s.sol)**:

Lives at the challenge root (next to `foundry.toml`, alongside `src/` and `tests/`). The file is a Foundry **script** that extends `forge-std/Script.sol`; its `run()` function is the entrypoint. Executed via `forge script Main.s.sol` — no anvil/local node is needed. `console.log` from `forge-std/console.sol` writes to the Run Code output panel; `vm.*` cheatcodes (e.g. `vm.prank`) are available for impersonation.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.34;

import "forge-std/Script.sol";
import "forge-std/console.sol";
import "./src/HelloWorld.sol";

contract Main is Script {
    function run() external {
        HelloWorld instance = new HelloWorld();
        console.log(instance.helloWorld());
    }
}
```

Key layout rules for Solidity challenges:

- Contracts go under `/src/` — e.g. `/src/HelloWorld.sol`.
- Tests go under `/tests/` with the `.t.sol` extension and extend `forge-std/Test.sol` — e.g. `/tests/HelloWorld.t.sol`.
- The main script sits at the root — `/Main.s.sol` — so `mainFilePath` is `/Main.s.sol` in `metadata.json`.
- A one-line comment directly above each `function test*()` in a `.t.sol` file becomes the human-readable test label: `// ...`, `/// ...`, `/// @notice ...`, or `/// @dev ...` are all recognised.
- npm packages (OpenZeppelin, Chainlink, etc.) are auto-remapped from `node_modules/` because `foundry.toml` declares `libs = ["lib", "node_modules"]` with `auto_detect_remappings = true` — forge scans both paths and generates remappings at build time. Import as `@openzeppelin/contracts/utils/Strings.sol` directly.

**Note**: Browser challenges (vuejs-jest, vuets-jest, reactjs-jest, reactts-jest, svelte-jest, vanillajs-jest, vanillats-jest, angular-jest, solidjs, solidjs_ts), full-stack challenges (nextjs, nextjs_ts, astro, astro_ts, sveltekit, sveltekit_ts, remix, remix_ts), backend challenges (nestjs, fastify, hono), and database challenges (pglite, sqlite) do **not** require main files. Browser/full-stack templates use the framework's dev server for preview; backend templates auto-start their HTTP server; database templates auto-run their `.sql` files against an in-memory DB.

### Solution Files (solutionFiles/)

- Complete, working solution implementations
- Should pass all test cases
- Use efficient algorithms and best practices

### Test Files

- **Initial Tests**: basic test cases covering core functionality (5-7 tests)
- **All Tests**: basic tests from initial tests + comprehensive test cases including edge cases (8-12 tests total)

#### Initial Tests vs All Tests Relationship

**Initial Tests** should include:

- Basic functionality tests (happy path scenarios)
- Simple edge cases (empty input, single element)
- Core algorithm validation
- Essential user interactions (for browser challenges)

**All Tests** should include:

- **All tests from Initial Tests** (copy the same test cases)
- Additional edge cases and boundary conditions
- Complex scenarios and stress tests
- Advanced user interactions (for browser challenges)
- Error handling and validation tests

**Example progression**:

- Initial Tests: 5 tests covering basic functionality
- All Tests: Same 5 tests + 3-7 additional edge case tests = 8-12 total tests

- Use appropriate testing frameworks (Jest for Node.js, VueJS, ReactJS, pytest for Python, PHPUnit for php, Jupiter for Java, rspec for Ruby, test for Rust, Criterion for C, Catch2 for C++, xUnit for C#, testing for Go, forge-std for Solidity)
- Include descriptive test names and clear assertions

#### Test Structure by Template

**Node.js/Jest (Terminal)**:

- Use `const { describe, it, expect } = require("@jest/globals");`
- Import functions from `"./index"` (not from solutionFiles)
- Structure: `describe("Challenge Name", () => { it("test description", () => { ... }); });`
- Use descriptive test names: `"returns 'expected' for input='value'"`

**NodeTS/Jest (Terminal)**:

- Use `import { describe, expect, it } from '@jest/globals';`
- Import functions from `"./index"` (not from solutionFiles)
- Structure: `describe("Challenge Name", () => { it("test description", () => { ... }); });`
- Use descriptive test names: `"returns 'expected' for input='value'"`

**Python/pytest (Terminal)**:

- Use `from pytest import mark as m`
- Import from `challenge.app` module
- Structure: `@m.describe("Challenge Name")` class with `@m.it("test description")` methods
- Use descriptive test names: `"Should return 'expected' for input='value'"`

**Java/Jupiter (Terminal)**:

- Use `@DisplayName` annotations for class and methods
- Import static assertions: `import static org.junit.jupiter.api.Assertions.*;`
- Structure: `@DisplayName("Challenge Name")` class with `@Test @DisplayName("test description")` methods
- Use descriptive test names: `"Returns 'expected' for input='value'"`

**PHP/PHPUnit (Terminal)**:

- Use `use PHPUnit\Framework\TestCase;`
- Include author file: `require_once __DIR__ . '/App.php';`
- Structure: `@testdox` annotations for class and methods
- Use descriptive test names: `"Returns 'expected' for input='value'"`

**Ruby/RSpec (Terminal)**:

- Use `require 'rspec'` and `require_relative '../solutionFiles/App'`
- Structure: `describe "Challenge Name"` with `it "test description"` blocks
- Use descriptive test names: `"returns 'expected' for input='value'"`

**Vue.js/Jest (Browser)**:

- Use `import { render, screen, fireEvent } from "@testing-library/vue";`
- Import component from `"./ComponentName.vue"` (not from solutionFiles)
- Structure: `describe("ComponentName", () => { it("test description", () => { ... }); });`
- Use descriptive test names: `"displays the first image"`, `"has the previous button initially disabled"`

**Vue.js TypeScript/Jest (Browser)**:

- Use `import { render, fireEvent } from "@testing-library/vue";` and `import { screen } from "@testing-library/dom";`
- Use `import { describe, expect, it } from "@jest/globals";`
- Import component from `"./ComponentName.vue"` (not from solutionFiles)
- Structure: `describe("ComponentName", () => { it("test description", async () => { ... }); });`
- Use descriptive test names: `"displays the first image"`, `"has the previous button initially disabled"`
- Use `async` for test functions that involve user interactions with `await fireEvent.click()`

**React.js/Jest (Browser)**:

- Use `import { render, screen, fireEvent } from "@testing-library/react";`
- Import component from `"./ComponentName.jsx"` (not from solutionFiles)
- Structure: `describe("ComponentName", () => { it("test description", () => { ... }); });`
- Use descriptive test names: `"displays the first image"`, `"has the previous button initially disabled"`

**React.js TypeScript/Jest (Browser)**:

- Use `import { render, screen, fireEvent } from "@testing-library/react";` and `import '@testing-library/jest-dom/jest-globals';`
- Use `import { describe, expect, it, beforeEach } from '@jest/globals';`
- Import component from `"./ComponentName"` (not from solutionFiles, TypeScript files use .tsx extension)
- Structure: `describe("ComponentName", () => { it("test description", () => { ... }); });`
- Use descriptive test names: `"displays the first image"`, `"has the previous button initially disabled"`

**Svelte/Jest (Browser)**:

- Use `import { render, screen, fireEvent, cleanup } from "@testing-library/svelte";`
- Import component from `"./ComponentName.svelte"` (not from solutionFiles)
- Structure: `describe("ComponentName", () => { it("test description", () => { ... }); });`
- Use descriptive test names: `"displays the first image"`, `"has the previous button initially disabled"`
- **Timer Testing**: For components using timers/intervals, use Jest fake timers:

  ```javascript
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
    cleanup();
  });

  async function advance(ms) {
    jest.advanceTimersByTime(ms);
    // allow pending microtasks to flush after advancing timers
    await Promise.resolve();
  }
  ```

- Use `await advance(time)` to advance timers in tests

**VanillaJS/Jest (Browser)**:

- Use `import { render, screen, fireEvent, cleanup } from "@testing-library/dom";`
- Import component from `"./ComponentName.js"` (not from solutionFiles)
- Structure: `describe("ComponentName", () => { it("test description", () => { ... }); });`
- Use descriptive test names: `"displays the first image"`, `"has the previous button initially disabled"`
- Use `cleanup()` in `afterEach` to clean up DOM

**VanillaTS/Jest (Browser)**:

- Use `import { render, screen, fireEvent, cleanup } from "@testing-library/dom";`
- Import component from `"./ComponentName.ts"` (not from solutionFiles)
- Structure: `describe("ComponentName", () => { it("test description", () => { ... }); });`
- Use descriptive test names: `"displays the first image"`, `"has the previous button initially disabled"`
- Use `cleanup()` in `afterEach` to clean up DOM

**Angular/Jest (Browser)**:

- Use `import { render, screen, fireEvent } from "@testing-library/angular";`
- Import component from `"./ComponentName.component.ts"` (not from solutionFiles)
- Structure: `describe("ComponentName", () => { it("test description", () => { ... }); });`
- Use descriptive test names: `"displays the first image"`, `"has the previous button initially disabled"`
- Use Angular-specific testing utilities when needed

**React Native / React Native TypeScript (Mobile)**:

- Use `import { render, screen, fireEvent } from '@testing-library/react';`
- Import component from `'./ComponentName'` (Vitest auto-resolves `.jsx` / `.tsx`)
- Source files import RN primitives from `'react-native'` (NOT `'react-native-web'`) — the Vite alias resolves at test time
- Render with plain JSX: `render(<App />);` — no factory thunk (unlike Solid)
- For press interactions, use `fireEvent.click(...)` — RN web translates `onPress` to web `click` events. **Do NOT** use `fireEvent.press`
- RN web renders `View` as a `<div>`, `Text` as a `<div>` with `dir="auto"`, and `Pressable` as a `<div>` with role/tabindex — so `screen.getByText(...)` and `screen.getByRole(...)` work normally against jsdom
- Vitest globals (`describe`, `test`, `expect`) are auto-injected via the template's `vitest.config`
- Test file extension: `.spec.jsx` for `react-native`, `.spec.tsx` for `react-native-ts`
- Use descriptive test names: `"renders 'Hello, World!'"`, `"increments count when pressing the button"`

**Rust (Terminal)**:

- Use `#[cfg(test)]` module with `use crate::app::function_name as alias;`
- Structure: `#[test] fn test_name() { ... }` with doc comments `/// Description`
- Use descriptive test names: `"babad_returns_bab_or_aba"`, `"empty_string_returns_empty"`
- Import functions with aliases: `use crate::app::longest_palindromic_substring as lps;`

**C (Terminal)**:

- Use `#include <criterion/criterion.h>` and `#include "main.h"`
- Structure: `Test(functionName, test_description) { ... }`
- Use descriptive test names: `"returns_bab_or_aba_for_babad"`, `"returns_empty_for_empty_input"`
- Always free allocated memory: `free(res);`
- Use Criterion assertions: `cr_assert_str_eq()`, `cr_assert()`

**C++ (Terminal)**:

- Use `#include <catch2/catch_test_macros.hpp>` and `#include "app.hpp"`
- Structure: `TEST_CASE("description") { ... }`
- Use descriptive test names: `"babad -> 'bab' or 'aba'"`, `"empty -> ''"`
- Use Catch2 assertions: `REQUIRE()`, `REQUIRE_THAT()`

**C#/xUnit (Terminal)**:

- Use `using Xunit;`
- Structure: `public class TestClassName { [Fact(DisplayName = "test description")] public void TestMethodName() { ... } }`
- Use `namespace Challenge` for all test classes
- Use descriptive `DisplayName` attributes: `"It should return 'Hello World!'"`, `"Returns empty for null input"`
- Use xUnit assertions: `Assert.Equal()`, `Assert.True()`, `Assert.Throws<>()`

**Go (Terminal)**:

- Use `import "testing"` and `package main`
- Structure: `func TestFunctionName(t *testing.T) { t.Run("test description", func(t *testing.T) { ... }) }`
- Use `t.Run()` subtests with descriptive names: `"It should return 'Hello World!'"`, `"Returns empty for empty input"`
- Use `t.Errorf()` for test failure messages
- All test files must end with `_test.go` suffix

**Solidity/Foundry (Terminal)**:

- Use `import "forge-std/Test.sol";` and import contracts from `"../src/<ContractName>.sol"` (test files live at `/tests/`, contracts at `/src/`)
- Structure: `contract <Name>Test is Test { function setUp() public { ... } function test...() public { ... } }`
- Test file names must end with `.t.sol`; function names must start with `test` (`testFuzz*` for fuzzed, `testFail*` for expected-revert)
- Add a one-line comment directly above each test function — `// ...`, `/// ...`, `/// @notice ...`, or `/// @dev ...` — to produce a human-readable label in the results panel (otherwise the raw function name is shown)
- Use forge-std assertions: `assertEq`, `assertTrue`, `assertFalse`, `assertGt`, `assertLt`, `assertApproxEqAbs`, `assertApproxEqRel`
- Use `vm` cheatcodes for setup/impersonation: `vm.prank(addr)` for next-call sender, `vm.expectRevert(bytes("reason"))` to assert a revert, `vm.warp(ts)` / `vm.roll(bn)` for time/block override, `vm.deal(addr, amt)` for ETH balance
- `setUp()` runs before every test; `address(this)` is the test contract (becomes the deployer/owner for contracts it constructs in `setUp`)

**SolidJS / SolidJS TypeScript (Browser)**:

- Use `import { render, screen } from '@solidjs/testing-library';`
- Import component from `'./ComponentName'` (Vitest auto-resolves `.jsx` / `.tsx`)
- Render via a thunk: `render(() => <App />)` — Solid components run inside a reactive scope, so the JSX must be wrapped in a function
- Vitest globals (`describe`, `test`, `expect`) are auto-injected via `globals: true` in the template's `vitest.config`
- Use descriptive test names: `"renders 'Hello, World!'"`, `"increments count on button click"`

**Next.js / Next.js TypeScript (Full Stack)**:

- Use `import { render, screen } from '@testing-library/react';`
- Import page from `'./src/app/page'` (NOT from `./src/app/page.jsx` / `.tsx` — Vitest resolves the extension)
- Server Components render fine in tests as long as they don't call `cookies()` / `headers()` / database fetches. For Client Components, the `'use client'` directive must be at the top of the source file.
- Structure: `describe('Page', () => { test('...', () => { render(<Page />); ... }); });`
- Test file extension: `.spec.jsx` for `nextjs`, `.spec.tsx` for `nextjs_ts`

**Astro / Astro TypeScript (Full Stack)**:

- Use `import { experimental_AstroContainer as AstroContainer } from 'astro/container';` plus `import { describe, it, expect } from 'vitest';`
- Import page from `'./src/pages/index.astro'`
- Render to a string for assertions: `const html = await (await AstroContainer.create()).renderToString(Page);`
- Assert via regex on the HTML string: `expect(html).toMatch(/<h1[^>]*>\s*Hello, World!\s*<\/h1>/);`
- Test file extension: `.test.js` for `astro`, `.test.ts` for `astro_ts`

**SvelteKit / SvelteKit TypeScript (Full Stack)**:

- Use `import { render, screen } from '@testing-library/svelte';`
- Import the page from `'./src/routes/+page.svelte'`
- Render directly with the imported component reference: `render(Page);` (NO factory thunk — unlike Solid)
- Svelte 5 runes (`$state`, `$derived`, `$effect`) work the same in tests as in dev — the testing library re-renders on state changes automatically
- Test file extension: `.spec.js` for `sveltekit`, `.spec.ts` for `sveltekit_ts`

**Remix / Remix TypeScript (Full Stack)**:

- Use `import { render, screen } from '@testing-library/react';`
- Import the route component from `'./app/routes/_index'` (default export). For nested routes, e.g. `'./app/routes/posts._id'`
- Route components are plain React functions; render them with JSX: `render(<Index />);`
- For routes that use `useLoaderData()`, mock the hook or wrap with `createRemixStub` from `@remix-run/testing` (not required for the simple HelloWorld sample)
- Test file extension: `.spec.jsx` for `remix`, `.spec.tsx` for `remix_ts`

**NestJS (Backend)**:

- Use `import 'reflect-metadata';` as the very first line of the test file — decorators rely on metadata reflection
- Use `import { Test, TestingModule } from '@nestjs/testing';` plus `import { describe, it, expect, beforeEach } from 'vitest';`
- Import provider classes from their source paths: `import { AppController } from './src/app.controller';`
- Build the module via `await Test.createTestingModule({ controllers: [...], providers: [...] }).compile();` then `moduleRef.get<T>(T)` to retrieve instances
- Assert directly on the controller / service methods: `expect(controller.getHello()).toBe('Hello, World!')`
- Test file naming convention: `*.test.ts` (e.g. `app.controller.test.ts`)

**Fastify (Backend)**:

- Use `import { describe, it, expect, afterEach } from 'vitest';` and `import type { FastifyInstance } from 'fastify';`
- Import the app factory: `import { buildApp } from './src/app';`
- Build a fresh instance per test (or per spec file) and ALWAYS `await app?.close()` in `afterEach` — port leaks across spec files cause flaky CI
- Drive handlers without binding a port: `const response = await app.inject({ method: 'GET', url: '/' });`
- Assert via `response.statusCode` and `response.body` (for text) or `response.json()` (for JSON)
- Test file naming convention: `*.test.ts` (e.g. `app.test.ts`)

**Hono (Backend)**:

- Use `import { describe, it, expect } from 'vitest';`
- Import the Hono instance: `import { app } from './src/app';`
- Drive handlers without binding a port via the built-in `app.request(path, init?)` — returns a standard Web Fetch `Response`
- Assert via `response.status` (note: `status`, not `statusCode` like Fastify) and `await response.text()` or `await response.json()`
- Handlers MUST `return` `c.text()` / `c.json()` / `c.html()` — calling without returning sends an empty response
- Test file naming convention: `*.test.ts` (e.g. `app.test.ts`)

**PGlite (Database)**:

- Use `import { describe, it, expect, beforeAll } from 'vitest';`
- Use `import { createPgliteTestDb, type PgliteTestDb } from '@dojocode/sql-test-helpers/pglite';`
- In `beforeAll`, call `db = await createPgliteTestDb(import.meta.url);` — this discovers every `.sql` file alongside the test (in lex order, excluding `*.test.sql`) and executes them against a fresh in-memory PGlite instance
- All `db.query<T>(sql)` calls are **async** — `await db.query<{ message: string }>('SELECT message FROM greetings')`
- For schema introspection, use Postgres catalogs (`information_schema.columns`, `pg_type`, etc.)
- Test file naming convention: `*.test.ts` (e.g. `greetings.test.ts`)

**SQLite (Database)**:

- Use `import { describe, it, expect, beforeAll } from 'vitest';`
- Use `import { createSqliteTestDb, type SqliteTestDb } from '@dojocode/sql-test-helpers/sqlite';`
- In `beforeAll`, call `db = await createSqliteTestDb(import.meta.url);` — same auto-seed-from-`.sql` behaviour as PGlite
- `db.query<T>(sql)` is **synchronous** (unlike PGlite's async API) — `const rows = db.query<{ message: string }>('SELECT ...')`
- For schema introspection, use `sqlite_master` (`SELECT name FROM sqlite_master WHERE type='table'`) and `PRAGMA table_info('<table>')`
- Test file naming convention: `*.test.ts` (e.g. `greetings.test.ts`)

#### Test File Imports

**Important**: During test execution, author solution files are copied to the test root directory. Therefore, test files should import components/modules from the current directory, **not** from `../solutionFiles/`:

**Correct Import**:

```javascript
// Node.js/Jest
const { functionName } = require("./index");

// NodeTS/Jest
import { functionName } from "./index";

// Python/pytest
from challenge.app import function_name

// Java/Jupiter
// No imports needed - methods are called directly on App class

// PHP/PHPUnit
require_once __DIR__ . '/App.php';

// Ruby/RSpec
require_relative './App'

// Vue.js/Jest
import ComponentName from "./ComponentName.vue";

// Vue.js TypeScript/Jest
import ComponentName from "./ComponentName.vue";

// React.js/Jest
import ComponentName from "./ComponentName.jsx";

// React.js TypeScript/Jest
import ComponentName from "./ComponentName";

// Svelte/Jest
import ComponentName from "./ComponentName.svelte";

// VanillaJS/Jest
import ComponentName from "./ComponentName.js";

// VanillaTS/Jest
import ComponentName from "./ComponentName.ts";

// Angular/Jest
import ComponentName from "./ComponentName.component.ts";

// React Native / React Native TS
import App from "./App"; // Vitest auto-resolves .jsx / .tsx
// Source / test files import RN primitives from 'react-native' (Vite aliases to 'react-native-web' at build/test time)
import { View, Text } from 'react-native';

// SolidJS / SolidJS TS
import App from "./App"; // Vitest auto-resolves .jsx / .tsx

// Next.js / Next.js TS
import Page from "./src/app/page"; // App Router page module

// Astro / Astro TS
import Page from "./src/pages/index.astro";
import { experimental_AstroContainer as AstroContainer } from 'astro/container';

// SvelteKit / SvelteKit TS
import Page from "./src/routes/+page.svelte";

// Remix / Remix TS
import Index from "./app/routes/_index"; // route default export

// NestJS
import { AppController } from "./src/app.controller";
import { AppService } from "./src/app.service";

// Fastify
import { buildApp } from "./src/app";

// Hono
import { app } from "./src/app";

// PGlite
import { createPgliteTestDb, type PgliteTestDb } from "@dojocode/sql-test-helpers/pglite";

// SQLite
import { createSqliteTestDb, type SqliteTestDb } from "@dojocode/sql-test-helpers/sqlite";

// Rust
use crate::app::function_name as alias;

// C
#include "main.h"

// C++
#include "app.hpp"

// C#
using Xunit; // test framework
// Classes in same namespace are auto-resolved (namespace Challenge)

// Go
// Functions in same package (package main) are auto-resolved
import "testing"

// Solidity/Foundry
import "forge-std/Test.sol";
import "../src/HelloWorld.sol";   // contracts live under /src/, tests under /tests/
// npm packages are auto-remapped from node_modules/:
import "@openzeppelin/contracts/utils/Strings.sol";
```

**Incorrect Import**:

```javascript
// ❌ Wrong - Don't import from solutionFiles
import ComponentName from "../solutionFiles/ComponentName.vue";
import ComponentName from "../solutionFiles/ComponentName.jsx";
import ComponentName from "../solutionFiles/ComponentName.tsx";
import ComponentName from "../solutionFiles/ComponentName.svelte";
import ComponentName from "../solutionFiles/ComponentName.js";
import ComponentName from "../solutionFiles/ComponentName.ts";
import ComponentName from "../solutionFiles/ComponentName.component.ts";
const { functionName } = require("../solutionFiles/index");
use crate::solutionFiles::app::function_name; // ❌ Wrong for Rust
import { functionName } from "../solutionFiles/index"; // ❌ Wrong for NodeTS
#include "../solutionFiles/main.h" // ❌ Wrong for C
#include "../solutionFiles/app.hpp" // ❌ Wrong for C++
using Challenge.solutionFiles; // ❌ Wrong for C#
import "solutionFiles/functionname" // ❌ Wrong for Go
import "../solutionFiles/src/HelloWorld.sol"; // ❌ Wrong for Solidity — use "../src/HelloWorld.sol"
```

This applies to all test files in both `initialTests/` and `allTests/` directories across all templates.

### Browser Challenge Styling

When generating browser challenges (Vue.js, Vue.js TypeScript, React.js, React.js TypeScript, Svelte, VanillaJS, VanillaTS, Angular, SolidJS, SolidJS TypeScript), full-stack challenges (Next.js, Next.js TS, Astro, Astro TS, SvelteKit, SvelteKit TS, Remix, Remix TS), and mobile challenges (React Native, React Native TypeScript) always ensure the UI is elegant and modern:

- **Visual Design**: Create custom CSS with cohesive color schemes and professional aesthetics
- **Typography**: Use appropriate Google Fonts or system fonts for visual appeal
- **Color Palette**: Choose themed color palettes that match the challenge context (e.g., Dracula theme, modern gradients, professional corporate)
- **Animations**: Include smooth transitions, hover effects, and interactive feedback animations
- **Responsiveness**: Ensure mobile-friendly designs with proper breakpoints
- **User Experience**: Add visual feedback for user interactions (hover states, active states, success/error states)
- **Layout**: Use modern CSS techniques (Flexbox, Grid) for clean, organized layouts
- **Shadows & Depth**: Apply appropriate shadows, borders, and depth effects for visual hierarchy
- **Icons & Decorations**: Include relevant decorative elements when appropriate (emojis, symbols, patterns)

**Note**: Avoid generic or plain styling. Each browser challenge should be visually engaging and demonstrate modern web design principles.

**Mobile-specific (React Native, React Native TypeScript)**: Don't use plain CSS — style via `StyleSheet.create({...})` from `'react-native'`. The same style objects must compile unchanged for iOS/Android, so stick to RN style keys (`flex`, `alignItems`, `justifyContent`, `padding`, `fontSize`, `fontWeight`, `color`, `backgroundColor`, etc.) and avoid web-only properties like `gridTemplateColumns`. Use `Flex` layout primitives (`View` with `flexDirection`, `gap`) instead of CSS Grid. Press feedback should be visual via `Pressable`'s `pressed` style callback: `style={({ pressed }) => [styles.btn, pressed && styles.btnPressed]}`.

### Vue.js Component Structure

**Always use `<script setup>` syntax for Vue.js challenges (applies to both vuejs-jest and vuets-jest):**

- Use `<script setup>` instead of Options API (`export default {}`)
- Import Vue composition functions: `import { ref, computed, nextTick } from 'vue'`
- Use `ref()` for reactive state instead of `data()`
- Use `computed()` for computed properties
- Use `defineProps()` for component props
- Define functions directly as `const functionName = () => {}`
- Use template refs with `const refName = ref(null)` and bind with `ref="refName"` in template
- Access ref values with `.value` (e.g., `count.value++`)
- Access props with `props.propName`

**Example**:

```vue
<script setup>
import { ref, computed, nextTick } from "vue";

const props = defineProps({
  username: {
    type: String,
    required: true,
  },
});

const count = ref(0);
const containerRef = ref(null);

const doubleCount = computed(() => count.value * 2);

const increment = () => {
  count.value++;
  nextTick(() => {
    // DOM updated
  });
};
</script>
```

## Testing Infrastructure

### Test Execution

- Tests run in isolated Docker containers
- Results captured as `.log` files with summary output
- Browser tests (Vue.js, Vue.js TypeScript, React.js, React.js TypeScript, Svelte, VanillaJS, VanillaTS, Angular) use Jest with @testing-library
- Mobile tests (React Native, React Native TypeScript) use Vitest with @testing-library/react (RN web maps RN primitives to DOM nodes so the same testing library applies)

**Note**: Terminal challenges (nodejs-jest, nodets-jest, python, php, Java, Ruby, Rust, C, C++, C#, Go, solidity) do not require package.json files. **Backend (nestjs, fastify, hono) and database (pglite, sqlite) challenges also skip package.json** — their dependencies are baked into the Docker image and managed via the template seed.

## Challenge Types and Examples

### Algorithm Challenges

- **Two Sum**: Find two numbers that add up to target
- **Valid Parentheses**: Check if brackets are properly matched
- **Reverse String**: Reverse a given string
- **Longest Palindromic Substring**: Find longest palindrome in string

### Data Structure Challenges

- **Binary Tree Traversal**: Implement tree traversal algorithms
- **Linked List Operations**: Manipulate linked list structures
- **Stack/Queue Operations**: Implement stack and queue functionality

### Problem-Solving Challenges

- **Array Manipulation**: Sort, search, or transform arrays
- **String Processing**: Parse, validate, or transform strings
- **Mathematical Problems**: Implement mathematical algorithms

## Best Practices

### Challenge Design

- Start with simple, clear problem statements
- Provide multiple examples with expected outputs
- Include edge cases in test suites
- Ensure challenges are byte-sized (solvable in 15-30 minutes)
- **For browser challenges**: Create thematic, visually appealing designs that enhance the learning experience
- **For TypeScript challenges**: Use proper TypeScript types and interfaces, ensure type safety in all implementations

### Code Quality

- Use consistent naming conventions
- Write clean, readable solutions
- Follow language-specific best practices
- **For browser challenges**: Write organized, maintainable CSS with proper structure and comments

### Documentation

- Write clear, concise problem descriptions
- **CRITICAL: Include ALL implementation requirements in the description** - users cannot see test files, so every detail needed for implementation must be explicitly stated in the description
- Provide helpful examples and clarifications with complete input/output pairs
- Specify exact error messages, edge cases, and validation rules
- Use consistent formatting across all files
- Include proper file structure documentation

## Export Content Generation

### createExportContent.js Script

After generating challenge files, use the `createExportContent.js` script to create the `exportedContent.zip` file and folder structure:

```bash
node createExportContent.js challenges/[challenge-name]/templates/[template-name]
```

**What the script does:**

- ✅ Reads `details.json` for challenge description
- 📁 Processes `preloadedFiles`, `solutionFiles`, `initialTests`, `allTests` directories
- 📦 Creates `exportedContent.zip` file matching frontend's `createChallengeZipFile` format
- 📄 Generates JSON configuration files for each directory
- 📋 Copies individual files to `exportedContent` subdirectories

**Example usage:**

```bash
# After generating a Vue.js challenge
node createExportContent.js challenges/two-sum-challenge/templates/vuejs-jest

# After generating a Python challenge
node createExportContent.js challenges/two-sum-challenge/templates/python
```

## Workflow Summary

0. **Session start (first)**: Call `get_templates` with `{}`, build the keyed config (template key → `{ _id, selectedLanguage }`), and save it to `templatesConfiguration.json` (create or overwrite). Use `templatesConfiguration.json` for all template IDs thereafter.
1. **Create Challenge Structure**: Set up directories and basic files following the structure of template from samples folder.
2. **Write Problem Description**: Create detailed challenge description following the structure of template from samples folder.
3. **Implement Solutions**: Write complete author solutions following the structure of template from samples folder.
4. **Create Test Suites**: Develop initial and comprehensive test cases following the structure of template from samples folder.
5. **Generate ExportedContent**: Run `createExportContent.js` script to package challenge for distribution

This system enables rapid creation of high-quality coding challenges with comprehensive testing and easy distribution capabilities.

# MCP Commands to use when finishing generating variations

## Templates configuration

Template `_id` and `selectedLanguage` for each template are stored in **`templatesConfiguration.json`** at the project root. That file is created or updated at **session start** when you call `get_templates` (see "Session start (mandatory first step)" above).

- **Read template IDs from `templatesConfiguration.json`**: For any operation that needs a template's `_id` or `selectedLanguage` (e.g. creating a challenge, adding a variation), read the value from `templatesConfiguration.json` using the template key (e.g. `nodejs-jest`, `python`, `reactjs-jest`). Do not use hardcoded IDs from this document.
- **Format**: Each key in `templatesConfiguration.json` is a template key; each value is `{ "_id": "<template id>", "selectedLanguage": "<language id>" }`.

## Challenge Creation Workflow with MCP Commands

When instructed to create an existing generated challenge, follow this workflow:

1. **Navigate to Challenge Folder**: Go to the challenge folder (`challenges/[challenge-name]/`)

2. **Check if Challenge Already Created**: Check if `challengeCreate.json` file exists in the challenge folder:
   - **If the file exists**: Return a message "Challenge already created" and stop the workflow
   - **If the file does not exist**: Continue to step 3

3. **Extract Challenge Slug**: Get the slug from the challenge folder name (the challenge name itself, e.g., `two-sum-challenge`)

4. **Check Slug Uniqueness**: Call the MCP command `check_slug_uniqueness` with:
   - `slug`: The challenge name/slug

5. **Handle Uniqueness Response**:
   - **If `isUnique` is `true`**: Continue to step 6
   - **If `isUnique` is `false`**: Generate a new slug (append a number or modify the name) and repeat step 4 (call `check_slug_uniqueness` again)

6. **Get Available Tags**: Call the MCP command `get_all_tags` to retrieve all available tags. This returns an array of tag objects:

   ```typescript
   interface Tag {
     _id: string;
     name: string;
   }
   ```

7. **Select Challenge Metadata**: Based on the challenge content and theme:
   - **Tags**: Select 3-5 tags from the available tags that best match the challenge theme (e.g., "algorithms", "strings", "arrays", "math", etc.)
   - **Estimate**: Determine how many minutes it would take for a person to solve the challenge (e.g., 10, 30, 60, 120 minutes)
   - **Default Difficulty**: Assign a difficulty level:
     - `1` = Beginner (simple concepts, straightforward implementation)
     - `2` = Intermediate (requires some problem-solving skills)
     - `3` = Expert (complex algorithms, advanced concepts)

8. **Create Challenge**: Once the slug is unique, call the MCP command `create_challenge` with:
   - `title`: The challenge title (from `details.json`)
   - `slug`: The unique challenge slug
   - `template`: The template `_id` from the first generated template variation
   - `selectedLanguage`: The `selectedLanguage` from the first generated template variation
   - `estimate`: Integer number representing minutes that would take a person to solve the challenge
   - `tags`: Array of tag objects (3-5 tags) selected from `get_all_tags` response, each containing `_id` and `name`
   - `defaultDifficulty`: Integer (1, 2, or 3) representing the difficulty level
   - `runtimeOptions` _(only for `nodejs-jest` or `nodets-jest` templates that expose an HTTP server)_: An object with:
     - `browserPreviewVisibility`: Set to `true` if Live Preview should be enabled
     - `enableApiTester`: Set to `true` if API Tester should be enabled

9. **Save Challenge Response**: After successfully creating the challenge, save the response from the `create_challenge` MCP command to `challengeCreate.json` file in the challenge folder (`challenges/[challenge-name]/challengeCreate.json`)

We only need a json like this. Two fields \_id which is the \_id of the challenge and the defaultVariation object containing the \_id of the default variation (first variation in what was the challenge created):

```json
{
  "_id": "_id of the challenge",
  "defaultVariation": {
    "_id": "690cb7c590bca759b2401415"
  }
}
```

10. **Update metadata.json with variationId**: After saving the challenge response, update the `metadata.json` file:

- Read the existing `metadata.json` from the first template folder
- Replace the `variationId` field (which has `"placeholder-variation-id"`) with the actual `defaultVariation._id` from `challengeCreate.json`
- Save the updated `metadata.json` back to `challenges/[challenge-name]/templates/[first-template-name]/metadata.json`

```json
{
  "variationId": "actual-variation-id-from-response",
  "mainFilePath": "/main.py",
  "activeFilePath": "/app.py"
}
```

11. **Template ID Lookup**: To get the `template` and `selectedLanguage`:

- Identify the name of the first variation/template generated (e.g., `nodejs-jest`, `python`, `vuejs-jest`)
- Look up this template key in **`templatesConfiguration.json`** (see "Templates configuration" above)
- Use the `_id` value as the `template` parameter
- Use the `selectedLanguage` value as the `selectedLanguage` parameter

These values are then used in the `create_challenge` request.

12. **Update the challenge first variation files**: After creation we need to update the challenge first variation files:

- **Verify Exported Content Exists**: Ensure `exportedContent.zip` file exists in the first template folder. If not, run:
  ```bash
  node createExportContent.js challenges/[challenge-name]/templates/[first-template-name]
  ```
- **Prepare upload**: Call the MCP command `prepare_file_upload` with `{}`. This returns `{ uploadId, uploadUrl }` — **capture the `uploadUrl`**.
- **Upload the zip file**: Run the `uploadChallengeFiles.js` script to upload the zip directly via REST (binary data never passes through the AI context):
  ```bash
  node uploadChallengeFiles.js <uploadUrl> <challengeId> <variationId> challenges/[challenge-name]/templates/[first-template-name]/exportedContent.zip
  ```
  Where `<uploadUrl>` is from the previous step, `<challengeId>` is the `_id` from `challengeCreate.json`, and `<variationId>` is the `defaultVariation._id` from `challengeCreate.json`.

13. **Validate challenge solution**

- Follow the **"Fully test the challenge"** section below, which includes:
  1. **Run initial tests** (author solution) — all tests must pass, no errors
  2. **Run all tests** (author solution) — all tests must pass, no errors
  3. **Run initial tests with preloaded files** — `tests` array must contain at least one test (failures are expected)
  4. **Run all tests with preloaded files** — `tests` array must contain at least one test (failures are expected)
  5. **Run challenge code** (terminal challenges only) — verify main file executes correctly with expected output. Skip for browser challenges.
  6. **Run challenge code with preloaded files** (terminal challenges only) — verify starter code runs without errors. Skip for browser challenges.

14. **Display challenge edit link**: After all validation passes, call the MCP command `get_challenge_edit_url` with:
    - `challengeId`: The `_id` from `challengeCreate.json`
    - `variationId`: The `defaultVariation._id` from `challengeCreate.json`

    Display the returned `editUrl` to the user with a message like: "You can access the challenge by following this link: <editUrl>"

## Adding Variation Workflow with MCP Commands

When instructed to add a variation for a specific challenge (e.g., "add variation for python"), follow this workflow:

1. **Navigate to Challenge Folder**: Go to the challenge folder (`challenges/[challenge-name]/`)

2. **Check if Variation Already Exists**: Check if the template variation folder exists (e.g., `challenges/[challenge-name]/templates/python/`)

3. **Check if Variation Already Created**: Check if `metadata.json` in the variation folder has a real `variationId` (not `"placeholder-variation-id"`):
   - **If `variationId` is NOT `"placeholder-variation-id"`**: Return a warning message "Variation already created" and stop the workflow
   - **If `variationId` IS `"placeholder-variation-id"`**: Continue to step 4

4. **Lookup Template Configuration**: Look up the template name (e.g., `python`) in **`templatesConfiguration.json`** to get:
   - `template`: The `_id` value for the template
   - `selectedLanguage`: The `selectedLanguage` value for the template

5. **Get Challenge ID**: Read the `challengeId` from `challengeCreate.json` file in the challenge folder (the `_id` property)

6. **Add Variation**: Call the MCP command `add_variation` with:
   - `challengeId`: The `_id` property from `challengeCreate.json`
   - `template`: The template `_id` from step 4
   - `selectedLanguage`: The `selectedLanguage` from step 4
   - `runtimeOptions` _(only for `nodejs-jest` or `nodets-jest` templates that expose an HTTP server)_: An object with:
     - `browserPreviewVisibility`: Set to `true` if Live Preview should be enabled
     - `enableApiTester`: Set to `true` if API Tester should be enabled

7. **Update metadata.json with variationId**: After successfully adding the variation, update the `metadata.json` file:
   - Read the existing `metadata.json` from the template folder
   - Replace the `variationId` field with the `_id` from the `add_variation` response
   - Save the updated `metadata.json` back to `challenges/[challenge-name]/templates/[template-name]/metadata.json`

```json
{
  "variationId": "_id from add_variation response",
  "mainFilePath": "/main.py",
  "activeFilePath": "/app.py"
}
```

8. **Update the challenge variation files**: After adding the variation we need to update the challenge variation files:

- **Verify Exported Content Exists**: Ensure `exportedContent.zip` file exists in the template folder. If not, run:
  ```bash
  node createExportContent.js challenges/[challenge-name]/templates/[template-name]
  ```
- **Prepare upload**: Call the MCP command `prepare_file_upload` with `{}`. This returns `{ uploadId, uploadUrl }` — **capture the `uploadUrl`**.
- **Upload the zip file**: Run the `uploadChallengeFiles.js` script to upload the zip directly via REST:
  ```bash
  node uploadChallengeFiles.js <uploadUrl> <challengeId> <variationId> challenges/[challenge-name]/templates/[template-name]/exportedContent.zip
  ```
  Where `<uploadUrl>` is from the previous step, `<challengeId>` is the `_id` from `challengeCreate.json`, and `<variationId>` is the `variationId` from `metadata.json`.

**Example**: If adding a variation for `python`:

- Look up `python` in **`templatesConfiguration.json`** for `_id` and `selectedLanguage`
- Use these values in the `add_variation` request
- Update the `variationId` in `challenges/[challenge-name]/templates/python/metadata.json` with the `_id` from response
- Call `prepare_file_upload` MCP tool to get `uploadUrl`
- Run `node uploadChallengeFiles.js <uploadUrl> <challengeId> <variationId> challenges/[challenge-name]/templates/python/exportedContent.zip`

9. **Validate challenge solution**

- Follow the **"Fully test the challenge"** section below, which includes:
  1. **Run initial tests** (author solution) — all tests must pass, no errors
  2. **Run all tests** (author solution) — all tests must pass, no errors
  3. **Run initial tests with preloaded files** — `tests` array must contain at least one test (failures are expected)
  4. **Run all tests with preloaded files** — `tests` array must contain at least one test (failures are expected)
  5. **Run challenge code** (terminal challenges only) — verify main file executes correctly with expected output. Skip for browser challenges.
  6. **Run challenge code with preloaded files** (terminal challenges only) — verify starter code runs without errors. Skip for browser challenges.

10. **Display challenge edit link**: After all validation passes, call the MCP command `get_challenge_edit_url` with:
    - `challengeId`: The `_id` from `challengeCreate.json`
    - `variationId`: The variation `_id` from `metadata.json`

    Display the returned `editUrl` to the user with a message like: "You can access the challenge by following this link: <editUrl>"

## Update Challenge Files Workflow with MCP Commands

When instructed to update a challenge files for a specific template (e.g., "update challenge x files for template y"), follow this workflow:

1. **Navigate to Challenge Folder**: Go to the challenge folder (`challenges/[challenge-name]/`)

2. **Check if Challenge Was Created**: Check if `challengeCreate.json` file exists in the challenge folder:
   - **If the file does not exist**: Return a message "Challenge was not created" and stop the workflow
   - **If the file exists**: Continue to step 3

3. **Navigate to Template Folder**: Go to the specific template folder (`challenges/[challenge-name]/templates/[template-name]/`)

4. **Check if Variation Was Created**: Check if `metadata.json` in the template folder has a real `variationId` (not `"placeholder-variation-id"`):
   - **If `variationId` IS `"placeholder-variation-id"`**: Return a message "Variation was not created" and stop the workflow
   - **If `variationId` is NOT `"placeholder-variation-id"`**: Continue to step 5

5. **Get Variation ID**: Read the `metadata.json` file and extract the `variationId` property

6. **Get Challenge ID**: Read the `challengeId` from `challengeCreate.json` file in the challenge folder (the `_id` property)

7. **Verify Exported Content Exists**: Check if `exportedContent.zip` file exists in the template folder (`challenges/[challenge-name]/templates/[template-name]/exportedContent.zip`):
   - **If the file does not exist**: Run the `createExportContent.js` script first to generate the zip file:
     ```bash
     node createExportContent.js challenges/[challenge-name]/templates/[template-name]
     ```
   - **If the file exists**: Continue to step 8

8. **Prepare upload**: Call the MCP command `prepare_file_upload` with `{}`. This returns `{ uploadId, uploadUrl }` — **capture the `uploadUrl`**.

9. **Upload the zip file**: Run the `uploadChallengeFiles.js` script to upload the zip directly via REST:

   ```bash
   node uploadChallengeFiles.js <uploadUrl> <challengeId> <variationId> challenges/[challenge-name]/templates/[template-name]/exportedContent.zip
   ```

   Where `<uploadUrl>` is from step 8, `<challengeId>` is the challenge `_id` from step 6, and `<variationId>` is the variation `_id` from step 5.

10. **Validate challenge solution**

- Follow the **"Fully test the challenge"** section below, which includes:
  1. **Run initial tests** (author solution) — all tests must pass, no errors
  2. **Run all tests** (author solution) — all tests must pass, no errors
  3. **Run initial tests with preloaded files** — `tests` array must contain at least one test (failures are expected)
  4. **Run all tests with preloaded files** — `tests` array must contain at least one test (failures are expected)
  5. **Run challenge code** (terminal challenges only) — verify main file executes correctly with expected output. Skip for browser challenges.
  6. **Run challenge code with preloaded files** (terminal challenges only) — verify starter code runs without errors. Skip for browser challenges.

11. **Display challenge edit link**: After all validation passes, call the MCP command `get_challenge_edit_url` with:
    - `challengeId`: The challenge `_id` from step 6
    - `variationId`: The variation `_id` from step 5

    Display the returned `editUrl` to the user with a message like: "You can access the challenge by following this link: <editUrl>"

## Run challenge initial tests

When instructed to run the initial tests for a specific variation (e.g., "run intitial tests for challenge x for template y")

1. **Navigate to Challenge Folder**: Go to the challenge folder (`challenges/[challenge-name]/`)

2. **Check if Challenge Was Created**: Check if `challengeCreate.json` file exists in the challenge folder:
   - **If the file does not exist**: Return a message "Challenge was not created" and stop the workflow
   - **If the file exists**: Continue to step 3

3. **Navigate to Template Folder**: Go to the specific template folder (`challenges/[challenge-name]/templates/[template-name]/`)

4. **Check if Variation Was Created**: Check if `metadata.json` in the template folder has a real `variationId` (not `"placeholder-variation-id"`):
   - **If `variationId` IS `"placeholder-variation-id"`**: Return a message "Variation was not created" and stop the workflow
   - **If `variationId` is NOT `"placeholder-variation-id"`**: Continue to step 5

5. **Get Variation ID**: Read the `metadata.json` file and extract the `variationId` property

6. **Get Challenge ID**: Read the `challengeId` from `challengeCreate.json` file in the challenge folder (the `_id` property)

7. **Verify Exported Content Exists**: Check if `exportedContent.zip` file exists in the template folder (`challenges/[challenge-name]/templates/[template-name]/exportedContent.zip`):
   - **If the file does not exist**: Run the `createExportContent.js` script first to generate the zip file:
     ```bash
     node createExportContent.js challenges/[challenge-name]/templates/[template-name]
     ```
   - **If the file exists**: Continue to step 8

8. **Prepare upload**: Call the MCP command `prepare_file_upload` with `{}`. This returns `{ uploadId, uploadUrl }` — **capture the `uploadUrl`**.

9. **Upload the zip file**: Run the `uploadChallengeFiles.js` script to upload the zip directly via REST:

   ```bash
   node uploadChallengeFiles.js <uploadUrl> <challengeId> <variationId> challenges/[challenge-name]/templates/[template-name]/exportedContent.zip
   ```

   Where `<uploadUrl>` is from step 8, `<challengeId>` is the challenge `_id` from step 6, and `<variationId>` is the variation `_id` from step 5.

10. **Call Run Initial Tests**: Call the MCP command `run_initial_tests` with:

    **Required Parameters:**

- `variationId`: The variation `_id` from step 5
- `challengeId`: The challenge `_id` from step 6

11. Verify the response

- Verify if response json contains errors array and if the length of it is greater than 0
- Verify if the response json tests array is present and if some tests object from it have the property passed: false
- If errors of failed tests you will need to update the template and fix the issues (initialTests if there are problems, allTests if there are problems, preloadedFiles if there are problems and also the solutionFiles if there are issues)
- After updating and fixing the errors you will have to generate again the `exportedContent.zip`
- After regeneration of `exportedContent.zip` you will have to update the challenge again
- After update you will have to run the `run_initial_tests` again basically step **10** and redo the process until no errors and no passed failed tests

## Run challenge all tests

When instructed to run the all tests for a specific variation (e.g., "run intitial tests for challenge x for template y")

1. **Navigate to Challenge Folder**: Go to the challenge folder (`challenges/[challenge-name]/`)

2. **Check if Challenge Was Created**: Check if `challengeCreate.json` file exists in the challenge folder:
   - **If the file does not exist**: Return a message "Challenge was not created" and stop the workflow
   - **If the file exists**: Continue to step 3

3. **Navigate to Template Folder**: Go to the specific template folder (`challenges/[challenge-name]/templates/[template-name]/`)

4. **Check if Variation Was Created**: Check if `metadata.json` in the template folder has a real `variationId` (not `"placeholder-variation-id"`):
   - **If `variationId` IS `"placeholder-variation-id"`**: Return a message "Variation was not created" and stop the workflow
   - **If `variationId` is NOT `"placeholder-variation-id"`**: Continue to step 5

5. **Get Variation ID**: Read the `metadata.json` file and extract the `variationId` property

6. **Get Challenge ID**: Read the `challengeId` from `challengeCreate.json` file in the challenge folder (the `_id` property)

7. **Verify Exported Content Exists**: Check if `exportedContent.zip` file exists in the template folder (`challenges/[challenge-name]/templates/[template-name]/exportedContent.zip`):
   - **If the file does not exist**: Run the `createExportContent.js` script first to generate the zip file:
     ```bash
     node createExportContent.js challenges/[challenge-name]/templates/[template-name]
     ```
   - **If the file exists**: Continue to step 8

8. **Prepare upload**: Call the MCP command `prepare_file_upload` with `{}`. This returns `{ uploadId, uploadUrl }` — **capture the `uploadUrl`**.

9. **Upload the zip file**: Run the `uploadChallengeFiles.js` script to upload the zip directly via REST:

   ```bash
   node uploadChallengeFiles.js <uploadUrl> <challengeId> <variationId> challenges/[challenge-name]/templates/[template-name]/exportedContent.zip
   ```

   Where `<uploadUrl>` is from step 8, `<challengeId>` is the challenge `_id` from step 6, and `<variationId>` is the variation `_id` from step 5.

10. **Call Run Initial Tests**: Call the MCP command `run_all_tests` with:

    **Required Parameters:**

- `variationId`: The variation `_id` from step 5
- `challengeId`: The challenge `_id` from step 6

11. Verify the response

- Verify if response json contains errors array and if the length of it is greater than 0
- Verify if the response json tests array is present and if some tests object from it have the property passed: false
- If errors of failed tests you will need to update the template and fix the issues (initialTests if there are problems, allTests if there are problems, preloadedFiles if there are problems and also the solutionFiles if there are issues)
- After updating and fixing the errors you will have to generate again the `exportedContent.zip`
- After regeneration of `exportedContent.zip` you will have to update the challenge again
- After update you will have to run the `run_all_tests` again basically step **10** and redo the process until no errors and no passed failed tests

## Run challenge initial tests with preloaded files

When instructed to run the initial tests with preloaded files for a specific variation (e.g., "run initial tests with preloaded files for challenge x for template y")

**Note**: This runs the tests using the **starter code (preloaded files)** instead of the author solution. The purpose is to verify that tests actually run and produce test results (even if some or all fail). The important thing is that tests exist in the response — not that they all pass.

1. **Navigate to Challenge Folder**: Go to the challenge folder (`challenges/[challenge-name]/`)

2. **Check if Challenge Was Created**: Check if `challengeCreate.json` file exists in the challenge folder:
   - **If the file does not exist**: Return a message "Challenge was not created" and stop the workflow
   - **If the file exists**: Continue to step 3

3. **Navigate to Template Folder**: Go to the specific template folder (`challenges/[challenge-name]/templates/[template-name]/`)

4. **Check if Variation Was Created**: Check if `metadata.json` in the template folder has a real `variationId` (not `"placeholder-variation-id"`):
   - **If `variationId` IS `"placeholder-variation-id"`**: Return a message "Variation was not created" and stop the workflow
   - **If `variationId` is NOT `"placeholder-variation-id"`**: Continue to step 5

5. **Get Variation ID**: Read the `metadata.json` file and extract the `variationId` property

6. **Get Challenge ID**: Read the `challengeId` from `challengeCreate.json` file in the challenge folder (the `_id` property)

7. **Call Run Initial Tests with Preloaded Files**: Call the MCP command `run_initial_tests_preloaded` with:

   **Required Parameters:**

- `variationId`: The variation `_id` from step 5
- `challengeId`: The challenge `_id` from step 6

8. Verify the response

- **Critical check**: Verify if the response json `tests` array is present and contains at least one test. **If the `tests` array is empty or missing, this is a problem** — it means the tests could not run at all against the preloaded files. You will need to fix the preloaded files (syntax errors, missing imports, etc.) in the `preloadedFiles/` directory, regenerate `exportedContent.zip`, update the challenge files, and re-run the tests.
- The `errors` array **may contain errors** — this is acceptable and not a problem on its own.
- Tests with `passed: false` are **EXPECTED** and **CORRECT** when running with preloaded files (the starter code does not implement the solution). It is also OK if some tests pass and some fail. The important thing is that **tests exist in the results**.
- Repeat the fix cycle only if the `tests` array is empty (no test results returned).

## Run challenge all tests with preloaded files

When instructed to run the all tests with preloaded files for a specific variation (e.g., "run all tests with preloaded files for challenge x for template y")

**Note**: This runs all tests using the **starter code (preloaded files)** instead of the author solution. The purpose is to verify that tests actually run and produce test results (even if some or all fail). The important thing is that tests exist in the response — not that they all pass.

1. **Navigate to Challenge Folder**: Go to the challenge folder (`challenges/[challenge-name]/`)

2. **Check if Challenge Was Created**: Check if `challengeCreate.json` file exists in the challenge folder:
   - **If the file does not exist**: Return a message "Challenge was not created" and stop the workflow
   - **If the file exists**: Continue to step 3

3. **Navigate to Template Folder**: Go to the specific template folder (`challenges/[challenge-name]/templates/[template-name]/`)

4. **Check if Variation Was Created**: Check if `metadata.json` in the template folder has a real `variationId` (not `"placeholder-variation-id"`):
   - **If `variationId` IS `"placeholder-variation-id"`**: Return a message "Variation was not created" and stop the workflow
   - **If `variationId` is NOT `"placeholder-variation-id"`**: Continue to step 5

5. **Get Variation ID**: Read the `metadata.json` file and extract the `variationId` property

6. **Get Challenge ID**: Read the `challengeId` from `challengeCreate.json` file in the challenge folder (the `_id` property)

7. **Call Run All Tests with Preloaded Files**: Call the MCP command `run_all_tests_preloaded` with:

   **Required Parameters:**

- `variationId`: The variation `_id` from step 5
- `challengeId`: The challenge `_id` from step 6

8. Verify the response

- **Critical check**: Verify if the response json `tests` array is present and contains at least one test. **If the `tests` array is empty or missing, this is a problem** — it means the tests could not run at all against the preloaded files. You will need to fix the preloaded files (syntax errors, missing imports, etc.) in the `preloadedFiles/` directory, regenerate `exportedContent.zip`, update the challenge files, and re-run the tests.
- The `errors` array **may contain errors** — this is acceptable and not a problem on its own.
- Tests with `passed: false` are **EXPECTED** and **CORRECT** when running with preloaded files (the starter code does not implement the solution). It is also OK if some tests pass and some fail. The important thing is that **tests exist in the results**.
- Repeat the fix cycle only if the `tests` array is empty (no test results returned).

## Run challenge code

When instructed to run the challenge code for a specific variation (e.g., "run code for challenge x for template y"), follow this workflow:

**Note**: This is NOT running tests - this executes the main file of the challenge template to verify the solution code runs correctly.

1. **Navigate to Challenge Folder**: Go to the challenge folder (`challenges/[challenge-name]/`)

2. **Check if Challenge Was Created**: Check if `challengeCreate.json` file exists in the challenge folder:
   - **If the file does not exist**: Return a message "Challenge was not created" and stop the workflow
   - **If the file exists**: Continue to step 3

3. **Navigate to Template Folder**: Go to the specific template folder (`challenges/[challenge-name]/templates/[template-name]/`)

4. **Check if Variation Was Created**: Check if `metadata.json` in the template folder has a real `variationId` (not `"placeholder-variation-id"`):
   - **If `variationId` IS `"placeholder-variation-id"`**: Return a message "Variation was not created" and stop the workflow
   - **If `variationId` is NOT `"placeholder-variation-id"`**: Continue to step 5

5. **Get Variation ID**: Read the `metadata.json` file and extract the `variationId` property

6. **Get Challenge ID**: Read the `challengeId` from `challengeCreate.json` file in the challenge folder (the `_id` property)

7. **Get Main File Path (Optional)**: Read the `metadata.json` file and extract the `mainFilePath` property if it exists

8. **Verify Exported Content Exists**: Check if `exportedContent.zip` file exists in the template folder:
   - **If the file does not exist**: Run the `createExportContent.js` script first:
     ```bash
     node createExportContent.js challenges/[challenge-name]/templates/[template-name]
     ```
   - **If the file exists**: Continue to step 9

9. **Prepare upload**: Call the MCP command `prepare_file_upload` with `{}`. This returns `{ uploadId, uploadUrl }` — **capture the `uploadUrl`**.

10. **Upload the zip file**: Run the `uploadChallengeFiles.js` script to upload the zip directly via REST:

    ```bash
    node uploadChallengeFiles.js <uploadUrl> <challengeId> <variationId> challenges/[challenge-name]/templates/[template-name]/exportedContent.zip
    ```

    Where `<uploadUrl>` is from step 9, `<challengeId>` is the challenge `_id` from step 6, and `<variationId>` is the variation `_id` from step 5.

11. **Call Run Challenge Code**: Call the MCP command `run_challenge_code` with:

    **Required Parameters:**
    - `challengeId`: The challenge `_id` from step 6
    - `variationId`: The variation `_id` from step 5

    **Optional Parameters:**
    - `mainFile`: The `mainFilePath` from step 7 (if available)

12. **Analyze the Response**:
    - Check if the response contains any errors or unexpected output
    - Verify the `consoleOutput` shows the expected results from the main file execution
    - If there are errors or the output is incorrect:
      - Fix the issues in `solutionFiles/` (the main implementation files)
      - Regenerate the `exportedContent.zip`
      - Update the challenge again
      - Run the code again to verify the fix
    - Repeat until the code runs successfully with expected output

**Example Response Analysis:**

```json
{
  "consoleOutput": "fizzBuzz(3): Fizz\nfizzBuzz(5): Buzz\nfizzBuzz(15): FizzBuzz\nfizzBuzz(2): 2\n",
  "errors": []
}
```

- If `errors` array is empty and `consoleOutput` shows expected values → Code runs correctly
- If `errors` array has items → Fix the solution files and retry
- If `consoleOutput` shows unexpected values → Debug and fix the solution logic

## Run challenge code with preloaded files

When instructed to run the challenge code with preloaded files for a specific variation (e.g., "run code with preloaded files for challenge x for template y"), follow this workflow:

**Note**: This runs the main file using the **starter code (preloaded files)** instead of the author solution. The purpose is to verify that the starter code runs without errors. There should be **no errors** when running the preloaded code.

1. **Navigate to Challenge Folder**: Go to the challenge folder (`challenges/[challenge-name]/`)

2. **Check if Challenge Was Created**: Check if `challengeCreate.json` file exists in the challenge folder:
   - **If the file does not exist**: Return a message "Challenge was not created" and stop the workflow
   - **If the file exists**: Continue to step 3

3. **Navigate to Template Folder**: Go to the specific template folder (`challenges/[challenge-name]/templates/[template-name]/`)

4. **Check if Variation Was Created**: Check if `metadata.json` in the template folder has a real `variationId` (not `"placeholder-variation-id"`):
   - **If `variationId` IS `"placeholder-variation-id"`**: Return a message "Variation was not created" and stop the workflow
   - **If `variationId` is NOT `"placeholder-variation-id"`**: Continue to step 5

5. **Get Variation ID**: Read the `metadata.json` file and extract the `variationId` property

6. **Get Challenge ID**: Read the `challengeId` from `challengeCreate.json` file in the challenge folder (the `_id` property)

7. **Call Run Challenge Code with Preloaded Files**: Call the MCP command `run_challenge_code_preloaded` with:

   **Required Parameters:**
   - `challengeId`: The challenge `_id` from step 6
   - `variationId`: The variation `_id` from step 5

   **Optional Parameters:**
   - `mainFile`: The `mainFilePath` from `metadata.json` (if available)

8. **Analyze the Response**:
   - Check if the response contains any errors
   - Verify the `consoleOutput` does not contain unexpected errors
   - If there are errors:
     - Fix the issues in `preloadedFiles/` (the starter code files)
     - Regenerate the `exportedContent.zip`
     - Update the challenge again
     - Run the code again to verify the fix
   - Repeat until the code runs successfully without errors

## Fully test the challenge

When instructed to fully test for a specific variation (e.g., "fully test for challenge x for template y")

1. **Run challenge initial tests** (with author solution) - Follow the "Run challenge initial tests" instructions above. All tests should pass (no errors, no failed tests).
2. **Run challenge all tests** (with author solution) - Follow the "Run challenge all tests" instructions above. All tests should pass (no errors, no failed tests).
3. **Run challenge initial tests with preloaded files** - Follow the "Run challenge initial tests with preloaded files" instructions above. The `tests` array must contain at least one test result. Errors are acceptable, and some or all tests may fail — the important thing is that tests exist in the results. If the `tests` array is empty, fix the preloaded files.
4. **Run challenge all tests with preloaded files** - Follow the "Run challenge all tests with preloaded files" instructions above. The `tests` array must contain at least one test result. Errors are acceptable, and some or all tests may fail — the important thing is that tests exist in the results. If the `tests` array is empty, fix the preloaded files.
5. **Run challenge code** (terminal challenges only) - Follow the "Run challenge code" instructions above to verify the main file executes correctly. **Skip this step for browser, full-stack, backend, and database challenges** (vuejs-jest, vuets-jest, reactjs-jest, reactts-jest, svelte-jest, vanillajs-jest, vanillats-jest, angular-jest, solidjs, solidjs_ts, nextjs, nextjs_ts, astro, astro_ts, sveltekit, sveltekit_ts, remix, remix_ts, nestjs, fastify, hono, pglite, sqlite) as they use browser preview, framework dev servers, or in-memory DB execution instead of a Run-button code execution.
6. **Run challenge code with preloaded files** (terminal challenges only) - Follow the "Run challenge code with preloaded files" instructions above to verify the starter code runs without errors. **Skip this step for browser, full-stack, backend, and database challenges** (vuejs-jest, vuets-jest, reactjs-jest, reactts-jest, svelte-jest, vanillajs-jest, vanillats-jest, angular-jest, solidjs, solidjs_ts, nextjs, nextjs_ts, astro, astro_ts, sveltekit, sveltekit_ts, remix, remix_ts, nestjs, fastify, hono, pglite, sqlite) as they use browser preview, framework dev servers, or in-memory DB execution instead of a Run-button code execution.

## Get Challenge from Live Platform

When instructed to get a challenge from the live DojoCode platform (e.g., "Get the live challenge with id 62a9aa5e87d07e7b5c63e69f"), follow this workflow:

1. **Extract Challenge ID**: Get the challenge ID from the instruction (e.g., `62a9aa5e87d07e7b5c63e69f`)

2. **Call Get Challenge MCP**: Call the MCP command `get_challenge` with:
   - `challengeId`: The challenge ID from step 1

3. **Extract Slug**: From the response, extract the `slug` property (e.g., `"fizz-buzz"`)

4. **Check if Challenge Already Exists Locally**: Check if a challenge folder with the slug name already exists in the `challenges/` directory:
   - **If the folder exists**: Return a message "Challenge already on local environment" and stop the workflow
   - **If the folder does not exist**: Continue to step 5

5. **Create Challenge Folder Structure**: Create the challenge folder structure:
   - Create folder: `challenges/[slug]/`
   - Create folder: `challenges/[slug]/templates/`

6. **Save Challenge Response**: Save the challenge metadata from `get_challenge` response to `challenges/[slug]/challengeCreate.json`:

   ```json
   {
     "_id": "challenge_id from response",
     "defaultVariation": {
       "_id": "first variation _id from challengeVariations array"
     }
   }
   ```

7. **Prepare Challenge Download**: Call the MCP command `prepare_challenge_download` with:
   - `challengeId`: The challenge ID from step 1

   This returns `{ downloadId, downloadUrl }` — **capture the `downloadUrl`**.

8. **Download and Extract Templates**: Run the `downloadChallengeFiles.js` script to download the zip via REST and extract all templates in one step (binary data never passes through the AI context):

   ```bash
   node downloadChallengeFiles.js <downloadUrl> challenges/[slug]/templates
   ```

   Where `<downloadUrl>` is from step 7. The script will:
   - Download the main zip from the MCP REST endpoint
   - Extract each inner zip (nodejs.zip, python.zip, etc.) to its corresponding folder
   - Each extracted template will include:
     - `README.md` - Challenge description
     - `metadata.json` - Contains variationId, mainFilePath, activeFilePath
     - `preloadedFiles.json` + `preloadedFiles/` - Starter code configuration and files
     - `solutionFiles.json` + `solutionFiles/` - Solution configuration and files
     - `initialTests.json` + `initialTests/` - Initial tests configuration and files
     - `allTests.json` + `allTests/` - All tests configuration and files

9. **Create details.json for Each Template**: After extraction, create a `details.json` file in each template folder:
   - Read the `README.md` content from the extracted files
   - Get the challenge title from the `get_challenge` response
   - Create `details.json`:
     ```json
     {
       "title": "Challenge Title from get_challenge response",
       "description": "Content from README.md"
     }
     ```

10. **Generate Exported Content**: For each template variation, run the `createExportContent.js` script to regenerate the `exportedContent.zip`:

    ```bash
    node createExportContent.js challenges/[slug]/templates/[template-name]
    ```

**Important Notes:**

- The downloaded zip structure matches the backend export format
- Each inner zip contains a complete variation with all necessary files
- The `metadata.json` already contains the correct `variationId` from the live platform
- Template folder names come directly from the inner zip filenames
- File paths and structures are preserved from the live platform

**Example Workflow:**

- Instruction: "Get the live challenge with id 62a9aa5e87d07e7b5c63e69f"
- Call `get_challenge` with `challengeId: "62a9aa5e87d07e7b5c63e69f"`
- Extract slug: `"fizz-buzz"`
- Check if `challenges/fizz-buzz/` exists
- If not, create folder structure
- Save challengeCreate.json with challenge metadata
- Call `prepare_challenge_download` with `challengeId: "62a9aa5e87d07e7b5c63e69f"` to get `{ downloadId, downloadUrl }`
- Download and extract using script:
  ```bash
  node downloadChallengeFiles.js <downloadUrl> challenges/fizz-buzz/templates
  ```
- Create details.json for each extracted template
- Generate `exportedContent.zip` for each template:
  ```bash
  node createExportContent.js challenges/fizz-buzz/templates/nodejs-jest
  node createExportContent.js challenges/fizz-buzz/templates/python
  # ... for each template
  ```
- Display challenge edit link: Call `get_challenge_edit_url` with `challengeId` and the `defaultVariation._id` from `challengeCreate.json` as `variationId`. Display the returned `editUrl` to the user with a message like: "You can access the challenge by following this link: <editUrl>"

## Update Challenge Info Workflow with MCP Commands

When instructed to update a challenge info for a specific challenge id (e.g., "update challenge x info with next fields...", "help me set a default difficulty for challenge x...", "set title, estimate and defaultDifficulty fields for challenge x"), follow this workflow:

1. **Navigate to Challenge Folder**: Go to the challenge folder (`challenges/[challenge-name]/`)

2. **Check if Challenge Was Created**: Check if `challengeCreate.json` file exists in the challenge folder:
   - **If the file does not exist**: Return a message "Challenge was not created" and stop the workflow
   - **If the file exists**: Continue to step 3

3. **Check what fields the user wants to update**: Check the requested updated fields that user wants to update for specific challenge

We can update the next fields: title, estimate, defaultDifficulty any other requested fields are not possible to edit:

- `title`: The challenge title (from `details.json`)
- `estimate`: Integer number representing minutes that would take a person to solve the challenge
- `defaultDifficulty`: Integer (1, 2, or 3) representing the difficulty level

After thinking of fields requested by user and having them we can go to step 4

4. **Call update_challenge_info**: Use the MCP command `update_challenge_info` with:

- `variationId`: The `defaultVariation._id` from `challengeCreate.json`
- `challengeId`: The `_id` from `challengeCreate.json`
- `info`: An object containing the fields that should be updated (e.g. title, estimate, defaultDifficulty based on what user asked)

5. **Printing response message**: Print what the response returned:

If the response is an object containing challenge info then print a message and let user know that challenge was successfully updated. Call the MCP command `get_challenge_edit_url` with the `challengeId` and `variationId` (the `defaultVariation._id` from `challengeCreate.json`) to get the edit link, and display it to the user with a message like: "You can access the challenge by following this link: <editUrl>". Otherwise print the error.

## Manage Dependencies Workflow with MCP Commands

When instructed to add, update, or remove a dependency (package/library) on a challenge or project (e.g., "add lodash to challenge x", "bump react to 18.3.1 on my project", "remove axios from challenge y"), follow this workflow:

1. **Check template support**: Dependencies only work on templates with `enableDependencies: true` — check the template in `templatesConfiguration.json` / via `get_templates`. If the template does not support dependencies, tell the user and stop. Backend (nestjs/fastify/hono) and database (pglite/sqlite) template dependencies are baked into the Docker images and cannot be managed this way.

2. **Resolve the target ids**:
   - Challenge: `challengeId` = the `_id` and `variationId` = the variation `_id` from `challengeCreate.json` (or from `get_my_challenges` for live challenges). If `variationId` is omitted, the default variation is used — but each variation has its OWN dependency list, so pass it explicitly when the user targets a specific variation.
   - Project: `projectId` from `projectCreate.json` (or `get_my_projects`).

3. **Call the MCP command** — one package per call:
   - Challenge: `update_challenge_dependencies` with `challengeId`, `variationId` (optional), `action`, `name`, `version` (optional)
   - Project: `update_project_dependencies` with `projectId`, `action`, `name`, `version` (optional)

   Parameters:
   - `action`: `"add"`, `"update"` (change the version of an existing entry), or `"remove"`
   - `name`: the package name in the template's registry (npm, PyPI, Packagist, RubyGems, NuGet, Maven, crates.io, Conan — depends on the template language)
   - `version`: exact version for add/update; **omit it to use the latest published version**. The name and version are validated against the registry — the call fails with a clear error for unknown packages/versions.

4. **Printing response message**: On success the response contains `message`, `updated.dependencies` (the full new list `{ name, selectedVersion }[]`), and `installation.status` — the REAL install outcome, because the command waits for the installation (up to ~90s):
   - `installed` — the package is ready; tell the user.
   - `install_failed` — the install error is included; relay it. The dependency list stays saved — offer to `remove` the package if the user prefers.
   - `installing` — the install exceeded the wait window and continues in the background; the editor notifies the author of the final result.
   - `no_install` — saved, but no server-side installation applies to this change.

   On error, print the error (e.g. unsupported template, unknown package, version not found).

5. **Sync the LOCAL manifest** (edge case): hand-editing local manifests is NOT how live dependencies are managed — the MCP command above is. BUT if the local template/project folder contains a manifest file that gets zipped and uploaded (e.g. `package.json` on browser/full-stack templates), update it to match the new dependency list after a successful call — otherwise the next file upload ships a stale manifest and drifts from the platform's dependency list.

## Get info about existing templates from live

**Template IDs and selectedLanguage**: For template `_id` and `selectedLanguage` (e.g. when creating challenges or adding variations), **read from `templatesConfiguration.json`**. That file is populated at session start by calling `get_templates` and saving the result in the format described in "Session start (mandatory first step)".

When the user explicitly asks for live template info (e.g. "Get all live templates from database", "What are the existing live templates?", "Give me info regarding live template NodeJS"):

### Usage

1. **Call `get_templates`**: Use the MCP command `get_templates` with optional filtering (and at session start, use the response to build and save `templatesConfiguration.json` as described in "Session start (mandatory first step)").

   **Get all templates:**

   ```json
   {}
   ```

   **Filter by name (partial match):**

   ```json
   { "name": "python" }
   ```

### Parameters

| Parameter | Type   | Required | Description                                               |
| --------- | ------ | -------- | --------------------------------------------------------- |
| `name`    | string | No       | Filter templates by name (case-insensitive partial match) |

### Response

Returns an array of slim template objects. Print the response as a table with information including:

| Column               | Description                                                                  |
| -------------------- | ---------------------------------------------------------------------------- |
| `_id`                | Template unique identifier (used when creating challenges)                   |
| `key`                | Template key identifier (e.g. `nodejs_jest`, `python`)                       |
| `name`               | Template display name (e.g. `NodeJS`, `Python`)                              |
| `language`           | Language ID associated with the template (used as `selectedLanguage`)        |
| `environment`        | Template environment type (e.g. `terminal`, `browser`)                       |
| `enableDependencies` | Whether the template supports custom dependencies                            |
| `enableRunCode`      | Whether the template supports running code via the Run button                |
| `deprecated`         | Whether the template is deprecated and should not be used for new challenges |

### Examples

**Example 1: Get all templates**

- User: "What live templates are available?"
- Action: Call `get_templates` with `{}`
- Display: Table of all templates with their IDs, keys, names, language IDs, environment, and feature flags

**Example 2: Search for specific template**

- User: "Give me info about Python live template"
- Action: Call `get_templates` with `{ "name": "python" }`
- Display: Table showing Python template details

**Example 3: Find templates for web development**

- User: "What live templates exist for React?"
- Action: Call `get_templates` with `{ "name": "react" }`
- Display: Table showing React-related templates

**When you need template \_id or selectedLanguage for an operation**: Read from `templatesConfiguration.json` (keyed by template key, e.g. `nodejs-jest`, `python`). Do not call `get_templates` again for that; use the cached file.

## Get info about existing languages from live

When instructed to get info regarding existing languages from live, e.g. "Get all languages from database", "What are the existing languages?", "Give me info regarding language Python".

### Usage

1. **Call `get_languages`**: Use the MCP command `get_languages`:

   **Get all languages:**

   ```json
   {}
   ```

### Parameters

No parameters required.

### Response

Returns an array of language objects. Print the response as a table with information including:

| Column | Description                                                        |
| ------ | ------------------------------------------------------------------ |
| `_id`  | Language unique identifier (used when filtering challenges)        |
| `name` | Language display name (e.g., "Python", "JavaScript", "TypeScript") |
| `key`  | Language key identifier                                            |

### Examples

**Example 1: Get all languages**

- User: "What languages are available?"
- Action: Call `get_languages` with `{}`
- Display: Table of all languages with their IDs, names, and keys

**Example 2: Find specific language**

- User: "What is the Python language ID?"
- Action: Call `get_languages` with `{}`, then filter the results for Python
- Display: Table showing Python language details including its ID

### Notes

- The `_id` field from the response can be used when filtering challenges by language
- Language names can be used directly in `get_challenges` - they will be automatically mapped to IDs

## Get info about existing challenges from live

When instructed to get info regarding existing challenges from live, e.g. "Get all live challenges from database", "What challenges exist?", "Show me challenges by author X", "Find Python challenges".

### Usage

1. **Call `get_challenges`**: Use the MCP command `get_challenges` with optional filtering:

   **Get all challenges (paginated):**

   ```json
   {}
   ```

   **Filter by search term:**

   ```json
   { "search": "binary tree" }
   ```

   **Filter by multiple criteria:**

   ```json
   { "tags": ["algorithms"], "difficulty": 2, "language": "Python" }
   ```

### Parameters

| Parameter    | Type             | Required | Description                                                                                                                                          |
| ------------ | ---------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `page`       | number           | No       | Page number (default: 1)                                                                                                                             |
| `limit`      | number           | No       | Items per page (default: 20)                                                                                                                         |
| `search`     | string           | No       | Search term to filter challenges by title/description                                                                                                |
| `tags`       | array of strings | No       | Filter by tag names (automatically mapped to tag objects)                                                                                            |
| `difficulty` | number           | No       | Filter by difficulty level (0-3)                                                                                                                     |
| `language`   | string or array  | No       | Filter by programming language name(s) - **must have the first letter capitalized** (e.g., `"Python"`, `"Javascript"`, `  ["Python", "Javascript"]`) |
| `template`   | string or array  | No       | Filter by template name(s) (e.g., `"Python"` or `["Python", "NodeJS"]`)                                                                              |
| `author`     | string           | No       | Filter by author username                                                                                                                            |
| `status`     | string           | No       | Filter by challenge status                                                                                                                           |

### Response

Returns a paginated response with challenge objects. Print the response as a table with information including:

| Column                | Description                               |
| --------------------- | ----------------------------------------- |
| `_id`                 | Challenge unique identifier               |
| `title`               | Challenge title                           |
| `slug`                | URL-friendly identifier                   |
| `difficulty`          | Difficulty level (0-3)                    |
| `estimate`            | Estimated time to complete (in minutes)   |
| `author`              | Author information                        |
| `tags`                | Array of associated tags                  |
| `status`              | Challenge status (draft, published, etc.) |
| `challengeVariations` | Available template/language variations    |

### Examples

**Example 1: Get all challenges**

- User: "What live challenges are available?"
- Action: Call `get_challenges` with `{}`
- Display: Table of challenges with their IDs, titles, difficulty, and tags

**Example 2: Search for specific challenges**

- User: "Find challenges about sorting algorithms"
- Action: Call `get_challenges` with `{ "search": "sorting" }`
- Display: Table showing matching challenges

**Example 3: Filter by difficulty**

- User: "Show me easy challenges"
- Action: Call `get_challenges` with `{ "difficulty": 1 }`
- Display: Table showing easy difficulty challenges

**Example 4: Filter by language**

- User: "What Python challenges exist?"
- Action: Call `get_challenges` with `{ "language": "Python" }`
- Display: Table showing Python challenges

**Example 5: Filter by author**

- User: "Show challenges created by johnsmith"
- Action: Call `get_challenges` with `{ "author": "johnsmith" }`
- Display: Table showing challenges by that author

**Example 6: Paginated results**

- User: "Show me page 2 of challenges with 10 per page"
- Action: Call `get_challenges` with `{ "page": 2, "limit": 10 }`
- Display: Table showing the second page of results

**Example 7: Combined filters**

- User: "Find medium difficulty algorithm challenges in JavaScript"
- Action: Call `get_challenges` with `{ "tags": ["algorithms"], "difficulty": 2, "language": "Javascript" }`
- Display: Table showing matching challenges

---

# Part 2 — Contests

A **contest** is a timed competition assembled from **existing** challenges. You do not author challenge files here — you reference challenges that already exist on the platform by their `_id` and arrange them with per-challenge time limits. The final create is a single MCP call: `create_contest` — but like learning paths, **building a contest is a conversation**. Mirror the platform's flow: ask how many challenges per contest and how many contest options ("suggestions") to propose, search the catalog, present the suggestions, let the user pick one, then create it. Never invent challenges or dates silently.

## Contest folder structure

```
contests/[contest-slug]/
├── contest.json          # The create payload you author (see format below)
└── contestCreate.json    # Platform response after creation ({ _id, name, ... })
```

A reference descriptor lives at `contests/contest-example/contest.json`.

## contest.json format

```json
{
  "name": "Weekend Algorithms Sprint",
  "description": "Two classic loop drills and one parsing puzzle — a relaxed Saturday warm-up for JavaScript beginners.",
  "invitationDescription": "Loosen up your loops! Join a friendly 1-hour sprint of bite-sized JavaScript drills — no pressure, all practice.",
  "finalDescription": "Nicely done! You worked through parity checks, FizzBuzz, and a parsing puzzle. Hope your loops feel sharper — see you at the next sprint!",
  "visibility": "Community",
  "startDate": "2026-07-04T18:00:00.000Z",
  "endDate": "2026-07-04T19:00:00.000Z",
  "aiEnabled": false,
  "aiMaxPromptsPerChallenge": 5,
  "challenges": [
    { "challenge": "<challengeId>", "duration": 20, "description": "Warm-up: parity checks build loop intuition." },
    { "challenge": "<challengeId>", "duration": 30, "description": "Core round: FizzBuzz, the classic loop+conditional drill." }
  ]
}
```

- `name`, `description`, `startDate`, `endDate` are **required**. Dates are ISO 8601 strings; use real future dates (do not invent past dates). If you omit the dates, the platform defaults to starting ~7 days out and ending ~14 days out.
- `visibility`: `Public`, `Private`, or `Community` (case-insensitive; defaults to `Community`).
- **`invitationDescription`** and **`finalDescription`** — you **author these yourself** (see the content rules in Step 3). They must be **distinct** from `description` and from each other; don't let them default to a copy of `description`.
- `aiEnabled` (default `false`) + `aiMaxPromptsPerChallenge` (default `5`) — the in-contest AI assistant. Ask the user (Step 1); only include `aiMaxPromptsPerChallenge` meaningfully when `aiEnabled` is `true`.
- `challenges[]`: each entry needs a real challenge `_id` (`challenge`), a `duration` in minutes, and a per-challenge `description` (why it fits the theme).
- **Handled automatically by `create_contest` — do NOT put these in `contest.json`:** the URL `slug` (derived from `name`, made unique), contest `difficulty` (averaged from the challenges), `status` (`draft`), and the **poster + cover images** (generated best-effort).

## Interactive contest creation flow

This mirrors the DojoCode in-app contest flow (which uses a config form + a suggestions panel). You have no UI, so you **ask in plain text** and **present suggestions as text**. Contests are **organization-scoped** — first make the right workspace active (`get_my_organizations` → `select_organization`; see *Organization workspace* under Session start), or `create_contest` will fail with *"Select an organization workspace"*. The same **Tool rules** as Part 3 apply (call `get_templates`/`get_languages`/`get_all_tags` once; Capitalized language/template names; `get_challenges` must pass `status: "pending,approved"` and returns slim objects; `search` matches title only — prefer `tags`/`difficulty`/`language`).

### STEP 1 — Gather requirements (ask, don't assume)

Before searching, make sure you know:

- **Topic / theme** of the contest (e.g. "arrays", "holiday-themed JavaScript").
- **Language / template** and **difficulty** (1–3).
- **Challenges per contest** and **how many suggestions** (contest options) to generate.
- **Visibility** (`Public` / `Private` / `Community`) and the **schedule** (start/end date, or a duration like "2 hours this weekend").
- **AI assistant**: should the in-contest AI assistant be **enabled** for participants, and if so, **how many prompts per challenge** (default 5)?

If the user already gave the **challenges-per-contest** and **suggestion count** (e.g. "make 3 contest ideas with 4 challenges each"), skip those questions and go to Step 2. Ask only for what's missing, in ONE concise numbered message, then wait.

### STEP 2 — Discover (search before proposing)

1. Call `get_templates`, `get_languages`, `get_all_tags` (once).
2. Pick up to ~5 existing tags matching the theme.
3. Call `get_challenges` with `status: "pending,approved"` + the chosen tags + `difficulty` + capitalized `language`/`template`. Page through if you need more. Collect a pool at least as large as `challenges-per-contest`.
4. If too few, broaden **one** filter and say so.

### STEP 3 — Propose suggestions (let the user pick)

Generate the requested number of **contest suggestions** and present them as text. Follow the same content rules the DojoCode in-app generator uses. For **each** suggestion:

- A short, catchy **title** (the platform style is ~two words, e.g. "Array Arena").
- A **description** with the theme woven in (1–2 sentences).
- An **invitationDescription** — a short, engaging invite (1–2 sentences) that makes someone want to join. **Distinct from the description**, not a copy of it.
- A **finalDescription** — a 2–3 sentence summary shown on the results page after the contest ends: congratulate participants and recap what the contest covered. **Distinct** from both other fields.
- Exactly **challenges-per-contest** challenges, listed by **title + `_id`**, ordered easy → hard, each with a one-line **per-challenge context** ("why it fits the theme") and a suggested **duration** (minutes).

Rules: use **only** real `_id`s from Step 2; **never repeat the same `_id` within one suggestion**; different suggestions **may** reuse challenges but should have distinct themes/titles. If the pool is smaller than the requested challenges-per-contest, cap to what's available and tell the user. Ask the user to pick a suggestion (or adjust). Do not create anything yet.

### STEP 4 — Create the chosen contest

Once the user picks a suggestion:

1. Navigate to `contests/[contest-slug]/`. If `contestCreate.json` already exists, stop unless recreating.
2. Author `contest.json` from the chosen suggestion: `name` = title, the distinct `description` / `invitationDescription` / `finalDescription`, `visibility`, `aiEnabled` (+ `aiMaxPromptsPerChallenge` if enabled), real future `startDate`/`endDate` (derive from the schedule the user gave), and `challenges[]` as `{ challenge: <_id>, duration: <minutes>, description: <why-it-fits> }`. Pass `invitationDescription` and `finalDescription` explicitly — do not rely on defaults.
3. Call `create_contest` with the `contest.json` contents.
4. Save the response to `contestCreate.json` (keep at least `_id` and `name`).
5. Confirm with `get_contest` / `get_contests`, then report the contest name and its **edit link** (always built on `https://dojocode.io`, never the local API host):

   `https://dojocode.io/business/contest/edit/<contestId>`

   (Later: `get_contest_leaderboard` / `get_contest_analytics` for results.)

> Requires the `contest_author` access tier on the DojoCode account.

## Editing a contest (draft only)

Use `update_contest` to edit a contest you own **while its status is draft** — the platform rejects edits once it is published. Call `get_contest` first to read the current values, then send **only the fields you want to change**:

- Editable: `name`, `description`, `invitationDescription`, `finalDescription`, `visibility`, `startDate`, `endDate`, `aiEnabled`, `aiMaxPromptsPerChallenge`, `challenges` (replaces the list), and `status` (set `public` to publish).
- The `slug` is **immutable** — it can't be changed after creation.

Edit workflow: `get_contest` (confirm it's draft) → `update_contest` with the changed fields → keep `contest.json` in sync → report the edit link `https://dojocode.io/business/contest/edit/<contestId>`. To publish: `update_contest` with `status: "public"`.

> Requires the `contest_author` access tier (you must own the contest).

---

# Part 3 — Learning Paths

A **learning path** is a guided, lesson-by-lesson sequence built from **existing** challenges. Each lesson ("node") bundles theory, optional reflection questions, and a set of challenges (some required to complete the path, some bonus). The final create is a single MCP call: `create_learning_path` — but **creating a good path is a conversation, not a one-shot generation**. Follow the interactive flow below: gather what the user wants, search the catalog for real challenges, propose a structure, let the user steer, then create. Never invent a path's structure or its challenges silently.

## Learning path folder structure

```
learning-paths/[path-slug]/
├── learningPath.json          # The create payload you author (see format below)
└── learningPathCreate.json    # Platform response after creation ({ _id, ... })
```

A reference descriptor lives at `learning-paths/learning-path-example/learningPath.json`.

## learningPath.json format

```json
{
  "title": "Arrays from Zero to Hero",
  "description": "From basic indexing to interview-grade array techniques.",
  "visibility": "community",
  "status": "draft",
  "nodes": [
    {
      "conceptKey": "array-basics",
      "concepts": ["arrays", "indexing"],
      "title": "Array Basics",
      "description": "Reading, writing and iterating over arrays.",
      "theory": "## Arrays\n\nAn array stores elements contiguously, so indexing is O(1)...",
      "questions": ["What is the time complexity of indexing into an array?"],
      "difficulty": 1,
      "challenges": ["<challengeId>"],
      "requiredChallenges": ["<challengeId>"],
      "lessonEstimate": 15
    }
  ]
}
```

Top-level fields:
- `title` is **required** (3–120 chars). `description` is optional (≤ 500 chars).
- `visibility`: `private` (default) or `community`.
- `status`: `draft` (default) or `published`.
- `nodes[]`: the lessons, in order. The path's `averageDifficulty` and `estimatedMinutes` are computed by the platform from the referenced challenges — do not send them.

Each node:
- `conceptKey` (string) and `concepts` (string[]) — the skill/concept the lesson teaches.
- `title`, `description`, `theory` (markdown, the lesson's learning content), `questions` (string[], optional reflection prompts).
- `difficulty`: integer 1–3.
- `challenges`: array of real challenge `_id`s taught/practiced in this lesson.
- `requiredChallenges`: subset of `challenges` that gates path completion. If omitted, **every** challenge in the node is treated as required (safe default). Challenges in `challenges` but not in `requiredChallenges` are bonus (award XP, don't gate completion).
- `lessonEstimate`: minutes (optional, defaults to 15).

## Interactive learning path creation flow

Creating a learning path is a **multi-turn conversation**. The platform's own AI uses on-screen forms for this; you have no forms, so you **ask the questions in plain text** instead. Work through the four steps in order. Do not skip ahead to authoring files or calling `create_learning_path` until the user has approved a proposal (Step 3).

### Tool rules (read before searching)

- Call `get_templates`, `get_languages`, and `get_all_tags` **once** per conversation and reuse the results — never re-call them on later turns.
- **Template and language names are case-sensitive and Capitalized.** The `language` and `template` filters on `get_challenges` expect the exact capitalized name — `"Python"`, `"JavaScript"`, `"React"` — **not** `"python"`/`"javascript"`. A lowercase value silently returns zero results. **Always resolve the exact spelling from `get_languages` (for languages) and `get_templates` (for templates) before filtering — never guess the casing.**
- Difficulty is **1–3** (1 = beginner, 2 = intermediate, 3 = advanced). Never pass `0`.
- **Every** `get_challenges` call must include `status: "pending,approved"`. Draft challenges are broken and must never be added to a path.
- `get_challenges` and `get_my_challenges` return **slim** challenge objects (`_id`, `title`, `slug`, `difficulty`, `estimate`, `tags`, variations) plus `page`/`limit`. Narrow with `tags` / `difficulty` / `language` and pass `limit` (e.g. `20`) — request the next `page` if you need more rather than asking for a huge page. The `search` field matches the **title only**, so a topic like "arrays" may not appear in titles (Python uses "list"); prefer `tags` + `difficulty` + `language` over `search` for topic discovery.
- Only ever reference DojoCode challenges. Never invent challenge IDs — the platform silently drops invalid ones, leaving lessons emptier than intended.

### STEP 1 — Gather requirements (ask, don't assume)

When the user asks to create a learning path, before authoring anything make sure you know:

- **Topic / skill focus** (e.g. "arrays", "async JavaScript", "SQL joins").
- **Target language(s) / framework(s) / template(s)** the challenges should use.
- **Difficulty range / audience level** (beginner → advanced).
- **Number of nodes (lessons)** and **challenges per node**.
- **Visibility** (`private` / `community`) and **status** (`draft` / `published`).
- **Source of challenges**: the user's own (`get_my_challenges`) or the whole catalog (`get_challenges`).

If the user already stated some of these in their request, **do not re-ask them** — only ask for the missing essentials, in ONE concise numbered message, then wait for the reply. In particular, if the message already gives both the **node count** and **challenges-per-node** (e.g. "a path with 4 lessons, 3 challenges each"), skip the questions and go straight to Step 2. Asking again for numbers the user already gave is a bug.

### STEP 2 — Discover (search before proposing)

Once requirements are known:

1. Call `get_templates`, `get_languages`, and `get_all_tags` (once — see Tool rules). Use `get_languages`/`get_templates` to get the exact **Capitalized** names you will pass as filters.
2. From the `get_all_tags` results, pick up to ~5 tags that best match the topic. Use only tags that **actually exist** in the results.
3. Find candidate challenges:
   - The user's own: `get_my_challenges`.
   - The catalog: `get_challenges` with `status: "pending,approved"` plus the chosen tags, `difficulty` (1–3), and the **capitalized** `language`/`template` filters (e.g. `language: "Python"`).
   - Optionally seed ideas with `get_suggested_challenges`.
4. Aim to collect enough candidates for `nodes × challenges-per-node`. If a search returns too few, broaden **one** filter (drop a tag, widen the difficulty range) and tell the user you did.

### STEP 3 — Propose (let the user steer)

Present a concise outline the user can react to — do **not** write files yet:

- Proposed path **title** + one-line description.
- For **each node**: the concept title, the specific challenges chosen (by **title + `_id`**), which are **required** vs **bonus**, the node difficulty, and the estimate.

Ask the user to confirm or adjust (swap a challenge, rename a node, change counts, reorder). Iterate until they approve. Only when they approve do you proceed to Step 4.

### STEP 4 — Create (only after approval)

1. Navigate to `learning-paths/[path-slug]/`. If `learningPathCreate.json` already exists, stop unless the user asks to recreate.
2. Author `learning-paths/[path-slug]/learningPath.json` from the approved outline:
   - Order nodes easiest → hardest. **Node titles name a transferable concept** ("Array Transformation Techniques"), not a specific challenge ("Reverse a String").
   - Use only the real challenge `_id`s resolved in Step 2.
   - Each node declares a **non-empty `requiredChallenges`** subset of its `challenges` (the rest are bonus).
   - Write `theory` as rich markdown (a code example + a short "key takeaways" list) and exactly **2** reflection questions per node.
3. Call `create_learning_path` with the `learningPath.json` contents. (You are auto-enrolled as a learner of your own path — no extra step.)
4. Save the response to `learning-paths/[path-slug]/learningPathCreate.json` (keep at least `_id` and `title`).
5. Confirm with `get_learning_path`, then report the path and its **edit link** (always built on `https://dojocode.io`, never the local API host):

   `https://dojocode.io/learning-paths/edit/<learningPathId>`

   You can also use `open_learning_path` to surface it in the UI.

> Requires the `challenge_author` access tier (any authenticated DojoCode user with author access).

## Editing a learning path (draft only)

A path can be edited with `update_learning_path` **only while its `status` is `draft`**. Once published, the platform rejects lesson edits (add/update/delete/reorder) — only metadata can change after that (including flipping it back is not possible; you can still publish a draft by setting `status: "published"`). Always call `get_learning_path` first to read the current lessons and their `_id`s before editing.

`update_learning_path` takes a `learningPathId`, an `action`, and the fields that action needs:

| `action` | What it does | Required fields |
|----------|--------------|-----------------|
| `metadata` | Update path title / description / visibility / status | at least one of `title`, `description`, `visibility`, `status` |
| `add_lesson` | Append a new lesson (node) | `lesson` (a node object; `lesson.title` required) |
| `update_lesson` | Replace a lesson's fields / challenge list | `lessonId` + `lesson` |
| `delete_lesson` | Remove a lesson | `lessonId` |
| `reorder_lessons` | Set lesson order | `lessonIds` (every lesson `_id`, in the new order) |

The `lesson` object uses the same node fields as creation (`conceptKey`, `concepts`, `title`, `description`, `theory`, `questions`, `difficulty`, `challenges`, `requiredChallenges`, `lessonEstimate`). Edit workflow:

1. `get_learning_path` → confirm `status: "draft"` and note each lesson's `_id`. If it is published, tell the user it can't be edited and stop (offer to clone into a new draft instead).
2. Make the change with `update_learning_path` (one `action` per call; resolve any new challenge `_id`s via `get_challenges`/`get_my_challenges` first, same Tool rules as above).
3. Re-read with `get_learning_path` to confirm, update `learning-paths/<slug>/learningPath.json` so the local descriptor stays in sync, and report the **edit link** `https://dojocode.io/learning-paths/edit/<learningPathId>`.
4. To publish when the user is happy: `update_learning_path` with `action: "metadata"`, `status: "published"`.

> Requires the `challenge_author` access tier (you must own the path).

---

# Part 4 — Projects

A **project** is a free-form, runnable sandbox (no tests, no solution, no variations) built from a template. Authoring a project works **like a challenge**: you keep the real source files on disk, package them into a zip, and upload them — except a project has only a handful of metadata fields (`title`, `description`, `tags`, `template`) and a single flat file tree.

> **Why not inline files?** `create_project` seeds the project from its template's default files; it does **not** accept your files inline. Custom files are uploaded separately (zip → `prepare_project_upload` → `uploadProjectFiles.js`), exactly like challenge file upload — so the file contents never pass through the AI context.

## Project sample / folder structure

A project is a folder of **raw, runnable files** (just like you'd scaffold locally) plus a small `project.json` metadata descriptor:

```
projects/[project-slug]/
├── project.json          # Metadata only (title, description, tags, template) — NOT a project file
├── README.md             # Part of the project
├── package.json
├── index.html
├── index.jsx
├── App.jsx
├── ...                   # any other source/config files (nested folders allowed)
├── exportedContent.zip   # Generated by createProjectContent.js (the runnable files, no project.json)
└── projectCreate.json    # Platform response after creation ({ _id, slug, ... })
```

Reference samples live under `projects/project-samples/` — one per template, mirroring `challenges/challenge-samples/`. Start from the closest sample (e.g. `projects/project-samples/reactjs-example-project`).

## project.json format (metadata only)

```json
{
  "title": "React Image Slider",
  "description": "A styled React + Vite image slider sandbox.",
  "template": "react_jest",
  "tags": ["react", "frontend"],
  "mainFilePath": "/index.jsx",
  "activeFilePath": "/App.jsx"
}
```

- `title` (≥ 3 chars) and `template` are **required**; `slug` is derived from the folder name. There are **no** variations, difficulty, tests, estimate, or visibility — projects are just `title` + `description` + `tags` + `template` + files.
- `template`: the **same template key challenges use** (e.g. `react_jest`, `vue_jest`, `svelte`, `vanillajs_jest`, `nodejs_jest`). Resolve the live template `_id` from `get_templates` / `templatesConfiguration.json` at create time — don't invent keys.
- `mainFilePath` / `activeFilePath` (optional): the entry file and the file to open first in the editor.
- Everything in the folder **except** `project.json`, `projectCreate.json`, `exportedContent.zip`, and `node_modules` becomes the project's file tree.

## Project creation workflow with MCP commands

1. Navigate to `projects/[project-slug]/`. If `projectCreate.json` already exists, stop unless the user asks to recreate. (To scaffold a new project, copy the closest `projects/project-samples/*` folder and edit the files.)
2. Resolve the template `_id` from `get_templates` (or `templatesConfiguration.json`) for the `template` key in `project.json`.
3. Call `create_project` with `{ title, slug, template: <_id>, description, tags }` (from `project.json`; `slug` = folder name). Save the response to `projectCreate.json` (keep `_id` and `slug`).
4. Package the files: `node createProjectContent.js projects/[project-slug]` → writes `exportedContent.zip` (everything except `project.json` & friends).
5. Call `prepare_project_upload` → get `uploadUrl`.
6. Upload: `node uploadProjectFiles.js <uploadUrl> <projectId> projects/[project-slug]/exportedContent.zip`. The server unzips it into the project's file tree (replacing the template defaults).
7. Confirm with `get_my_projects` / `get_projects`, surface it with `open_edit_project`, and report the **edit link** (always on `https://dojocode.io`):

   `https://dojocode.io/project/edit/<projectId>`

## Updating / downloading a project's files

- **Update files:** re-package (`createProjectContent.js`) and re-run `prepare_project_upload` → `uploadProjectFiles.js`. A fresh upload replaces the project's file tree.
- **Download files (pull from live):** call `prepare_project_download` with the `projectId` → get `downloadUrl`, then `node downloadProjectFiles.js <downloadUrl> projects/[project-slug]` to extract the live files to disk (edit, then re-upload).

> Requires the `challenge_author` access tier.

---

# Part 5 — Assignments

An **assignment** hands an existing **learning path** or a single **challenge** to your students — individually and/or by group — with a due date. It is an instructor action: it requires the `business` access tier and that every targeted student belongs to one of your groups. The final create is a single MCP call: `create_assignment` — but **assigning is a conversation**, the same shape the DojoCode in-app trainer assistant uses (it shows pickers; you have none, so you ask in plain text). Follow the interactive flow below: pick recipients, pick the source, set a due date, then create as a draft.

## Assignment folder structure

```
assignments/[assignment-slug]/
├── assignment.json          # The create payload you author (see format below)
└── assignmentCreate.json    # Platform response after creation ({ _id, ... })
```

A reference descriptor lives at `assignments/assignment-example/assignment.json`.

## assignment.json format

```json
{
  "title": "Week 1 — Arrays",
  "instructions": "Complete every lesson in the Arrays learning path.",
  "sourceType": "learning-path",
  "learningPathId": "<learningPathId>",
  "challengeId": null,
  "groupIds": ["<groupId>"],
  "studentIds": [],
  "dueDate": "2026-07-15T23:59:00.000Z",
  "cutoffDate": "2026-07-18T23:59:00.000Z",
  "status": "draft",
  "autograding": { "enabled": true, "passingScore": 80 }
}
```

- `title` (3–120 chars), `sourceType`, and `dueDate` are **required**.
- `sourceType`: `learning-path` → set `learningPathId`; `challenge` → set `challengeId`. Provide exactly the one matching the source type.
- Recipients: at least one entry across `groupIds` and `studentIds`. Use empty arrays for the side you are not targeting. Each `studentId` must belong to one of your groups.
- `dueDate` / `cutoffDate`: ISO 8601, real future dates. The platform replaces missing/past/invalid dates with a safe fallback, so always send a real future `dueDate`.
- `status`: `draft` (default — instructor publishes manually) or `published` (fan out immediately; only when explicitly asked).
- `autograding`: optional `{ enabled, passingScore (0–100) }`.

## Interactive assignment creation flow

This mirrors the in-app trainer assistant's `assign_existing_path` chain. The platform pops UI pickers for recipients and source; you **ask in plain text and list the options you fetch**. First make sure the right **organization workspace** is active (`get_my_organizations` → `select_organization`; see *Organization workspace* under Session start) — assignments and groups are scoped to it. Work the steps in order; don't call `create_assignment` until recipients + source + due date are settled.

### STEP 1 — Pick recipients (groups and/or individual students)

If the user already named a specific group or a student that exists in their roster, use it and skip the question. Otherwise:

1. Call `get_my_groups` (groups, each with its students) and/or `get_my_students` (paginated roster). Use `get_group` to expand a group's members when needed. These are scoped to the active organization workspace.
2. Present the groups/students as a concise numbered list and ask **who** the assignment is for (one or more groups, one or more individual students, or a mix). Wait for the reply.

Recipients become `groupIds[]` and/or `studentIds[]` — at least one entry across the two. Every `studentId` **must** belong to one of your groups (the platform rejects the call otherwise), so only offer students from your own roster.

> **Empty roster?** If the org has no students yet, grow it (owner/admin): `create_organization_user` to create a brand-new student account in the org, or `add_organization_member` to bring in an existing DojoCode account. Confirm with `list_organization_members`. New members still need to be in a **group** before they can be targeted individually — assign by group, or add them to a group first.

### STEP 2 — Pick the source (a learning path OR a challenge)

1. Determine `sourceType`. If the user's wording is clear ("assign the arrays path" → `learning-path`; "give them the FizzBuzz challenge" → `challenge`), use it. If ambiguous, ask which they want.
2. List candidates: `get_my_learning_paths` for paths, or `get_my_challenges` / `get_challenges` (`status: "pending,approved"`) for challenges. Ask the user to pick one. Capture its `_id`.
   - **Shortcut:** if you just created a learning path in this session (you have its id in `learning-paths/<slug>/learningPathCreate.json`), offer to assign *that* directly instead of re-listing.

### STEP 3 — Settle the details (you fill most of these)

- **`dueDate`** — ask for it if not given (e.g. "in two weeks", a date). Always send a real future ISO date; the platform normalizes missing/past/invalid values to ~1 month out. `cutoffDate` is optional.
- **`title`** — default to the source's own title (look it up with `get_learning_path` / `get_challenge` by id). Don't ask.
- **`instructions`** — write a short, friendly, **student-facing** line yourself (e.g. "Please complete this learning path by the due date — reach out if anything's unclear."). Never put internal metadata here; students read it.
- **`autograding`** — optional `{ enabled, passingScore }`; only set if the user wants it.
- **`status`** — **always `draft`** unless the user explicitly says to publish/send now. The instructor publishes from the assignments page.

### STEP 4 — Create the assignment

1. Navigate to `assignments/[assignment-slug]/`. If `assignmentCreate.json` exists, stop unless recreating.
2. Author `assignment.json` (the agreed recipients, source, due date, instructions, status).
3. Call `create_assignment` with its contents.
4. Save the response to `assignmentCreate.json`.
5. Briefly confirm what was created (title + recipients + status) and remind the user they can publish it from the assignments page. Track delivery later with `get_student_assignments` and `get_assignment_progress`.

> Requires the `business` (instructor) access tier.

---

# Part 6 — Business Reports

A **business report** is a persisted snapshot of exactly ONE kind:

- **Groups report** (`type: "groups"`) — statistics over one or more of the instructor's **student groups**: overview stat cards, per-group comparison, skills radar with strengths/weaknesses, score distributions, completion timeline, and a per-student table.
- **Contest report** (`type: "contest"`) — strictly the **contest's leaderboard** (rank, score, solved challenges, total time, AI prompts, failed submits) for every participant.
- **Learning-path report** (`type: "learning-path"`) — the path's enrolled students ranked by **completion percent** (lessons + required challenges), with status and completion dates.

Reports are generated asynchronously and stay stored — the instructor revisits, regenerates, and exports them (CSV/PDF) from the reports page.

Use this whenever a business user asks for insights — "how is my class doing?", "give me the contest results", "who progressed the most on my learning path?", "compare my groups". Requires the `business` access tier and an active organization workspace.

## Interactive report flow

Generating a report is a short conversation — ask, then call:

### STEP 1 — Workspace + report type

1. Make sure the right organization workspace is active (`get_my_organizations` → `select_organization`; see *Organization workspace* under Session start).
2. Ask **what kind of report** they want — groups statistics, a contest's leaderboard, or a learning path's progress. Skip the question if the request already makes it clear ("how did the contest go?" → contest).

### STEP 2 — Pick the subject (depends on the type)

- **Groups** — call `get_my_groups`, present the groups as a concise numbered list, ask **which group(s)** (one, several, or all). Capture `groupIds`.
- **Contest** — list candidates with `get_contests` / `get_contest`, capture the `contestId`.
- **Learning path** — list candidates with `get_my_learning_paths`, capture the `learningPathId`.

If the user already named the subject, resolve the id and skip the question. Default the **title** to something descriptive ("First Business Contest results"); don't ask unless the user cares.

### STEP 3 — Generate, poll, present

1. Call `generate_business_report` with `{ title, type, groupIds? | contestId? | learningPathId? }`. It returns `{ reportId, status: "pending" }` — generation runs in the background and typically takes a few seconds.
2. Poll `get_business_report` with the `reportId` until `status` is `"completed"` (or `"failed"` — report the error and offer to retry by generating again).
3. Present the summary conversationally and per type — groups: the overview numbers, how the groups compare, top strengths/weaknesses and training priorities; contest / learning path: the top of the leaderboard and the headline stats (participants / enrolled + completed). Mention any `warnings` (empty groups, nobody participated, truncation). Don't dump the raw JSON.
4. Always end with the report link so the user can open the full tables and export CSV/PDF: `https://dojocode.io/business/reports/<reportId>`.

Use `list_business_reports` to answer "what reports do I have?" or to find an earlier report instead of generating a duplicate — offer the existing one's link first.

> `get_business_report` returns a token-budgeted **summary** (groups: overview + comparison + strengths/weaknesses; contest / learning path: leaderboard top 10) — the full data, tables, and exports live on the report page.

---

# MCP command reference — non-challenge resources

The challenge MCP commands are documented in Part 1. The resource-creation commands for the other types:

| Command | Resource | Purpose | Required params |
|---------|----------|---------|-----------------|
| `create_contest` | Contest | Create a timed contest from existing challenges | `name`, `description`, `startDate`, `endDate` (+ optional `invitationDescription`, `finalDescription`, `visibility`, `aiEnabled`, `aiMaxPromptsPerChallenge`, `challenges[]`) |
| `update_contest` | Contest | Edit a **draft** contest (send only changed fields; `slug` immutable) | `contestId` (+ any editable fields) |
| `create_learning_path` | Learning Path | Create a guided path from existing challenges | `title` (+ optional `description`, `visibility`, `status`, `nodes[]`) |
| `update_learning_path` | Learning Path | Edit a **draft** path (metadata / add / update / delete / reorder lessons) | `learningPathId`, `action` (+ the fields that action needs) |
| `create_project` | Project | Create a sandbox project from a template (files uploaded separately) | `title`, `slug`, `template` (+ optional `description`, `tags`) |
| `update_project_dependencies` | Project | Add/update/remove ONE package (validated against the template registry; waits for the install and reports `installation.status`) | `projectId`, `action`, `name` (+ optional `version`) |
| `prepare_project_upload` | Project | Get a one-time upload URL for a project's files (zip) | _(none)_ |
| `prepare_project_download` | Project | Get a one-time download URL for a project's files (zip) | `projectId` |
| `create_assignment` | Assignment | Assign a learning path or challenge to students/groups | `title`, `sourceType`, `dueDate` (+ source id + recipients) |
| `generate_business_report` | Business Report | Start generating a persisted report of one kind — groups statistics, contest leaderboard, or learning-path progress (async — poll with `get_business_report`) | `title`, `type` (+ `groupIds[]` / `contestId` / `learningPathId` matching the type) |
| `get_business_report` | Business Report | Report status; once completed, a type-specific summary (groups: overview + comparison + strengths/weaknesses; contest / learning path: leaderboard top 10) + report URL | `reportId` |
| `list_business_reports` | Business Report | List the workspace's reports (id, title, status, generatedAt) | _(optional `limit`)_ |
| `get_current_organization` | Organization | Show the active workspace (`_id`/`name`/`role`/`plan`) or personal; read-only, no side effects | _(none)_ |
| `select_organization` | Organization | Set the active workspace (omit id → personal). Run before org-scoped work | _(optional `organizationId`)_ |
| `create_organization` | Organization | Create a new organization (caller becomes owner) | `name` |
| `list_organization_members` | Organization | List an org's members (owner/admin) | `organizationId` |
| `create_organization_user` | Organization | Create a new user account + add to the org | `organizationId`, `email`, `password`, `username`, `firstName`, `lastName` (+ optional `role`) |
| `add_organization_member` | Organization | Add an existing account to the org by email/userId | `organizationId`, `role` (+ `userId` or `email`) |
| `update_member_role` | Organization | Change a member's role (`admin`/`member`) | `organizationId`, `membershipId`, `role` |
| `remove_member` | Organization | Remove a member from the org | `organizationId`, `membershipId` |

Read-only / supporting commands you will use to resolve IDs and confirm results: `get_my_organizations`, `get_current_organization`, `get_challenges`, `get_my_challenges`, `get_contests`, `get_upcoming_contests`, `get_contest`, `get_contest_leaderboard`, `get_contest_analytics`, `get_learning_paths`, `get_my_learning_paths`, `get_learning_path`, `open_learning_path`, `get_projects`, `get_my_projects`, `open_project`, `open_edit_project`, `get_my_groups`, `get_group`, `get_my_students`, `get_student_assignments`, `get_assignment_progress`, `get_business_report`, `list_business_reports`.

## Resource edit links (always use these)

After **creating or editing** a learning path or contest, show the user a clickable edit link. Always build it on the public site `https://dojocode.io` — **never** the local API host (e.g. `localhost:8833`) or the configured frontend host. Substitute the `_id` returned by the create/update tool:

- **Learning path** → `https://dojocode.io/learning-paths/edit/<learningPathId>`
- **Contest** → `https://dojocode.io/business/contest/edit/<contestId>`
- **Project** → `https://dojocode.io/project/edit/<projectId>`
- **Business report** → `https://dojocode.io/business/reports/<reportId>`

## Per-resource workflow summary

- **Organization / workspace** (Session start): `get_my_organizations` → `select_organization` before any business work (contests, assignments, groups). Manage the roster with `list_organization_members` / `create_organization_user` / `add_organization_member` / `update_member_role` / `remove_member`.
- **Challenge** (Part 1): author files → `create_challenge` → `add_variation` (per template) → `createExportContent.js` → `prepare_file_upload` → `uploadChallengeFiles.js` → run tests → `get_challenge_edit_url`. Manage packages with `update_challenge_dependencies` (then sync the local manifest — see the dependency workflow).
- **Contest** (Part 2): **interactive** — select the workspace (`get_my_organizations` → `select_organization`) → gather requirements (challenges-per-contest + suggestion count + AI assistant) → discover challenges → propose suggestions (with distinct invitation/final descriptions) & let the user pick → author `contest.json` → `create_contest` → save `contestCreate.json`. Edit a **draft** contest with `update_contest`.
- **Learning Path** (Part 3): **interactive** — gather requirements (ask) → discover challenges (`get_challenges` with `status: "pending,approved"`) → propose an outline & get approval → author `learningPath.json` → `create_learning_path` → save `learningPathCreate.json`. Edit a **draft** path with `update_learning_path` (metadata / add / update / delete / reorder lessons).
- **Project** (Part 4): scaffold raw files (copy a `projects/project-samples/*`) → `create_project` (title/slug/template/description/tags) → `createProjectContent.js` → `prepare_project_upload` → `uploadProjectFiles.js`. Pull live files with `prepare_project_download` → `downloadProjectFiles.js`. Manage packages with `update_project_dependencies` (then sync the local manifest — see the dependency workflow in Part 1).
- **Assignment** (Part 5): **interactive** — select the workspace (`get_my_organizations` → `select_organization`) → pick recipients (`get_my_groups` / `get_my_students`) → pick source (`get_my_learning_paths` / `get_my_challenges`) → settle due date + student-facing instructions → author `assignment.json` → `create_assignment` (draft) → save `assignmentCreate.json`.
- **Business Report** (Part 6): **interactive** — select the workspace → ask what KIND of report (groups statistics / contest leaderboard / learning-path progress) → pick the subject (`get_my_groups` / `get_contests` / `get_my_learning_paths`) → `generate_business_report` → poll `get_business_report` until completed → present the summary + the report link. Reuse existing reports via `list_business_reports` before generating duplicates.
