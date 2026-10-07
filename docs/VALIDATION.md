# v0.13.0 validation and publication record — October 7, 2026

This source contains the locally verified v0.13.0 release candidate. The [immutable release record](https://github.com/Ranopha/dungeonq-astra/releases/tag/v0.13.0) is the authority for final publication: it binds the tag/commit, completed CI run, runtime/container evidence, archives and checksums. A candidate branch alone is not a released artifact. Earlier records below retain their original scope.

| Gate | Evidence and interpretation |
| --- | --- |
| Source identity | Exact files and SHA-256 inventory in `RELEASE_MANIFEST.json`; final public commit/tree and tag are bound by the release record. |
| Clean local Astra profile | Node 24.15.0 on macOS arm64: `npm ci --ignore-scripts`, `npm run check` and `npm run verify:source` passed; **496/496 tests**, 3 fixed-seed scenarios, zero source-audit findings, typecheck and build. |
| Independent consumer | [Recorded v0.13.0 run](../evidence/oss-integration-v1/report.json), SHA-256 `90069a5282cad6c5f2c0bf9ca10a50e7cb32ec3af38c613f78e5c038c103ca71`: 8 scenes, 8 actor MCP requests, 7 runtime checks, denied owner endpoints and credential-file probe. Seven positive/negative tests pass. |
| Public Ubuntu/macOS CI | The release record links the exact-source `Synthetic acceptance` run. It installs and audits the detached consumer package and saves fresh integration evidence. A workflow definition is not a passing run. |
| Runtime/container gate | The same CI run must bind a complete 11-check runtime census and 16 container checks to its exact commit/tree. Its downloadable artifact is the current evidence; historical records below cannot substitute for it. |
| Download integrity | Release assets contain the reviewed source archive and `SHA256SUMS`; source verification checks the extracted inventory. Hashes are byte integrity, not independent certification. |
| English film | [v0.13.0 integration film](https://youtu.be/8h5yeKb2XzE), 130.67 seconds, English narration and 30-cue subtitles; eight scenes from the recorded run above. Full decode, timing and rendered-frame review passed. |
| Dependency findings | [SECURITY](../SECURITY.md) lists the remaining unpatched braces build-tool advisory (six affected nodes), separate from the zero-finding private-data/source audit. The standalone consumer lockfile audit is clean at this date. |

The independent consumer uses public MCP/HTTP and artificial resources. Its actor process does not receive operator or origin authority. The separate harness controls the operator fixture and independent origin checks; that remains maintainer-authored scripted evidence, not an independent human trial, a live model evaluation or external adoption. See [EXTERNAL_INTEGRATION](EXTERNAL_INTEGRATION.md).

A full gate needs fresh complete evidence for the exact clean candidate. A locally passing consumer or full test suite cannot replace current container measurements or public release readback. UNKNOWN, missing, stale or mismatched evidence stays unresolved. Public CI does not itself prove protected-branch enforcement. No production protection, quantified response delay or general deception efficacy is established.

<details>
<summary>Historical validation records — v0.12.0 and earlier</summary>

# v0.12.0 working-view and outcome validation — September 29, 2026

The integrated development candidate passed **489/489 tests**, three fixed-seed scenario checks, a zero-finding source audit, typecheck and build on Node 24.15.0. Focused regressions include a write committed before response loss, unsigned/misbound refusal rejection, multiline persistence, participant HTTP write/readback and operator cross-context/adapter correlation. These use owned artificial fixtures and deterministic clients.

Chrome readback confirmed a participant multiline save and separate server read, the same operator-visible record, exact preview/apply with persisted policy readback, a follow-up record, a visible rejected attempt, seven scoped evidence checks, and private-state clearing on disconnect/reload. The [September 29 report](../evidence/judge-demo-v2/report.json) records ten real MCP/HTTP checkpoints including an ordinary-origin positive control and ticket-origin rejection before the final witness. Screenshots are recorded UI, not live hosted execution or model-efficacy evidence.

Public source verification and CI are separate from this integrated local result. Consult the exact published commit's Actions run. Historical v0.11 container PASS results below do **not** certify this changed runtime; fresh source-bound isolation/runtime acceptance is required for full gate admission. Production protection and model deception remain unassessed by these engineering checks. The retained Vinext route-classification warning does not prevent the build.

The clean Astra distribution also passed **489/489 tests**, scenario verification, audit, typecheck, build and source-manifest verification locally. Remote CI and container acceptance are reported separately for the published commit.

---

# v0.11.1 presentation validation — September 18, 2026

The updated clean Astra distribution passed **467/467 tests**, three deterministic scenarios, zero-finding source audit, typecheck and build. The Astra site's seven focused checks additionally exercise recorded chapter selection, unavailable-evidence handling, complete static packaging and local asset links. Desktop and mobile readback verified the new journey and access to retained historical profiles.

This release restores DungeonQ's diversion-first narrative, adds a sanitized six-checkpoint extract of the existing reference run and fixes the CI detailed-report artifact filename. It changes no runtime implementation and adds no model-efficacy or production result. The journey preserves its original v0.11.0 source/version/time; its public CI corroboration is separately attributed.

Remote checks are generated for the exact published candidate. Consult [Actions](https://github.com/Ranopha/dungeonq-astra/actions) and the v0.11.1 release for their result; the local checks above do not predeclare remote acceptance. Required branch protection remains a separate repository setting.

---

# v0.11.0 local distribution validation — September 18, 2026

The clean Astra distribution passed **465/465 tests**, three deterministic scenarios, zero-finding source audit, typecheck, build and source-manifest verification. Both public profiles additionally passed all16 targeted runtime integration/proof/gate/isolation-contract tests. These tests use disposable artificial resources; they do not establish production acceptance or general deception efficacy.

The public workflow adds `runtime-acceptance` on a dedicated ephemeral Linux Docker context, alongside Ubuntu/macOS acceptance. It builds and inspects the candidate's actual container reference, produces11 required source-bound result rows and rejects incomplete evidence. Consult the repository Actions run for the exact commit; this document does not predeclare remote success. Required branch protection is a separate repository setting.

Published v0.11.0 source `141b62d33a3f510959f70a2c31ddd92dd5cec315` subsequently passed [remote CI](https://github.com/Ranopha/dungeonq-astra/actions/runs/35303213740): Ubuntu24.04, macOS14 and the dedicated runtime job. Downloaded artifacts confirmed a clean candidate,11/11 required result rows and16/16 actual container checks. Release assets and checksums were read back. A later documentation correction clarifies that public CI is active; the immutable v0.11.0 archive retains its original wording in the contract's CI paragraph. No runtime behavior changed.

The [runtime record](RUNTIME_ACCEPTANCE.md) retains the earlier448-test development baseline and16/16 before/after-restart container observations. It is not substituted for a fresh distribution-specific isolation report. Historical studies, videos and earlier release results below remain unchanged.

---

# v0.10.0 validation checkpoint — September 17, 2026

Both clean public distributions subsequently passed **386/386 tests**, all three goldens, audit, typecheck, build and source-manifest verification locally. The email proof contains nine passing checks. Remote GitHub CI and publishing remain separately recorded release gates.

Publication was subsequently verified: [v0.10.0 source release](https://github.com/Ranopha/dungeonq-astra/releases/tag/v0.10.0), source commit `fa0263fc764d155a22a9dd54067506eed8ed44c0`, and [tag CI 35199002470](https://github.com/Ranopha/dungeonq-astra/actions/runs/35199002470) passed on Ubuntu 24.04 and macOS 14. The [public recorded-email viewer](https://dungeonq-astra.kq7dn7jb6r.chatgpt.site/#email) displays all nine checks and explicitly excludes live OAuth/inbox delivery. Later `main` documentation clarifies installation and recovery; it does not rewrite this tag or retroactively rerun a model study.

The integrated source covers 386 tests including notification, identity, TLS transport and HTTP boundaries. The first full run found one export-test fixture missing the newly added document; the fixture was corrected and all eight affected packaging checks passed. Remaining 385 full-run tests passed. Three goldens, audit, typecheck and build passed. The nine-check email proof runs actual local HTTPS and restart with a simulated mailbox, not external delivery. Google JWTs and GitHub replies in tests are fixtures; no real OAuth application is configured. Public-distribution checks and CI are separate release records.

## Retained v0.9.0 checkpoint

The private integrated source and both clean public distributions each passed **296/296 tests**, three fixed-seed goldens, release-pattern audit, typecheck and build on the local Node 24.15+ reference environment. The retained Vinext route-classification warning remains. These are local checks, not a claim that new remote CI or deployment completed.

Orders Workspace behavior checks cover HTTP/MCP parity, exact retry and changed-request rejection, presentation pin/restart, local-reader admission, cross-world and A credential rejection, alert receipt, separate Owner approval and actual loopback TLS rotation/readback. A fresh Actor browser session completed capture/index/reconcile/readback. The static evidence viewer displayed both recorded sessions and checked eight file digests.

The two model sessions show qualified decoy-data acceptance, not sustained false origin belief. Their raw journals, final statements and the original metric's interpretation problem are retained in [the workspace guide](WORKSPACE_LAB.md). No new paid API call or independently attested Astra session is claimed. The previous live Astra proof remains unchanged.

Source manifests, source archives, GitHub CI and the Sites deployment are separately inspectable records. Check the actual release revision; green local tests alone are not publication evidence.

</details>
