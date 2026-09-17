import { readFile, writeFile, mkdir, lstat, readdir } from 'node:fs/promises';
import { resolve, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { digest } from '../server/contracts.mjs';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const pkg=JSON.parse(await readFile(join(root,'package.json'),'utf8'));const releasePrefix=pkg.name==='dungeonq-astra'?'':'astra-release/';
const [destination,...extra]=process.argv.slice(2);if(!destination||extra.length)throw Error('PASS_EMPTY_OUTPUT_DIRECTORY');
const output=resolve(destination);const st=await lstat(output);if(!st.isDirectory()||st.isSymbolicLink()||(await readdir(output)).length)throw Error('OUTPUT_MUST_BE_EMPTY');
const sources=[['astra-site/index.html','index.html'],['astra-site/assets/site.css','assets/site.css'],['astra-site/assets/site.mjs','assets/site.mjs']];
for(const name of ['study.mjs','study.css'])sources.push([`astra-site/assets/${name}`,`assets/${name}`]);
const studyPrefix=pkg.name==='dungeonq'?'docs/':'';
const studyNames=['reference-proof.json','reference-matrix.json','reference-correlated.json','reference-control.json','codex-pilot-protocol.json','codex-pilot-results.json','codex-pilot-a.json','codex-pilot-b.json'];
const studyManifest={schemaVersion:'dungeonq.study-static-manifest/v1',claim:'BYTE_INTEGRITY_ONLY_NOT_CAUSAL_REPLAY_OR_PROVENANCE_ATTESTATION',entries:[]};
for(const name of studyNames){const source=`${studyPrefix}evidence/study-v1/${name}`;const data=await readFile(join(root,source));studyManifest.entries.push({name,sha256:createHash('sha256').update(data).digest('hex')});sources.push([source,`evidence/study-v1/${name}`]);}
for(const name of ['admission','session','scenario','engine','canonical','evidence'])sources.push([`public/src/${name}.mjs`,`src/${name}.mjs`]);
for(const name of ['after-hours','budget-blocked'])sources.push([`assistant/scenarios/${name}.json`,`scenarios/${name}.json`]);
sources.push(['public/scenarios/compound-pep-failure.json','scenarios/compound.json']);
const proof=JSON.parse(await readFile(join(root,releasePrefix+'evidence/report.json'),'utf8'));
if(proof.schemaVersion!=='dungeonq.astra-proof/v1'||proof.profile!=='SYNTHETIC_ONLY'||proof.humanPresenceProven!==false)throw Error('PROOF_BOUNDARY_INVALID');
for(const artifact of proof.artifacts){if(!['assistant-evidence.json','model-events.json','mcp-trace.json'].includes(artifact.name))throw Error('ARTIFACT_NOT_ALLOWED');const value=JSON.parse(await readFile(join(root,releasePrefix+'evidence',artifact.name),'utf8'));if(digest(value)!==artifact.canonicalDigest)throw Error('PROOF_DIGEST_MISMATCH');sources.push([`${releasePrefix}evidence/${artifact.name}`,`evidence/${artifact.name}`]);}
sources.push([releasePrefix+'evidence/report.json','evidence/report.json']);
for(const name of ['README.md','docs/ASTRA.md','docs/PRODUCT_HUNT.md'])sources.push([releasePrefix+name,`docs/${name}`]);
for(const name of ['LICENSE','NOTICE'])sources.push([name,`docs/${name}`]);
const prepared=[];
for(const [source,target] of sources){const data=await readFile(join(root,source));const text=data.toString('utf8');if(/sk-[A-Za-z0-9_-]{20}|-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/u.test(text)||(/\.(?:json|md)$/u.test(source)&&/Bearer |\/Users\//u.test(text)))throw Error(`PRIVATE_DATA_DENIED:${source}`);prepared.push([target,data]);}
for(const [target,data] of prepared){await mkdir(dirname(join(output,target)),{recursive:true});await writeFile(join(output,target),data,{flag:'wx'});}
await writeFile(join(output,'evidence/study-v1/manifest.json'),JSON.stringify(studyManifest,null,2)+'\n',{flag:'wx'});
console.log(JSON.stringify({output,files:sources.length+1,profile:'STATIC_SYNTHETIC_ONLY',paidEndpoint:false,originalProofDigestChecks:true}));
