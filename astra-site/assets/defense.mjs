import { canonicalJson, sha256Hex } from '../src/canonical.mjs';

const $ = id => document.getElementById(id);
const root = 'evidence/defense-v1/';
const names = ['proof.json', 'world.json', 'governance.json'];
const labels = {
  NO_CONTACT_NO_INCIDENT_AND_A_GENERATION_ZERO: ['Before contact: A stays unchanged', 'The Owner reads zero incidents and generation 0 before the Actor touches the configured honey surface.'],
  ACTOR_MCP_CLOSED_TOOLS_NO_APPROVAL_OR_ORIGIN_CONTROL: ['Actor tools have no approval authority', 'The official MCP client sees four bounded tools. An attempted approval-tool call is rejected.'],
  SAME_INCIDENT_ALERT_DELIVERED_AND_INDEPENDENT_SINK_READBACK: ['One contact, one received local alert', 'The observed contact, incident and local sink receipt share the same event. The sink receipt is read back independently; it is not email delivery.'],
  UNAPPROVED_APPLY_DENIED_A_UNCHANGED: ['Before approval, rotation is denied', 'The Owner-side apply request is rejected without an approved grant. The protected origin remains at generation 0.'],
  THREE_PERSISTED_LOCAL_SUCCESSES_AND_B_TO_C_CONTINUITY: ['B → C: local work persists', 'Three allowed actions produce actual local receipts. The bounded campaign moves into C without gaining A authority.'],
  EARNED_DUNGEON_TOKEN_WORKS_LOCALLY_REJECTED_BY_A_AUTHORIZATION: ['A world token is not an A credential', 'The earned, format-valid token reads the synthetic local record. A rejects that same token at its authorization boundary.'],
  SEPARATE_OWNER_REAUTH_EXACT_DIGEST_APPROVAL_WRONG_DIGEST_DENIED: ['A separate Owner approves one digest', 'The fixture signs in and freshly reauthenticates through HTTPS/CSRF. A wrong manifest digest is rejected; only the exact request is approved. This does not attest human presence.'],
  ACTUAL_TLS_ROTATION_ALL_FOUR_INDEPENDENT_READBACKS: ['A rotates; all four readbacks pass', 'The issuer receives the bounded approved rotation over actual loopback TLS. Old-key denial, new-key business success, old-consumer denial and decoy-key denial are read separately.'],
  COMPLETED_APPLY_REPLAY_HAS_NO_NEW_PERMIT_OR_GENERATION: ['Replay does not rotate again', 'Repeating completed apply returns the existing result without a new permit or resource generation.'],
  DUNGEON_CONTINUES_C_TO_D_AFTER_A_PROTECTION_COMPLETES: ['C → D continues after A is protected', 'The Actor performs three more valid local actions and reaches D. The incident remains the same and A stays at generation 1.'],
  HTTP_MCP_PARITY_AND_WORLD_IDEMPOTENCY: ['Both interfaces observe the same world', 'HTTP and the official-SDK MCP client read the same persisted projection. Replaying the same action envelope returns the original result.'],
  SEPARATE_OBSERVER_CAUSAL_REPLAY_AND_TAMPER_REJECTION: ['Observer replay rejects an altered copy', 'A separate Observer process replays the world evidence. Changing an event digest is rejected. Same-host process separation is not production isolation.'],
  RESTART_PRESERVES_WORLD_ALERT_APPROVAL_AND_NONREVIVING_CREDENTIAL_STATE: ['Restart preserves both sides', 'The full local stack is stopped and reopened. Alert delivery, approval, world state and A generation persist; continued Actor work does not revive old credentials.']
};
const readbacks = [['oldKeyDenied', 'Old key denied'], ['newKeyBusiness', 'New key completes business request'],
  ['oldConsumerDenied', 'Old consumer denied'], ['decoyKeyDenied', 'World token denied by A']];
let proof; let world; let governance; let manifest; let files; let buttons = [];
const node = (tag, text, className) => {
  const element = document.createElement(tag); if (text !== undefined) element.textContent = String(text);
  if (className) element.className = className; return element;
};
const date = value => new Date(value).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'medium', timeZone: 'UTC' }) + ' UTC';
async function read(name) {
  if (![...names, 'manifest.json'].includes(name)) throw Error('DEFENSE_PATH_INVALID');
  const response = await fetch(root + name, { cache: 'no-store', credentials: 'omit' });
  if (!response.ok) throw Error('DEFENSE_RECORD_UNAVAILABLE');
  const bytes = await response.text(); if (bytes.length > 2_000_000) throw Error('DEFENSE_RECORD_TOO_LARGE');
  return { bytes, value: JSON.parse(bytes) };
}
async function checkLinks(record, worldBundle, governanceBundle) {
  if (record.schemaVersion !== 'dungeonq.defense-proof/v1' || record.profile !== 'SYNTHETIC_ONLY'
    || record.participantMode !== 'SCRIPTED_FIXTURE' || record.approvalMode !== 'SCRIPTED_OWNER_CREDENTIAL_NOT_HUMAN_PRESENCE_PROOF'
    || record.rotation?.approvalPresenceAttested !== false || record.paidProviderApiCalls !== 0 || record.externalTargetRequests !== 0
    || record.claim !== 'INTEGRATED_DEFENSIVE_ENGINEERING_NOT_LLM_EFFICACY_OR_PRODUCTION_ISOLATION'
    || !Array.isArray(record.checks) || record.checks.length !== 13 || !Array.isArray(record.timeline)
    || record.checks.some(item => !Object.hasOwn(labels, item.id) || typeof item.passed !== 'boolean')
    || new Set(record.checks.map(item => item.id)).size !== 13 || record.timeline.length !== 13
    || record.timeline.some((item, index) => item.event !== record.checks[index].id || !Number.isSafeInteger(item.at))) throw Error('DEFENSE_PROOF_BOUNDARY_INVALID');
  if (worldBundle.schemaVersion !== 'dungeonq.world-evidence/v1' || worldBundle.worldId !== record.worldId
    || governanceBundle.schemaVersion !== 'dungeonq.lab-evidence/v1' || governanceBundle.profile !== 'SYNTHETIC_ONLY'
    || !Array.isArray(governanceBundle.events)) throw Error('DEFENSE_EVIDENCE_VERSION_INVALID');
  const rotation = record.rotation;
  if (await sha256Hex(canonicalJson(worldBundle)) !== record.evidence?.worldDigest
    || await sha256Hex(canonicalJson(governanceBundle)) !== record.evidence?.governanceDigest
    || await sha256Hex(canonicalJson(rotation.manifest)) !== rotation.manifestDigest
    || rotation.receipt?.manifestDigest !== rotation.manifestDigest) throw Error('DEFENSE_CANONICAL_DIGEST_MISMATCH');
  const events = governanceBundle.events.map(event => event.body);
  const contact = events.find(event => event.kind === 'DECOY_CONTACT' && event.subject === record.incidentId);
  if (!contact || contact.details?.worldId !== record.worldId || contact.sequence !== record.alert?.eventId) throw Error('DEFENSE_INCIDENT_LINK_MISMATCH');
  for (const kind of ['ROTATION_REQUESTED', 'ROTATION_APPROVED', 'ROTATION_RESULT']) {
    const event = events.find(item => item.kind === kind && item.details?.incidentId === record.incidentId
      && item.details?.manifestDigest === rotation.manifestDigest
      && (kind === 'ROTATION_RESULT' ? item.subject === rotation.requestId : item.details?.requestId === rotation.requestId));
    if (!event) throw Error('DEFENSE_ROTATION_LINK_MISMATCH');
    if (kind === 'ROTATION_RESULT' && (event.details.state !== 'COMPLETED'
      || event.details.receiptDigest !== await sha256Hex(canonicalJson(rotation.receipt))
      || canonicalJson(event.details.checks) !== canonicalJson(rotation.checks))) throw Error('DEFENSE_READBACK_LINK_MISMATCH');
  }
}
function addFact(target, label, value) {
  const row = node('div'); row.append(node('dt', label), node('dd', value ?? 'Not recorded')); target.append(row);
}
function selectCheck(index, focus = false) {
  const check = proof.checks[index]; const event = proof.timeline[index]; const [title, description] = labels[check.id];
  for (let i = 0; i < buttons.length; i++) buttons[i].setAttribute('aria-pressed', String(i === index));
  $('defense-step-index').textContent = `RECORDED CHECK ${index + 1} / ${proof.checks.length}`;
  $('defense-step-title').textContent = title; $('defense-step-description').textContent = description;
  $('defense-step-time').textContent = `${date(event.at)} · ${event.at - proof.timeline[0].at} ms after the first check. Scripted timing, not an attacker-delay measurement.`;
  $('defense-step-outcome').textContent = check.passed === true ? 'PASS in the saved engineering run.' : 'NOT PASSED in the saved engineering run.';
  $('defense-step-json').textContent = JSON.stringify({ check, timeline: event }, null, 2);
  if (focus) { $('defense-step-title').setAttribute('tabindex', '-1'); $('defense-step-title').focus({ preventScroll: true }); }
}
function render() {
  const passCount = proof.checks.filter(check => check.passed === true).length;
  const complete = proof.passed === true && passCount === 13 && readbacks.every(([key]) => proof.rotation.checks?.[key] === true);
  $('defense-count').textContent = `${passCount} / ${proof.checks.length}`;
  $('defense-outcome').textContent = complete ? 'Named checks passed in the recorded run.' : 'The recorded proof is incomplete; no overall pass.';
  $('defense-date').textContent = `${date(proof.createdAt)} · scripted engineering fixture · 0 provider calls · 0 external target requests. This is not LLM deception evidence.`;
  $('defense-identifiers').replaceChildren();
  addFact($('defense-identifiers'), 'Incident shared by both sides', proof.incidentId);
  addFact($('defense-identifiers'), 'Bounded world', proof.worldId);
  addFact($('defense-identifiers'), 'Rotation request', proof.rotation.requestId);
  addFact($('defense-identifiers'), 'Notification', `Event ${proof.alert.eventId} · ${proof.alert.state === 'DELIVERED' ? 'received by local sink — not email' : 'not confirmed delivered'}`);
  $('defense-timeline').replaceChildren(); buttons = [];
  proof.checks.forEach((check, index) => {
    const item = node('li'); const button = node('button'); button.type = 'button';
    button.append(node('span', labels[check.id][0]), node('span', check.passed === true ? 'PASS' : 'NO PASS', check.passed === true ? 'defense-check-state' : 'defense-check-state unverified'));
    button.setAttribute('aria-label', `Inspect recorded check ${index + 1}: ${labels[check.id][0]}`);
    button.addEventListener('click', () => selectCheck(index, true)); buttons.push(button); item.append(button); $('defense-timeline').append(item);
  });
  $('defense-readbacks').replaceChildren();
  for (const [key, label] of readbacks) {
    const value = proof.rotation.checks?.[key]; const row = node('li');
    row.append(node('span', label), node('strong', value === true ? 'PASS' : value === false ? 'FAILED' : 'UNKNOWN', value === true ? '' : 'unverified'));
    $('defense-readbacks').append(row);
  }
  const rotation = proof.rotation; const scope = rotation.manifest;
  $('defense-rotation-facts').replaceChildren();
  for (const [label, value] of [['Asset / tenant', `${scope.assetId} / ${scope.tenantId}`], ['Generation', `${scope.expectedGeneration} → ${rotation.receipt.generation}`],
    ['Historical expiry', date(scope.expiresAt)], ['Clean consumer', scope.cleanConsumer], ['Exact manifest digest', rotation.manifestDigest], ['Approval presence', 'Not attested — automated Owner fixture']]) addFact($('defense-rotation-facts'), label, value);
  $('defense-rotation-json').textContent = JSON.stringify({ manifest: scope, manifestDigest: rotation.manifestDigest, receipt: rotation.receipt, checks: rotation.checks }, null, 2);
  selectCheck(7);
}
async function verifyFiles(tamper = false) {
  for (const id of ['defense-verify', 'defense-tamper']) $(id).disabled = true;
  try {
    if (!files || !manifest) throw Error('DEFENSE_NOT_LOADED');
    for (let i = 0; i < names.length; i++) {
      const name = names[i]; const entry = manifest.entries.find(item => item.name === name);
      const bytes = files[name].bytes + (tamper && i === 0 ? ' ' : '');
      const matches = await sha256Hex(bytes) === entry.sha256;
      if (tamper && i === 0) {
        if (matches) throw Error('ALTERED_COPY_NOT_DETECTED');
        $('defense-integrity').textContent = 'ALTERED COPY DETECTED · original files unchanged. The byte check rejected an added space. This is not a new defense run or causal-replay test.'; return;
      }
      if (!matches) throw Error('DEFENSE_FILE_DIGEST_MISMATCH');
    }
    await checkLinks(proof, world, governance);
    $('defense-integrity').textContent = 'CHECKED NOW · all 3 loaded file byte hashes, canonical evidence/manifest digests, receipt digest and same-incident links match. Not causal replay, publisher authentication, independent provenance or live execution.';
  } catch (error) { $('defense-integrity').textContent = `No verification pass: ${error.message}`; }
  finally { for (const id of ['defense-verify', 'defense-tamper']) $(id).disabled = false; }
}
$('defense-verify').addEventListener('click', () => verifyFiles());
$('defense-tamper').addEventListener('click', () => verifyFiles(true));
try {
  const loaded = await Promise.all([...names, 'manifest.json'].map(async name => [name, await read(name)]));
  files = Object.fromEntries(loaded); proof = files['proof.json'].value; world = files['world.json'].value;
  governance = files['governance.json'].value; manifest = files['manifest.json'].value;
  if (manifest.schemaVersion !== 'dungeonq.defense-static-manifest/v1' || manifest.evidenceClass !== 'RECORDED_ENGINEERING_PROOF'
    || !Array.isArray(manifest.entries) || manifest.entries.length !== 3
    || names.some(name => manifest.entries.filter(entry => entry.name === name && /^[a-f0-9]{64}$/u.test(entry.sha256)).length !== 1)) throw Error('DEFENSE_FILE_MANIFEST_INVALID');
  await checkLinks(proof, world, governance); render();
  for (const id of ['defense-verify', 'defense-tamper']) $(id).disabled = false;
} catch (error) {
  files = null;
  $('defense-outcome').textContent = 'Evidence unavailable — no result claimed.';
  $('defense-date').textContent = error.message;
  $('defense-integrity').textContent = 'The saved record could not be validated. No verification pass is claimed.';
}
