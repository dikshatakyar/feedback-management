import { apiRequest } from '../../lib/api';

export type Feedback = {
  id: number;
  message: string;
  rating: number;
  createdAt: string;
};

export type NewFeedback = Pick<Feedback, 'message' | 'rating'>;

export const listFeedback = () => apiRequest<Feedback[]>('/feedback');

export const createFeedback = (input: NewFeedback) =>
  apiRequest<Feedback>('/feedback', { method: 'POST', body: JSON.stringify(input) });
