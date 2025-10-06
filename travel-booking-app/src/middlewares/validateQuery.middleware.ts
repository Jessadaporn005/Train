import { ZodSchema, ZodError } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { ValidationError } from '../errors/app.error';

export function validateQuery(schema: ZodSchema<any>) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.query);
    if (!result.success) {
      return next(new ValidationError('Invalid query parameters', result.error.issues));
    }
    (req as any).queryValidated = result.data;
    next();
  };
}
