# Test Cases — Add persisted tasks

Module: `todos`
Function: Add persisted tasks
Requirement: TODOS-002 — Add non-empty task
Risk level: Medium. This function writes persisted user data and must show immediate UI feedback after successful add.
Coverage scope: Happy path only, per task instruction.

## Automated test cases

**Scenario**: Add task with add control
**Given**: Todo page is open, saved task list is empty or does not contain `Buy milk`, and input contains `Buy milk`
**When**: User activates add control
**Then**: Task list shows a task with title `Buy milk`
Traceability: TODOS-002 AC-1

**Scenario**: Add task with Enter key
**Given**: Todo page is open, saved task list is empty or does not contain `Buy milk`, focus is in task input, and input contains `Buy milk`
**When**: User presses Enter
**Then**: Task list shows a task with title `Buy milk`
Traceability: TODOS-002 AC-2

**Scenario**: Added task remains after refresh
**Given**: Todo page is open and task `Buy milk` was added successfully
**When**: User refreshes page and task loading completes
**Then**: Task list shows a task with title `Buy milk`
Traceability: TODOS-002 AC-3

**Scenario**: Added task title is trimmed
**Given**: Todo page is open and input contains `  Buy milk  `
**When**: User adds task
**Then**: Task list shows a task with title `Buy milk` and does not show a task title with leading or trailing spaces
Traceability: TODOS-002 AC-4

**Scenario**: Input clears after successful add
**Given**: Todo page is open and input contains `Buy milk`
**When**: User adds task and task `Buy milk` appears in list
**Then**: Task input value is empty
Traceability: TODOS-002 AC-5

## Manual test cases

None. All happy-path behaviours above are observable by automated UI or integration tests.
