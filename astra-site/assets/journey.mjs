export const JOURNEY_STEPS = Object.freeze(['route', 'ticket', 'persistence', 'observation', 'adaptation', 'origin']);
const labels = ['Divert', 'Ticket', 'Return', 'Observe', 'Adapt', 'Origin'];
const text = (value, limit = 2000) => typeof value === 'string' && value.trim().length > 0 && value.length <= limit;
const record = value => value !== null && typeof value === 'object' && !Array.isArray(value);

/** A display contract for saved observations, not execution or independent attestation. */
export function validateRecordedJourney(value) {
  if (!record(value) || value.schemaVersion !== 'dungeonq.runtime-public-journey/v1'
    || value.evidenceClass !== 'RECORDED_REFERENCE_OBSERVATIONS' || value.sourceScope !== 'SHARED_RUNTIME_CODE'
    || value.source?.version !== '0.11.0' || !/^[a-f0-9]{64}$/.test(value.source?.runtimeDigest ?? '')
    || !text(value.observedAt, 40) || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/.test(value.observedAt)
    || !Number.isFinite(Date.parse(value.observedAt))
    || !Array.isArray(value.steps) || value.steps.length !== JOURNEY_STEPS.length
    || value.steps.some((step, index) => !record(step) || step.id !== JOURNEY_STEPS[index]
      || !text(step.title, 180) || !text(step.summary)
      || !Array.isArray(step.observations) || step.observations.length < 1 || step.observations.length > 12
      || step.observations.some(item => !record(item) || !text(item.label, 160) || !text(item.value))
      || !Array.isArray(step.evidenceRefs) || step.evidenceRefs.length < 1 || step.evidenceRefs.length > 15
      || !step.evidenceRefs.every(reference => text(reference, 500)))
    || !Array.isArray(value.limitations) || !value.limitations.length || value.limitations.length > 30
    || !value.limitations.every(item => text(item))) throw Error('RECORDED_JOURNEY_INVALID');
  return value;
}

export function mountRecordedJourney(document, value) {
  const journey = validateRecordedJourney(value);
  const $ = id => document.getElementById(id);
  const node = (tag, content) => { const element = document.createElement(tag); element.textContent = content; return element; };
  const chapters = $('journey-chapters'); chapters.replaceChildren();
  const buttons = []; let selected = 0;
  function show(index) {
    if (!Number.isInteger(index) || index < 0 || index >= journey.steps.length) return;
    selected = index; const step = journey.steps[index];
    buttons.forEach((button, number) => button.setAttribute('aria-current', number === index ? 'step' : 'false'));
    $('journey-step-number').textContent = `CHAPTER ${String(index + 1).padStart(2, '0')} / SAVED ACTUAL OBSERVATIONS`;
    $('journey-step-title').textContent = step.title; $('journey-step-summary').textContent = step.summary;
    const observations = $('journey-observations'); observations.replaceChildren();
    for (const item of step.observations) { const row = document.createElement('div'); row.append(node('dt', item.label), node('dd', item.value)); observations.append(row); }
    const references = $('journey-evidence'); references.replaceChildren();
    for (const reference of step.evidenceRefs) references.append(node('li', reference));
    $('journey-position').textContent = `${index + 1} / ${journey.steps.length}`;
    $('journey-previous').disabled = index === 0; $('journey-next').disabled = index === journey.steps.length - 1;
  }
  for (const [index, step] of journey.steps.entries()) {
    const item = document.createElement('li'); const button = document.createElement('button'); button.type = 'button';
    button.append(node('span', String(index + 1).padStart(2, '0')), node('span', labels[index]));
    button.setAttribute('aria-label', `Chapter ${index + 1}: ${step.title}`); button.setAttribute('aria-controls', 'journey-step-title');
    button.onclick = () => show(index); buttons.push(button); item.append(button); chapters.append(item);
  }
  const advance = direction => { show(selected + direction); $('journey-step-title').focus(); };
  $('journey-previous').onclick = () => advance(-1); $('journey-next').onclick = () => advance(1);
  $('journey-status').textContent = `Recorded ${journey.observedAt} · explanatory chapters, not an execution timeline.`;
  $('journey-status').dataset.state = 'RECORDED';
  $('journey-source').textContent = `Evidence v${journey.source.version} · shared runtime SHA-256 ${journey.source.runtimeDigest}. Presentation updates do not rerun or relabel this record.`;
  const limitations = $('journey-limitations'); limitations.replaceChildren();
  for (const limitation of journey.limitations) limitations.append(node('li', limitation));
  show(0);
  return journey;
}

export async function loadRecordedJourney(document, fetchRecord = globalThis.fetch) {
  try {
    const response = await fetchRecord('evidence/runtime-v1/journey.json', { cache: 'no-store', credentials: 'omit' });
    if (!response.ok) throw Error('RECORDED_JOURNEY_UNAVAILABLE');
    const body = await response.text(); if (body.length > 65536) throw Error('RECORDED_JOURNEY_TOO_LARGE');
    return mountRecordedJourney(document, JSON.parse(body));
  } catch {
    const $ = id => document.getElementById(id);
    $('journey-status').textContent = 'Recorded journey unavailable. Open the source guide; no observations are inferred here.';
    $('journey-status').dataset.state = 'UNAVAILABLE';
    for (const id of ['journey-chapters', 'journey-observations', 'journey-evidence', 'journey-limitations']) $(id).replaceChildren();
    $('journey-step-number').textContent = 'RECORD UNAVAILABLE'; $('journey-step-title').textContent = 'No saved observation to display.';
    $('journey-step-summary').textContent = ''; $('journey-position').textContent = ''; $('journey-source').textContent = 'Source record not loaded.';
    for (const id of ['journey-previous', 'journey-next']) { $(id).disabled = true; $(id).onclick = null; }
    return null;
  }
}

function revealLinkedHistory(document, hash) {
  let target; try { target = document.getElementById(decodeURIComponent(hash.slice(1))); } catch { return; }
  if (!target) return;
  let parent = target.parentElement;
  while (parent) { if (parent.tagName === 'DETAILS') parent.open = true; parent = parent.parentElement; }
  target.scrollIntoView({ block: 'start' });
}
if (typeof document !== 'undefined') {
  void loadRecordedJourney(document);
  addEventListener('hashchange', () => revealLinkedHistory(document, location.hash));
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#"]');
    if (link) revealLinkedHistory(document, link.getAttribute('href'));
  });
  if (location.hash) revealLinkedHistory(document, location.hash);
}
