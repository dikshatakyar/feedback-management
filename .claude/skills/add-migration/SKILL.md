---
name: add-migration
description: Change the database schema in Pulse (new table, column, index, constraint). Use for any schema change, with or without a new endpoint.
---

# Add a Migration

Schema lives in `server/src/db/migrations.ts`, applied on startup by `db/migrate.ts`.

## Steps

1. **Append** one new SQL string to the `migrations` array. Its version is its position (1-based).
2. Keep it to one logical change. Multiple statements in one entry are fine if they belong together; the runner wraps each entry in a transaction.
3. Update the repo (`db/<name>.repo.ts`) and types if columns changed.
4. Run `npm test` in `server/`. Tests use `:memory:` DBs, so every run replays all migrations from scratch.

## Rules

- **Append-only.** Never edit, reorder, or delete an entry that has been committed or run anywhere. Fix mistakes with a new migration.
- Only `db/` contains SQL; migrations are the only place that defines schema.
- Put data-integrity rules (`NOT NULL`, `CHECK`, `UNIQUE`, foreign keys) in the migration; request validation stays in the Zod schema.
- Adding a `NOT NULL` column to an existing table needs a `DEFAULT`.
- No down/rollback migrations. If one fails, it rolls back and the server refuses to start.
- Do not hand-edit `PRAGMA user_version`; the runner owns it.
