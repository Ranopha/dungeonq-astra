# Verification map

The v0.6.0 clean Amazon and Astra distributions each passed **214 tests, three goldens, audit, typecheck and build** locally. Each world and study proof passed 12 checks. This is clean-source evidence, not an assertion that new remote CI or a deployment has completed. Final source manifests identify the packaged contents.

`npm run test:world`, `npm run test:study`, `npm run world:proof` and `npm run study:proof` cover the new finite causal modules without model API calls. The [research results](STUDY_RESULTS.md) keep those engineering checks separate from the 48-condition reference matrix and the Codex pilot's 0/2 wrong-high-confidence induction.

Run `npm ci --ignore-scripts` and `npm run check` on Node 24.15+ with OpenSSL. These are free local tests; no API key is needed. `npm run test:astra` isolates Astra provider validation, fixed endpoint/schema, budget-before-I/O, no retry, error redaction, independent approval, recorded-before-command behavior and distinct wait outcomes.

The inherited runtime suite covers real local HTTPS/CSRF and HTTP MCP, SQLite persistence, expiry/revocation, role/scope checks, idempotence, read-back, signed receipts and migration behavior. `npm run demo:proof` produces a fresh deterministic two-role fixture without an AI call. Browser engine goldens are checked by `npm run verify`.

Seven modeled failure flags have 127 non-empty subsets. The property test checks that adding failures cannot increase modeled authority. This is not 127 real attacks or an exhaustive test of distributed infrastructure.

`npm run astra:proof -- --live confirmed --max-usd 0.5` is separately opt-in and paid. It retains both success and failure outcomes; the automated reviewer fixture does not establish a person was present. `evidence/report.json` is a recorded September 16 run, not a fresh execution by the reader.

Static browser acceptance covers the three built-in cases, custom JSON admission, unapproved apply, explicit modeled review, apply/verify/tamper/replay, current artifact digest/signature checks and WebMCP success/invalid inputs. Browser and server receipts are different types; do not interchange their verifiers.

Visual acceptance, local tests, live API observation, deployment and platform-specific CI are separate evidence. Earlier Amazon CI results do not certify the changed Astra distribution. A green build is not proof of commercial readiness.
