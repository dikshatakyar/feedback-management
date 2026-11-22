import cors from 'cors';
import express from 'express';
import { createFeedbackController } from './controllers/feedback.controller.js';
import type { Db } from './db/database.js';
import { createFeedbackRepo } from './db/feedback.repo.js';
import { errorHandler } from './middleware/error-handler.js';
import { createFeedbackRouter } from './routes/feedback.routes.js';
import { createFeedbackService } from './services/feedback.service.js';

// Composition root: the only place layers are wired together.
export function createApp(db: Db) {
  const feedbackController = createFeedbackController(
    createFeedbackService(createFeedbackRepo(db)),
  );

  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use('/api/feedback', createFeedbackRouter(feedbackController));
  app.use(errorHandler);
  return app;
}
