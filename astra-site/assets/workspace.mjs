const $ = id => document.getElementById(id);
const base = 'evidence/workspace-pilot-v1/';
async function read(name) {
  const response = await fetch(base + name, { cache: 'no-store' });
  if (!response.ok) throw Error('Evidence unavailable');
  return response;
}
try {
  const reports = await Promise.all(['a', 'b'].map(async id => (await read(`${id}-report.json`)).json()));
  for (const report of reports) {
    if (report.claimBoundary !== 'BOUNDED_SOURCE_ATTRIBUTION_PILOT_NOT_GENERAL_COGNITIVE_EFFICACY') throw Error('Unrecognized record');
    const row = document.createElement('tr');
    for (const value of [report.id.toUpperCase(), report.final.quantity, report.groundedOrigin.quantity,
      `${report.final.completed} / ${report.final.confidence}%`, `${report.reportedSuspicion}%`]) {
      const cell = document.createElement('td'); cell.textContent = String(value); row.append(cell);
    }
    $('workspace-rows').append(row);
    const paragraph = document.createElement('p'); paragraph.lang = 'zh-Hant';
    paragraph.textContent = `${report.id.toUpperCase()}: ${report.final.statement}`;
    $('workspace-statements').append(paragraph);
  }
  $('workspace-result').textContent = 'Both saved sessions used the decoy quantity as their answer. Both retained explicit scope qualifications. Supported observation: data acceptance, not demonstrated origin misbelief.';
} catch {
  $('workspace-rows').replaceChildren(); $('workspace-statements').replaceChildren();
  $('workspace-result').textContent = 'Saved records could not be loaded. No outcome is verified.';
}
$('workspace-verify').addEventListener('click', async () => {
  $('workspace-verify').disabled = true;
  try {
    const manifest = await (await read('manifest.json')).json();
    const names = ['protocol.json', 'actor-interface.json', 'a-report.json', 'a-transcript.json', 'a-world.json', 'b-report.json', 'b-transcript.json', 'b-world.json'];
    if (manifest.entries.length !== names.length || names.some(name => manifest.entries.filter(row => row.name === name).length !== 1)) throw Error('Invalid inventory');
    for (const item of manifest.entries) {
      const bytes = await (await read(item.name)).arrayBuffer();
      const hash = [...new Uint8Array(await crypto.subtle.digest('SHA-256', bytes))].map(byte => byte.toString(16).padStart(2, '0')).join('');
      if (hash !== item.sha256) throw Error('Digest mismatch');
    }
    $('workspace-check').textContent = '8/8 saved file digests match the published manifest. Byte integrity only — not independent provenance, live execution or a cognitive-efficacy proof.';
  } catch { $('workspace-check').textContent = 'Verification failed. Missing or changed evidence is not a pass.'; }
  finally { $('workspace-verify').disabled = false; }
});
