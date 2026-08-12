# Test Cases — Single-page todo layout

Module: `todos`
Function: Single-page todo layout
Requirement: TODOS-001 — Show single-page todo workspace
Risk level: Low — layout-only story, no data mutation; main risks are missing required page regions, unintended login/navigation, and responsive layout breakage.
Coverage type: Automated UI checks unless noted. No manual-only checks required.

## Automated happy-path scenarios

**Scenario**: Empty todo workspace appears without login or navigation
**Given**: User has no saved tasks
**When**: User opens app
**Then**: Page shows app title, task input, add control, empty state, and no login or navigation controls

Traceability: TODOS-001 AC-1

**Scenario**: Saved tasks appear in main todo list
**Given**: User has saved tasks
**When**: User opens app
**Then**: Page shows app title, task input, add control, and list of saved tasks

Traceability: TODOS-001 AC-2

**Scenario**: Mobile layout fits 320px viewport
**Given**: Viewport width is 320px
**When**: User opens app
**Then**: Page content fits without horizontal page scroll

Traceability: TODOS-001 AC-3

**Scenario**: Desktop layout remains centered and aligned
**Given**: Viewport width is desktop size
**When**: User opens app
**Then**: Page keeps input and list visually aligned within centered content area

Traceability: TODOS-001 AC-4
