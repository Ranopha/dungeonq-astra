# Product Hunt launch materials — draft

Status: prepared copy for review, not a published or scheduled launch. Insert only URLs that have been published and read back. No public repository or demo address is asserted by this document.

## Listing copy

**Name:** DungeonQ — Astra Safety Rehearsal

**Tagline:** Let Astra propose. Keep approval separate.

**Description:** Rehearse an AI agent's next move before it acts. GPT-6 Astra proposes one command; DungeonQ checks scope, requires separate approval and verifies the receipt. Try the browser rehearsal or run the synthetic-only MCP lab locally with your own API key.

**Suggested topics:** Artificial Intelligence, Developer Tools, Open Source. Confirm available topic names in the launch form; use no more than three.

**Shoutout:** OpenAI — GPT-6 Astra supplies the live command candidates in the self-hosted lab. Acknowledge use without implying sponsorship or endorsement.

**Website and source:** Add the independently verified Astra demo and source-release links after publication. The earlier WebMCP and Amazon entries are separate products of the same project history; do not substitute their URLs for this edition.

## Maker comment

Hi Product Hunt — I'm the maker of DungeonQ.

I wanted to make the moment between an agent's suggestion and its action something you can inspect. In this rehearsal, GPT-6 Astra receives a small synthetic state summary and proposes one next command. A separate runtime checks it. Approval happens through a reviewer session that the model cannot use.

Try the browser rehearsal first: prepare a request, attempt to apply it before approval, review the exact scope, then inspect the receipt, an altered copy and a replay. That public experience is a browser model with recorded live-run evidence. For actual Astra calls and the separate HTTPS/MCP boundary, the source runs locally with your own API key.

This edition builds on DungeonQ 0.4.0. The engine, MCP adapter, reviewer controls, SQLite state and signed receipts were already there. For this challenge I added the Astra adapter, minimized context, single-command validation, a persistent local cost ledger, model/runtime evidence and an opt-in live proof.

An early live call chose to wait because a traffic-routing label was ambiguous. I clarified the input rather than treating a fluent answer as authority. The following two-call proof passed its seven checks. The proof's reviewer is automated, so it explicitly records that human presence was not proven.

Everything here is synthetic and intended for local evaluation. It is not production security software. Thanks to OpenAI for GPT-6 Astra, and to the open-source projects behind the stack.

I'd especially like feedback from people building agents: is the boundary between a proposal, an approval and an observed effect clear enough to inspect? Which part of the evidence would you need to understand better before adapting this pattern?

## Gallery and video brief

Use actual captures of this edition. Keep the experience label visible and remove credentials and private machine/account details before export.

| Asset | Content and caption |
| --- | --- |
| Opening image | The review desk: “A capable agent. A boundary it cannot approve.” Show the synthetic-only label. |
| Before approval | The attempted apply returns `HUMAN_APPROVAL_REQUIRED`; both synthetic assets are unchanged. |
| Exact review | Target, manifest digest, one-effect limit and expiry. No password or populated credential field. |
| Evidence | Original receipt verifies, an altered copy fails, and replay returns the same effect. State whether this is browser-modeled or self-hosted. |
| Short walkthrough | Show the actual sequence from candidate to denial, separate review and read-back. Label recorded Astra output and automated-fixture proof accurately. |

Do not present the static browser rehearsal as a live paid-model call or as proof of independent authentication. A demo recording must not imply that the automated proof's reviewer was a person.

## Launch facts and preparation

The [official GPT-6 Astra Challenge guide](https://www.producthunt.com/contests/gpt-6-astra-challenge), read September 16, 2026, specifies **September 18, 2026 at 12:01 AM Pacific** for launch: **3:01 PM in Taiwan** on the same date. This is a requested contest launch date, not confirmation that this draft has been scheduled.

The guide describes awards for the top five launches. Community launch ranking matters; do not describe the outcome as a pure technical evaluation or promise a place. The guide does not establish that every underlying component must have been newly written by Astra, so describe the actual new contribution and existing foundation honestly.

The prepared tagline stays within 60 characters and the description within 260. Before publication, confirm the form still accepts the copy, choose at most three topics, attach actual screenshots/video, add the OpenAI shoutout and maker comment, and verify every destination. Publication, scheduling and any required terms acceptance remain separate actions requiring authorization.

Invite questions and feedback. Do not ask for upvotes, exchange votes, reward voting or make any offer conditional on a vote. Keep this launch distinct from the protected earlier competition submissions.
