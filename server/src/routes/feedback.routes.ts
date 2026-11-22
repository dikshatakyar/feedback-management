import { Router } from 'express';
import type { createFeedbackController } from '../controllers/feedback.controller.js';
import { validateBody } from '../middleware/validate.js';
import { createFeedbackSchema } from '../schemas/feedback.schema.js';

export function createFeedbackRouter(
  controller: ReturnType<typeof createFeedbackController>,
) {
  const router = Router();
  router.get('/', controller.list);
  router.post('/', validateBody(createFeedbackSchema), controller.create);
  return router;
}
