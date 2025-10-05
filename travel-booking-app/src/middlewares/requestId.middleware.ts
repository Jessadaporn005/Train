import { randomUUID } from 'crypto';
import { Request, Response, NextFunction } from 'express';

export function requestIdMiddleware(req: Request, res: Response, next: NextFunction) {
  const existing = req.headers['x-request-id'];
  const rid = (Array.isArray(existing) ? existing[0] : existing) || randomUUID();
  req.requestId = rid;
  res.setHeader('X-Request-Id', rid);
  next();
}
