# New badges: content status

The push to add content for five new badge paths, all aimed at free users. Read
this before resuming; then read `challenges/<slug>/templates/<template>/README.md`
for the spec of any individual challenge.

**Everything below is `draft` and free. Publishing has not been authorised.**
Skills and badges do not exist on DojoCode yet and cannot be created over MCP -
they are platform-side and come later. The content is being built first.

## Where things stand

| group | state |
|---|---|
| Blockchain & Web3 | **done** - 9 challenges, 16 variations, all verified |
| Cryptography | **done** - 5 new challenges + 1 retagged, 50 variations, all verified |
| AI Agents | **done** - 3 challenges, 30 variations, all verified |
| the remaining two groups | not started |

The tags `form`, `tool using`, `retrieval` and `configuration` have **not**
been created yet. `tool using` and `retrieval` are already needed by two
finished AI Agents challenges - see that section.

## A caution about this file

The per-batch `*-STATUS.md` files that the curator's memory notes point at
(`CACHE-MASTER-STATUS.md`, `CRYPTOGRAPHY-FUNDAMENTALS-STATUS.md`, and the rest)
**are not in this repo** - they have never been tracked in git and are not on
disk. Either they were written in a different working copy or they were lost.
Do not assume they exist; if one is needed, it has to be rebuilt from the
platform and from `challenges/`.

Note also that `/challenges/*` is gitignored on purpose ("local to the curator"),
so none of the generated template folders are committed. The platform is the
system of record; these folders are the working copy.

## Blockchain & Web3

Rust and Solidity only. That was a deliberate decision by the curator: anyone
learning blockchain should be learning those two. Solidity uses the Foundry
layout (`src/<Name>.sol`, `Main.s.sol`, `tests/<Name>.t.sol`), and a test's
`///` comment becomes its description on the platform.

| challenge | challengeId | variations |
|---|---|---|
| Crypto Address Validator | `6aa29ce65c84e2784ff71837` | rust `6aa29ce65c84e2784ff71839` (default), solidity `6aa29ced5c84e2784ff71890` |
| Transaction Ledger Builder | `6aa2ab2b5c84e2784ff72538` | rust `6aa2ab2b5c84e2784ff7253a` (default), solidity `6aa2ab325c84e2784ff72589` |
| Gas Fee Estimator | `6aa2ac535c84e2784ff72a12` | rust `6aa2ac535c84e2784ff72a14` (default), solidity `6aa2ac5a5c84e2784ff72a69` |
| Block Hash Verifier | `6aa2b91e5c84e2784ff73f33` | rust `6aa2b91e5c84e2784ff73f35` (default, `sha2`), solidity `6aa2b9255c84e2784ff73fae` |
| Nonce Replay Guard | `6aa2ba225c84e2784ff74245` | rust `6aa2ba225c84e2784ff74247` (default), solidity `6aa2ba285c84e2784ff74299` |
| NFT Ownership Registry | `6aa2bb425c84e2784ff744e0` | solidity `6aa2bb425c84e2784ff744e2` (default), rust `6aa2bb4a5c84e2784ff74539` |
| Merkle Tree Verifier | `6aa2c1975c84e2784ff749b6` | rust `6aa2c1975c84e2784ff749b8` (default, `sha2`), solidity `6aa2c19e5c84e2784ff74a07` |
| Mini Blockchain Builder | `6aa2c32d5c84e2784ff750a6` | rust `6aa2c32d5c84e2784ff750a8` (default, `sha2`), **Rust only**, 11 tests |
| Smart Contract Escrow | `6aa2c41c5c84e2784ff753ba` | solidity `6aa2c41c5c84e2784ff753bc` (default), **Solidity only** |

**Tag warning for the eventual badge:** only 7 of the 9 carry the `blockchain`
tag. Smart Contract Escrow and NFT Ownership Registry do not - a skill keyed on
`blockchain` alone would miss them. Include `smart contracts` as well.

## Cryptography

Ten terminal templates each (python, cpp, nodejs_jest, nodets_jest, go, java,
csharp, php, ruby, rust). Python is the default everywhere.

| # | challenge | difficulty | minutes | state |
|---|---|---|---|---|
| 1 | Morse Code Translator | 1 | 15 | new |
| 2 | Base64 Codec | 1 | 20 | new |
| 3 | Vigenere Cipher | 2 | 30 | new |
| 4 | XOR Cipher | 1 | 30 | **already existed**, retagged |
| 5 | Diffie Hellman Key Exchange | 3 | 45 | new |
| 6 | Substitution Cipher Cracker | 3 | 50 | new |

### Slot 4 was a duplicate

The plan called for a new `xor-stream-cipher` at difficulty 2. `XOR Cipher`
(`6a995600c68f6642ada9127a`, from the earlier Cryptography Fundamentals batch)
already does exactly that - repeating-key XOR over a hex dump, same ten
templates, same house style. The curator chose to **retag the existing one**
rather than build a near-duplicate. It now carries `cipher` (which it was
missing) alongside `encryption`, `bitwise operations`, `cybersecurity` and
`security`. Its difficulty is **1**, not the 2 the plan assumed.

So the group is 5 new challenges, not 6.

### What each challenge is actually teaching

- **Morse Code Translator** - the table is handed over; the lesson is the
  *spacing*: one space between symbols, `" / "` between words.
- **Base64 Codec** - the end of the message. One leftover byte takes **two**
  `=`, two leftover bytes take **one**, which is the opposite of what people
  guess. Decoding skips everything outside the alphabet, which is how it walks
  past MIME's 76-column newlines.
- **Vigenere Cipher** - (a) the key advances only on letters that were actually
  enciphered, so a space eats no key letter; (b) `decrypt("A", "B")` must be
  `"Z"`, and `%` keeps the sign of the left operand in C, C++, C#, Java, Go and
  Rust. Python and Ruby are the odd ones out.
- **Diffie Hellman Key Exchange** - repeated squaring (one test uses the
  exponent 1000000, so `base ** exponent` is unusable, not merely slow), and
  refusing a public key of `0`, `1` or `p - 1` because those force the secret.
  The prime is `2^26 - 5` so that `p * p` stays under 2^53 and a JavaScript
  `number` is still exact.
- **Substitution Cipher Cracker** - deterministic frequency analysis. A real
  cracker hill-climbs and could never agree byte for byte across ten languages,
  so this is the honest core: rank the letters, pair the ranking against
  `ETAOINSHRDLCUMWFGYPBVKJXQZ`, and accept that the answer is a *candidate*.
  The ranking is built by 26 passes of "highest count, lowest letter breaks the
  tie" rather than by sorting, because sort stability differs between languages.

### Variation ids

#### Morse Code Translator

`6aa3b6695c84e2784ff7d069` - difficulty 1, 15 min, tags encoding / decoding / strings

| template | variation id |
|---|---|
| python **(default)** | `6aa3b6695c84e2784ff7d06b` |
| cpp | `6aa3b6705c84e2784ff7d0b8` |
| nodejs_jest | `6aa3b6795c84e2784ff7d105` |
| nodets_jest | `6aa3b6805c84e2784ff7d151` |
| go | `6aa3b6885c84e2784ff7d19a` |
| java | `6aa3b6915c84e2784ff7d1e6` |
| csharp | `6aa3b6995c84e2784ff7d22f` |
| php | `6aa3b6a85c84e2784ff7d280` |
| ruby | `6aa3b6b25c84e2784ff7d2c9` |
| rust | `6aa3b6c15c84e2784ff7d315` |

#### Base64 Codec

`6aa3bbcb5c84e2784ff7e227` - difficulty 1, 20 min, tags encoding / decoding / cryptography

| template | variation id |
|---|---|
| python **(default)** | `6aa3bbcb5c84e2784ff7e229` |
| cpp | `6aa3bbd15c84e2784ff7e27e` |
| nodejs_jest | `6aa3bbd85c84e2784ff7e2cb` |
| nodets_jest | `6aa3bbde5c84e2784ff7e315` |
| go | `6aa3bbe45c84e2784ff7e361` |
| java | `6aa3bbea5c84e2784ff7e3aa` |
| csharp | `6aa3bbf65c84e2784ff7e3f6` |
| php | `6aa3bbfc5c84e2784ff7e43f` |
| ruby | `6aa3bc035c84e2784ff7e488` |
| rust | `6aa3bc085c84e2784ff7e4da` |

#### Vigenere Cipher

`6aa3c2735c84e2784ff7f2bc` - difficulty 2, 30 min, tags cipher / cryptography / algorithms

| template | variation id |
|---|---|
| python **(default)** | `6aa3c2735c84e2784ff7f2be` |
| cpp | `6aa3c27a5c84e2784ff7f377` |
| nodejs_jest | `6aa3c2805c84e2784ff7f3c4` |
| nodets_jest | `6aa3c2865c84e2784ff7f410` |
| go | `6aa3c28c5c84e2784ff7f4cc` |
| java | `6aa3c2925c84e2784ff7f516` |
| csharp | `6aa3c2985c84e2784ff7f55f` |
| php | `6aa3c29e5c84e2784ff7f5b0` |
| ruby | `6aa3c2a65c84e2784ff7f5f9` |
| rust | `6aa3c2ac5c84e2784ff7f644` |

#### Diffie Hellman Key Exchange

`6aa3c8e35c84e2784ff817b2` - difficulty 3, 45 min, tags cryptography / encryption / math

| template | variation id |
|---|---|
| python **(default)** | `6aa3c8e35c84e2784ff817b4` |
| cpp | `6aa3c8eb5c84e2784ff81814` |
| nodejs_jest | `6aa3c8f25c84e2784ff81869` |
| nodets_jest | `6aa3c8f85c84e2784ff818b2` |
| go | `6aa3c9005c84e2784ff818fe` |
| java | `6aa3c9075c84e2784ff81947` |
| csharp | `6aa3c90f5c84e2784ff81992` |
| php | `6aa3c9155c84e2784ff819e0` |
| ruby | `6aa3c91b5c84e2784ff81a2b` |
| rust | `6aa3c9225c84e2784ff81a74` |

#### Substitution Cipher Cracker

`6aa3d6de5c84e2784ff84dde` - difficulty 3, 50 min, tags cipher / cryptographic / algorithms

| template | variation id |
|---|---|
| python **(default)** | `6aa3d6de5c84e2784ff84de0` |
| cpp | `6aa3d6e55c84e2784ff84e2d` |
| nodejs_jest | `6aa3d6eb5c84e2784ff84e85` |
| nodets_jest | `6aa3d6f15c84e2784ff84ece` |
| go | `6aa3d6f75c84e2784ff84f1c` |
| java | `6aa3d6fe5c84e2784ff84f6f` |
| csharp | `6aa3d7045c84e2784ff84fb8` |
| php | `6aa3d70a5c84e2784ff85001` |
| ruby | `6aa3d7145c84e2784ff8504f` |
| rust | `6aa3d71a5c84e2784ff85098` |

#### XOR Cipher (existing, retagged)

`6a995600c68f6642ada9127a` - difficulty 1, 30 min, tags cipher / encryption /
bitwise operations / cybersecurity / security

Its ten variations were not touched; only the challenge-level tags changed.

## AI Agents

Ten terminal templates each, Python the default everywhere.

| # | challenge | difficulty | minutes | tags |
|---|---|---|---|---|
| 1 | Agent Memory Store | 2 | 30 | ai agents / data structures - *`retrieval` still missing* |
| 2 | Multi Agent Orchestrator | 3 | 50 | ai agents / OOP - *`tool using` still missing* |
| 3 | RAG Reranker | 3 | 45 | ai agents / rag / algorithms - *fully tagged* |

**`retrieval` and `tool using` do not exist as platform tags and cannot be created over MCP** - no tool does it, and `update_challenge_metadata` refuses a name that is not already a tag. Once they are created platform-side, one `update_challenge_metadata` call each finishes the two challenges above.

### Deliberate separation from what already existed

The bank already had seven challenges in this territory, so each of these three was shaped to avoid them:

- **Agent Memory Store** is not `keyword-retriever`. That one breaks scoring ties by *original order*; recall here breaks them by *most recent*, which is the bug the challenge is built around. Pinned memories are never evicted, so a full store of pins drops the newcomer.
- **Multi Agent Orchestrator** is not `agent-step-runner`. There are no tools in it at all - it routes to specialists, follows handoffs, charges one shared budget, and refuses a handoff cycle. Without the cycle check a loop just burns the budget and reports `out of budget`, which hides a broken configuration behind what looks like a resource problem.
- **RAG Reranker** is the second stage that `simple-rag-system` and `keyword-retriever` do not cover: Reciprocal Rank Fusion over several ranked lists, in integer arithmetic, with a three-level tie-break.

#### Agent Memory Store

`6aa3dcb45c84e2784ff86bf6` - difficulty 2, 30 min

| template | variation id |
|---|---|
| python **(default)** | `6aa3dcb45c84e2784ff86bf8` |
| cpp | `6aa3dcba5c84e2784ff86d13` |
| nodejs_jest | `6aa3dcc15c84e2784ff86daf` |
| nodets_jest | `6aa3dcc85c84e2784ff86e1e` |
| go | `6aa3dcd05c84e2784ff86ead` |
| java | `6aa3dcd65c84e2784ff86f16` |
| csharp | `6aa3dcdd5c84e2784ff86ff3` |
| php | `6aa3dce55c84e2784ff87048` |
| ruby | `6aa3dcec5c84e2784ff87099` |
| rust | `6aa3dcf25c84e2784ff87150` |

#### Multi Agent Orchestrator

`6aa404355c84e2784ff8bea3` - difficulty 3, 50 min

| template | variation id |
|---|---|
| python **(default)** | `6aa404355c84e2784ff8bea5` |
| cpp | `6aa4043d5c84e2784ff8befa` |
| nodejs_jest | `6aa404455c84e2784ff8bf47` |
| nodets_jest | `6aa4044c5c84e2784ff8bf93` |
| go | `6aa404535c84e2784ff8bfde` |
| java | `6aa4045a5c84e2784ff8c029` |
| csharp | `6aa404615c84e2784ff8c075` |
| php | `6aa404685c84e2784ff8c0be` |
| ruby | `6aa4046f5c84e2784ff8c107` |
| rust | `6aa404775c84e2784ff8c15a` |

#### RAG Reranker

`6aa3fc7d5c84e2784ff8b03a` - difficulty 3, 45 min

| template | variation id |
|---|---|
| python **(default)** | `6aa3fc7d5c84e2784ff8b03c` |
| cpp | `6aa3fc845c84e2784ff8b089` |
| nodejs_jest | `6aa3fc8e5c84e2784ff8b0d6` |
| nodets_jest | `6aa3fc955c84e2784ff8b124` |
| go | `6aa3fc9c5c84e2784ff8b16d` |
| java | `6aa3fca45c84e2784ff8b1b6` |
| csharp | `6aa3fcab5c84e2784ff8b204` |
| php | `6aa3fcb45c84e2784ff8b24d` |
| ruby | `6aa3fcbb5c84e2784ff8b29e` |
| rust | `6aa3fcc25c84e2784ff8b2e7` |

## Verification standard applied to every challenge here

Five gates, in order. Nothing was uploaded until the first four were green.

1. **Spec selfcheck** - the reference agrees with an independent implementation
   (Python's `base64`, its three-argument `pow`, and so on); a trivial stub
   passes **0** of the tests; and every modelled mistake is caught by at least
   one of the *first five* tests, which are the ones the learner sees.
2. **README examples recomputed** - every `Input: ... -> Output: ...` line is
   parsed back out of the generated file and fed to the reference. The worked
   diagrams are checked too, and so is the claim that each promised function
   name exists in that language's own solution and stub.
3. **Local run in all ten languages** - one driver per template, whole
   transcript diffed against the reference.
4. **Local stub run in all ten languages** - the starter code must compile and
   answer nothing.
5. **Platform** - `run_all_tests` (expect all pass) and
   `run_all_tests_preloaded` (expect 0 passed and **no compile errors**) on
   every variation.

## Gotchas worth remembering

- **The upload URL is single-use.** Reusing one answers `404 Upload token not
  found or expired`, so a shell loop over ten templates uploads the first and
  silently fails the other nine. Call `prepare_file_upload` once per variation.
- **Upload the default variation last.** The challenge-level description comes
  from whichever zip went up last.
- **`run_all_tests` rate limit** is about 20 calls in two minutes.
- **An unused import is a compile error in Go**, so a stub that is handed a
  constant must not also be handed the import that only the solution needs.
- **Tests whose every case expects the same trivial value pass on an empty
  stub.** Every "rejected" or "empty" case here is paired with a positive one.
  The Diffie Hellman and Substitution suites each needed this fix.
- **A local run that does not assert the way the test file does has a blind spot.** RAG Reranker's Rust variation would not compile: a bare `vec![]` cannot infer its element type, and four tests expect an empty list. The local driver *prints* its results instead of comparing them, so it never exercised that. Emit `Vec::<String>::new()` for an empty expected vector. Only the platform caught it.
- The platform now auto-generates Romanian translations of test names on each
  run; nothing needs doing about it.

## Not done, not authorised

- Publishing. Everything is `draft` on purpose.
- Skills and badges - platform-side, cannot be created over MCP.
- The tags `form`, `tool using`, `retrieval`, `configuration`.
- The two remaining badge groups.
