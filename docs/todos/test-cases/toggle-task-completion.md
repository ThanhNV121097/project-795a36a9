# Test Cases — Toggle Task Completion

Module: `todos`
Function: Toggle task completion
Requirement: TODOS-003
Scope: Happy path only per task request.
Risk level: Low — single-user boolean state change with persistence, no permissions beyond no-login access.
Coverage type: Automated unless noted. No manual-only cases required.

## Automated happy-path cases

**Scenario**: Mark incomplete task complete
**Given**: Saved task `Buy milk` exists and appears incomplete in the task list.
**When**: User activates the completion control for `Buy milk`.
**Then**: Task `Buy milk` appears complete in the task list.
Traceability: TODOS-003 AC-1.

**Scenario**: Mark completed task incomplete
**Given**: Saved task `Buy milk` exists and appears complete in the task list.
**When**: User activates the completion control for `Buy milk`.
**Then**: Task `Buy milk` appears incomplete in the task list.
Traceability: TODOS-003 AC-2.

**Scenario**: Completed task remains complete after refresh
**Given**: Saved task `Buy milk` was marked complete and appears complete in the task list.
**When**: User refreshes the page and task data finishes loading.
**Then**: Task `Buy milk` appears complete in the task list after load.
Traceability: TODOS-003 AC-3.

**Scenario**: Incomplete task remains incomplete after refresh
**Given**: Saved task `Buy milk` was marked incomplete and appears incomplete in the task list.
**When**: User refreshes the page and task data finishes loading.
**Then**: Task `Buy milk` appears incomplete in the task list after load.
Traceability: TODOS-003 AC-4.
