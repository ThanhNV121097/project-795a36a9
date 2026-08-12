# Test Cases — Delete Persisted Tasks

Module: `todos`
Function: Delete persisted tasks
Requirement: TODOS-004 — Delete task
Risk level: Low. Single unauthenticated destructive action with persistence check; happy path only per task request.

## Automated coverage

**Scenario**: Delete visible task from list
**Given**: Task `Buy milk` exists in list
**When**: User activates delete control for task `Buy milk`
**Then**: Task `Buy milk` disappears from list
Traceability: TODOS-004 AC-1

**Scenario**: Deleted task stays gone after refresh
**Given**: Task `Buy milk` exists in list and user has deleted task `Buy milk`
**When**: User refreshes page and saved tasks finish loading
**Then**: Task `Buy milk` does not appear in list
Traceability: TODOS-004 AC-2

**Scenario**: Deleting last task shows empty state
**Given**: Only task `Buy milk` exists in list
**When**: User activates delete control for task `Buy milk`
**Then**: Empty state appears in task list area
Traceability: TODOS-004 AC-3

## Manual coverage

None. All happy-path delete behaviours are observable through UI and persisted state after refresh.
