import { describe, expect, it } from 'vitest';
import { openDatabase } from './database.js';
import { migrate } from './migrate.js';
import { migrations } from './migrations.js';

describe('migrate', () => {
  it('creates the schema and records the version', () => {
    const db = openDatabase(':memory:');
    const row = db.get('PRAGMA user_version') as { user_version: number };
    expect(row.user_version).toBe(migrations.length);
    expect(db.all('SELECT name FROM sqlite_master WHERE name = ?', ['feedback'])).toHaveLength(1);
  });

  it('is safe to run again', () => {
    const db = openDatabase(':memory:');
    expect(() => migrate(db)).not.toThrow();
  });
});
