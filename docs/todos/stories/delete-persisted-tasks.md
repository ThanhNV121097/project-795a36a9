# Story — Delete persisted tasks

Module: `todos`
Plan item: Delete persisted tasks
Requirement: TODOS-004 — Delete task

## User story

As a User, I want to delete any task, so that unwanted tasks disappear from my list and stay gone after refresh.

## In scope

- Delete control on every visible task row.
- User can activate delete with mouse, touch, or keyboard.
- Delete action targets exactly one task by task identifier.
- Task stays visible while delete request is pending.
- On delete success, task disappears from current list.
- On refresh after delete success, deleted task does not appear.
- If deleted task was last task in current view, empty state appears.
- If backend reports target task not found, task is removed from visible list or list reloads, and page does not crash.
- If delete fails for storage/network/server reason, task remains visible and recoverable error feedback appears.
- Repeated activation while delete is pending for same task sends only one delete attempt.

## Out of scope

- Undo, trash, restore, archive, or deleted-task history.
- Delete confirmation prompt or modal.
- Bulk delete, clear completed, swipe-to-delete, drag gestures.
- Editing task title, adding due dates, priorities, categories, search, sorting, or sharing.
- Login, user ownership, permissions, and per-user task lists.
- Changing add or completion behavior except where needed to keep deleted task list state consistent.
- New navigation or additional pages.

## UI scope

- Touches approved Todo page only, inside main App Card task list.
- Uses `Todo Item` delete button variant `Destructive soft` from design system.
- Delete button copy remains `Delete`; accessible name is `Delete task`.
- While delete is pending, task row remains visible, delete control for that task is disabled or otherwise guarded against duplicate activation, and Sync Status Pill shows saving state.
- On success, row is removed with minimal motion no longer than `--duration-fast`; reduced-motion preference removes non-essential animation.
- On failure, row remains visible and Error State Panel or inline recoverable storage error follows design copy pattern: plain problem plus reassurance.
- When last visible task is deleted, Empty State Panel appears with next-action copy.
- No modal, toast, navigation change, or page reload is introduced.

## Acceptance criteria

1. Given a visible task exists, when User activates that task's delete control, then exactly one delete request is attempted for that task identifier.
2. Given a delete request succeeds, when page updates, then deleted task is absent from visible task list.
3. Given a task was successfully deleted, when User refreshes page and saved tasks load, then deleted task does not appear.
4. Given exactly one task exists, when User deletes that task successfully, then task list area shows empty state.
5. Given target task no longer exists when delete is attempted, when backend returns not found, then task is absent from visible list or list reloads, and page remains usable without crash.
6. Given delete request fails for recoverable storage/network/server reason, when failure is returned, then task remains visible and error feedback appears.
7. Given delete request is pending for a task, when User activates same delete control again, then no second delete request is sent for that task before first request settles.
8. Given keyboard focus reaches a task delete control, when User presses Enter or Space, then delete action for that task is attempted.
9. Given User has no account, when User deletes a task, then delete remains permitted because app has no login permissions.

## Dependencies

- Single-page todo layout exists first so task list, empty state, loading state, and error state containers exist.
- Add persisted tasks exists first or test data must be seeded so a task can exist for deletion.
- Backend persistent storage and todo API include stable task identifiers.
- Approved design and `design/design-system.md` govern visual tokens and interaction states.
- Architecture overview conventions apply: Next.js frontend calls Go backend through `NEXT_PUBLIC_API_URL`; backend validates identifier and persists deletion in PostgreSQL.

## Non-blocking product decisions

- Delete is permanent in this version.
- No confirmation prompt is required before delete.
- Failed delete keeps task visible instead of optimistic removal, matching SRS failure behavior and avoiding perceived data loss.
