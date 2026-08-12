# Test Cases — Add persisted tasks

Module: `todos`
Function: Add persisted tasks
Requirement: TODOS-002 — Add non-empty task
Risk level: Medium — writes persisted user data and must update UI immediately, but no auth or destructive action.
Coverage: Happy path only per task request.

## Automated test cases

**Scenario**: Add task with add control
**Given**: Todo page is open and input contains `Buy milk`
**When**: User activates add control
**Then**: Task `Buy milk` appears in list as an incomplete task, and case traces to TODOS-002 AC-1.

**Scenario**: Add task with Enter key
**Given**: Todo page is open, input is focused, and input contains `Buy milk`
**When**: User presses Enter
**Then**: Task `Buy milk` appears in list as an incomplete task, and case traces to TODOS-002 AC-2.

**Scenario**: Added task persists after refresh
**Given**: Task `Buy milk` was added successfully and appears in list
**When**: User refreshes page and saved tasks finish loading
**Then**: Task `Buy milk` appears in list after load, and case traces to TODOS-002 AC-3.

**Scenario**: Added task title is trimmed
**Given**: Todo page is open and input contains `  Buy milk  `
**When**: User adds task
**Then**: Task title appears in list as `Buy milk`, and case traces to TODOS-002 AC-4.

**Scenario**: Input clears after successful add
**Given**: Todo page is open and input contains `Buy milk`
**When**: User adds task and add succeeds
**Then**: Input value becomes empty, and case traces to TODOS-002 AC-5.

## Manual test cases

None. All happy-path requirements have observable UI states suitable for automated browser tests.
