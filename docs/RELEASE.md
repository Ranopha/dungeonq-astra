# Release and maintenance policy — v0.13.0

The distribution version identifies a source snapshot. Component contracts may retain their own versions. `main`, a tag, a release page, a source archive, CI and a film are separate artifacts; a change to one does not update the others. [VALIDATION](VALIDATION.md) records each status. A candidate is not a published release.

## Reproduce or integrate a version

Pin the intended public commit/tag and lockfile; use Node.js 24.15.0+. Follow [INSTALL](INSTALL.md), then the independent [MCP/HTTP integration](EXTERNAL_INTEGRATION.md). Run affected checks while changing code and `npm run check` at a release checkpoint. Complete source-bound runtime/container gates when the change affects their boundary.

`npm run verify:source` validates an intact distribution's inventory and SHA-256 manifest. It checks bytes and paths, not author identity, independent certification or trustworthy time. Edited source needs a freshly prepared distribution; do not hand-edit hashes to disguise a change.

## Compatibility and recovery

Runtime, governed-assistant, notification and research profiles have distinct storage/authority contracts. Do not infer one profile's schema or token model from another. Reopen a compatible installation using its exact parameters. Before upgrading, stop services and retain a protected copy of the complete private installation; do not publish it, mix keys/databases, downgrade a schema or resurrect revoked authority. See [RUNTIME](RUNTIME.md) for current refusal and recovery behavior.

## Maintainer release checklist

1. Review the scoped diff, license/notices and dependency changes; preserve the prior commit and identify rollback limits.
2. Align package/lock version, current README, CHANGELOG, contribution/integration documentation and the candidate validation record.
3. Build clean Amazon and Astra distributions without private history, private application materials, credentials or installation data.
4. Run clean installs, independent consumer checks, appropriate positive/negative tests, full source checks and source-manifest verification. Record exact source, environment, commands and outcomes. Add visible workflow review when UI changes.
5. Obtain fresh source-bound runtime/container evidence and public CI for the intended candidate; do not reuse a historical count. Confirm that new docs/examples are in the exported inventory.
6. Publish a new immutable tag, release notes, source archive and checksums only after the release decision. Never force-move an old tag or silently replace historical assets.
7. Read back public commit, tag, release, archive/checksum and CI. Check current media against its recorded source/report; keep older films labeled historical.

Publishing source does not submit a contest entry or grant application, and does not establish organizer acceptance. Prior WebMCP and closed Astra judging snapshots remain preserved. [MAINTAINER_PLAN](MAINTAINER_PLAN.md) describes ongoing responsibility and maintenance resource use without promising a release cadence or support SLA.

## Prepare source from a public checkout

From a clean committed checkout of the public repository:

```sh
npm run release:prepare -- ../dungeonq-source-013
npm run verify:source -- ../dungeonq-source-013
```

The new destination must be outside the checkout. The builder uses reviewed tracked source, rejects unsafe/private paths and dirty input, regenerates SBOM and a manifest, then verifies the output. It creates no tag, upload or deployment. Untracked contributions must be reviewed and committed first. Generated SBOM metadata can vary; compare source identity and per-file digests.

A manifest's `sourceCommit` may identify the source-input commit before the packaged SBOM/manifest commit; the tag identifies the final snapshot. Keep that distinction explicit in the validation record. Public CI has read-only repository permissions and no deployment/model-call authority; its test success alone does not establish protected-branch enforcement.
