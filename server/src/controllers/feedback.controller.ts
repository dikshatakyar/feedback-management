import type { RequestHandler } from 'express';
import type { FeedbackService } from '../services/feedback.service.js';

export function createFeedbackController(service: FeedbackService) {
  const create: RequestHandler = (req, res) => {
    res.status(201).json(service.submit(req.body));
  };

  const list: RequestHandler = (_req, res) => {
    res.json(service.list());
  };

  return { create, list };
}
