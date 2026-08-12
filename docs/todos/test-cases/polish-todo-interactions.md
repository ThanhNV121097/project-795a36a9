# Test Cases — Polish todo interactions

Module: `todos`
Function: Polish todo interactions
Requirement: TODOS-005
Risk level: Medium — interaction feedback affects accessibility, core task operation, and user confidence, but no authentication or financial data exists.

## Automated happy-path coverage

**Scenario**: Add control is disabled for empty input
**Given**: User is on the todo page and task input is empty
**When**: User views add control
**Then**: Add control is disabled and cannot be activated
Traceability: TODOS-005 AC-1

**Scenario**: Loading state appears while tasks load
**Given**: User opens todo page and saved tasks request is pending
**When**: User views list area
**Then**: Loading state is visible in list area
Traceability: TODOS-005 AC-2

**Scenario**: Recoverable load error shows retry action
**Given**: User opens todo page and saved tasks request fails
**When**: User views list area
**Then**: Error state is visible and retry action is visible
Traceability: TODOS-005 AC-3

**Scenario**: Enter key attempts add for valid input
**Given**: Focus is on task input and input contains `Buy milk`
**When**: User presses Enter
**Then**: Task add is attempted for title `Buy milk`
Traceability: TODOS-005 AC-4

**Scenario**: Keyboard focus is visible on core controls
**Given**: User is on todo page with one visible task `Buy milk`
**When**: User presses Tab repeatedly through page controls
**Then**: Task input, add control, completion control for `Buy milk`, and delete control for `Buy milk` each receive visible focus
Traceability: TODOS-005 AC-5

**Scenario**: Task row state-change motion stays brief
**Given**: User is on todo page with incomplete task `Buy milk`
**When**: User marks `Buy milk` complete and observes row state change
**Then**: Any row motion completes within 300ms and page remains usable during motion
Traceability: TODOS-005 AC-6

## Manual coverage

None. All listed happy-path checks have observable UI state or browser events suitable for automation.
