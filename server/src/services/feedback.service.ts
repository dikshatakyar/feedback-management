import type { FeedbackRepo } from '../db/feedback.repo.js';
import type { CreateFeedbackInput } from '../schemas/feedback.schema.js';

export function createFeedbackService(repo: FeedbackRepo) {
  return {
    submit(input: CreateFeedbackInput) {
      return repo.insert(input);
    },

    list() {
      return repo.list();
    },
  };
}

export type FeedbackService = ReturnType<typeof createFeedbackService>;
