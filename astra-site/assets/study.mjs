import { sha256Hex } from '../src/canonical.mjs';
const $ = id => document.getElementById(id);
const root = 'evidence/study-v1/';
const runs = {
  CORRELATED: 'reference-correlated.json', DISCRIMINATING: 'reference-control.json',
  'pilot-a': 'codex-pilot-a.json', 'pilot-b': 'codex-pilot-b.json',
};
let reference, pilots, manifest;
async function read(name) {
  const response = await fetch(root + name);
  if (!response.ok) throw Error('STUDY_ARTIFACT_UNAVAILABLE');
  return response.json();
}
function paint() {
  const selected = $('study-run').value;
  const trial = selected.startsWith('pilot-') ? pilots.sessions.find(x => x.id === selected.slice(-1)) : reference.trials.find(x => x.arm === selected);
  const summary = trial.summary ?? trial;
  $('study-download').href = root + runs[selected];
  $('study-rows').replaceChildren();
  for (const row of summary.predictions) {
    const tr = document.createElement('tr');
    const values = [row.sequence, row.stage, row.hypothesis, row.confidence === null ? 'Unknown' : `${row.confidence}%`, row.predictedSuccess === null ? 'Unknown' : row.predictedSuccess ? 'Success' : 'No success', row.actualSuccess ? 'Success' : 'No success'];
    for (const value of values) { const td = document.createElement('td'); td.textContent = value; tr.append(td); }
    if (row.correct === false) tr.className = 'prediction-missed';
    $('study-rows').append(tr);
  }
  $('study-summary').textContent = `${summary.participantMode} · ${summary.arm} · first diagnostic observation: event ${summary.firstDiagnosticStep ?? 'none'} · first wrong high-confidence report: ${summary.firstWrongConfidentStep === null ? 'none' : `event ${summary.firstWrongConfidentStep}`} · wrong predictions: ${summary.wrongPredictionCount}.`;
}
async function check(tamper) {
  for (const id of ['study-verify', 'study-tamper']) $(id).disabled = true;
  try {
    if (!manifest) throw Error('STUDY_NOT_LOADED');
    let count = 0;
    for (const entry of manifest.entries) {
      if (!/^[a-z0-9-]+\.json$/.test(entry.name)) throw Error('MANIFEST_PATH_INVALID');
      const response = await fetch(root + entry.name);
      if (!response.ok) throw Error('STUDY_ARTIFACT_UNAVAILABLE');
      let content = await response.text();
      if (tamper && count === 0) content += ' ';
      const matches = await sha256Hex(content) === entry.sha256;
      if (tamper && count === 0) {
        if (matches) throw Error('ALTERED_COPY_NOT_REJECTED');
        $('study-check').textContent = 'ALTERED COPY REJECTED · its byte digest differs. Original records were not modified. This checks file integrity only; run the local verifier for causal replay.';
        return;
      }
      if (!matches) throw Error('STUDY_FILE_DIGEST_MISMATCH');
      count++;
    }
    $('study-check').textContent = `CHECKED NOW · ${count} original study file digests match this release manifest. This is not independent provenance authentication or causal replay. No new experiment was run.`;
  } catch (error) { $('study-check').textContent = `No pass claimed: ${error.message}`; }
  finally { for (const id of ['study-verify', 'study-tamper']) $(id).disabled = false; }
}
$('study-run').onchange = paint;
$('study-verify').onclick = () => check(false);
$('study-tamper').onclick = () => check(true);
try {
  [reference, pilots, manifest] = await Promise.all(['reference-proof.json', 'codex-pilot-results.json', 'manifest.json'].map(read));
  if (reference.schemaVersion !== 'dungeonq.study-proof/v1' || pilots.schemaVersion !== 'dungeonq.codex-pilot-results/v1' || manifest.schemaVersion !== 'dungeonq.study-static-manifest/v1') throw Error('STUDY_SCHEMA_INVALID');
  paint();
} catch (error) { $('study-summary').textContent = `Study evidence unavailable: ${error.message}. No result claimed.`; $('study-run').disabled = true; }
