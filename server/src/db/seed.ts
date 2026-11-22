// Dev-only: fills an empty feedback table with sample rows. Run with `npm run seed`.
import { openDatabase } from './database.js';
import { createFeedbackRepo } from './feedback.repo.js';

const samples = [
  { message: 'Love the new dashboard, much easier to scan.', rating: 5 },
  { message: 'Search is fast and finds what I need.', rating: 5 },
  { message: 'Onboarding was clear, took me five minutes.', rating: 4 },
  { message: 'Would like dark mode for late-night use.', rating: 4 },
  { message: 'Export to CSV would be really helpful.', rating: 3 },
  { message: 'The page feels slow when there are many items.', rating: 2 },
  { message: 'Lost my draft after refreshing the page.', rating: 2 },
  { message: 'Confusing error message when the form was empty.', rating: 1 },
];

const db = openDatabase(process.env.DB_PATH ?? 'pulse.db');
const repo = createFeedbackRepo(db);

if (repo.list().length > 0) {
  console.log('Feedback table is not empty; skipping seed.');
} else {
  samples.forEach((s) => repo.insert(s));
  console.log(`Seeded ${samples.length} feedback rows.`);
}

db.close();
