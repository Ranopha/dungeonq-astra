# Security and claim boundary

DungeonQ Astra is a synthetic-only, local evaluation lab. It is not production security software. Do not give it enterprise documents, credentials, real endpoints, devices or customer data. Do not expose its loopback HTTP MCP or HTTPS workbench publicly.

The model receives a minimized state summary and produces one untrusted candidate. Deterministic policy, task/action validation, scope binding, reviewer authentication, reauthentication, expiry/revocation and durable effect execution remain outside the model. There is no approval tool. An administrator of the host still controls both processes and local keys; this is not independently isolated infrastructure.

The static website has no API key or paid endpoint. Browser roles model the workflow but are not authentication. Recorded live results are local observations; the automated test driver controlled both fixture identities. Included keys and hashes do not independently prove authorship, complete history or provider attestation.

Report reproducible problems using synthetic fixtures and the project's private GitHub vulnerability reporting when available. Do not post secrets, credentials or real data in public issues. If private reporting is unavailable, open a nonsensitive issue asking for a private reporting channel. Do not run attacks against third-party systems to evaluate this repository.

Use the opt-in live proof only with your own key and explicit budget. The local reservation ledger is per lab, not an account-wide provider spending guarantee. Timeouts retain reservations; no automatic retries or fallback models.

## Dependency advisory status — October 7, 2026

v0.13.0 updates the MCP SDK to 1.32.1 and refreshes the affected HTTP and build dependencies. Scoped lockfile overrides select patched `sharp@0.35.5` and `satori`'s `fflate@0.7.5`.

One upstream advisory remains: [braces stack-exhaustion denial of service](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm), affecting `braces@3.0.3` in Vinext's build/development glob chain. Upstream has no patched release as of this review. npm audit reports **six high-severity dependency nodes for this one advisory**, not six independent defects. The standalone MCP consumer's separate dependency graph reports no known advisories at this date.

Static import and call-site review found no path from DungeonQ's participant MCP/HTTP runtime to this build dependency. Untrusted source patterns processed during development or build may still cause denial of service. Review contributions before executing builds, use isolated CI with bounded job time, and do not expose the development server to untrusted users. This is a disclosed dependency risk, not an audit-clean or independently certified release. Updating or overriding to another affected version would not fix it; the release retains the explicit finding until a verified upstream remedy is available.
