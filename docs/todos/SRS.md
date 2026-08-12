# SRS — Todos

Module: `todos`
Last updated: 2026-08-12
Design: [View Design](http://localhost:8080/design/795a36a9-b4de-4b52-b34f-31beac78c108)
Design system: `design/design-system.md`

## 1. Purpose

Todos module lets anyone use "Todo List App v4" as single-page task list with no login. It covers viewing, adding, completing, deleting, and basic interaction feedback for tasks. Without this module, product has no core task workflow and no persisted list after refresh.

## 2. Actors

| Actor | Who they are | What they may do in this module |
|---|---|---|
| User | Any visitor using app without login | View tasks, add tasks, mark tasks complete or incomplete, delete tasks, retry after recoverable errors |

## 3. Scope

**In scope** — functions specified by plan titles:

- Single-page todo layout
- Add persisted tasks
- Toggle task completion
- Delete persisted tasks
- Polish todo interactions

**Out of scope** — related items not built in this module:

- Login and accounts — deliberately not built; app has no authentication or per-user permissions.
- Navigation and multiple pages — deliberately not built; app is single page.
- Due dates, priorities, search, sorting, categories, sharing, and collaboration — deliberately not built; scope is minimal add, complete, delete.
- Cross-device identity sync — deliberately not built; no login exists to identify same user across devices.

## 4. Functional requirements

### 4.1 Single-page todo layout

**Requirement TODOS-001 — Show single-page todo workspace**

*As a* User, *I want to* view one clean todo page, *so that* I can understand current tasks and available actions without navigation or login.

Behaviour:

1. User opens app.
2. System shows one todo page with app title, task input, add action, task list area, and no login or navigation controls.
3. System shows task list when tasks exist.
4. System shows empty state when no tasks exist.
5. System keeps layout usable on mobile and desktop widths.

**Acceptance criteria** — each maps one-to-one onto a test case in `docs/todos/test-cases/single-page-todo-layout.md`.

| # | Given | When | Then |
|---|---|---|---|
| AC-1 | User has no saved tasks | User opens app | Page shows app title, input, add control, empty state, and no login or navigation |
| AC-2 | User has saved tasks | User opens app | Page shows app title, input, add control, and list of saved tasks |
| AC-3 | Viewport width is 320px | User opens app | Page content fits without horizontal page scroll |
| AC-4 | Viewport width is desktop size | User opens app | Page keeps input and list visually aligned within centered content area |

**Failure, boundary and permission behaviour**

| Case | Condition | Expected behaviour |
|---|---|---|
| Absent data | No tasks exist | Empty state appears instead of blank list |
| Loading | Saved tasks have not loaded yet | Loading state appears in task list area |
| Upstream failure | Saved tasks cannot be loaded | Error state appears with retry action; input remains visible |
| Not permitted | User has no account | All todo actions remain available because module has no login permissions |
| Boundary | Long visible task text exists | Task row wraps text without breaking page width |

**Data touched**

| Field | Type | Required | Rule |
|---|---|---|---|
| Task title | text | yes | Displayed as entered after trimming leading and trailing whitespace |
| Task completion state | boolean | yes | Displayed as complete or incomplete |
| Task created order | ordering value | yes | Used to present saved tasks in stable order |

### 4.2 Add persisted tasks

**Requirement TODOS-002 — Add non-empty task**

*As a* User, *I want to* add a new non-empty task, *so that* it appears in my list immediately and remains after refresh.

Behaviour:

1. User enters task text in input.
2. User activates add control or presses Enter while input is focused.
3. System trims leading and trailing whitespace.
4. System rejects empty text after trimming.
5. System shows accepted task in list immediately after add succeeds.
6. System persists accepted task so reload shows same task.
7. System clears input after accepted task is added.

**Acceptance criteria** — each maps one-to-one onto a test case in `docs/todos/test-cases/add-persisted-tasks.md`.

| # | Given | When | Then |
|---|---|---|---|
| AC-1 | Input contains `Buy milk` | User activates add control | Task `Buy milk` appears in list |
| AC-2 | Input contains `Buy milk` | User presses Enter in input | Task `Buy milk` appears in list |
| AC-3 | Task `Buy milk` was added | User refreshes page | Task `Buy milk` appears in list after load |
| AC-4 | Input contains `  Buy milk  ` | User adds task | Task title appears as `Buy milk` |
| AC-5 | Task add succeeds | System updates page | Input becomes empty |

**Failure, boundary and permission behaviour**

| Case | Condition | Expected behaviour |
|---|---|---|
| Invalid input | Input is empty | Add control is disabled; nothing is saved |
| Invalid input | Input contains only whitespace | Add control is disabled after trimming; nothing is saved |
| Boundary | Task title has 1 character after trimming | Task is accepted |
| Boundary | Task title has 200 characters after trimming | Task is accepted |
| Boundary | Task title has 201 characters after trimming | Task is rejected with message naming 200-character limit; nothing is saved |
| Duplicate | Same title already exists | Task is accepted as separate item |
| Upstream failure | Task cannot be saved | Error message appears; failed task is not shown as saved after refresh |
| Not permitted | User has no account | Add remains permitted because module has no login permissions |

**Data touched**

| Field | Type | Required | Rule |
|---|---|---|---|
| Task title | text | yes | Trimmed; 1–200 characters accepted |
| Task completion state | boolean | yes | New task starts incomplete |
| Task created order | ordering value | yes | New task appears in stable list position after reload |

### 4.3 Toggle task completion

**Requirement TODOS-003 — Toggle task complete or incomplete**

*As a* User, *I want to* mark any task complete or incomplete, *so that* my list reflects current task status after refresh.

Behaviour:

1. User activates completion control for an incomplete task.
2. System marks task complete and updates visual styling instantly after save succeeds.
3. User activates completion control for a completed task.
4. System marks task incomplete and updates visual styling instantly after save succeeds.
5. System persists completion state so reload restores current state.

**Acceptance criteria** — each maps one-to-one onto a test case in `docs/todos/test-cases/toggle-task-completion.md`.

| # | Given | When | Then |
|---|---|---|---|
| AC-1 | Task is incomplete | User activates completion control | Task appears complete |
| AC-2 | Task is complete | User activates completion control | Task appears incomplete |
| AC-3 | Task was marked complete | User refreshes page | Task appears complete after load |
| AC-4 | Task was marked incomplete | User refreshes page | Task appears incomplete after load |

**Failure, boundary and permission behaviour**

| Case | Condition | Expected behaviour |
|---|---|---|
| Not found | Target task no longer exists | Task is removed from visible list or list reloads; error does not crash page |
| Upstream failure | Completion change cannot be saved | Task returns to last saved state and error message appears |
| Rapid action | User activates completion control repeatedly before save settles | Final visible state matches last successfully saved state; control prevents duplicate in-flight save for same task |
| Not permitted | User has no account | Toggle remains permitted because module has no login permissions |

**Data touched**

| Field | Type | Required | Rule |
|---|---|---|---|
| Task identifier | identifier | yes | Identifies target task |
| Task completion state | boolean | yes | Toggled between complete and incomplete |

### 4.4 Delete persisted tasks

**Requirement TODOS-004 — Delete task**

*As a* User, *I want to* delete any task, *so that* unwanted tasks disappear from my list and stay gone after refresh.

Behaviour:

1. User activates delete control for a visible task.
2. System removes task from list after delete succeeds.
3. System persists deletion so reload does not show deleted task.
4. System shows empty state when deleting last remaining task.

**Acceptance criteria** — each maps one-to-one onto a test case in `docs/todos/test-cases/delete-persisted-tasks.md`.

| # | Given | When | Then |
|---|---|---|---|
| AC-1 | Task exists in list | User activates delete control | Task disappears from list |
| AC-2 | Task was deleted | User refreshes page | Deleted task does not appear after load |
| AC-3 | One task exists | User deletes that task | Empty state appears |

**Failure, boundary and permission behaviour**

| Case | Condition | Expected behaviour |
|---|---|---|
| Not found | Target task no longer exists | Task is absent from visible list; page does not crash |
| Upstream failure | Task cannot be deleted | Task remains visible and error message appears |
| Rapid action | User activates delete control repeatedly before save settles | Only one delete is attempted for target task; page does not show duplicate errors |
| Not permitted | User has no account | Delete remains permitted because module has no login permissions |

**Data touched**

| Field | Type | Required | Rule |
|---|---|---|---|
| Task identifier | identifier | yes | Identifies target task |
| Task title | text | yes | Used only to display task before deletion |
| Task completion state | boolean | yes | Removed with task |

### 4.5 Polish todo interactions

**Requirement TODOS-005 — Provide minimal polished interaction feedback**

*As a* User, *I want to* receive clear lightweight feedback while using todos, *so that* I understand disabled controls, loading, errors, keyboard operation, and state changes.

Behaviour:

1. System disables add control when trimmed input is empty or over 200 characters.
2. System shows lightweight loading feedback while list data or write action is pending.
3. System shows recoverable error feedback when load or write action fails.
4. User can operate add, complete, and delete controls by keyboard.
5. System uses minimal motion for state changes without blocking use.
6. System provides visible focus states for interactive controls.

**Acceptance criteria** — each maps one-to-one onto a test case in `docs/todos/test-cases/polish-todo-interactions.md`.

| # | Given | When | Then |
|---|---|---|---|
| AC-1 | Input is empty | User views add control | Add control is disabled |
| AC-2 | Tasks are loading | User views list area | Loading state is visible |
| AC-3 | Task load fails | User views list area | Error state and retry action are visible |
| AC-4 | Focus is on input with valid text | User presses Enter | Task add is attempted |
| AC-5 | Focus moves through page by keyboard | User presses Tab repeatedly | Input, add, completion, and delete controls receive visible focus |
| AC-6 | Task state changes | User observes row | Motion, if present, completes within 300ms |

**Failure, boundary and permission behaviour**

| Case | Condition | Expected behaviour |
|---|---|---|
| Invalid input | Trimmed input is empty | Add disabled; no validation noise appears until user attempts action or input changes |
| Invalid input | Trimmed input exceeds 200 characters | Add disabled and message names 200-character limit |
| Upstream failure | Retry load fails | Error state remains and retry action remains available |
| Accessibility | User operates only keyboard | All core functions remain reachable and visible |
| Motion preference | User prefers reduced motion at OS/browser level | Non-essential animation is removed or reduced |
| Not permitted | User has no account | Feedback features remain available because module has no login permissions |

**Data touched**

| Field | Type | Required | Rule |
|---|---|---|---|
| Task title | text | yes | Validation feedback uses trimmed length |
| Task completion state | boolean | yes | Visual feedback reflects state |
| Operation status | state | yes | One of idle, loading, saving, deleting, error |

## 5. Screens

## Design

Design preview: [View Design](http://localhost:8080/design/795a36a9-b4de-4b52-b34f-31beac78c108).

Color palette from approved design spec:

- `#2563EB` primary blue for main actions and focus emphasis.
- `#F8FAFC` background for clean page shell.
- `#FFFFFF` surface for cards and task list panels.
- `#10B981` success for completed/saved status.
- `#EF4444` error for destructive/error feedback.

Main screens from approved design spec:

- Todo page: single responsive task list with add, complete, delete, filters, saved status, and empty/loading/error states.
- State examples: compact cards showing loading, empty, and storage error patterns for review.

The design is source of truth for appearance; this section maps functions onto it so nothing in design is unaccounted for and nothing specified here is missing from design.

| Screen | Section in the design | Functions it serves | States that must exist |
|---|---|---|---|
| Todo page | Main todo workspace | TODOS-001, TODOS-002, TODOS-003, TODOS-004, TODOS-005 | default, loading, empty, saving, deleting, error |
| State examples | Loading, empty, and storage error patterns | TODOS-001, TODOS-005 | loading, empty, error |

## 6. Non-functional requirements

| Area | Requirement |
|---|---|
| Performance | Initial todo page becomes usable within 2 seconds on a typical broadband connection with 100 saved tasks |
| Performance | Add, toggle, and delete visual feedback appears within 100ms of user action before save settles |
| Accessibility | Input and buttons have accessible names; keyboard focus is visible; text and controls meet contrast ratio ≥ 4.5:1 |
| Responsive | Page works at 320px width and up with no horizontal page scroll |
| Motion | Non-essential animations complete within 300ms and respect reduced-motion preference |
| Privacy | Stored data is limited to task titles, completion state, and ordering metadata; no login or personal profile data is stored |

## 7. Dependencies and assumptions

- **Depends on:** persistent storage, for keeping tasks after refresh.
- **Depends on:** approved design and design system, for visual style and interaction states.
- **Assumption:** No authentication exists; every visitor can use same app functions without account checks.
- **Assumption:** Task title limit is 200 characters; if stakeholder later needs longer notes, add scope for task detail field.
- **Assumption:** No confirmation prompt is required before delete; if stakeholder wants undo or confirmation, add or revise story scope.

| Open question | Proposed default | Who decides |
|---|---|---|
| Should deleted tasks be recoverable? | No; deletion is permanent in this version | Stakeholder |

## 8. Traceability

| Plan item | Requirement ids | Test cases |
|---|---|---|
| Single-page todo layout | TODOS-001 | `test-cases/single-page-todo-layout.md` |
| Add persisted tasks | TODOS-002, TODOS-005 | `test-cases/add-persisted-tasks.md`, `test-cases/polish-todo-interactions.md` |
| Toggle task completion | TODOS-003, TODOS-005 | `test-cases/toggle-task-completion.md`, `test-cases/polish-todo-interactions.md` |
| Delete persisted tasks | TODOS-004, TODOS-005 | `test-cases/delete-persisted-tasks.md`, `test-cases/polish-todo-interactions.md` |
| Polish todo interactions | TODOS-005 | `test-cases/polish-todo-interactions.md` |
