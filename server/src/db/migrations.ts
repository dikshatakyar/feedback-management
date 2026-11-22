// Append-only: never edit or reorder an existing entry once it has shipped.
// A migration's version is its position in this list (1-based).
export const migrations: string[] = [
  `CREATE TABLE feedback (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    message TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )`,
];
