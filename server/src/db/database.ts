import sqlite from 'node-sqlite3-wasm';
import { migrate } from './migrate.js';

// CJS package: a default import works in plain Node ESM; a named import does not.
export type Db = InstanceType<typeof sqlite.Database>;

export function openDatabase(path: string): Db {
  const db = new sqlite.Database(path);
  migrate(db);
  return db;
}
