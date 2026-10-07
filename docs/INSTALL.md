# Install, integrate, stop and recover — v0.13.0

Use a source archive or a pinned commit of the public repository. `main` can contain a newer candidate than the latest release; check [VALIDATION](VALIDATION.md) and [release policy](RELEASE.md) before attributing results to a version. The package is private to prevent accidental npm publication; clone/download the open-source repository rather than looking for a published npm package.

## Prerequisites and first run

Use Node.js **24.15.0+**, npm, and OpenSSL with `req -addext`. Python 3 is needed for the Python client checks in the complete suite; `DUNGEONQ_TEST_PYTHON` can select the intended binary. Ubuntu 24.04 and macOS 14 are the CI targets. Native Windows and WSL2 are not separately release-accepted. Node's SQLite/Argon2 features may print experimental warnings.

```sh
npm ci --ignore-scripts
npm run doctor
npm run oss:demo -- /absolute/path/new-oss-report.json
```

Choose a new output filename outside the checkout. The [standalone consumer](../examples/mcp-shipping-consumer/README.md) has an independent package and uses public MCP/HTTP with only actor authority. The harness runs the separate operator/origin fixtures and stops its own services. It is a scripted integration reference, not established third-party adoption. [Exact setup, role separation and report meaning](EXTERNAL_INTEGRATION.md).

Doctor checks the earlier local-lab prerequisites and briefly probes its fixed loopback ports. It is not complete runtime or Docker acceptance. Occupied ports do not authorize stopping another service.

## Operate the current runtime

```sh
npm run runtime -- --data-dir ../dungeonq-runtime-013 --presentation participant-v1
```

Use a new private installation path for a new reference, or deliberately reopen your known compatible path. Open the printed Participant workspace and Control room URLs. Give the participant only its actor token; keep the owner token, ordinary-origin capability and full credential file separate. The [step-by-step route](JUDGE_ROUTE.md) covers persisted read/write, a world-only ticket, observations and a finite operator grant. [RUNTIME](RUNTIME.md) documents all adapters and recovery.

Stop with Ctrl+C. Restart with the same directory and presentation to retain state. A missing `--data-dir` creates a new temporary installation; it is not recovery. Preserve a failed or incomplete directory for diagnosis. Before an upgrade, stop all processes and make a protected copy of the complete installation, including SQLite/WAL state and keys. Do not mix files from installations, downgrade a schema or delete an unknown directory.

## Choose a supporting profile deliberately

| Entry | Purpose |
| --- | --- |
| `npm run runtime` | Current defensive deception runtime and separate participant/operator working views |
| `npm run oss:demo -- /absolute/path/new-report.json` | Standalone consumer through public MCP/HTTP, with separate scripted operator/origin checks |
| `node scripts/judge-demo.mjs /absolute/path/new-report.json` | Retained ten-checkpoint shipping task walkthrough |
| `npm run amazon` / `npm run demo:proof` | Retained governed assistant and separately authenticated review profile |
| `npm run defense:workspace` | Retained Orders Workspace with its own account, notification and rotation contracts |
| `npm run study` / `npm run world` | Retained finite research instruments and original result boundaries |
| `npm run dev` / `npm run build` | Retained browser shell; not the running server roles or a deployment |

The Astra distribution additionally includes its bounded model-candidate profile; use [its repository documentation](https://github.com/Ranopha/dungeonq-astra/blob/main/docs/ASTRA.md) and free mock path before considering a paid call. Legacy account/email features do not automatically apply to the runtime owner token.

## Failure and verification

A refused write, exhausted ticket or missing capability can be an expected negative check. Read the named expectation, authenticated result and exit code; do not classify every refusal as a setup failure. A lost response or UNKNOWN result needs readback and must not be turned into success by restarting or deleting evidence.

Run `npm run check` for the complete source checkpoint. On an intact release, `npm run verify:source` checks the inventory; for edited source, regenerate a clean distribution as described in [RELEASE](RELEASE.md). Full runtime admission also needs fresh [container acceptance](../deploy/runtime-reference/README.md) and the exact-source gate. A loopback run alone is not isolation acceptance.

All resources are artificial. Do not expose the local profile with a public tunnel, disable TLS verification, upload credentials/private state, or attach it to a production target. For a reproducible problem, use [the feedback template](MAINTAINER_PLAN.md#trial-feedback-template).
