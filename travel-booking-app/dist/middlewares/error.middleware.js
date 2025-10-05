"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_error_1 = require("../errors/app.error");
const logger_1 = require("../utils/logger");
const errorHandler = (err, req, res, _next) => {
    if (process.env.NODE_ENV !== 'test') {
        (0, logger_1.logError)(err.message || 'Unhandled error', { requestId: req.requestId, stack: err.stack, code: err.code });
    }
    if (err instanceof app_error_1.AppError) {
        return res.status(err.status).json({ success: false, error: { message: err.message, code: err.code, details: err.details } });
    }
    const status = err.status || 500;
    res.status(status).json({ success: false, error: { message: err.message || 'Internal Server Error', code: 'INTERNAL_ERROR' } });
};
exports.default = errorHandler;
