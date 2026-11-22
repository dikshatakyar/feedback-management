# Pulse — Feedback Management App

Pulse lets teams collect, organize, and act on feedback. Keep it simple: build the smallest thing that works, then iterate.

## Tech Stack

- **Frontend:** React + Vite + TypeScript, React Router, TanStack Query for server state
- **Backend:** Node.js + Express + TypeScript
- **Validation:** Zod (shared shape thinking: validate at the API boundary only)
- **Database:** SQLite 
- **Tests:** Vitest (both sides), Supertest for API, React Testing Library for UI


## Project Structure

```
/
├── CLAUDE.md
├── .claude/skills/          # AI workflow skills (see below)
├── client/                  # React app
│   └── src/
│       ├── features/<name>/ # components, hooks, api calls for one feature
│       ├── components/      # shared, generic UI only
│       ├── lib/             # api client, utils
│       └── pages/           # route-level components, thin
└── server/
    └── src/
        ├── routes/          # URL → controller wiring only
        ├── controllers/     # parse request, call service, send response
        ├── services/        # business logic (no req/res objects)
        ├── db/              # queries & migrations (the only layer touching SQL)
        ├── middleware/      # auth, validation, error handler
        └── schemas/         # Zod schemas
```

## Separation of Concerns

Dependencies point one way: `routes → controllers → services → db`.

- **Routes** only map URLs to controllers.
- **Controllers** handle HTTP (parse, validate, status codes). No business logic.
- **Services** hold business rules. They know nothing about Express.
- **DB layer** is the only place with SQL.
- **Frontend:** pages compose feature components; components render; hooks fetch/manage state; `lib/api` is the only place that calls `fetch`.
- Organize the client **by feature**, not by file type.

## Coding Conventions

- TypeScript `strict` on. No `any`; use `unknown` and narrow.
- Naming: `camelCase` vars/functions, `PascalCase` components/types, `kebab-case` for non-component files, `PascalCase.tsx` for components.
- Functional React components and hooks only. Keep components small; extract a hook when logic outgrows the JSX.
- Prefer plain functions and modules over classes.
- One responsibility per file. If a file passes ~200 lines, consider splitting.
- No premature abstraction: duplicate twice, abstract on the third use.
- No dead code, commented-out code, or unused deps.
- Comments explain *why*, not *what*.
- Use `async/await`; never swallow errors.

## API Conventions

- REST, JSON, plural nouns: `GET /api/feedback`, `POST /api/feedback`, `PATCH /api/feedback/:id`.
- Validate every request body/query with Zod in middleware.
- Consistent error shape: `{ "error": { "code": "VALIDATION_ERROR", "message": "..." } }`.
- Correct status codes (201 create, 400 validation, 404 missing, 500 unexpected).
- Throw typed errors in services; a single error-handler middleware turns them into responses.

## Frontend Conventions

- Server state → TanStack Query. Local UI state → `useState`. Avoid global state libraries unless clearly needed.
- Always handle loading, empty, and error states.
- Forms: controlled inputs, show validation errors inline.
- Accessibility basics: semantic HTML, labels on inputs, keyboard-usable controls.
- Plain CSS modules or a single lightweight approach — don't mix styling systems.

## Security & Config

- Secrets via environment variables; commit `.env.example`, never `.env`.
- Never trust client input; validate server-side.
- Use parameterized queries only.
- Don't log sensitive data (tokens, personal info).

## Testing

- Test behavior, not implementation.
- Services: unit tests. API: Supertest happy path + key failure cases. UI: test user-visible behavior.
- A feature isn't done until its tests pass and lint/typecheck are clean.

## Git

- Small, focused commits. Imperative messages: `Add feedback submission form`.
- One feature per branch: `feature/<short-name>`.

## Working With Claude

- **Plan before coding** for any non-trivial change. Use the `feature-development` skill.
- Read existing code and follow its patterns before adding new ones.
- Ask when requirements are ambiguous; don't guess on product decisions.
- Don't add features, dependencies, or abstractions that weren't asked for.
- Keep changes scoped: touch only what the task needs.
- Run typecheck, lint, and tests before declaring work done, and report results honestly.

## Skills

Project skills live in `.claude/skills/<name>/SKILL.md`.

| Skill | Use when |
|---|---|
| `feature-development` | Planning and implementing any new feature |
| `add-api-endpoint` | Any change under `server/src` (route → controller → service → repo) |
| `add-migration` | Any database schema change |
| `add-frontend-feature` | Any change under `client/src` (feature folder, hooks, components) |

## Dev Commands

Run in `server/` (port 3001) and `client/` (Vite, proxies `/api`): `npm run dev`, `npm run typecheck`, `npm test`.

Config: `server/.env` (gitignored) is loaded by `npm run dev` via Node's `--env-file-if-exists`; without it the server falls back to defaults (`PORT=3001`, `DB_PATH=pulse.db`).

Environment notes: Node 26 (`engines` in both `package.json` files). Tooling is current (TypeScript 7, Vite 8, Vitest 5, jsdom 31); React stays on 18. On Windows, run `client/` tests from PowerShell: Vitest 5 fails with "failed to find the current suite" when launched from Git Bash. SQLite uses `node-sqlite3-wasm` (no native build needed); import it as a default import. When starting a dev server for a manual check, stop the actual node process afterward, not just the `npx` wrapper.

Add new skills only when a workflow repeats. Keep each skill short and focused.


### Incremental Implementation & Review

- Implement changes in small, logical increments.
- Avoid creating or modifying many files in a single step.
- Prefer completing one layer or a small group of related files at a time.
- After each logical increment, summarize the files created or modified and explain the changes.
- Pause for review before proceeding to the next major increment.
- Keep diffs small, focused and easy to understand.
- Never sacrifice architectural consistency just to minimize the number of files.
