# Contributing to DungeonQ Astra

DungeonQ is an early-stage Apache-2.0 synthetic reference lab. Contributions should make its authorization boundaries reproducible and its evidence easier to interpret, not inflate activity for a grant or competition.

## Development and validation

1. Fork or clone [the public repository](https://github.com/Ranopha/dungeonq-astra) and make a focused branch from current `main`.
2. Run `npm ci --ignore-scripts` and `npm run doctor` using Node 24.15+ and the prerequisites in [the README](README.md).
3. Use artificial scenarios and new private fixture directories. Run affected tests first; run `npm run check` for a release checkpoint. Exercise visible workflows when changing UI.
4. For notification changes, run `npm run email:proof` and inspect the nine results. This uses local capture, not external mail. Paid model calls and real provider integrations require separate explicit configuration and spending authority.
5. In the pull request, describe the problem, scoped change, test evidence and remaining limits. Preserve original model records, negative results, notices and license attribution.

Never give the Actor or model approval authority. Keep fixed schemas, recipient binding, expiry, revocation, idempotency and negative tests. Do not add arbitrary shell/SQL, real attack targets, public tunnels, automatic deployment or secrets. Existing lab directories are user data: do not overwrite them or reset credentials to make a test pass. Never disable TLS verification as a setup fix.

## Report problems safely

Use [public issues](https://github.com/Ranopha/dungeonq-astra/issues) for non-sensitive setup bugs or documentation improvements. Include the release/commit, platform, minimal synthetic example, expected/actual behavior and redacted output. Do not upload private installations or credentials.

Potential vulnerabilities follow [SECURITY.md](SECURITY.md), not a public post with secrets or real incident data. No third-party attacks are needed to evaluate this lab.

Disclose AI assistance and take responsibility for the submitted diff, licensing and tests. Passing tests or AI review is not independent certification. Contributions must remain Apache-2.0-compatible; no separate CLA, response-time or acceptance guarantee is promised.
