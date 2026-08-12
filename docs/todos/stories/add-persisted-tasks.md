# Story — Add persisted tasks

Module: `todos`
Plan item: Add persisted tasks
Requirement IDs: TODOS-002, related feedback from TODOS-005

## User story

As a User, I want to add a new non-empty task, so that it appears in my list immediately and remains after refresh.

## Scope

### In scope

- Add a task from the single todo page using the add control.
- Add a task by pressing Enter while task input is focused.
- Trim leading and trailing whitespace before validation and persistence.
- Accept trimmed task titles from 1 to 200 characters.
- Reject empty, whitespace-only, and over-200-character titles before save.
- Create each accepted task as incomplete.
- Persist accepted task through backend and PostgreSQL so it appears after page refresh.
- Show saved task in stable list order after reload.
- Clear input after successful add.
- Accept duplicate titles as separate tasks.
- Show recoverable error feedback if save fails.

### Out of scope

- Toggle completion state; covered by `Toggle task completion`.
- Delete tasks; covered by `Delete persisted tasks`.
- Login, accounts, owners, or per-user task lists.
- Due dates, priorities, notes, categories, search, sort controls, sharing, or collaboration.
- Undo, confirmation, or recovery for added tasks.
- Offline queueing or conflict resolution across tabs/devices.
- Bulk add or multi-line task creation.
- Changing approved visual design or adding new pages/navigation.

## UI scope

Touches approved Todo page only, inside main todo workspace:

- Todo form and text input: validate trimmed input, submit by button or Enter, clear after successful save.
- Button: native disabled state when trimmed input is empty or title exceeds 200 characters.
- Todo list: newly saved task appears as incomplete todo item using open-task styling.
- Empty state: hides when first task is successfully added.
- Sync status pill: shows saving while add request is in flight, saved when complete, error state when save fails.
- Error feedback: field message for invalid length; recoverable storage message for failed save.
- Loading state from initial list restore remains owned by layout story; add story must not break it.

Implementation must follow `design/design-system.md`: primary `#2563EB`, surface card, visible focus ring, keyboard reachable controls, minimum practical hit targets, and reduced-motion behavior.

## Acceptance criteria

1. Given input contains `Buy milk`, when User activates add control, then task `Buy milk` appears in list as incomplete.
2. Given input contains `Buy milk`, when User presses Enter while input is focused, then task `Buy milk` appears in list as incomplete.
3. Given task `Buy milk` was added successfully, when User refreshes page, then task `Buy milk` appears in list after saved tasks load.
4. Given input contains `  Buy milk  `, when User adds task, then visible task title is `Buy milk` and persisted title is `Buy milk`.
5. Given task add succeeds, when page updates after save, then task input becomes empty.
6. Given input is empty, when User views add control, then add control is disabled and no task is saved.
7. Given input contains only whitespace, when User views add control after trimming, then add control is disabled and no task is saved.
8. Given trimmed title has 1 character, when User adds task, then task is accepted and appears in list.
9. Given trimmed title has 200 characters, when User adds task, then task is accepted and appears in list.
10. Given trimmed title has 201 characters, when User attempts add, then task is rejected, message names 200-character limit, and no task is saved.
11. Given task `Buy milk` already exists, when User adds another `Buy milk`, then second task is accepted as separate visible item.
12. Given backend/database cannot save task, when User attempts add, then failed task is not shown as saved after refresh and recoverable error feedback appears.
13. Given User has no account, when User adds valid task, then add remains permitted with no login prompt.
14. Given add request is in flight, when User observes page, then saving feedback appears within 100ms and input/add controls do not create duplicate saves from same submit.

## Dependencies

- Depends on `Single-page todo layout` for base page shell, input, add control, list area, empty/loading/error state placement.
- Depends on backend API and PostgreSQL persistence owned by this story technical design and implementation stages.
- Depends on approved design and `design/design-system.md` for visual states.
- Uses project architecture from `docs/architecture/overview.md`: Next.js frontend, Go `net/http` backend, PostgreSQL, `NEXT_PUBLIC_API_URL`, `DATABASE_URL`.
- No external accounts or credentials needed.
- No stakeholder questions block this story.
