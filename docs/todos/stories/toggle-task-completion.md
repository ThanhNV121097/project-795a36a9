# Story — Toggle task completion

Module: `todos`
Plan item: Toggle task completion
Requirement: TODOS-003 — Toggle task complete or incomplete

## User story

As a User, I want to mark any task complete or incomplete, so that my list reflects current task status after refresh.

## In scope

- Toggle a visible incomplete task to complete.
- Toggle a visible completed task back to incomplete.
- Save the completion state through the backend so refresh restores the last saved state.
- Update the todo row visual state after save succeeds.
- Prevent duplicate in-flight completion saves for the same task.
- Recover cleanly when target task no longer exists.
- Show recoverable save error feedback and restore the last saved state when persistence fails.

## Out of scope

- Adding tasks; covered by `Add persisted tasks`.
- Deleting tasks; covered by `Delete persisted tasks`.
- Login, accounts, user ownership, and permissions.
- Due dates, priority, categories, search, sorting changes, batch complete, and bulk actions.
- Undo history, audit history, or deleted task recovery.
- Changing task title while toggling completion.
- Offline conflict resolution beyond restoring last saved state after failed save.

## UI scope

Touches approved Todo page only, inside main todo workspace.

- Todo Item completion control uses Check Button component.
- Incomplete item shows open task styling: white surface, normal task text, empty check control.
- Completed item shows completed styling: muted task text, success check control, completed surface treatment.
- Check button accessible label changes between `Mark complete` and `Mark incomplete`.
- Sync Status Pill shows saving state while completion save is in flight and saved/error state after result.
- Storage Error State Panel appears when completion save fails; page remains usable.
- Task list keeps `aria-live="polite"`; storage error must be announced when it appears after user action.
- Focus ring remains visible on check button for keyboard users.
- Motion, if used for row state change, stays under 300ms and respects reduced-motion preference.

## Acceptance criteria

1. Given a visible incomplete task, when User activates its completion control, then system saves completion state and task appears complete after save succeeds.
2. Given a visible completed task, when User activates its completion control, then system saves completion state and task appears incomplete after save succeeds.
3. Given a task was marked complete and save succeeded, when User refreshes page, then same task appears complete after load.
4. Given a task was marked incomplete and save succeeded, when User refreshes page, then same task appears incomplete after load.
5. Given completion save is in flight for one task, when User activates that same task completion control again before save settles, then no duplicate save is sent for that task and final visible state matches last successfully saved state.
6. Given completion save fails, when system reports failure, then task returns to its last saved completion state and recoverable error feedback appears.
7. Given target task no longer exists, when User activates completion control or save returns not found, then page does not crash and visible list removes the missing task or reloads tasks.
8. Given User has no account, when User toggles task completion, then action remains available without login prompt or permission error.
9. Given keyboard focus is on a task completion control, when User presses Enter or Space, then completion toggle is attempted and focus remains visible.

## Dependencies

- Single-page todo layout story should provide page shell, task list area, task row structure, loading/empty/error placements, and no-login baseline.
- Add persisted tasks story should provide persisted tasks with identifiers, titles, created order, and default incomplete completion state.
- Backend todo persistence must expose or be extended with task identifier and boolean completion state update support.
- PostgreSQL storage must include task completion state.
- Approved design and design system govern visual states, focus, colors, motion, and accessible labels.

## Notes for downstream delivery

- Use existing fullstack architecture: Next.js frontend calls Go backend through `NEXT_PUBLIC_API_URL`; Go backend validates and persists with PostgreSQL.
- Validation boundary is task identifier plus target completion state; ignore any client attempt to mutate title or order through this action.
- Keep external errors generic in UI; show recoverable no-data-loss message per design system.
