# Project Guidelines

## 1. Componentization

Extract UI into components whenever it improves reuse or readability. Place each component at the **narrowest scope that uses it**:

| Scope | Location | Examples |
|---|---|---|
| Global (used across the app) | `@/components` | `Button`, `Input`, `Card`, `Modal` |
| Shared within a route group | `@/app/(route-group)/components` | Group-specific layout pieces, shared sections |
| Used by a single page | `@/app/(route-group)/<page>/components` | Page-specific sections and widgets |

**Rules**
- Start local. Promote a component to a wider scope only when a second consumer outside the current scope needs it.
- Never import a page-scoped component from another page. Promote it instead.
- One component per file; file name matches the component name.
- Keep components small and focused. If a component grows past ~150 lines or handles several concerns, split it.

## 2. Separation of Logic and UI

Components should focus on rendering. Move logic into custom hooks.

- State management, data fetching, side effects, form handling and derived data belong in hooks.
- Trivial logic (a single `useState` toggle, a simple conditional) may stay inline.
- Hooks follow the **same scoping rules and folder structure** as components, using `hooks` instead of `components`:
  - `@/hooks`
  - `@/app/(route-group)/hooks`
  - `@/app/(route-group)/<page>/hooks`
- Name hooks by what they do: `useUserProfile`, `useCheckoutForm`, not `useLogic` or `usePageData`.
- A hook should return data and handlers, never JSX.

## 3. UI

### 3.1 Consistency

- Use the design system's tokens for spacing, radius, colors, typography and shadows (e.g. the theme / Tailwind scale). Avoid arbitrary one-off values.
- Keep spacing (padding, margin, gap) and border radius consistent across similar elements. Components of the same kind must look and behave the same everywhere.
- Before creating a new UI primitive, check `@/components` for an existing one to reuse or extend.

### 3.2 Design and Motion

- Aim for a clean, modern look: clear hierarchy, generous whitespace, restrained color use.
- Animate interactive transitions (opening menus, dropdowns, modals, drawers, accordions, toasts) so they feel smooth rather than abrupt.
  - Keep durations short: roughly **150–300 ms**.
  - Prefer `ease-out` for entering and `ease-in` for exiting elements.
  - Animate `transform` and `opacity` rather than layout properties (`width`, `height`, `top`) for performance.
- Respect `prefers-reduced-motion`: disable or reduce non-essential animations when it is set.
- Every interactive element needs visible hover, focus and disabled states.

## 4. Working with Libraries

Whenever a task involves a library (installing, using, configuring, upgrading or debugging it):

1. **Check the installed version first.** Read it from `package.json` (and the lockfile if the range is ambiguous). Never assume a version.
2. **Verify your knowledge matches that version.** If you are unfamiliar with the library, unsure about its API in that version, or the version may be newer than your training data, **use Context7** to fetch the current documentation before answering or writing code.
3. **Write code for the installed version**, not for older or newer APIs. If an API you would normally use is deprecated or changed, follow the documented replacement.
4. **Never invent APIs.** If Context7 has no documentation for the library, say so explicitly and state what you are unsure about instead of guessing.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
