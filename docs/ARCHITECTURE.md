# Architecture and claim boundary — v0.13.0

DungeonQ is a defensive deception runtime for AI-agent workflows. A designated suspicious session continues in a persistent synthetic world, giving human operators and authorized defender agents a place to observe and prepare a response. Additional response time is the design objective; no measured efficacy or production protection is established.

```text
Standalone participant client / model adapter
  actor token; public MCP / HTTP only
                |
                v
Trusted gateway and provisioned context
                |
                v
Synthetic facade -> canonical persistent world
  read / write / world ticket / exact retry
                |
                v
Evidence collector -> separate operator observation
                         |
             exact preview / explicit finite grant
                         |
              bounded world adaptation

Separate ordinary control / artificial-origin witness
  verifies the named reference resource and route interval
```

## Authority and integration

The participant cannot select its own routing disposition, approve a policy, or use a world ticket as origin authority. HTTP, MCP, bounded SSH/PostgreSQL and the private Unix workload broker share runtime contracts. SSH is not a general shell; PostgreSQL is not a general SQL engine; the broker does not intercept arbitrary host activity.

The [standalone consumer](EXTERNAL_INTEGRATION.md) lives in its own package, uses public interfaces and receives only the actor capability. The integration harness keeps operator actions and artificial-origin checks separate. A deterministic external process demonstrates a reusable client boundary; it is still maintainer-authored and is not evidence of outside adoption, independent human review or a live-model run.

Operator mutation requires an exact preview and explicit finite grant, with bounded template, context, expiry and budget. An authorized defender agent may inspect permitted evidence or propose a response; model text cannot grant itself authority. The former governed-assistant profile has its own HTTPS reauthentication path. Its role/account system is not automatically the runtime token model.

## Persistence and evidence

World records, ticket scope/use counts, observations, policy state and request identity are durable. Expected revisions prevent stale writes. Exact retries return the prior result; they are not a fresh state read. Known no-new-effect refusals require authenticated evidence. Unsigned, misbound or lost responses remain UNKNOWN, including a committed write whose response was lost. Transport failure never causes fallback to origin.

The origin witness covers a named artificial resource and measured interval; witness/audit records themselves change. Fresh full admission binds runtime and container reports to the exact clean source. Historical PASS reports cannot certify changed source. The [runtime contract](contracts/RUNTIME_V1.md), [operation guide](RUNTIME.md), [acceptance boundaries](RUNTIME_ACCEPTANCE.md) and [versioned validation](VALIDATION.md) are the detailed contracts.

## Deployment and research limits

The local reference trusts one host/user. The container reference measures network/file separation while still trusting the gateway, Docker administrator and shared kernel. Neither is certification of a production deployment, general attack detection or arbitrary traffic interception. Production connectors, detection/identity admission, legitimate-traffic continuity and recovery need explicitly authorized environment-specific work.

Study, Topology, Defense and Orders Workspace retain their original observations, including negative and qualified model outcomes. Runtime protocol success does not establish a false belief, behavioral delay or general attacker deception. Preserving the original results is part of the product's evidence contract.
