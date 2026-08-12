# Design System — Todo List App v4

> Source of truth: approved `index.html`.
> Every value below is extracted from it. Changing a value here without changing approved design is defect.

Last updated: 2026-08-12

## 1. Foundations

### 1.1 Color

Semantic tokens. Name by job, never by hue.

| Token | Value | Used for |
|---|---|---|
| `--color-bg` | `#F8FAFC` | Page background, completed todo background |
| `--color-surface` | `#FFFFFF` | Card, input, button, metric, todo item, mini-card background |
| `--color-surface-raised` | `#FFFFFF` | Raised app card and active filter surface |
| `--color-surface-soft` | `#EFF6FF` | Soft badge, filter rail, calm accent surface |
| `--color-surface-info` | `#F8FBFF` | Empty, loading state surface |
| `--color-surface-error` | `#FFF7F7` | Error state surface |
| `--color-primary` | `#2563EB` | Primary action, focus, icon stroke, gradient start |
| `--color-primary-hover` | `#1D4ED8` | Primary hover, emphasized blue text |
| `--color-primary-soft` | `#DBEAFE` | Borders, icon fill, spinner track, background radial start |
| `--color-primary-soft-strong` | `#BFDBFE` | Input border, todo hover border, dashed state border |
| `--color-primary-soft-faint` | `#E0EDFF` | Todo item border |
| `--color-primary-accent` | `#60A5FA` | App card top gradient middle |
| `--color-border` | `#DBEAFE` | Default border and divider |
| `--color-text` | `#0F172A` | Body text, task text, state headings |
| `--color-text-muted` | `#64748B` | Secondary text, captions, inactive filter |
| `--color-text-disabled` | `#94A3B8` | Placeholder and completed task text |
| `--color-primary-text` | `#FFFFFF` | Text on primary action and checked task mark |
| `--color-success` | `#10B981` | Completed checkbox, sync success, pulse dot, gradient end |
| `--color-warning` | `#F59E0B` | Saving sync dot |
| `--color-danger` | `#EF4444` | Field error, storage icon stroke |
| `--color-danger-text` | `#B91C1C` | Delete button text, error state title |
| `--color-danger-soft` | `#FEE2E2` | Delete button background, error icon fill |
| `--color-danger-soft-hover` | `#FECACA` | Delete hover, error border |
| `--color-focus` | `#2563EB` | Focus ring stroke and glow |

#### Contrast audit

Every text-on-background pair actually used. Body text ≥ 4.5:1, large text (≥ 18.66px bold or ≥ 24px) ≥ 3:1, UI borders ≥ 3:1.

| Foreground | Background | Ratio | Passes |
|---|---|---|---|
| `--color-text` | `--color-bg` | `16.8:1` | AA |
| `--color-text` | `--color-surface` | `17.8:1` | AA |
| `--color-text-muted` | `--color-bg` | `4.7:1` | AA |
| `--color-text-muted` | `--color-surface` | `4.8:1` | AA |
| `--color-text-muted` | `--color-surface-info` | `4.6:1` | AA |
| `--color-text-disabled` | `--color-surface` | `2.6:1` | FAIL for body text; allowed only as placeholder/completed secondary treatment |
| `--color-primary-text` | `--color-primary` | `5.2:1` | AA |
| `--color-primary-hover` | `--color-surface-soft` | `6.4:1` | AA |
| `--color-primary-hover` | `--color-surface` | `6.7:1` | AA |
| `--color-danger` | `--color-surface` | `3.8:1` | FAIL for 13px field error text |
| `--color-danger-text` | `--color-danger-soft` | `5.5:1` | AA |
| `--color-danger-text` | `--color-surface-error` | `6.3:1` | AA |
| `--color-border` | `--color-surface` | `1.2:1` | FAIL as UI boundary if contrast-only required; compensated by card shadow/spacing in approved mockup |
| `--color-primary-soft-strong` | `--color-surface` | `1.4:1` | FAIL as UI boundary if contrast-only required |

### 1.2 Spacing

Base unit: `4px`. Every margin, padding, and gap in product should use one of these extracted values.

| Token | Value |
|---|---|
| `--space-0` | `0px` |
| `--space-1` | `3px` |
| `--space-2` | `4px` |
| `--space-3` | `7px` |
| `--space-4` | `8px` |
| `--space-5` | `10px` |
| `--space-6` | `12px` |
| `--space-7` | `13px` |
| `--space-8` | `14px` |
| `--space-9` | `15px` |
| `--space-10` | `16px` |
| `--space-11` | `18px` |
| `--space-12` | `20px` |
| `--space-13` | `22px` |
| `--space-14` | `24px` |
| `--space-15` | `28px` |
| `--space-16` | `30px` |
| `--space-17` | `32px` |
| `--space-18` | `34px` |
| `--space-19` | `64px` |

Non-scale CSS offsets extracted from approved mockup: `-9999px` for visually-hidden label only, `34rem` radial gradient stop, `calc(100vh - 92px)` hero height, `1120px` max container width, `560px` metric max width, `590px` lede max width, `140px` todo list minimum height, `156px` mini-card minimum height.

### 1.3 Typography

Font families, loaded by system fallback only:

- Body: `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
- Headings: inherit body stack
- Mono: none used

| Token | Size | Line height | Weight | Used for |
|---|---|---|---|---|
| `--text-xs` | `12px` | `1.35` inherited in todo metadata context | `650` | Todo metadata |
| `--text-sm` | `13px` | normal | `700` or `800` | Eyebrow, pills, filters, sync, metric captions, field error |
| `--text-base` | `16px` | normal | inherited, `750` for task text | Body, input, button inherited font, task title |
| `--text-lg` | `18px` | normal | browser default bold for h2 section title | Section title |
| `--text-xl` | `19px` | `1.7` | normal | Lede paragraph |
| `--text-2xl` | `24px` | normal | browser default bold | App title, metric number |
| `--text-hero` | `clamp(42px, 7vw, 78px)` | `.95` | browser default bold | Hero h1 |

Heading levels are used in order: page h1, card h2, states h2. No skipped heading level in approved mockup.

### 1.4 Radius, border, shadow, motion

| Token | Value | Used for |
|---|---|---|
| `--radius-xs` | `8px` | SVG card illustration corners |
| `--radius-sm` | `10px` | Filter button, checkbox |
| `--radius-md` | `12px` | Eyebrow padding shape, status pill padding shape, delete button |
| `--radius-lg` | `14px` | Filter rail |
| `--radius-xl` | `16px` | Button, input |
| `--radius-2xl` | `18px` | Metric card, todo item |
| `--radius-3xl` | `20px` | Empty/loading/error state, mini-card |
| `--radius-4xl` | `24px` | Root card radius token, design language ceiling |
| `--radius-card` | `32px` | Main app card |
| `--radius-full` | `50%`, `999px` | Dots, spinner, eyebrow/status pill |
| `--border-width` | `1px` | Default border, divider, input, dashed state border |
| `--border-width-strong` | `2px` | Checkbox border |
| `--border-width-spinner` | `4px` | Spinner ring |
| `--shadow-focus` | `0 0 0 4px rgba(37,99,235,.24), 0 0 0 1px #2563EB` | Keyboard focus |
| `--shadow-sm` | `0 6px 14px rgba(37,99,235,.12)` | Active filter |
| `--shadow-md` | `0 14px 28px rgba(37,99,235,.28)` | Primary button |
| `--shadow-lg` | `0 24px 60px rgba(37,99,235,.14)` | Main app card |
| `--shadow-success-pulse` | `0 0 0 10px rgba(16,185,129,0)` | Pulse animation end |
| `--duration-fast` | `.18s` | Hover, focus, transform, border, background, opacity |
| `--duration-base` | `.65s` | Main app card rise animation |
| `--duration-loading` | `.8s` | Spinner rotation |
| `--duration-pulse` | `1s`, `1.8s` | Loading sync dot and eyebrow pulse |
| `--easing` | `ease` | State transitions and rise |
| `--easing-linear` | `linear` | Spinner |

Motion respects `prefers-reduced-motion: reduce`: animation, smooth scroll, and transitions are removed while state changes remain.

### 1.5 Layout and breakpoints

| Name | Min width | Container | Columns | Gutter |
|---|---|---|---|---|
| `base` | `0px` | `100% - 40px`, padding `20px` sides | 1 | `10px` to `34px` by component |
| `md` | `860px` | max `1120px` | Hero: 2 columns (`1.02fr .98fr`); metrics/states: 3 columns | `12px`, `34px` hero |

Z-index scale: no positive `z-index` values appear in approved mockup.

| Layer | Value |
|---|---|
| Base | `0` |
| Sticky header | Not used |
| Dropdown | Not used |
| Modal backdrop | Not used |
| Modal | Not used |
| Toast | Not used |

## 2. Components

### 2.1 Page Shell

**Purpose** — Centers single-page app and provides responsive horizontal and bottom spacing. Do not use for nested cards.

**Anatomy** — `[main.shell] [hero section] [states section]`.

**Variants**

| Variant | Tokens | When to use |
|---|---|---|
| Default shell | `--space-15`, `--space-12`, `--space-19`, `1120px` | Whole todo app page |

**Sizes**

| Size | Height | Padding | Text token |
|---|---|---|---|
| Base | `auto` | `28px 20px 64px` | Inherited |

**States**

| State | Visual change | Tokens |
|---|---|---|
| Default | Centered max-width page over radial background | `--color-bg`, `--color-primary-soft`, max `1120px` |
| Hover | No change | none |
| Focus (keyboard) | Focus passes to child controls | none |
| Active / pressed | No change | none |
| Disabled | Not applicable | none |
| Loading | Child loading state appears inside app card | child component tokens |
| Error | Child error state appears inside app card | child component tokens |
| Empty | Child empty state appears inside app card | child component tokens |

**Accessibility** — Use `main` landmark once per page. Minimum hit target handled by child controls.

### 2.2 Hero Summary

**Purpose** — Explains app value and provides anchor navigation to todo list and states. Do not use for dense data screens.

**Anatomy** — `[eyebrow] [h1] [lede] [primary action] [secondary action] [metrics]`.

**Variants**

| Variant | Tokens | When to use |
|---|---|---|
| Two-column hero | `--space-18`, `--text-hero`, `--text-xl` | Desktop page top |
| Single-column hero | same tokens | Viewport under `860px` |

**Sizes**

| Size | Height | Padding | Text token |
|---|---|---|---|
| Desktop | `calc(100vh - 92px)` min | none inside grid | `--text-hero` |
| Mobile | `auto` | `28px` top | `--text-hero` |

**States**

| State | Visual change | Tokens |
|---|---|---|
| Default | Large calm heading, blue-white badge, metric cards | `--color-text`, `--color-text-muted`, `--color-surface` |
| Hover | Action buttons lift | button tokens |
| Focus (keyboard) | Anchor buttons show visible ring | `--shadow-focus`, `--color-focus` |
| Active / pressed | Link follows anchor | browser anchor behavior |
| Disabled | Not used | none |
| Loading | Not used | none |
| Error | Not used | none |
| Empty | Metrics can show `0` counts, layout remains | metric tokens |

**Accessibility** — One `h1`. Highlight metrics grouped with `aria-label="App highlights"`. Anchor controls use readable text.

### 2.3 Button and Anchor Button

**Purpose** — Primary task action, secondary navigation, submit. Do not use for filter tabs or delete action where separate tokens exist.

**Anatomy** — `[label]` or `[label] [icon?]`.

**Variants**

| Variant | Tokens | When to use |
|---|---|---|
| Primary | `--color-primary`, `--color-primary-hover`, `--color-primary-text`, `--shadow-md` | Add task, open todo list |
| Soft | `--color-surface`, `--color-primary-hover`, `--color-border` | Secondary anchor action |

**Sizes**

| Size | Height | Padding | Text token |
|---|---|---|---|
| Default | at least `44px` | `13px 18px` | `--text-base`, weight `800` |

**States**

| State | Visual change | Tokens |
|---|---|---|
| Default | Rounded filled or soft button | `--radius-xl`, variant colors |
| Hover | Moves up `-2px`; primary darkens | `--duration-fast`, `--color-primary-hover` |
| Focus (keyboard) | Visible blue ring and glow | `--shadow-focus`, `--color-focus` |
| Active / pressed | Browser click/anchor activation; no separate pressed style | default tokens |
| Disabled | Cursor not-allowed, opacity `.55`; submit disabled until input has text | opacity `.55` |
| Loading | Saving shown outside button in sync status; button has no spinner | sync tokens |
| Error | Field error appears below form; button style unchanged | error tokens |
| Empty | Add button disabled when input empty | disabled tokens |

**Accessibility** — Use `button` for actions and `a` for anchors. Minimum hit target ≥ 44×44px. Disabled submit uses native `disabled`.

### 2.4 App Card

**Purpose** — Main todo app surface. Do not use for small state example cards.

**Anatomy** — `[top accent bar] [header/title/status] [todo form] [field error] [toolbar] [loading?] [todo list] [empty?] [error?]`.

**Variants**

| Variant | Tokens | When to use |
|---|---|---|
| Main app card | `--color-surface`, `--shadow-lg`, `--radius-card`, `--color-primary`, `--color-primary-accent`, `--color-success` | Todo list preview/runtime surface |

**Sizes**

| Size | Height | Padding | Text token |
|---|---|---|---|
| Responsive | `auto` | `22px`, plus `7px` top accent | inherited |

**States**

| State | Visual change | Tokens |
|---|---|---|
| Default | White translucent card, blue-green accent bar, large radius, soft shadow | `--color-surface`, `--shadow-lg`, `--radius-card` |
| Hover | No card-level hover | none |
| Focus (keyboard) | Child controls receive focus rings | `--shadow-focus` |
| Active / pressed | No card-level active state | none |
| Disabled | Child controls can disable; card unchanged | child tokens |
| Loading | Loading panel shown, list hidden at initial restore | loading component tokens |
| Error | Recoverable storage error panel shown below list | error state tokens |
| Empty | Empty panel shown when filtered list has no tasks | empty state tokens |

**Accessibility** — Use `article` with `aria-label="Todo list preview"`. Keep child live regions and alerts.

### 2.5 Todo Form and Text Input

**Purpose** — Captures new task text. Do not use for search unless copy and validation change.

**Anatomy** — `[visually hidden label] [text input] [submit button] [field error]`.

**Variants**

| Variant | Tokens | When to use |
|---|---|---|
| Inline desktop | `--space-5`, `--radius-xl`, `--color-primary-soft-strong` | Width ≥ `860px` |
| Stacked mobile | same tokens | Width < `860px` |

**Sizes**

| Size | Height | Padding | Text token |
|---|---|---|---|
| Default | at least `44px` | input `14px 15px`, form gap `10px` | `--text-base` |

**States**

| State | Visual change | Tokens |
|---|---|---|
| Default | White input, light blue border, placeholder text | `--color-surface`, `--color-primary-soft-strong`, `--color-text-disabled` |
| Hover | No separate hover | default tokens |
| Focus (keyboard) | Visible blue ring and glow | `--shadow-focus`, `--color-focus` |
| Active / pressed | Text cursor, native input editing | `--color-text` |
| Disabled | Submit disabled when text empty; input not disabled in mockup | button disabled tokens |
| Loading | Submit stays available after add; saving status appears in toolbar | sync tokens |
| Error | Field error appears with red 13px bold copy; input focuses | `--color-danger`, `--text-sm` |
| Empty | Empty input shows placeholder; add button disabled | `--color-text-disabled`, opacity `.55` |

**Accessibility** — Keep real `label` for input even when visually hidden. `maxlength="80"`. Field error uses `role="alert"`. Minimum hit target ≥ 44×44px.

### 2.6 Filter Control

**Purpose** — Switches visible tasks between all, open, and done. Do not use as navigation outside task filtering.

**Anatomy** — `[filter rail] [filter button: All] [filter button: Open] [filter button: Done]`.

**Variants**

| Variant | Tokens | When to use |
|---|---|---|
| Segmented filter | `--color-surface-soft`, `--color-border`, `--radius-lg` | Todo list status filtering |
| Active segment | `--color-surface`, `--color-primary-hover`, `--shadow-sm` | Current filter |

**Sizes**

| Size | Height | Padding | Text token |
|---|---|---|---|
| Default | at least `36px`; target area supported by rail | rail `4px`, segment `8px 10px` | `--text-sm`, weight `800` |

**States**

| State | Visual change | Tokens |
|---|---|---|
| Default | Transparent segment, muted text | `--color-text-muted` |
| Hover | No separate hover in approved mockup | default tokens |
| Focus (keyboard) | Visible blue ring and glow on button | `--shadow-focus`, `--color-focus` |
| Active / pressed | Active segment turns white, blue text, small shadow | `--color-surface`, `--color-primary-hover`, `--shadow-sm` |
| Disabled | Not used | none |
| Loading | No change while tasks load | default tokens |
| Error | No change when storage error appears | default tokens |
| Empty | Filter can produce empty state panel | empty state tokens |

**Accessibility** — Rail has `aria-label="Filter tasks"`. Buttons remain keyboard reachable. Active state is visual; implementation should also expose selected state with `aria-pressed` or equivalent.

### 2.7 Sync Status Pill

**Purpose** — Shows save/persistence status. Do not use for form validation errors.

**Anatomy** — `[status dot] [status text]`, plus header status pill text.

**Variants**

| Variant | Tokens | When to use |
|---|---|---|
| Saved | `--color-success`, `--color-text-muted` | All changes saved |
| Saving | `--color-warning`, pulse animation | Persist call in flight |
| Error | `--color-danger` | Persist call failed/retry needed |

**Sizes**

| Size | Height | Padding | Text token |
|---|---|---|---|
| Inline sync | at least content height | gap `8px` | `--text-sm`, weight `700` |
| Header pill | at least `35px` | `8px 12px` | `--text-sm`, weight `800` |

**States**

| State | Visual change | Tokens |
|---|---|---|
| Default | Green dot, muted text; header says `Saved` | `--color-success`, `--color-text-muted` |
| Hover | No change | none |
| Focus (keyboard) | Not focusable | none |
| Active / pressed | No change | none |
| Disabled | Not used | none |
| Loading | Dot becomes warning and pulses; text says `Saving change...`; pill says `Saving` | `--color-warning`, `--duration-pulse` |
| Error | Dot becomes red; text says `Could not save yet`; pill says `Retry needed` | `--color-danger` |
| Empty | Saved state still shown if empty list is persisted | saved tokens |

**Accessibility** — Keep status text visible, not color-only. Use polite live region in implementation if persistence becomes asynchronous.

### 2.8 Todo Item

**Purpose** — Displays one task with completion and delete actions. Do not use for non-task records.

**Anatomy** — `[check button] [task text] [metadata] [delete button]`.

**Variants**

| Variant | Tokens | When to use |
|---|---|---|
| Open task | `--color-surface`, `--color-text`, `--color-primary-soft-faint` | Incomplete task |
| Completed task | `--color-bg`, `--color-text-disabled`, `--color-success` | Done task |

**Sizes**

| Size | Height | Padding | Text token |
|---|---|---|---|
| Default | at least `52px` | item `12px`, grid gap `12px` | task `--text-base`, meta `--text-xs` |

**States**

| State | Visual change | Tokens |
|---|---|---|
| Default | White card, light border, 3-column grid | `--color-surface`, `--color-primary-soft-faint`, `--radius-2xl` |
| Hover | Moves up `-1px`, border changes to stronger blue | `--duration-fast`, `--color-primary-soft-strong` |
| Focus (keyboard) | Check/delete buttons show visible blue ring | `--shadow-focus`, `--color-focus` |
| Active / pressed | Check toggles completed; delete removes item | completion/delete tokens |
| Disabled | Not used in mockup | none |
| Loading | Item remains visible while sync status says saving | sync tokens |
| Error | Item remains visible; storage error panel says no data loss | error state tokens |
| Empty | Todo list hides items; empty panel shown | empty state tokens |

**Accessibility** — List uses `ul` with `aria-live="polite"`. Check button has action label `Mark complete` or `Mark incomplete`. Delete has `aria-label="Delete task"`. Minimum hit target should be brought to 44×44px in implementation; approved visual check is 28×28px with surrounding item padding.

### 2.9 Check Button

**Purpose** — Toggles task completion. Do not use as decorative icon.

**Anatomy** — `[square rounded control] [checkmark when done]`.

**Variants**

| Variant | Tokens | When to use |
|---|---|---|
| Open | `--color-surface`, `--color-primary-soft-strong` | Incomplete task |
| Done | `--color-success`, `--color-primary-text` | Completed task |

**Sizes**

| Size | Height | Padding | Text token |
|---|---|---|---|
| Default | `28px` | `0` internal, grid centered | checkmark inherited |

**States**

| State | Visual change | Tokens |
|---|---|---|
| Default | White box, light blue 2px border | `--color-surface`, `--border-width-strong` |
| Hover | Parent todo hover lift; button no separate hover | todo hover tokens |
| Focus (keyboard) | Visible blue ring and glow | `--shadow-focus`, `--color-focus` |
| Active / pressed | Toggles to done or open | `--color-success` |
| Disabled | Not used | none |
| Loading | No spinner; sync status reports saving | sync tokens |
| Error | State stays visible; storage error reports recovery | error tokens |
| Empty | Not rendered | none |

**Accessibility** — Native button. Dynamic `aria-label`. Visual size is below 44×44px, but row padding provides larger practical pointer area only if implementation preserves clickable button or expands hit target.

### 2.10 Delete Button

**Purpose** — Deletes one task. Do not use for non-destructive secondary actions.

**Anatomy** — `[label: Delete]`.

**Variants**

| Variant | Tokens | When to use |
|---|---|---|
| Destructive soft | `--color-danger-soft`, `--color-danger-text`, `--color-danger-soft-hover` | Per-task delete |

**Sizes**

| Size | Height | Padding | Text token |
|---|---|---|---|
| Default | at least `33px`; implementation should expand to 44px target | `8px 10px` | `--text-base`, weight `900` |

**States**

| State | Visual change | Tokens |
|---|---|---|
| Default | Soft red background, dark red text | `--color-danger-soft`, `--color-danger-text`, `--radius-md` |
| Hover | Background becomes stronger soft red | `--color-danger-soft-hover` |
| Focus (keyboard) | Visible blue ring and glow | `--shadow-focus`, `--color-focus` |
| Active / pressed | Removes task from list | destructive action behavior |
| Disabled | Not used | none |
| Loading | Item removed optimistically; sync status says saving | sync tokens |
| Error | Error panel states task stays visible/recovery if persistence fails | error state tokens |
| Empty | Not rendered | none |

**Accessibility** — Native button with `aria-label="Delete task"`. Destructive action is immediate in mockup; implementation may need undo only if product scope later asks.

### 2.11 Empty, Loading, and Error State Panel

**Purpose** — Shows reachable non-success states for task list and state examples. Do not leave blank areas.

**Anatomy** — `[icon or spinner] [strong title] [supporting text]`.

**Variants**

| Variant | Tokens | When to use |
|---|---|---|
| Empty | `--color-surface-info`, dashed `--color-primary-soft-strong`, `--color-text-muted` | No tasks visible for current filter |
| Loading | `--color-surface-info`, spinner tokens | Restoring saved tasks |
| Error | `--color-surface-error`, `--color-danger-soft-hover`, `--color-danger-text` | Storage/persistence issue |

**Sizes**

| Size | Height | Padding | Text token |
|---|---|---|---|
| Full panel | auto | `22px` | title `--text-base`, copy inherited with muted color |
| Mini-card | min `156px` | `16px` | title `--text-base` |

**States**

| State | Visual change | Tokens |
|---|---|---|
| Default | Hidden until its condition is true | `hidden` attribute |
| Hover | No change | none |
| Focus (keyboard) | Not focusable | none |
| Active / pressed | No change | none |
| Disabled | Not used | none |
| Loading | Spinner rotates; copy says loading saved tasks | `--duration-loading`, `--easing-linear` |
| Error | Red-tinted panel with recoverable no-data-loss message | `--color-surface-error`, `--color-danger-text` |
| Empty | Dashed blue panel with next action copy | `--color-surface-info`, `--color-primary-soft-strong` |

**Accessibility** — Loading spinner has `aria-hidden="true"` because visible text conveys status. Field errors use `role="alert"`; storage error should be announced by implementation if it appears after user action. Empty state includes next action.

### 2.12 Metric Card

**Purpose** — Shows total, open, and completed task counts. Do not use for arbitrary marketing stats.

**Anatomy** — `[number] [label]`.

**Variants**

| Variant | Tokens | When to use |
|---|---|---|
| Translucent metric | `--color-surface`, `--color-border`, `--radius-2xl` | Hero app highlights |

**Sizes**

| Size | Height | Padding | Text token |
|---|---|---|---|
| Default | auto | `16px` | number `--text-2xl`, label `--text-sm` |

**States**

| State | Visual change | Tokens |
|---|---|---|
| Default | White translucent card, blue border | `--color-surface`, `--color-border` |
| Hover | No change | none |
| Focus (keyboard) | Not focusable | none |
| Active / pressed | No change | none |
| Disabled | Not used | none |
| Loading | Counts not shown as skeleton in mockup; loading state is inside app card | loading tokens |
| Error | Counts stay based on visible local tasks | text tokens |
| Empty | Counts can show `0` | text tokens |

**Accessibility** — Metrics group has `aria-label="App highlights"`; numbers must have adjacent labels.

### 2.13 Mini State Card

**Purpose** — Documents reachable loading, empty, and error examples below main app. Do not use inside task list.

**Anatomy** — `[mini-card] [icon/spinner] [strong title] [supporting text]`.

**Variants**

| Variant | Tokens | When to use |
|---|---|---|
| Loading example | loading state tokens | State preview |
| Empty example | empty state tokens | State preview |
| Error example | error state tokens | State preview |

**Sizes**

| Size | Height | Padding | Text token |
|---|---|---|---|
| Default | min `156px` | `16px` | `--text-base` |

**States**

| State | Visual change | Tokens |
|---|---|---|
| Default | White mini-card with state-specific inner style | `--color-surface`, `--color-border`, `--radius-3xl` |
| Hover | No change | none |
| Focus (keyboard) | Not focusable | none |
| Active / pressed | No change | none |
| Disabled | Not used | none |
| Loading | Spinner rotates in loading card | spinner tokens |
| Error | Error card uses red tint and dark red title | error tokens |
| Empty | Empty card uses prompt copy and blue icon | empty tokens |

**Accessibility** — Section has `aria-label="Todo state examples"`. Decorative SVGs and spinners use `aria-hidden="true"`.

## 3. Content and formatting

- Voice and tone: calm, direct, productivity-focused, no hype.
- Date, time, number, and currency formats: no dates, times, or currency in approved mockup; counts use plain English numerals and labels, locale-neutral English.
- Capitalization rule: sentence case for buttons, headings, labels, and state messages, except short filter labels `All`, `Open`, `Done`.
- Empty-state wording pattern: title names missing content, body gives next action. Example: `No tasks here` followed by `Add one task above, then mark it complete when finished.`
- Error-message wording pattern: plain recoverable problem plus reassurance/no data loss. Examples: `Storage hiccup`; `Task stays visible. Try again after connection recovers.`
- Validation wording pattern: imperative fix. Example: `Enter a task before adding it.`

## 4. Known deviations

Places where approved design does not follow its own rules or anti-patterns in `references/ai-defaults.md`. Record, do not silently fix.

| Where | Deviation | Why it stands | Follow-up |
|---|---|---|---|
| Color contrast: `#EF4444` on `#FFFFFF` field error | Ratio `3.8:1`, below 4.5:1 for 13px text | Approved mockup uses this red for error identity | Darken field error text or raise font size/weight during implementation review |
| Color contrast: `#94A3B8` on `#FFFFFF` placeholder/completed text | Ratio `2.6:1`, below body AA | Approved mockup uses muted disabled treatment | Keep only for placeholder/non-essential text, not body copy |
| UI borders: `#DBEAFE` and `#BFDBFE` on white | Border contrast under 3:1 | Approved mockup relies on spacing, shadow, and filled surfaces | Strengthen border token if usability testing shows weak boundaries |
| Spacing scale | Uses `3px`, `7px`, `13px`, `15px`, `18px`, `22px`, `30px`, `34px` outside strict 4px multiples | Approved mockup has hand-tuned compact UI | Normalize future implementation to nearest 4px token unless pixel match required |
| Border radius scale | Uses many radii: `8`, `10`, `12`, `14`, `16`, `18`, `20`, `24`, `32`, `50%`, `999px` | Approved mockup uses distinct radii by element type | Limit new components to existing semantic radii; do not add more |
| Gradient decoration | Body background radial gradient and app card top linear gradient are decorative | Stakeholder approved polished blue-white style; gradients are restrained | Avoid new decorative gradients unless adding meaningful hierarchy |
| Hit target: `.check` button | Visual control is `28px × 28px`, below 44px target | Todo row padding improves discoverability but button itself remains small | Expand clickable area in implementation without changing visual size |
| Hit target: `.delete` button | Visual height about `33px`, below 44px target | Fits compact todo row in approved mockup | Ensure implementation uses row padding or larger hit target |

## 5. Change log

| Date | Change | Design PR |
|---|---|---|
| 2026-08-12 | Extracted design system from approved `index.html` | This PR |
