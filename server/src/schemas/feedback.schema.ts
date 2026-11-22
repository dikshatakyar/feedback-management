import { z } from 'zod';

export const createFeedbackSchema = z.object({
  message: z.string().trim().min(1, 'Message is required').max(1000),
  rating: z.number().int().min(1).max(5),
});

export type CreateFeedbackInput = z.infer<typeof createFeedbackSchema>;
