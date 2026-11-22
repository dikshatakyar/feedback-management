import type { Db } from './database.js';

export type Feedback = {
  id: number;
  message: string;
  rating: number;
  createdAt: string;
};

export type NewFeedback = Pick<Feedback, 'message' | 'rating'>;

const COLUMNS = 'id, message, rating, created_at AS createdAt';

export function createFeedbackRepo(db: Db) {
  return {
    insert({ message, rating }: NewFeedback): Feedback {
      const { lastInsertRowid } = db.run(
        'INSERT INTO feedback (message, rating) VALUES (?, ?)',
        [message, rating],
      );
      return db.get(`SELECT ${COLUMNS} FROM feedback WHERE id = ?`, [
        lastInsertRowid,
      ]) as Feedback;
    },

    list(): Feedback[] {
      return db.all(
        `SELECT ${COLUMNS} FROM feedback ORDER BY id DESC`,
      ) as Feedback[];
    },
  };
}

export type FeedbackRepo = ReturnType<typeof createFeedbackRepo>;
