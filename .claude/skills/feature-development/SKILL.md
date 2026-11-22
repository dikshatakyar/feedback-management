---
name: feature-development
description: Workflow for planning and implementing a feature in Pulse. Use when the user asks to add, build, or change a feature, endpoint, or screen. Covers clarifying scope, a short plan, vertical-slice implementation, testing, and review.
---

# Feature Development

Follow these phases in order. Keep each lightweight — a small feature needs a small plan.

## 1. Understand

- Restate the feature in 1–2 sentences: who it's for and what outcome they get.
- Read `CLAUDE.md` and the nearby existing code (similar feature, same layer) to learn the patterns in use.
- List open questions. If any are product decisions that change the design, **ask the user before planning**. Otherwise pick the simplest sensible default and state it.

## 2. Plan

Write a short plan in chat (no plan file unless the user asks). Include:

- **Scope:** what's in, and explicitly what's out (defer nice-to-haves).
- **Data:** new/changed tables or fields.
- **API:** endpoints, request/response shapes, error cases.
- **UI:** screens/components and their states (loading, empty, error).
- **Files:** which files will be created or changed, by layer.
- **Tests:** what will be covered.

Then **wait for user approval** before writing code, unless the change is trivial (a few lines, one file).

## 3. Implement — vertical slice, bottom up

Build one thin working slice end to end rather than all layers at once:

1. **DB:** migration + query functions in `server/src/db/`.
2. **Schema:** Zod schemas in `server/src/schemas/`.
3. **Service:** business logic in `server/src/services/`.
4. **Controller + route:** wire the endpoint; validate input; use the shared error shape.
5. **Client API + hook:** function in `lib/api` or the feature folder, TanStack Query hook.
6. **UI:** feature components, then page wiring. Handle loading/empty/error.

Rules while implementing:
- Follow the layer boundaries in `CLAUDE.md`; no SQL in controllers, no `req/res` in services.
- Reuse existing utilities and patterns. Don't add dependencies without asking.
- Don't build beyond the agreed scope. Note follow-up ideas instead.

## 4. Test

- Write tests alongside each layer as you go: service unit tests, API tests for the happy path and main failures, UI tests for key user behavior.
- Run typecheck, lint, and tests. Fix failures at the root cause.

## 5. Verify

- Run the app and exercise the feature as a user would, including an error case. If you can't run it, say so explicitly.
- Review your own diff: remove debug code, unused imports, and anything outside scope.

## 6. Wrap up

Report briefly:
- What was built and where (key files).
- How it was verified (commands run, results — including any failures or skipped checks).
- Deferred items or follow-ups.

Commit only when the user asks.

## Checklist

- [ ] Scope confirmed; plan approved (if non-trivial)
- [ ] Layers respected, patterns followed
- [ ] Input validated; errors use the shared shape
- [ ] Loading / empty / error states handled
- [ ] Tests added and passing; typecheck and lint clean
- [ ] No unrelated changes or new unrequested dependencies
