import { createLogger, format, transports, Logger } from 'winston';

const LOG_LEVEL = process.env.LOG_LEVEL || 'info';
const isDev = process.env.NODE_ENV !== 'production';

const consoleFmt = format.printf(info => {
    const { timestamp, level, message, requestId, durationMs, stack, ...rest } = info as any;
    const rid = requestId ? ` [rid:${requestId}]` : '';
    const dur = durationMs !== undefined ? ` (${durationMs}ms)` : '';
    const meta = Object.keys(rest).length ? ' ' + JSON.stringify(rest) : '';
    return `${timestamp} ${level.toUpperCase()}${rid}${dur}: ${message}${stack ? '\n'+stack : ''}${meta}`;
});

const logger: Logger = createLogger({
    level: LOG_LEVEL,
    format: format.combine(
        format.timestamp(),
        format.errors({ stack: true }),
        format.json()
    ),
    transports: [
        new transports.File({ filename: 'logs/error.log', level: 'error' }),
        new transports.File({ filename: 'logs/combined.log' })
    ]
});

if (isDev) {
    logger.add(new transports.Console({
        level: LOG_LEVEL,
        format: format.combine(format.colorize(), format.timestamp(), consoleFmt)
    }));
}

export const log = logger;
export const logInfo = (message: string, meta: Record<string, any> = {}) => logger.info({ message, ...meta });
export const logError = (message: string, meta: Record<string, any> = {}) => logger.error({ message, ...meta });
export const logWarn = (message: string, meta: Record<string, any> = {}) => logger.warn({ message, ...meta });

const SENSITIVE_KEYS = ['password', 'confirmPassword', 'token'];
const SKIP_PATHS = ['/health', '/ready', '/metrics'];

function redactBody(body: any) {
    if (!body || typeof body !== 'object') return undefined;
    const clone: Record<string, any> = {};
    Object.keys(body).forEach(k => {
        if (SENSITIVE_KEYS.includes(k.toLowerCase())) clone[k] = '***'; else clone[k] = body[k];
    });
    return clone;
}

export function requestLogger() {
    return (req: any, res: any, next: any) => {
        if (SKIP_PATHS.includes(req.path)) return next();
        const start = process.hrtime.bigint();
        const originalEnd = res.end;
        const method = req.method;
        const url = req.originalUrl || req.url;
        const reqMeta: any = { requestId: req.requestId };
        if (method !== 'GET' && method !== 'HEAD') {
            reqMeta.body = redactBody(req.body);
        }
        logInfo(`REQ ${method} ${url}`, reqMeta);
        res.end = function(this: any, ...args: any[]) {
            const end = process.hrtime.bigint();
            const durationMs = Number(end - start) / 1_000_000;
            logInfo(`RES ${method} ${url}`, { requestId: req.requestId, statusCode: res.statusCode, durationMs });
            return originalEnd.apply(this, args);
        };
        next();
    };
}

// Simple audit logging helper (can be redirected to separate transport later)
export const auditLog = (action: string, meta: Record<string, any> = {}) => {
    logger.info({ message: `AUDIT ${action}`, audit: true, ...meta });
};
