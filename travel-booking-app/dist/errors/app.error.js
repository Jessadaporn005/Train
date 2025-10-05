"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenError = exports.AuthError = exports.ValidationError = exports.NotFoundError = exports.AppError = void 0;
class AppError extends Error {
    constructor(message, status = 500, code = 'INTERNAL_ERROR', details) {
        super(message);
        this.status = status;
        this.code = code;
        this.details = details;
    }
}
exports.AppError = AppError;
class NotFoundError extends AppError {
    constructor(message = 'Resource not found', details) { super(message, 404, 'NOT_FOUND', details); }
}
exports.NotFoundError = NotFoundError;
class ValidationError extends AppError {
    constructor(message = 'Validation failed', details) { super(message, 400, 'VALIDATION_ERROR', details); }
}
exports.ValidationError = ValidationError;
class AuthError extends AppError {
    constructor(message = 'Unauthorized', details) { super(message, 401, 'AUTH_ERROR', details); }
}
exports.AuthError = AuthError;
class ForbiddenError extends AppError {
    constructor(message = 'Forbidden', details) { super(message, 403, 'FORBIDDEN', details); }
}
exports.ForbiddenError = ForbiddenError;
