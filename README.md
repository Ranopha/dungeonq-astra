# DungeonQ — Astra Safety Rehearsal

Let Astra propose. Keep approval separate. Verify what changed.

DungeonQ is a local reference lab for developers who want to test what happens between an AI suggestion and an authorized action. GPT-6 Astra proposes one command for a synthetic incident. DungeonQ validates the candidate, sends permitted commands through a real HTTP MCP client, and requires separate reviewer authorization before changing one synthetic asset.

The incident and effects are artificial. The self-hosted transport, HTTPS authentication, SQLite writes and Ed25519 signatures are real. **SYNTHETIC_ONLY · local evaluation · not production security software.**

[Try the free browser rehearsal](https://dungeonq-astra.kq7dn7jb6r.chatgpt.site). No sign-in, API key or paid model call is required. The [Product Hunt materials](docs/PRODUCT_HUNT.md) remain a submission draft until the actual launch schedule is confirmed.

## Choose an experience

| Experience | What runs | Model cost |
| --- | --- | --- |
| Public browser rehearsal | A browser model of the workflow, plus recorded evidence from a local live run | No provider call |
| Local checks | Deterministic engine, real local components and a mocked Astra provider | No provider call |
| Self-hosted Astra review desk | Your GPT-6 Astra calls, actual HTTP MCP and separate HTTPS reviewer controls | Your API account is billed when you use an Astra button |
| Opt-in live proof | Two planned model calls with an automated reviewer fixture | Your API account is billed |

The public browser experience does not establish a separate authenticated reviewer or a server trust boundary. Its recorded `LIVE_OPENAI` evidence describes a previous run, not a live call from the visitor's browser.

## Install and check

Use Node.js **24.15.0 or newer**, npm, and OpenSSL with `req -addext`. Unpack the provided source archive, open its directory containing `package.json`, then run:

```sh
npm ci --ignore-scripts
npm run check
```

These checks do not need an API key and do not call the paid model. For the focused Astra suite, run `npm run test:astra`. Native Windows is not release-accepted; prerequisite checks alone do not establish platform support.

## Try the live local review desk

Provide your own API key through the `OPENAI_API_KEY` environment variable using your local secret-management method. Keep it out of source files, screenshots and shared transcripts. Then run:

```sh
npm run astra -- --data-dir ../dungeonq-astra-lab --max-usd 0.5
```

Open **https://127.0.0.1:4196/assistant** and sign in as `owner-lab` with the disposable password printed in the terminal. Review the local self-signed certificate warning yourself; do not disable TLS validation or install system-wide trust for this lab.

1. Select **Astra: prepare a request**. This makes a paid call and should create a request awaiting review. No asset changes.
2. Select **Ask the agent to apply** under the controls without model calls. Before approval, the runtime must return `HUMAN_APPROVAL_REQUIRED`.
3. Review the exact target, digest, expiry and one-effect limit. Re-enter your password and select **Approve this exact change**.
4. Select **Astra: continue after review** for a second paid call. Inspect the synthetic read-back, then use **Verify receipt**, **Test tampering** and **Replay apply** without further model calls.

The model may return `wait`; that is not execution or approval. Keep the same data directory when restarting so its cost ledger and governance state persist. Stop the local process with Ctrl+C.

The default US$0.50 allowance is a conservative reservation ledger **per persistent lab**, not a provider invoice hard cap or an account-wide budget. A new lab starts a new ledger. Do not automate repeated new labs to reset the allowance. Calls are not automatically retried, and failed or uncertain calls retain their reservation. [Installation, cost and evidence details](docs/ASTRA.md).

## What changed after DungeonQ 0.4.0

This edition adds the GPT-6 Astra adapter, minimized model context, one-command candidate validation, a persistent cost ledger, distinct model/runtime events, Astra controls, focused tests and an opt-in live proof. It builds on DungeonQ's existing scenario engine, HTTP MCP tools, reviewer authentication, SQLite governance and local signed receipts. Those foundations were not newly created for this challenge.

In the September 16, 2026 development snapshot, three live calls had an estimated total usage cost of **US$0.02054**. The completed two-call proof passed seven named checks at an estimated **US$0.01249**. The first call safely waited while a traffic-route label was ambiguous; the summary was clarified to `trafficRoute` before the completed run. These are observed development results, not a guarantee for another run or the provider's invoice.

The live proof uses `AUTOMATED_REVIEWER_FIXTURE` and records `humanPresenceProven: false`. Provider response IDs are local observations, not external attestations. A local receipt key is not an independent trust root. See the [complete evidence boundaries](docs/ASTRA.md#what-the-evidence-establishes).

Apache-2.0. Preserve [LICENSE](LICENSE), [NOTICE](NOTICE) and the distribution's third-party notices when reusing the source.
