"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_error_1 = require("../errors/app.error");
const logger_1 = require("../utils/logger");
const metrics_1 = require("../utils/metrics");
const errorHandler = (err, req, res, _next) => {
    if (process.env.NODE_ENV !== 'test') {
        (0, logger_1.logError)(err.message || 'Unhandled error', { requestId: req.requestId, stack: err.stack, code: err.code });
    }
    if (err instanceof app_error_1.AppError) {
        metrics_1.httpRequestErrorsTotal.inc({ method: req.method, route: req.path, status: String(err.status), code: err.code || 'APP_ERROR' });
        return res.status(err.status).json({ success: false, error: { message: err.message, code: err.code, details: err.details } });
    }
    const status = err.status || 500;
    metrics_1.httpRequestErrorsTotal.inc({ method: req.method, route: req.path, status: String(status), code: 'INTERNAL_ERROR' });
    res.status(status).json({ success: false, error: { message: err.message || 'Internal Server Error', code: 'INTERNAL_ERROR' } });
};
exports.default = errorHandler;
