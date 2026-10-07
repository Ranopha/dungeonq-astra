# Reproducible testing — v0.13.0

Use a pinned public source checkout, Node.js 24.15.0+ and the prerequisites in [INSTALL](INSTALL.md). The [current validation record](VALIDATION.md) binds observed results to source and environment. A command below describes what to run; it is not a predeclared PASS or a substitute for source-bound acceptance.

| Command or route | Scope |
| --- | --- |
| `npm ci --ignore-scripts` then `npm run doctor` | Locked dependency installation and local prerequisite checks |
| `npm run oss:demo -- /absolute/path/new-report.json` | Independent public MCP/HTTP consumer, actor-only authority, separate scripted operator/origin checks; use a new output filename |
| `npm run test:runtime` | Runtime protocol, state, authority and failure-path regressions |
| `npm run check` | Complete source checkpoint, scenario verification, audit, typecheck and build |
| `npm run verify:source` | Intact distribution inventory and digest check; edited source needs release preparation |
| [Container reference](../deploy/runtime-reference/README.md) plus `runtime:proof` / `runtime:gate` | Fresh full runtime admission against the exact clean source and current isolation evidence |
| [Manual participant/operator route](JUDGE_ROUTE.md) | Actual visible task, separate readback, operator evidence, finite grant and restart |

The [standalone consumer guide](EXTERNAL_INTEGRATION.md) explains each role and report field. Root installation is sufficient for the harness; a separately copied consumer package has its own installation step. Its scripted protocol checks do not test service restart or measure model deception, response delay, external adoption or human presence. Use the manual route and dedicated runtime acceptance for restart claims.

Treat a named expected denial differently from an unexpected failure. Preserve the report and examine its authenticated outcome; UNKNOWN, missing checks, source mismatch and stale isolation evidence cannot become PASS. Never delete a fixture or reset credentials to hide a failed run. Keep all outputs synthetic and credentials/private installation data out of reports.

UI changes need actual visible workflow review. Model experiments require a separately stated hypothesis, controls, budget and stopping rule; no paid call is needed for the default integration or source checks. The current runtime and retained assistant/Astra/research profiles have different authority and evidence contracts.

<details>
<summary>Historical profile-specific test maps</summary>

# Verification map

The v0.6.0 clean Amazon and Astra distributions each passed **214 tests, three goldens, audit, typecheck and build** locally. Each world and study proof passed 12 checks. This is clean-source evidence, not an assertion that new remote CI or a deployment has completed. Final source manifests identify the packaged contents.

`npm run test:world`, `npm run test:study`, `npm run world:proof` and `npm run study:proof` cover the new finite causal modules without model API calls. The [research results](STUDY_RESULTS.md) keep those engineering checks separate from the 48-condition reference matrix and the Codex pilot's 0/2 wrong-high-confidence induction.

Run `npm ci --ignore-scripts` and `npm run check` on Node 24.15+ with OpenSSL. These are free local tests; no API key is needed. `npm run test:astra` isolates Astra provider validation, fixed endpoint/schema, budget-before-I/O, no retry, error redaction, independent approval, recorded-before-command behavior and distinct wait outcomes.

The inherited runtime suite covers real local HTTPS/CSRF and HTTP MCP, SQLite persistence, expiry/revocation, role/scope checks, idempotence, read-back, signed receipts and migration behavior. `npm run demo:proof` produces a fresh deterministic two-role fixture without an AI call. Browser engine goldens are checked by `npm run verify`.

Seven modeled failure flags have 127 non-empty subsets. The property test checks that adding failures cannot increase modeled authority. This is not 127 real attacks or an exhaustive test of distributed infrastructure.

`npm run astra:proof -- --live confirmed --max-usd 0.5` is separately opt-in and paid. It retains both success and failure outcomes; the automated reviewer fixture does not establish a person was present. `evidence/report.json` is a recorded September 16 run, not a fresh execution by the reader.

Static browser acceptance covers the three built-in cases, custom JSON admission, unapproved apply, explicit modeled review, apply/verify/tamper/replay, current artifact digest/signature checks and WebMCP success/invalid inputs. Browser and server receipts are different types; do not interchange their verifiers.

Visual acceptance, local tests, live API observation, deployment and platform-specific CI are separate evidence. Earlier Amazon CI results do not certify the changed Astra distribution. A green build is not proof of commercial readiness.

</details>
