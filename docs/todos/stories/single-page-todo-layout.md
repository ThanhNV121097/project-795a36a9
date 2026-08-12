# Story — Single-page todo layout

Plan item: Single-page todo layout
Module: `todos`
Requirement: TODOS-001

## User story

As a User, I want to view one clean todo page, so that I can understand current tasks and available actions without navigation or login.

## In scope

- One responsive todo page for "Todo List App v4".
- App title, task input, add control, task list area, and empty state.
- Loading state in task list area before saved tasks finish loading.
- Recoverable load error state with retry action while input remains visible.
- Display of saved task rows when tasks exist, including title, completion state, created-order position, completion control, and delete control as visual/layout elements.
- Mobile layout at 320px with no horizontal page scroll.
- Desktop layout with centered content area and aligned input/list width.
- No login controls, account prompts, top navigation, or multi-page navigation.

## Out of scope

- Creating, saving, trimming, validating, or clearing new tasks; covered by Add persisted tasks.
- Toggling completion state; covered by Toggle task completion.
- Deleting tasks; covered by Delete persisted tasks.
- Final keyboard, focus, motion, disabled, and error polish beyond layout-visible states; covered by Polish todo interactions.
- Filters, search, sorting choices, due dates, priorities, categories, sharing, collaboration, and authentication.
- Backend endpoint design, database schema changes, and persistence implementation beyond consuming task data shape needed for layout.

## UI scope

This story touches approved Todo page only.

- Page shell uses one `main` landmark over `#F8FAFC` background with centered max-width content.
- Main app card uses approved blue-white surface treatment: white card, blue/green top accent, rounded large radius, and soft shadow.
- Header shows app title and saved/status pill area.
- Todo form area shows real input and add button layout, but submit behavior can remain non-functional/mocked for this story.
- Task list area supports three layout states: loading, empty, and populated list.
- Populated rows follow Todo Item anatomy: completion control, task text, metadata, and delete button.
- Error state panel appears in list area with retry action and recoverable copy.
- State examples section can remain as approved design preview if already present; runtime work for this story centers on main todo workspace.

## Acceptance criteria

1. Given User has no saved tasks, when User opens app, then page shows app title, task input, add control, empty state, and no login or navigation controls.
2. Given User has saved tasks, when User opens app, then page shows app title, task input, add control, and list of saved tasks in stable created order.
3. Given saved tasks are still loading, when User opens app, then task list area shows visible loading state instead of blank content.
4. Given saved tasks cannot be loaded, when User opens app, then task list area shows recoverable error state with retry action and input remains visible.
5. Given viewport width is 320px, when User opens app, then page content fits without horizontal page scroll.
6. Given viewport width is desktop size, when User opens app, then input and task list stay visually aligned within centered content area.
7. Given visible task title is long, when User views list, then task row wraps text without breaking page width.
8. Given User has no account, when User opens app, then all visible todo controls remain available and no authentication prompt appears.

## Dependencies

- Approved design and `design/design-system.md` tokens/components.
- `docs/architecture/overview.md` frontend conventions: Next.js App Router, TypeScript, Tailwind v3.
- Task data shape for layout: title, completion state, and created-order value.
- Persistent storage/backend can still be mocked for this UI story; live persistence behavior belongs to later stories.
- No external accounts or secrets needed.
