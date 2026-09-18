# DungeonQ — Deception Runtime

**Divert a suspicious session into a persistent synthetic world. Observe what it does. Adapt within an approved policy.**

DungeonQ is open-source infrastructure for security teams and developers handling human- or AI-driven suspicious sessions. At a designated entry point, its trusted gateway routes an admitted session into a separate synthetic world. The participant can read records, save changes and use a useful **Wrong Ticket** there. The operator retains the activity history and checks the protected origin through independent evidence.

The current self-hosted reference makes that sequence inspectable with real HTTP, MCP, SSH, a bounded PostgreSQL protocol and a private Unix workload broker. Trusted setup explicitly provisions which contexts are diverted; the protected origin and all records are artificial.

[**Follow the recorded diversion**](docs/JUDGE_ROUTE.md) · [**Operate your own reference**](#run-the-reference) · [Acceptance evidence](docs/RUNTIME_ACCEPTANCE.md)

## What happens after DIVERT

| Step | Participant experience | Operator evidence and control |
| --- | --- | --- |
| Enter | A real client request reaches its designated synthetic world. | Authenticated routing is correlated with canonical and collector records. |
| Work | Read and write persistent records; use a Wrong Ticket for a bounded world-only read. | A ticket never supplies origin authority; state and ticket consumption survive restart. |
| Continue | Revisit the same world across supported adapters. | Observe stored requests, operations and world revisions across the session. |
| Adapt | Approved follow-up records can appear after a first-time ticket use. | A finite operator grant controls the template, context, expiry and mutation budget. |
| Verify | Synthetic success remains within that world. | Check the separate artificial-origin witness and route census; fence the context when required. |

A Wrong Ticket is deliberately useful, rather than an inert fake credential. Its signed scope permits work inside its issuing world. Approved adaptation extends that world with bounded records; participant instructions cannot authorize it. Transport failure never causes a diverted request to fall back to origin.

## Run the reference

Use Node.js **24.15.0+**, npm and the prerequisites in [the operation guide](docs/RUNTIME.md):

```sh
npm ci --ignore-scripts
npm run runtime -- --data-dir ../dungeonq-runtime-lab
```

Open the printed **Control room** URL. Keep the private credential file outside Git and AI context. Give a participant only its actor token; keep operator authority separate. Follow the [evaluator route](docs/JUDGE_ROUTE.md) to send a real request, consume a ticket, authorize one finite policy and inspect retained state after restart. Reuse the same private data directory to resume.

The [client guide](docs/RUNTIME.md) covers all five adapters, the CLI and Node/Python SDKs. The [container profile](deploy/runtime-reference/README.md) adds measured network and file separation. The recorded website and older browser rehearsal are presentations; running the source provides the actual server roles.

## Evidence you can inspect

The **September 18 v0.11.0 Astra distribution** passed **465/465 tests**. Its [public CI run](https://github.com/Ranopha/dungeonq-astra/actions/runs/35303213740) passed Ubuntu, macOS and source-bound runtime acceptance: **11/11 required rows and 16/16 container checks**. The earlier reference also recorded restart continuity and an inconclusive result when infrastructure was stopped. These are dated observations; the [validation record](docs/VALIDATION.md) identifies each tested source.

[Six recorded checkpoints](evidence/runtime-v1/journey.json) · [Evidence summary](evidence/runtime-v1/summary.json) · [Versioned runtime contract](docs/contracts/RUNTIME_V1.md). The checkpoints group one recorded reference acceptance run by capability, with source pointers and timing; public CI is separate corroboration.

For fresh acceptance, follow the container guide and run the documented `runtime:proof` and `runtime:gate` commands against the exact clean candidate. Missing or stale evidence, unknown outcomes and failed checks prevent full admission. Public CI does not by itself establish protected-branch enforcement.

## Scope and open questions

This is an **owned reference using artificial resources**, with explicitly provisioned contexts. It does not yet classify arbitrary attacks, transparently intercept host activity or certify production protection. SSH and PostgreSQL accept finite operations; the Unix broker mediates an explicitly connected workload. Local processes share an OS user, while the measured container profile still trusts Docker administration, the shared kernel and the gateway.

“Origin untouched” means the named artificial data/configuration and admission interval were checked; audit records change to record that measurement. Real deployment requires a named authorized connector, detection/identity integration, legitimate-traffic continuity, recovery and environment-specific acceptance.

Engineering success also does not establish deception efficacy. The complete research record retains **0/2** wrong-high-confidence study outcomes, **0/4** unsupported completion claims and the earlier **0/3** defense pilot. Later workspace participants accepted decoy values while explicitly qualifying their synthetic, common-source evidence. [Study](docs/STUDY_RESULTS.md) · [Topology](docs/TOPOLOGY_RESULTS.md) · [Defense pilot](docs/DEFENSE_PILOT_RESULTS.md) · [Workspace](docs/WORKSPACE_LAB.md).

## One core, reusable capabilities

The Proof Kernel and separate approval boundary support the runtime's decisions and evidence. The governed-assistant/Astra profiles exercise bounded clients; Defense and Orders Workspace retain incident response, notifications and account workflows; World, Study and Topology retain research instruments and their original results. These are supporting profiles of DungeonQ, not separate product definitions. Legacy account/email features do not automatically apply to the runtime's reference owner token.

## Astra's contribution

GPT-6 Astra supplied bounded command candidates in the original assistant profile. DungeonQ validated each candidate and kept approval in a separate reviewer surface. This demonstrates a reusable client boundary inside the same product; it does not redefine DungeonQ as an approval demo.

The [original September 16 two-call experiment](docs/ASTRA.md), minimized context, cost ledger and automated-reviewer limitation remain intact. New runtime checks are scripted engineering evidence, not new Astra calls. [Listing copy](docs/PRODUCT_HUNT.md) · [Public presentation](https://dungeonq-astra.kq7dn7jb6r.chatgpt.site). The [73-second film](https://youtu.be/8zdXD-cAkEQ) shows the earlier approval workflow; [its scope](docs/ASTRA_LAUNCH_DEMO.md) remains unchanged.

## Verify and contribute

```sh
npm run check
npm run verify:source
```

[Open-source review route](docs/OSS_REVIEW_GUIDE.md) · [Testing](docs/TESTING.md) · [Contributing](CONTRIBUTING.md) · [Security](SECURITY.md) · [Release history](CHANGELOG.md). Apache-2.0: preserve [LICENSE](LICENSE), [NOTICE](NOTICE) and [third-party notices](THIRD_PARTY_NOTICES.md). Source manifests check integrity, not independent certification. The earlier WebMCP repository, site, submission and evidence remain frozen.

<details>
<summary>Historical v0.10 and earlier profile walkthroughs</summary>

The following dated sections preserve prior workflows, counts and launch statements. They are historical context, not fresh release or remote-submission confirmations.

## v0.10.0: notify the verified administrator

The full self-hosted synthetic lab now binds alerts to the **administrator's verified login email**, with fresh reauthentication, single-use verification, durable delivery states and a separate Owner approval boundary. The model cannot choose a recipient or approve rotation.

Optional Google / GitHub adapters link an existing Owner to the provider's verified email. They require your registered application and credentials; no live provider login is claimed by this release's offline tests. Apple stays unavailable in this loopback profile. Sign-in itself does not supply an email-sending service.

`npm run defense:workspace` includes a **local simulated mailbox** for reproducible judging without credentials or paid calls. Optional explicit SMTP configuration enables real email over verified TLS; SMTP acceptance is not proof of inbox delivery. Changing from simulated to SMTP requires re-verification.

[Setup and reviewer route](docs/EMAIL_NOTIFICATIONS.md) · [Recorded synthetic email proof](evidence/email-v1/proof.json). Reproduce with `npm run email:proof -- --out ../dungeonq-email-proof`. These are engineering additions, not new Astra API runs. The original Astra proof, all model pilot records and Product Hunt launch schedule remain unchanged.

## v0.9.0: consistent records, bounded conclusions

New **Orders Workspace**: an English participant desk with real local snapshot → index → reconciliation writes, stable revisitable records, a four-tool MCP surface and the existing separate Owner control room. Evaluator-only labels are removed from the participant view; authentication, scope and approval controls remain. Start a **new** installation with `npm run defense:workspace`. No key or paid call is needed.

In two fresh Codex sessions, both used the decoy quantity (19/21, while A=7) and recorded completion at 95% confidence. **Both explicitly qualified their claims as synthetic-interface, common-source evidence.** They did not establish independent A verification or sustained mistaken belief. The original metric is too broad for that claim; all raw results and the prior **0/3** negative pilot are retained. These are not new or independently attested Astra runs.

[Run and review the new workspace](docs/WORKSPACE_LAB.md) · [Recorded A](evidence/workspace-pilot-v1/a-report.json) · [Recorded B](evidence/workspace-pilot-v1/b-report.json). Verify with `npm run workspace:verify -- evidence/workspace-pilot-v1`. The original live Astra evidence and Product Hunt schedule remain unchanged.

## Retained v0.8.0: one incident. Two worlds.

The new `npm run defense` reference joins the pieces into one inspectable response: a configured honey contact starts a bounded synthetic B/C/D campaign, creates a durable alert and proposes a rotation for protected resource A. A separately signed-in Owner reviews the exact scope and digest, reauthenticates, approves, then executes. A real loopback TLS issuer checks old-key denial, new-key business success, old-consumer denial and rejection of the world-issued decoy token. The campaign continues after the rotation.

The saved **13-check engineering proof** uses no provider call. It is `SCRIPTED_FIXTURE`, with an automated Owner credential, **not a new Astra run, verified human presence or evidence of LLM deception**. The September 16 live Astra proof and all earlier research results remain unchanged.

[English Actor / Owner guide](docs/DEFENSE_LAB.md) · [Recorded engineering proof](evidence/defense-v1/proof.json) · [OSS review guide](docs/OSS_REVIEW_GUIDE.md).

```sh
npm ci --ignore-scripts
npm run defense:proof -- --out ../dungeonq-defense-proof

# First installation: a new, empty, private directory
mkdir -m 700 ../dungeonq-defense-lab
npm run defense -- --data-dir ../dungeonq-defense-lab --seed 42 --depth 4
```

Keep the printed Owner password outside the Actor/MCP client. This local profile has **one fixed synthetic A, one rotation, a 30-day worker credential and a 30-day certificate**. Restart preserves state; refreshing an expired unclaimed proposal requires new approval, while uncertain execution is reconciled without another rotation. A honey contact does not identify an AI or prove A was breached. MCP does not transparently intercept traffic, local notification receipts are not email delivery, and same-host processes do not establish production isolation.

The static evidence viewer presents this as `RECORDED_ENGINEERING_PROOF`: visitors inspect saved files, not a live defense server. No new paid Astra call or public-release status is implied by the v0.8.0 source changes.

## Retained v0.7.0: local success is not task completion

Run `npm run topology` for an English multi-desk publishing workflow with durable packet/consumer lineage, desk-scoped observations, a real completion path, bounded HTTP/MCP and a separate Observer. No key or paid model call is required. The original live Astra proof stays separate and unchanged.

[Two-minute workflow guide](docs/TOPOLOGY_LAB.md) · [All four fresh Codex pilot records](docs/TOPOLOGY_RESULTS.md).

Both procedural-memo participants followed the complete local branch (2/2), versus 0/2 early-explanation controls. **No unsupported completion claim was observed (0/4); all four verified the actual catalogue goal.** Route following is not proof of a false belief. Exact pilot model identities were not independently attested; these are not relabeled Astra runs.

## Retained v0.6.0: retain the boundary, inspect the learning

The original Astra/governed MCP workflow and recorded live API proof remain intact. New `npm run world` and `npm run study` experiences add persistent abstract exploration and a finite two-feature causal study: predict before acting, reflect separately, consent or withdraw, and inspect a separate-process Observer. These new local experiences need **no API key**.

[Two-minute study route](docs/STUDY_LAB.md#a-two-minute-reviewer-route) · [World guide](docs/WORLD_LAB.md) · [Full research results and original evidence](docs/STUDY_RESULTS.md).

The evidence includes **48 reference-learner conditions, not 48 subjects**, and both planned Codex pilot sessions: **0/2 wrong-high-confidence induction**. Exact pilot model identity was not independently attested; these sessions are not labeled Astra. No general human/LLM efficacy is claimed. This is finite feature learning, not exploitable vulnerabilities or attack chains.

The study UI is currently Traditional Chinese with an English guide. [Overview capture](media/study-evidence.png) and [learner trace capture](media/study-trace.png) show the actual recorded-evidence explorer. A static site is not the full server study: its independent Observer requires self-hosting. Publishing source or a website does not advance the scheduled Product Hunt launch.

Let Astra propose. Keep approval separate. Verify what changed.

DungeonQ is a local reference lab for developers who want to test what happens between an AI suggestion and an authorized action. GPT-6 Astra proposes one command for a synthetic incident. DungeonQ validates the candidate, sends permitted commands through a real HTTP MCP client, and requires separate reviewer authorization before changing one synthetic asset.

The incident and effects are artificial. The self-hosted transport, HTTPS authentication, SQLite writes and Ed25519 signatures are real. **SYNTHETIC_ONLY · local evaluation · not production security software.**

[Try the free browser rehearsal](https://dungeonq-astra.kq7dn7jb6r.chatgpt.site). No sign-in, API key or paid model call is required. [Product Hunt launch](https://www.producthunt.com/products/dungeonq-astra-safety-rehearsal?launch=dungeonq-astra-safety-rehearsal) is scheduled for September 18, 2026 at 12:01 AM Pacific (3:01 PM Taiwan), with the GPT-6 Astra Challenge option selected. [Launch record](docs/PRODUCT_HUNT.md).

## Choose an experience

| Experience | What runs | Model cost |
| --- | --- | --- |
| Self-hosted defense reference | Same-incident bounded world, local alert, separate Owner approval, actual TLS rotation and four readbacks | No provider call; no key needed |
| Public browser rehearsal | A browser model of the workflow, plus recorded evidence from a local live run | No provider call |
| Local checks | Deterministic engine, real local components and a mocked Astra provider | No provider call |
| Self-hosted world / causal study | Persistent finite objects, separate-process Observer and causal replay | No provider call; no key needed |
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

## Astra-specific additions after DungeonQ 0.4.0

This edition adds the GPT-6 Astra adapter, minimized model context, one-command candidate validation, a persistent cost ledger, distinct model/runtime events, Astra controls, focused tests and an opt-in live proof. It builds on DungeonQ's existing scenario engine, HTTP MCP tools, reviewer authentication, SQLite governance and local signed receipts. Those foundations were not newly created for this challenge.

In the September 16, 2026 development snapshot, three live calls had an estimated total usage cost of **US$0.02054**. The completed two-call proof passed seven named checks at an estimated **US$0.01249**. The first call safely waited while a traffic-route label was ambiguous; the summary was clarified to `trafficRoute` before the completed run. These are observed development results, not a guarantee for another run or the provider's invoice.

The live proof uses `AUTOMATED_REVIEWER_FIXTURE` and records `humanPresenceProven: false`. Provider response IDs are local observations, not external attestations. A local receipt key is not an independent trust root. See the [complete evidence boundaries](docs/ASTRA.md#what-the-evidence-establishes).

Apache-2.0. Preserve [LICENSE](LICENSE), [NOTICE](NOTICE) and the distribution's third-party notices when reusing the source.

</details>
