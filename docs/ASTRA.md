# Running and evaluating Astra Safety Rehearsal

## v0.6.0 research companion: free and separate

The Astra candidate/approval workflow below is unchanged. The distribution also includes `npm run world` and `npm run study`, which make no provider calls and require no API key. The [two-minute study route](STUDY_LAB.md#a-two-minute-reviewer-route) exercises finite two-feature prediction → action → reflection, consent, withdrawal and a separate-process Observer. The study UI is Traditional Chinese; the English guide includes its labels.

[Original results](STUDY_RESULTS.md) preserve 48 reference-learner condition units—not subjects—and both planned Codex pilot sessions with 0/2 wrong-high-confidence induction. The exact pilot model identity was not independently attested. Do not present these sessions as Astra or evidence of general LLM efficacy. They are distinct from the recorded Astra API calls below.

The public static evidence explorer can display retained results and traces; it does not host this server/Observer architecture. Run the source locally to test that boundary. None of these finite synthetic activities is a real exploit, attack chain or production security deployment.

DungeonQ rehearses a single authorized change to an artificial asset. GPT-6 Astra contributes a candidate; the local runtime owns validation and enforcement. Nothing in this profile connects to a production asset, performs a live attack or establishes production readiness.

## Prerequisites and free checks

Use Node.js 24.15.0+, npm and OpenSSL supporting `req -addext`. Start in the unpacked source directory containing `package.json`:

```sh
npm ci --ignore-scripts
npm run check
```

`check` runs the local tests, fixed-seed verification, source audit, type checking and build. The Astra tests mock the provider; passing them is not evidence of a live model response. Run `npm run test:astra` when you only need the adapter tests. `npm run doctor` offers prerequisite diagnostics; it does not certify deployment or platform support.

The reference profile is local and uses short-lived evaluation credentials. Native Windows is not release-accepted. This edition's current validation must accompany its release; earlier DungeonQ platform results do not substitute for checking a changed distribution.

## Start an interactive live lab

Supply your own key as `OPENAI_API_KEY` in the launching process environment. Use a local secret manager or another method that avoids putting the key in command history. Do not put an API key in the source archive, browser code, scenario file or evidence bundle.

```sh
npm run astra -- --data-dir ../dungeonq-astra-lab --max-usd 0.5
```

This starts a loopback HTTPS review desk at `https://127.0.0.1:4196/assistant` and the internal HTTP MCP server on port 4197. Sign in as `owner-lab` using the disposable password printed on first creation. A restart preserves the account and does not print a replacement password. Keep the password and private lab directory local.

The lab uses a local self-signed certificate. Inspect and handle the browser warning yourself. Do not disable certificate validation, add system-wide trust or expose either listener publicly. TLS and worker credentials have a 30-day evaluation lifetime; this is not a continuously hosted service.

Startup does not call the paid model. Each press of **Astra: prepare a request** or **Astra: continue after review** requests one candidate from GPT-6 Astra. The adjacent investigation, request, apply and evidence controls run without model calls. There is no background model loop or automatic retry.

The expected walkthrough is:

1. Ask Astra to prepare. The candidate is recorded before any proposed command crosses MCP. A permitted `request` creates an `AWAITING_HUMAN` record.
2. Use **Ask the agent to apply** before approval. Expect `HUMAN_APPROVAL_REQUIRED` and unchanged assets.
3. In **The approval boundary**, inspect the immutable manifest and reauthenticate to approve the exact change.
4. Ask Astra to continue. A valid `apply` may change only the approved synthetic target. Check the database read-back and verify the receipt; the altered receipt must fail and replay must return the original result.

`wait` is a valid candidate and grants no authority. An unexpected outcome remains visible; the runtime does not turn it into a successful effect. Model output is not deterministic, so a successful earlier proof does not guarantee every later run will complete.

Stop with Ctrl+C. Restart with the same `--data-dir` and allowance to preserve the ledger and state. Optional launcher arguments are `--scenario`, `--data-dir`, `--web-port`, `--mcp-port` and `--max-usd`. Use only a synthetic Scenario Pack. Changing the scenario requires a fresh lab; an uploaded analysis does not replace a running lab's registered assets.

## Run the opt-in live proof

This command requires your API key and explicitly authorizes paid calls:

```sh
npm run astra:proof -- --live confirmed --max-usd 0.5 --out ../dungeonq-astra-proof
```

The output directory must not already exist. The script creates a fresh private lab, plans two model calls and stops on a failed stage. It does not retry. It closes the servers afterward and retains the private fixture and its cost ledger locally; the terminal identifies that directory. Do not publish it.

The automated driver requests a candidate, checks that unapproved apply is blocked, confirms the agent has no approval tool, signs in through the separate HTTPS/CSRF reviewer interface, reauthenticates, then asks Astra to continue. It also checks the unrelated asset, original signature, altered receipt and replay.

The driver controls both fixture roles. Its report deliberately says:

```json
{
  "approvalMode": "AUTOMATED_REVIEWER_FIXTURE",
  "humanPresenceProven": false,
  "authority": "LOCAL_TEST_OBSERVATION_NOT_PROVIDER_ATTESTATION"
}
```

Expect an `outcome` of `PASS` only when the named checks complete. `NOT_COMPLETED` and a nonzero exit require inspection of `failedStage` and `error`; they must not be relabeled as success. Do not repeatedly restart paid proofs in search of a favorable result.

On success the output contains `report.json`, `model-events.json`, `mcp-trace.json` and `assistant-evidence.json`. A failed run may contain only the report and model events reached before failure. Inspect any bundle before sharing; export artifacts and private runtime storage have different disclosure boundaries.

## Cost controls and failure handling

The default allowance is US$0.50 per persistent lab. The implementation accepts a configured amount above zero and up to US$5; the documented command stays at US$0.50. The amount is fixed when its ledger is created. Reopening the same ledger with a different amount fails with `ASTRA_BUDGET_IMMUTABLE`.

Before contacting the provider, the adapter commits a conservative reservation to SQLite. It uses bounded input and output, does not refund a reservation after failure, and records reported token usage separately. The estimate uses the rate snapshot identified by `rateAsOf`; provider billing remains authoritative. A timeout can leave usage unknown even though its reservation remains charged locally.

This ledger is not a provider-enforced invoice hard cap. It does not cover another process, another lab or other use of the API account. Creating a fresh lab creates a new allowance, including each fresh live-proof run. Keep repetitions manual and bounded; use account-level provider controls separately if you need them.

| Result | Interpretation and next step |
| --- | --- |
| `ASTRA_KEY_REQUIRED` | Supply a valid key through the process environment; no mock fallback is presented as live. |
| `ASTRA_AUTH_FAILED` | Check the API credential and access in your own account. |
| `ASTRA_QUOTA_OR_RATE_LIMIT` | Inspect your account's availability or limits; the lab does not buy credits or retry. |
| `ASTRA_BUDGET_EXHAUSTED` | The retained reservations reached this lab's allowance. Review the ledger and stop paid calls. |
| `ASTRA_PROVIDER_UNKNOWN` | The provider outcome is uncertain. Keep the reservation and inspect local state before deciding whether another call is justified. |
| `HUMAN_APPROVAL_REQUIRED` | The effect is blocked until the separate reviewer approves the exact manifest. |

No password, API key, tenant identifier, username or free-text scenario content belongs in the model summary. The adapter sends only minimized engine enums and numbers: task, traffic routing, risk score, executability, supported mapping, request state, scope, budget/cost units and failure flags. The endpoint and model are fixed; this is not an arbitrary external-agent or shell runner.

## What the evidence establishes

| Layer | Observable behavior | Limit |
| --- | --- | --- |
| Model candidate | A single schema-bound `request`, `apply`, `verify` or `wait`, plus reported model ID, response ID and usage | Locally recorded API response; not a signed provider attestation |
| Command enforcement | Task-specific candidate validation and real Streamable HTTP MCP requests | A candidate alone is neither approval nor execution |
| Reviewer boundary | Separate HTTPS cookie session, CSRF and password reauthentication bound to the exact manifest | Automated proof owns both fixture roles; it does not prove a person was present |
| Local effect | Scoped SQLite transition with before/after read-back and unchanged unrelated asset | Synthetic containment only; no production-system effect |
| Receipt | Ed25519 verification, altered-copy rejection and replay without another mutation | Local lab key; no independent identity or external trust root |
| Export | Report and distinct model/runtime records with artifact digests | A digest is not a trusted timestamp or proof of complete history |

The existing MCP protocol profile is 2025-11-25 over Streamable HTTP POST with JSON responses. It provides no approval or grant-publishing tool. The reviewer uses the HTTPS application interface; the model never receives its password or approval authority.

Receipt verification covers the signed receipt, not the truth of the scenario or the entire export envelope. A public key bundled with evidence cannot independently establish who produced it. Host administrators and programs with equivalent local privileges are outside the isolation claim; runtime isolation remains untested.

The public static rehearsal models the interaction in the browser. Its recorded `LIVE_OPENAI` panel refers to the September 16 development run. It makes no paid calls and cannot demonstrate the self-hosted authentication or storage boundary by itself.

## Development evidence and provenance

The September 16, 2026 snapshot contained three live calls with estimated total usage of US$0.02054. The first returned a safe `wait` after treating a simulated traffic `DENY` ambiguously. The input was clarified to `trafficRoute`, with an explicit distinction between traffic routing and requesting review of containment. The following two-call run completed seven named checks at an estimated US$0.01249. This history is retained rather than presenting only a successful attempt.

The Astra edition builds on DungeonQ 0.4.0's existing engine, HTTP MCP adapter, reviewer controls, SQLite state and Ed25519 receipts. New work is the Astra provider/bridge/runtime, minimized context, durable reservation ledger, distinct candidate/result records, review-desk controls, targeted tests and live-proof workflow. Local checks, live observations, static deployment and contest publication are separate milestones.
