# Story — Polish todo interactions

Module: `todos`
Plan item: Polish todo interactions
Requirement: TODOS-005 — Provide minimal polished interaction feedback

## User story

As a User, I want to receive clear lightweight feedback while using todos, so that I understand disabled controls, loading, errors, keyboard operation, and state changes.

## In scope

- Disable add control when trimmed input is empty.
- Disable add control when trimmed input exceeds 200 characters.
- Show validation copy naming 200-character limit when input exceeds 200 trimmed characters.
- Allow adding valid task text by pressing Enter while focus is in input.
- Show initial loading feedback while saved tasks load.
- Show write-pending feedback while add, toggle, or delete save operation is pending.
- Show recoverable load error with retry action.
- Show recoverable write error feedback without crashing page or losing last saved visible state.
- Provide visible keyboard focus states for input, add button, completion controls, delete controls, filter controls, and retry action.
- Keep add, complete, delete, filter, and retry reachable by keyboard only.
- Use minimal motion for hover, focus, row state changes, spinner, and status pulse, capped by approved design tokens and reduced-motion preference.

## Out of scope

- Login, accounts, permissions, or per-user task ownership.
- New todo capabilities: due dates, priorities, search, categories, sorting, sharing, undo, confirmation prompts, or task editing.
- Changing persistence model or API contracts beyond statuses needed by existing add, toggle, delete, and load flows.
- Toast system, modal dialogs, notifications, or global app navigation.
- Offline queueing or conflict resolution.
- Redesigning approved layout, colors, typography, or component structure.

## UI scope

Touches approved Todo page only:

- Todo form and text input: disabled add state, Enter submit, 200-character validation feedback, focus ring.
- App card and toolbar: sync status pill for saved, saving, and error states.
- Todo list area: loading panel, empty panel, error panel with retry action, polite list updates.
- Todo item rows: visible complete/incomplete state changes, keyboard-focusable check and delete buttons, write-pending prevention for duplicate actions.
- Filter control: keyboard focus and selected-state accessibility remain intact while feedback states appear.
- State examples stay visually consistent with loading, empty, and storage error patterns.

No new screen, route, dialog, or navigation is added.

## Acceptance criteria

1. Given input is empty, when User views add control, then add control is disabled and no task add can be submitted.
2. Given input contains only whitespace, when whitespace is trimmed, then add control is disabled and no validation noise appears unless input changes or action is attempted.
3. Given input has 201 characters after trimming, when User views form, then add control is disabled and message names 200-character limit.
4. Given focus is on input with valid text, when User presses Enter, then add task is attempted once.
5. Given saved tasks are loading, when User views list area, then visible loading state appears in list area.
6. Given task load fails, when User views list area, then visible error state and retry action appear, and input remains usable.
7. Given retry load fails, when User activates retry action, then error state remains visible and retry action remains available.
8. Given add, toggle, or delete save operation is pending, when User views toolbar/status, then lightweight saving feedback is visible within 100ms of action.
9. Given write operation fails, when failure is returned, then recoverable error feedback appears and page does not crash.
10. Given toggle save fails, when page settles, then task returns to last saved completion state.
11. Given delete save fails, when page settles, then task remains visible.
12. Given User activates same completion control repeatedly before save settles, when first request is in flight, then duplicate in-flight save for same task is prevented.
13. Given User activates same delete control repeatedly before save settles, when first request is in flight, then only one delete attempt is made for that task.
14. Given focus moves through page by keyboard, when User presses Tab repeatedly, then input, add, completion, delete, filter, and retry controls receive visible focus when rendered.
15. Given User operates only keyboard, when using add, complete, delete, filter, and retry, then all core functions remain reachable and visible.
16. Given task state changes, when row motion is present, then motion completes within 300ms.
17. Given User prefers reduced motion at OS/browser level, when state changes occur, then non-essential animation is removed or reduced while status remains clear.
18. Given User has no account, when using feedback features, then add, complete, delete, retry, and keyboard operation remain available.

## Dependencies

- Depends on Single-page todo layout for base page, form, list, and state panel placement.
- Depends on Add persisted tasks for add operation and 1–200 character title validation.
- Depends on Toggle task completion for completion write flow and rollback behavior.
- Depends on Delete persisted tasks for delete write flow and failure behavior.
- Depends on approved design system components: Button and Anchor Button, Todo Form and Text Input, Filter Control, Sync Status Pill, Todo Item, Check Button, Delete Button, and Empty/Loading/Error State Panel.
- Depends on backend persistence and API errors from existing todo load, add, toggle, and delete flows.
- No external accounts, credentials, or stakeholder decisions needed.
