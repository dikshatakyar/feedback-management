import type { Db } from './database.js';
import { migrations } from './migrations.js';

// Applies pending migrations in order. SQLite's built-in `user_version`
// records how many have run, so no extra table or library is needed.
export function migrate(db: Db): void {
  const row = db.get('PRAGMA user_version') as { user_version: number };

  for (let version = row.user_version + 1; version <= migrations.length; version++) {
    db.exec('BEGIN');
    try {
      db.exec(migrations[version - 1]);
      db.exec(`PRAGMA user_version = ${version}`);
      db.exec('COMMIT');
    } catch (err) {
      db.exec('ROLLBACK');
      throw err;
    }
  }
}
