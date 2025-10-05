export class AppError extends Error {
  status: number;
  code: string;
  details?: any;
  constructor(message: string, status = 500, code = 'INTERNAL_ERROR', details?: any) {
    super(message);
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Resource not found', details?: any) { super(message, 404, 'NOT_FOUND', details); }
}
export class ValidationError extends AppError {
  constructor(message = 'Validation failed', details?: any) { super(message, 400, 'VALIDATION_ERROR', details); }
}
export class AuthError extends AppError {
  constructor(message = 'Unauthorized', details?: any) { super(message, 401, 'AUTH_ERROR', details); }
}
export class ForbiddenError extends AppError {
  constructor(message = 'Forbidden', details?: any) { super(message, 403, 'FORBIDDEN', details); }
}
