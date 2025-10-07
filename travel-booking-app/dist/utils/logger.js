"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auditLog = exports.logWarn = exports.logError = exports.logInfo = exports.log = void 0;
exports.requestLogger = requestLogger;
const winston_1 = require("winston");
const LOG_LEVEL = process.env.LOG_LEVEL || 'info';
const isDev = process.env.NODE_ENV !== 'production';
const consoleFmt = winston_1.format.printf(info => {
    const { timestamp, level, message, requestId, durationMs, stack, ...rest } = info;
    const rid = requestId ? ` [rid:${requestId}]` : '';
    const dur = durationMs !== undefined ? ` (${durationMs}ms)` : '';
    const meta = Object.keys(rest).length ? ' ' + JSON.stringify(rest) : '';
    return `${timestamp} ${level.toUpperCase()}${rid}${dur}: ${message}${stack ? '\n' + stack : ''}${meta}`;
});
const logger = (0, winston_1.createLogger)({
    level: LOG_LEVEL,
    format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.errors({ stack: true }), winston_1.format.json()),
    transports: [
        new winston_1.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston_1.transports.File({ filename: 'logs/combined.log' })
    ]
});
if (isDev) {
    logger.add(new winston_1.transports.Console({
        level: LOG_LEVEL,
        format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.timestamp(), consoleFmt)
    }));
}
exports.log = logger;
const logInfo = (message, meta = {}) => logger.info({ message, ...meta });
exports.logInfo = logInfo;
const logError = (message, meta = {}) => logger.error({ message, ...meta });
exports.logError = logError;
const logWarn = (message, meta = {}) => logger.warn({ message, ...meta });
exports.logWarn = logWarn;
const SENSITIVE_KEYS = ['password', 'confirmPassword', 'token'];
const SKIP_PATHS = ['/health', '/ready', '/metrics'];
function redactBody(body) {
    if (!body || typeof body !== 'object')
        return undefined;
    const clone = {};
    Object.keys(body).forEach(k => {
        if (SENSITIVE_KEYS.includes(k.toLowerCase()))
            clone[k] = '***';
        else
            clone[k] = body[k];
    });
    return clone;
}
function requestLogger() {
    return (req, res, next) => {
        if (SKIP_PATHS.includes(req.path))
            return next();
        const start = process.hrtime.bigint();
        const originalEnd = res.end;
        const method = req.method;
        const url = req.originalUrl || req.url;
        const reqMeta = { requestId: req.requestId };
        if (method !== 'GET' && method !== 'HEAD') {
            reqMeta.body = redactBody(req.body);
        }
        (0, exports.logInfo)(`REQ ${method} ${url}`, reqMeta);
        res.end = function (...args) {
            const end = process.hrtime.bigint();
            const durationMs = Number(end - start) / 1000000;
            (0, exports.logInfo)(`RES ${method} ${url}`, { requestId: req.requestId, statusCode: res.statusCode, durationMs });
            return originalEnd.apply(this, args);
        };
        next();
    };
}
// Simple audit logging helper (can be redirected to separate transport later)
const auditLog = (action, meta = {}) => {
    logger.info({ message: `AUDIT ${action}`, audit: true, ...meta });
};
exports.auditLog = auditLog;
