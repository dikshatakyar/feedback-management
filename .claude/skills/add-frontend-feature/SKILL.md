---
name: add-frontend-feature
description: Add or change UI for a feature in Pulse's React client (feature folder, API function, query hook, components, page). Use whenever work touches client/src. Reference implementation is the feedback feature.
---

# Add a Frontend Feature

Reference: `client/src/features/feedback/` and `pages/FeedbackPage.tsx`.

## Structure — `client/src/features/<name>/`

- `<name>-api.ts` — types + functions calling `apiRequest` from `lib/api.ts` (never call `fetch` directly).
- `use<Name>.ts` — TanStack Query hooks (`useQuery` for reads; `useMutation` + `invalidateQueries` for writes).
- `<Name>Form.tsx`, `<Name>List.tsx` — presentational components. Lists take props (`items`, `isLoading`, `error`) so they're trivially testable.
- `pages/<Name>Page.tsx` — thin: calls hooks, composes components.

## Rules

- Every list/fetch handles **loading, empty, and error** states.
- Forms: controlled inputs, labels on every field, server error shown inline with `role="alert"`.
- Local UI state → `useState`; server state → TanStack Query. No global store.
- Keep the client types aligned with the server response shape (see the repo type in `server/src/db/`).
- Dev proxy sends `/api` to the server (`vite.config.ts`); don't hardcode URLs.

## Test

React Testing Library test for the presentational component's visible behavior (see `FeedbackList.test.tsx`). Run `npm run typecheck && npm test` in `client/`.
