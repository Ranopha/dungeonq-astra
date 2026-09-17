import { sha256Hex } from '../src/canonical.mjs';
const $ = id => document.getElementById(id);
const root = 'evidence/topology-v2/';
let results, manifest, proof; let selectionVersion = 0;
async function read(name) {
  if (!/^[a-z0-9-]+\.json$/.test(name)) throw Error('WORKFLOW_PATH_INVALID');
  const response = await fetch(root + name); if (!response.ok) throw Error('WORKFLOW_RECORD_UNAVAILABLE');
  return response.json();
}
async function paint() {
  const version = ++selectionVersion;
  const selected = $('topology-run').value;
  try {
    const bundle = await read(`${selected}.json`);
    if (version !== selectionVersion) return;
    if (bundle.schemaVersion !== 'dungeonq.topology-evidence/v2') throw Error('WORKFLOW_VERSION_INVALID');
    const summary = selected === 'treatment' ? proof.trials.find(row => row.arm === 'TREATMENT').summary
      : results.sessions.find(row => row.id === selected.slice(-1)).summary;
    $('topology-download').href = root + selected + '.json';
    $('topology-summary').textContent = `${bundle.participantMode} · ${bundle.arm} · ${bundle.events.length} events · ordered local chain: ${summary.completedLocalChain ? 'completed' : 'not completed'} · unsupported completion claims: ${summary.wrongCompletionClaims} · actual catalogue goal: ${summary.goalCompleted ? 'met' : 'not met'}.`;
    $('topology-rows').replaceChildren();
    for (const event of bundle.events) {
      const row = document.createElement('tr');
      if (event.observation.outcome === 'GOAL_NOT_MET') row.className = 'prediction-missed';
      const command = event.command;
      const values = [event.sequence, command.actionId ?? (command.sceneId ? `Visit ${command.sceneId}` : command.type),
        `${event.observation.outcome} — ${event.observation.message}`, event.lineage ? 'Delivery → read → decision → local archive write' : '—'];
      for (const value of values) { const cell = document.createElement('td'); cell.textContent = String(value); row.append(cell); }
      $('topology-rows').append(row);
    }
  } catch (error) { $('topology-summary').textContent = `No result claimed: ${error.message}`; }
}
async function verify(tamper) {
  for (const id of ['topology-verify', 'topology-tamper']) $(id).disabled = true;
  try {
    if (!manifest) throw Error('WORKFLOW_NOT_LOADED'); let count = 0;
    for (const entry of manifest.entries) {
      if (!/^[a-z0-9-]+\.json$/.test(entry.name)) throw Error('WORKFLOW_PATH_INVALID');
      const response = await fetch(root + entry.name); if (!response.ok) throw Error('WORKFLOW_RECORD_UNAVAILABLE');
      let bytes = await response.text(); if (tamper && count === 0) bytes += ' ';
      const matched = await sha256Hex(bytes) === entry.sha256;
      if (tamper && count === 0) {
        if (matched) throw Error('ALTERATION_NOT_REJECTED');
        $('topology-check').textContent = 'ALTERED COPY REJECTED · originals unchanged. Byte integrity only; local replay independently checks causal consistency.'; return;
      }
      if (!matched) throw Error('WORKFLOW_DIGEST_MISMATCH'); count++;
    }
    $('topology-check').textContent = `CHECKED NOW · ${count} workflow files match the release manifest. This is not a fresh experiment, causal replay or provenance attestation.`;
  } catch (error) { $('topology-check').textContent = `No pass claimed: ${error.message}`; }
  finally { for (const id of ['topology-verify', 'topology-tamper']) $(id).disabled = false; }
}
$('topology-run').onchange = paint;
$('topology-verify').onclick = () => verify(false);
$('topology-tamper').onclick = () => verify(true);
try {
  [results, manifest, proof] = await Promise.all(['results.json', 'manifest.json', 'proof.json'].map(read));
  if (results.schemaVersion !== 'dungeonq.topology-pilot-results/v2' || manifest.schemaVersion !== 'dungeonq.topology-static-manifest/v2'
    || proof.schemaVersion !== 'dungeonq.topology-proof/v2') throw Error('WORKFLOW_VERSION_INVALID');
  $('topology-count').textContent = `${results.primaryObservedCount} / ${results.plannedN}`;
  $('topology-verdict-title').textContent = results.primaryObservedCount ? 'Unsupported completion was observed in this bounded pilot.' : 'No unsupported completion was observed in this pilot.';
  const memo = results.sessions.filter(row => row.arm === 'TREATMENT');
  const control = results.sessions.filter(row => row.arm === 'CONTROL');
  $('topology-verdict-detail').textContent = `Ordered local-chain following: ${memo.filter(row => row.summary.completedLocalChain).length}/${memo.length} procedural-memo sessions versus ${control.filter(row => row.summary.completedLocalChain).length}/${control.length} early-explanation controls. All ${results.sessions.length} planned sessions are retained; ${results.sessions.filter(row => row.summary.goalCompleted).length} verified the actual goal. Route following is not silently counted as a false belief. The earlier 0/2 study remains unchanged.`;
  await paint();
} catch (error) { $('topology-verdict-title').textContent = 'Evidence unavailable — no outcome claimed.'; $('topology-verdict-detail').textContent = error.message; }
