export const RUNTIME_CHECK_IDS = Object.freeze([
  'http', 'mcp', 'ssh', 'postgres', 'host', 'wrong-ticket', 'persistence',
  'mutation', 'origin-untouched', 'adversarial', 'isolation',
]);
const statuses = new Set(['PASS', 'FAIL', 'INCONCLUSIVE']);
const record = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const text = value => typeof value === 'string' && value.trim().length > 0 && value.length <= 2000;
const count = value => record(value) && Number.isSafeInteger(value.passed) && Number.isSafeInteger(value.total)
  && value.total > 0 && value.total <= 100000 && value.passed >= 0 && value.passed <= value.total;

/** Checks a public, recorded summary. It does not authenticate its publisher or replay infrastructure. */
export function validateRuntimeSummary(value) {
  if (!record(value) || value.schemaVersion !== 'dungeonq.runtime-public-summary/v1'
    || value.sourceScope !== 'SHARED_RUNTIME_CODE' || value.evidenceClass !== 'RECORDED_REFERENCE_ACCEPTANCE'
    || value.source?.version !== '0.11.0' || !/^[a-f0-9]{64}$/.test(value.source?.runtimeDigest ?? '')
    || !text(value.profile) || !statuses.has(value.status)
    || typeof value.observedAt !== 'string' || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/.test(value.observedAt)
    || !Number.isFinite(Date.parse(value.observedAt))
    || !Array.isArray(value.checks) || value.checks.length !== RUNTIME_CHECK_IDS.length
    || value.checks.some(check => !record(check) || !RUNTIME_CHECK_IDS.includes(check.id) || !statuses.has(check.status))
    || new Set(value.checks.map(check => check.id)).size !== RUNTIME_CHECK_IDS.length
    || !count(value.isolation?.beforeRestart) || !count(value.isolation?.afterRestart)
    || !statuses.has(value.isolation?.continuity) || !count(value.suite)
    || !Array.isArray(value.limitations) || !value.limitations.length || value.limitations.length > 30
    || !value.limitations.every(text)) throw Error('RUNTIME_SUMMARY_INVALID');
  const states = [value.status, value.isolation.continuity, ...value.checks.map(check => check.status)];
  const complete = [value.isolation.beforeRestart, value.isolation.afterRestart]
    .every(item => item.passed === 16 && item.total === 16) && value.suite.passed === value.suite.total;
  const status = states.includes('FAIL') ? 'FAIL' : states.every(state => state === 'PASS') && complete ? 'PASS' : 'INCONCLUSIVE';
  return { ...value, status };
}

const labels = {
  http: 'HTTP client', mcp: 'MCP client', ssh: 'Bounded SSH client', postgres: 'PostgreSQL profile client',
  host: 'Private workload broker', 'wrong-ticket': 'Scoped Wrong Ticket', persistence: 'Restart persistence',
  mutation: 'Observation-linked approved mutation', 'origin-untouched': 'Artificial-origin witness',
  adversarial: 'Bounded negative cases', isolation: 'Container evidence',
};

export function renderRuntimeSummary(document, value) {
  const summary = validateRuntimeSummary(value);
  const node = (tag, content) => { const element = document.createElement(tag); element.textContent = content; return element; };
  const status = document.getElementById('runtime-status');
  status.textContent = summary.status === 'PASS' ? 'Recorded reference acceptance passed.'
    : summary.status === 'FAIL' ? 'Recorded acceptance failed. Inspect the evidence.' : 'Recorded acceptance is inconclusive.';
  status.dataset.state = summary.status;
  document.getElementById('runtime-observed').textContent = `Observed ${summary.observedAt} · ${summary.profile} · saved evidence, not live health.`;
  const facts = document.getElementById('runtime-facts'); facts.replaceChildren();
  const entries = [
    ['Required checks', `${summary.checks.filter(check => check.status === 'PASS').length} / ${RUNTIME_CHECK_IDS.length} recorded PASS`],
    ['Container restart', `${summary.isolation.beforeRestart.passed}/${summary.isolation.beforeRestart.total} before · ${summary.isolation.afterRestart.passed}/${summary.isolation.afterRestart.total} after · continuity ${summary.isolation.continuity}`],
    ['Dated engineering suite', `${summary.suite.passed}/${summary.suite.total} · final release checks are separate`],
    ['Shared source version', `v${summary.source.version} · ${summary.sourceScope}`],
    ['Runtime source SHA-256', summary.source.runtimeDigest],
  ];
  for (const [label, detail] of entries) { const row = document.createElement('div'); row.append(node('dt', label), node('dd', detail)); facts.append(row); }
  const checks = document.getElementById('runtime-checks'); checks.replaceChildren();
  for (const id of RUNTIME_CHECK_IDS) checks.append(node('li', `${labels[id]} — ${summary.checks.find(check => check.id === id).status}`));
  const limitations = document.getElementById('runtime-limitations'); limitations.replaceChildren();
  for (const limitation of summary.limitations) limitations.append(node('li', limitation));
  return summary;
}

export async function loadRuntimeSummary(document, fetchSummary = globalThis.fetch) {
  try {
    const response = await fetchSummary('evidence/runtime-v1/summary.json', { cache: 'no-store', credentials: 'omit' });
    if (!response.ok) throw Error('RUNTIME_SUMMARY_UNAVAILABLE');
    const bytes = await response.text();
    if (bytes.length > 65536) throw Error('RUNTIME_SUMMARY_TOO_LARGE');
    return renderRuntimeSummary(document, JSON.parse(bytes));
  } catch {
    const status = document.getElementById('runtime-status');
    status.textContent = 'Not verified — the recorded summary is unavailable or invalid.';
    status.dataset.state = 'INCONCLUSIVE';
    document.getElementById('runtime-observed').textContent = 'Use the source acceptance guide; no saved pass is claimed here.';
    for (const id of ['runtime-facts', 'runtime-checks', 'runtime-limitations']) document.getElementById(id).replaceChildren();
    return null;
  }
}

if (typeof document !== 'undefined') void loadRuntimeSummary(document);
