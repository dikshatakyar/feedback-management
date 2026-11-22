import type { RequestHandler } from 'express';
import type { ZodType } from 'zod';
import { AppError } from './errors.js';

export function validateBody(schema: ZodType): RequestHandler {
  return (req, _res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const message = result.error.issues.map((i) => i.message).join('; ');
      return next(new AppError(400, 'VALIDATION_ERROR', message));
    }
    req.body = result.data;
    next();
  };
}
