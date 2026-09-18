import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, mkdtemp, rm, lstat } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { RUNTIME_CHECK_IDS, validateRuntimeSummary, renderRuntimeSummary, loadRuntimeSummary } from '../astra-site/assets/runtime.mjs';
import { JOURNEY_STEPS, validateRecordedJourney, loadRecordedJourney } from '../astra-site/assets/journey.mjs';

const fixture = () => ({ schemaVersion: 'dungeonq.runtime-public-summary/v1', sourceScope: 'SHARED_RUNTIME_CODE',
  source: { version: '0.11.0', runtimeDigest: 'a'.repeat(64) }, observedAt: '2026-09-18T08:00:00.000Z',
  profile: 'OWNED_REFERENCE', evidenceClass: 'RECORDED_REFERENCE_ACCEPTANCE', status: 'PASS',
  checks: RUNTIME_CHECK_IDS.map(id => ({ id, status: 'PASS' })),
  isolation: { beforeRestart: { passed: 16, total: 16 }, afterRestart: { passed: 16, total: 16 }, continuity: 'PASS' },
  suite: { passed: 448, total: 448 }, limitations: ['Artificial origin only. No production or model-efficacy claim.'] });
function dom() {
  const nodes = new Map();
  function node() { return { textContent: '', dataset: {}, attributes: {}, children: [], append(...children) { this.children.push(...children); },
    replaceChildren(...children) { this.children = children; }, setAttribute(name, value) { this.attributes[name] = value; }, focus() { this.focused = true; } }; }
  return { createElement: node, getElementById(id) { if (!nodes.has(id)) nodes.set(id, node()); return nodes.get(id); } };
}

test('static runtime summary requires the complete source-bound census and keeps evidence scope explicit', () => {
  const original = fixture(); const saved = structuredClone(original);
  assert.equal(validateRuntimeSummary(original).status, 'PASS'); assert.deepEqual(original, saved);
  for (const mutate of [value => { value.source.runtimeDigest = 'unknown'; }, value => { value.sourceScope = 'PRODUCTION'; },
    value => { value.evidenceClass = 'LIVE'; }, value => { value.checks.pop(); },
    value => { value.checks[0].id = value.checks[1].id; }, value => { value.checks[0].status = 'SKIPPED'; },
    value => { value.observedAt = 'tomorrow'; }, value => { value.limitations = []; }]) {
    const value = fixture(); mutate(value); assert.throws(() => validateRuntimeSummary(value), /RUNTIME_SUMMARY_INVALID/);
  }
  const missing = fixture(); delete missing.isolation; assert.throws(() => validateRuntimeSummary(missing));
});

const journeyFixture = () => ({ schemaVersion: 'dungeonq.runtime-public-journey/v1', sourceScope: 'SHARED_RUNTIME_CODE',
  evidenceClass: 'RECORDED_REFERENCE_OBSERVATIONS', source: fixture().source, observedAt: fixture().observedAt,
  steps: JOURNEY_STEPS.map(id => ({ id, title: `Saved ${id}`, summary: `An observed ${id} result.`,
    observations: [{ label: 'Recorded result', value: `${id}: retained` }], evidenceRefs: ['summary.json: saved reference'] })),
  limitations: ['Owned artificial reference only. Chapters are explanatory, not execution order.'] });

test('recorded journey refuses missing observations, substituted evidence classes and incomplete chapter records', () => {
  const value = journeyFixture(); const original = structuredClone(value);
  assert.equal(validateRecordedJourney(value), value); assert.deepEqual(value, original);
  for (const mutate of [entry => { entry.steps[0].observations = []; }, entry => { entry.steps.pop(); },
    entry => { entry.steps[1].id = 'route'; }, entry => { entry.steps[0].evidenceRefs = []; },
    entry => { entry.evidenceClass = 'BROWSER_SIMULATION'; }, entry => { entry.source.runtimeDigest = 'unknown'; }]) {
    const entry = journeyFixture(); mutate(entry); assert.throws(() => validateRecordedJourney(entry), /RECORDED_JOURNEY_INVALID/);
  }
});

test('journey chapter navigation reads one saved record, renders inert observations and clears failed reloads', async () => {
  const document = dom(); const value = journeyFixture(); value.steps[1].observations[0].value = '<img src=x onerror=alert(1)>';
  let requests = 0;
  await loadRecordedJourney(document, async (url, options) => {
    requests += 1; assert.equal(url, 'evidence/runtime-v1/journey.json'); assert.equal(options.credentials, 'omit');
    return { ok: true, text: async () => JSON.stringify(value) };
  });
  assert.equal(document.getElementById('journey-step-title').textContent, 'Saved route');
  document.getElementById('journey-next').onclick();
  assert.equal(document.getElementById('journey-step-title').textContent, 'Saved ticket');
  assert.equal(document.getElementById('journey-step-title').focused, true);
  assert.equal(document.getElementById('journey-observations').children[0].children[1].textContent, value.steps[1].observations[0].value);
  const chapter = document.getElementById('journey-chapters').children[5].children[0]; chapter.onclick();
  assert.equal(chapter.attributes['aria-current'], 'step'); assert.equal(document.getElementById('journey-next').disabled, true);
  document.getElementById('journey-previous').onclick();
  assert.equal(document.getElementById('journey-step-title').textContent, 'Saved adaptation'); assert.equal(requests, 1);
  assert.equal(await loadRecordedJourney(document, async () => ({ ok: false })), null);
  assert.equal(document.getElementById('journey-observations').children.length, 0);
  assert.equal(document.getElementById('journey-next').onclick, null); assert.equal(document.getElementById('journey-next').disabled, true);
});

test('static runtime summary never promotes failed, incomplete or inconclusive evidence to PASS', () => {
  const failed = fixture(); failed.checks[0].status = 'FAIL'; assert.equal(validateRuntimeSummary(failed).status, 'FAIL');
  const unknown = fixture(); unknown.isolation.continuity = 'INCONCLUSIVE'; assert.equal(validateRuntimeSummary(unknown).status, 'INCONCLUSIVE');
  const fewer = fixture(); fewer.isolation.afterRestart = { passed: 15, total: 15 }; assert.equal(validateRuntimeSummary(fewer).status, 'INCONCLUSIVE');
  const suite = fixture(); suite.suite.passed -= 1; assert.equal(validateRuntimeSummary(suite).status, 'INCONCLUSIVE');
});

test('recorded viewer renders inert text and clears a previous pass when fetching or validation fails', async () => {
  const document = dom(); const value = fixture(); value.limitations = ['<img src=x onerror=alert(1)>'];
  renderRuntimeSummary(document, value);
  assert.equal(document.getElementById('runtime-limitations').children[0].textContent, value.limitations[0]);
  assert.match(document.getElementById('runtime-status').textContent, /Recorded/);
  await loadRuntimeSummary(document, async (url, options) => {
    assert.equal(url, 'evidence/runtime-v1/summary.json'); assert.equal(options.credentials, 'omit');
    return { ok: false };
  });
  assert.match(document.getElementById('runtime-status').textContent, /Not verified/);
  assert.equal(document.getElementById('runtime-checks').children.length, 0);
  assert.equal(await loadRuntimeSummary(document, async () => ({ ok: true, text: async () => '{"status":"PASS"}' })), null);
  const loaded = await loadRuntimeSummary(document, async () => ({ ok: true, text: async () => JSON.stringify(fixture()) }));
  assert.equal(loaded.status, 'PASS'); assert.equal(document.getElementById('runtime-checks').children.length, 11);
});

test('runtime landing page preserves lab controls and separates recorded evidence from installation', async () => {
  const html = await readFile(new URL('../astra-site/index.html', import.meta.url), 'utf8');
  for (const id of ['runtime', 'runtime-status', 'runtime-facts', 'runtime-checks', 'runtime-limitations', 'rehearsal',
    'scenario', 'approve', 'apply', 'record-verify', 'email-proof-status', 'workspace-verify', 'defense-verify', 'topology-verify', 'study-verify', 'local',
    'journey', 'journey-chapters', 'journey-status', 'journey-step-title', 'journey-observations', 'journey-previous', 'journey-next']) {
    assert.equal((html.match(new RegExp(`id="${id}"`, 'g')) ?? []).length, 1, `unique preserved ${id}`);
  }
  assert.match(html, /NO LIVE VISITOR INTEGRATION/); assert.match(html, /not a Runtime v1 capture/);
  assert.match(html, /npm run runtime -- --data-dir/); assert.match(html, /assets\/runtime.mjs/);
  const script = await readFile(new URL('../scripts/build-astra-site.mjs', import.meta.url), 'utf8');
  assert.match(script, /validateRuntimeSummary/); assert.match(script, /runtime-v1\/summary.json/);
  assert.match(script, /liveRuntimeHosted:false/);
});

test('actual site build includes the same public runtime summary and every local page resource', async t => {
  const output = await mkdtemp(join(tmpdir(), 'dungeonq-astra-site-test-'));
  t.after(() => rm(output, { recursive: true, force: true }));
  const root = fileURLToPath(new URL('../', import.meta.url));
  const { stdout } = await promisify(execFile)(process.execPath, ['scripts/build-astra-site.mjs', output], { cwd: root });
  const built = JSON.parse(stdout); assert.equal(built.runtimeSummaryValidated, true); assert.equal(built.liveRuntimeHosted, false);
  const pkg = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'));
  const source = join(root, pkg.name === 'dungeonq' ? 'docs' : '', 'evidence/runtime-v1/summary.json');
  assert.deepEqual(await readFile(join(output, 'evidence/runtime-v1/summary.json')), await readFile(source));
  const journeySource = join(root, pkg.name === 'dungeonq' ? 'docs' : '', 'evidence/runtime-v1/journey.json');
  assert.deepEqual(await readFile(join(output, 'evidence/runtime-v1/journey.json')), await readFile(journeySource));
  const journey = validateRecordedJourney(JSON.parse(await readFile(journeySource, 'utf8')));
  assert.equal(journey.source.runtimeDigest, JSON.parse(await readFile(source, 'utf8')).source.runtimeDigest);
  const html = await readFile(join(output, 'index.html'), 'utf8');
  for (const [, path] of html.matchAll(/(?:src|href)="([^"#][^"]*)"/g)) {
    if (/^(?:https?:|data:)/.test(path)) continue;
    assert.equal((await lstat(join(output, path.split('#')[0]))).isFile(), true, path);
  }
});
