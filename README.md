# Sensei

> Create DojoCode resources — challenges, contests, learning paths, projects, and assignments — using AI-powered tools and MCP.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js >=18](https://img.shields.io/badge/Node.js-%3E%3D18-green.svg)](https://nodejs.org/)
[![Platform: DojoCode](https://img.shields.io/badge/Platform-DojoCode-purple.svg)](https://dojocode.io)
[![Docs](https://img.shields.io/badge/Docs-docs.dojocode.io-blue.svg)](https://docs.dojocode.io)
[![Discord](https://img.shields.io/badge/Discord-join-7289da?logo=discord&logoColor=white)](https://discord.com/invite/7vVMx9nSpX)

## Overview

**Sensei** is the starter repo for creating content on the [DojoCode](https://dojocode.io) platform. It uses AI-powered tools via the **Model Context Protocol (MCP)** to generate and publish every DojoCode resource type from natural language — connect your preferred AI coding tool, describe what you want, and the agent calls the `dojocode` MCP tools to build it.

Sensei generalizes the original challenge-creator into a single repo and a single `AGENTS.md` covering **five** resource types:

| Resource | What it is | Created via |
|----------|------------|-------------|
| **Challenge** | A coding exercise: starter code, solution, test suites, per language/framework | file-based authoring + `create_challenge` / `add_variation` + zip upload |
| **Contest** | A timed competition assembled from existing challenges | `create_contest` |
| **Learning Path** | A guided, lesson-by-lesson sequence built from existing challenges | `create_learning_path` |
| **Project** | A free-form runnable sandbox from a template + file tree | `create_project` |
| **Assignment** | A learning path or challenge handed to students/groups (instructor) | `create_assignment` |

Challenges are full file-based authoring (the bulk of `AGENTS.md`). Contests, learning paths, and assignments reference **existing** challenges by their platform `_id`; projects are created from a template and an inline file tree.

## Features

- AI-powered resource creation via natural language
- MCP integration with Claude Code, Codex, Cursor, VS Code Copilot, Gemini CLI, and more
- [33+ language/framework templates](https://docs.dojocode.io/templates/introduction) for challenges and projects (terminal, browser, full-stack, backend, database, mobile)
- One unified `AGENTS.md` and one folder per resource type
- Sample descriptor for every resource type under `challenges/challenge-samples/`
- Automated packaging and upload for challenges

## Requirements

- [Node.js](https://nodejs.org/) 18+ and npm
- A [DojoCode](https://dojocode.io) account with the appropriate access tier for what you are creating:
  - **Challenges / Learning Paths / Projects** — challenge-author access (Premium subscription, Business account, or a sufficient learner level)
  - **Contests** — contest-author access
  - **Assignments** — a Business (instructor) account with student groups
- An AI coding tool: [Claude Code](https://docs.anthropic.com/en/docs/claude-code), [Codex](https://openai.com/index/codex/), [Cursor](https://www.cursor.com/), [VS Code + Copilot](https://code.visualstudio.com/docs/copilot/overview), [Gemini CLI](https://github.com/google-gemini/gemini-cli), or any MCP-compatible client

## Quick Start

1. **Clone the repo**
   ```bash
   git clone https://github.com/dojo-coder/sensei.git
   cd sensei
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Connect your AI tool via MCP** — see [IDE Setup](#ide-setup) below

4. **Start creating** — describe a resource in natural language and the AI generates and publishes it

## IDE Setup

Pre-configured MCP files are included for all supported tools. They all point at the DojoCode MCP endpoint `https://api.dojocode.io/api/v1/mcp`.

| AI Tool | Config File | Setup Guide |
|---------|-------------|-------------|
| Claude Code | `.mcp.json` | [Claude Code setup](https://docs.dojocode.io/ide-integration/claude-code) |
| Codex | `.codex/config.toml` | [Codex setup](https://docs.dojocode.io/ide-integration/codex) |
| Cursor | `.cursor/mcp.json` | [Cursor setup](https://docs.dojocode.io/ide-integration/cursor) |
| VS Code (Copilot) | `.vscode/mcp.json` | [VS Code setup](https://docs.dojocode.io/ide-integration/vscode) |
| Gemini CLI | `.gemini/settings.json` | [Gemini CLI setup](https://docs.dojocode.io/ide-integration/gemini-cli) |
| Other MCP clients | Manual config | Use endpoint: `https://api.dojocode.io/api/v1/mcp` |

## Usage

Once connected, describe what you want in your AI tool. Example prompts:

```
create a challenge on data structures and strings in javascript
```

```
create a contest from my three array challenges, 30 minutes each, this weekend
```

```
create a learning path on arrays from my existing challenges, easiest to hardest
```

```
create a vanilla js sandbox project with an index.html and main.js
```

```
assign the arrays learning path to my Group A, due in two weeks
```

See [`AGENTS.md`](AGENTS.md) for the full set of workflows and MCP commands for every resource type.

## How It Works

1. **Describe** — Tell the AI what resource you want to create
2. **Resolve** — For contests / learning paths / assignments, the AI looks up the existing challenges (or learning paths) by `_id` via the MCP read tools
3. **Generate** — The AI authors the files (challenges/projects) or the descriptor JSON (contests/learning-paths/assignments) following `AGENTS.md`
4. **Publish** — The AI calls the matching `create_*` MCP command (and, for challenges, packages + uploads a zip)
5. **Confirm** — Results are validated via the read/test MCP tools and a record is saved alongside the source files

## Project Structure

```
sensei/
├── .codex/config.toml           # Codex MCP config
├── .cursor/mcp.json             # Cursor MCP config
├── .gemini/settings.json        # Gemini CLI MCP config
├── .vscode/mcp.json             # VS Code MCP config
├── .mcp.json                    # Claude Code MCP config
├── AGENTS.md                    # AI agent guidelines & workflows (all resource types)
├── CLAUDE.md                    # Claude-specific instructions
├── CONTRIBUTING.md              # Contribution guidelines
├── LICENSE                      # MIT License
├── README.md                    # This file
├── package.json                 # Project dependencies
├── createExportContent.js       # Packages challenge files into a zip
├── uploadChallengeFiles.js      # Uploads a challenge zip to DojoCode
├── downloadChallengeFiles.js    # Downloads challenges from DojoCode
├── createProjectContent.js      # Packages a project folder into a zip
├── uploadProjectFiles.js        # Uploads a project's files to DojoCode
├── downloadProjectFiles.js      # Downloads a project's files from DojoCode
├── challenges/                  # Generated challenges (file-based authoring)
│   └── challenge-samples/       # Reference sample for every challenge template (33+)
│       ├── nodejs-example-challenge/
│       ├── reactjs-example-challenge/
│       └── ...                  # one per terminal / browser / full-stack / backend / database / mobile template
├── contests/                    # Contest descriptors (contest.json + contestCreate.json)
│   └── contest-example/         # Committed reference descriptor
├── learning-paths/              # Learning path descriptors (learningPath.json + ...Create.json)
│   └── learning-path-example/   # Committed reference descriptor
├── projects/                    # Generated projects (raw runnable files + project.json)
│   └── project-samples/         # Reference project per template (image slider, etc.)
│       └── reactjs-example-project/
├── assignments/                 # Assignment descriptors (assignment.json + ...Create.json)
│   └── assignment-example/      # Committed reference descriptor
└── temp/                        # Temporary working directory
```

Each non-challenge resource folder holds a descriptor JSON you author (the create payload) plus a `*Create.json` written after creation that records the returned platform `_id` — mirroring the `challengeCreate.json` pattern used for challenges. A committed `*-example` descriptor sits in each folder as a starting point.

## About DojoCode

[DojoCode](https://dojocode.io) is a free online coding platform where you can solve challenges, follow learning paths, compete in contests, and collaborate with other developers — all in the browser.

- **No setup required** — code and test directly in the browser
- **12+ languages** — JavaScript, Python, Java, Go, Rust, C++, C#, PHP, Ruby, TypeScript, Solidity, and more
- **AI Assistant** — get hints and explanations powered by AI
- **Automated testing** — every challenge has built-in test suites
- **Live collaboration** — pair program with others in real-time
- **Contests & learning paths** — compete and learn with structured content
- **Gamification** — earn XP, [level up](https://docs.dojocode.io/gamification/levels), and unlock achievements

[Browse Challenges](https://dojocode.io/explore-challenges) · [Read the Docs](https://docs.dojocode.io) · [Join Discord](https://discord.com/invite/7vVMx9nSpX)

## Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

## Feedback & Support

- [DojoCode Platform](https://dojocode.io)
- [Documentation](https://docs.dojocode.io)
- [Discord Community](https://discord.com/invite/7vVMx9nSpX)
- [YouTube](https://www.youtube.com/@dojocode)
- [LinkedIn](https://www.linkedin.com/company/dojocodeplatform)
- [Instagram](https://www.instagram.com/dojocodeofficial/)
- [GitHub Issues](https://github.com/dojo-coder/sensei/issues)
