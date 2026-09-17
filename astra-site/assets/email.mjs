const byId = id => document.getElementById(id);
try {
  const response = await fetch('evidence/email-v1/proof.json', { cache: 'no-store' });
  if (!response.ok) throw Error('RECORD_UNAVAILABLE');
  const report = await response.json();
  if (report.schemaVersion !== 'dungeonq.email-proof/v1' || report.profile !== 'SYNTHETIC_ONLY'
    || report.participantMode !== 'SCRIPTED_FIXTURE' || report.verificationMode !== 'LOCAL_EMAIL_CAPTURE'
    || report.externalEmailSent !== false || report.inboxDeliveryProven !== false || report.liveOAuthProviderUsed !== false
    || report.passed !== true || !Array.isArray(report.checks) || report.checks.length !== 9
    || report.checks.some(check => check.passed !== true)) throw Error('RECORD_BOUNDARY_INVALID');
  byId('email-proof-status').textContent = `${report.checks.length}/9 recorded checks passed · local simulated mailbox · no external email or live OAuth provider.`;
  const names = ['Unauthenticated access rejected; unconfigured providers disabled', 'Default capture is explicitly simulated',
    'Fresh administrator confirmation; recipient override rejected', 'Single-use verification bound to this session',
    'Verified email alias signs in with the existing password', 'Same incident reaches the bound administrator capture',
    'Notification does not approve rotation; A is unchanged', 'Restart preserves the binding and accepted message',
    'Removal disables the email alias; the local account still works'];
  byId('email-proof-checks').replaceChildren(...report.checks.map((check, index) => { const row = document.createElement('li'); row.textContent = names[index]; return row; }));
  byId('email-proof-message').textContent = `To: ${report.message.to}\nSubject: ${report.message.subject}\n\n${report.message.text}`;
} catch {
  byId('email-proof-status').textContent = 'The email evidence could not be validated. Download the source and reproduce the local proof; no success is claimed here.';
}
