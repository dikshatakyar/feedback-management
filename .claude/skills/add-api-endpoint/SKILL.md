---
name: add-api-endpoint
description: Add or change a backend REST endpoint in Pulse's server (route, controller, service, repo, schema). Use whenever work touches server/src layers. Reference implementation is the feedback feature.
---

# Add an API Endpoint

Reference: `server/src/**/feedback.*` — copy its shape, don't invent a new one.

## Layer checklist (bottom up)

0. **Migration** (if the schema changes) — follow the `add-migration` skill first.
1. **Repo** `db/<name>.repo.ts` — `createXRepo(db)` returns plain functions. Only place with query SQL; parameterized (`?`) only.
2. **Schema** `schemas/<name>.schema.ts` — Zod schema + inferred input type. Trim/limit strings.
3. **Service** `services/<name>.service.ts` — `createXService(repo)`. Business rules only; no `req`/`res`. Throw `AppError(status, CODE, message)` for expected failures (e.g. `404 NOT_FOUND`).
4. **Controller** `controllers/<name>.controller.ts` — `createXController(service)`. Reads `req`, calls the service, sets the status code. No logic.
5. **Route** `routes/<name>.routes.ts` — maps URL → controller, attaches `validateBody(schema)` for writes.
6. **Wire** in `app.ts` (the composition root): repo → service → controller → router, mounted at `/api/<plural-noun>`.

## Rules

- Dependencies are injected via factory args (enables `:memory:` DB in tests). No module-level singletons.
- Express 5: handlers may throw/reject; the single `errorHandler` formats errors as `{ error: { code, message } }`.
- Status codes: 201 create, 400 validation, 404 missing, 500 unexpected.

## Test

Add a Supertest test against `createApp(openDatabase(':memory:'))`: happy path + one validation failure (see `feedback.api.test.ts`). Run `npm run typecheck && npm test` in `server/`.
