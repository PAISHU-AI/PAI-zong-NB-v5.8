# Local Routing Notes

## Classification
- Category: planning / design / specification
- Primary role: existing `project-assistant` skill only (`50-project-assistant`)
- Secondary role: rule governor, only for installation and routing governance

## Use When
- The user wants to plan a new software project before implementation.
- The user asks to discuss a feature, architecture, refactor, or product idea without changing code yet.
- The request is broad, ambiguous, or has multiple possible approaches.
- The project needs a written spec before coding starts.

## Avoid When
- The user asks for a small direct code change.
- The user asks to fix a bug, failing test, build error, or runtime issue.
- The implementation requirements are already explicit and low risk.
- The user explicitly asks to code now.

## Role Guidance
- The existing `project-assistant` skill should use this skill to produce and maintain `docs/spark/*-design.md`.
- Architect may provide design input to `project-assistant`, but should not invoke this skill directly.
- Coder and debugger should not use this skill as a default precondition for implementation or repair tasks.
