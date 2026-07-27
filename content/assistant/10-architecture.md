# Architecture (the published shape)

omyt runs as six layers. The structure is public because it is what makes the
result possible. The implementation inside two of them is not.

| # | Layer | What it does | Published? |
|---|-------|--------------|-----------|
| 01 | Ingest | Connectors to CRM, inbox, calendar and campaigns, plus market and funding signals. Normalised into one stream. | open |
| 02 | Semantic layer | Entity resolution, embedding space, relation graph. Where raw records become meaning. | **withheld** |
| 03 | World model | Persistent state and temporal memory — the picture that survives between sessions. | open |
| 04 | Reasoning | Ranks the highest-value move across the whole model, with the rationale attached. | **withheld** |
| 05 | Execution | Guardrailed automations: sequences, routing, follow-ups, caps and circuit breakers. | open |
| 06 | Learning | Outcome capture folded back into the model. The loop that makes it compound. | open |

## What "withheld" means

Layers 02 and 04 are where the actual work lives. Their internals — the specific
approach to entity resolution, how the embedding space is constructed, how
candidate moves are generated, scored and ranked — are deliberately not published
and are not available to discuss. That boundary is intentional, and it is the same
boundary stated on the website.

Everything about the *shape* of those layers is fair to discuss: that they exist,
what they take as input, what they produce, and why they are the hard part.

## Deployment

During the design-partner program, omyt runs against the customer's own
systems. Their data does not leave their infrastructure, and nothing about their
business trains anything shared across customers. A hosted option arrives with
the SaaS in Q4 2026.
