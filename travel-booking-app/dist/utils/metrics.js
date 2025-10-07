"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authLoginFailuresTotal = exports.authLoginsTotal = exports.httpRequestErrorsTotal = exports.httpRequestsTotal = exports.httpRequestDurationMs = void 0;
exports.metricsMiddleware = metricsMiddleware;
exports.metricsEndpoint = metricsEndpoint;
const prom_client_1 = __importDefault(require("prom-client"));
// Register collects default metrics (Node.js process metrics)
const register = new prom_client_1.default.Registry();
prom_client_1.default.collectDefaultMetrics({ register, prefix: 'travel_app_' });
// Custom metrics
exports.httpRequestDurationMs = new prom_client_1.default.Histogram({
    name: 'http_request_duration_ms',
    help: 'HTTP request duration in ms',
    labelNames: ['method', 'route', 'status'],
    buckets: [5, 10, 25, 50, 100, 250, 500, 1000, 2000]
});
register.registerMetric(exports.httpRequestDurationMs);
exports.httpRequestsTotal = new prom_client_1.default.Counter({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'route', 'status']
});
register.registerMetric(exports.httpRequestsTotal);
exports.httpRequestErrorsTotal = new prom_client_1.default.Counter({
    name: 'http_request_errors_total',
    help: 'Total number of errored HTTP requests',
    labelNames: ['method', 'route', 'status', 'code']
});
register.registerMetric(exports.httpRequestErrorsTotal);
exports.authLoginsTotal = new prom_client_1.default.Counter({
    name: 'auth_logins_total',
    help: 'Total successful logins'
});
register.registerMetric(exports.authLoginsTotal);
exports.authLoginFailuresTotal = new prom_client_1.default.Counter({
    name: 'auth_login_failures_total',
    help: 'Total failed login attempts'
});
register.registerMetric(exports.authLoginFailuresTotal);
// Middleware to measure request durations
function metricsMiddleware() {
    return (req, res, next) => {
        if (req.path === '/metrics')
            return next();
        const endTimer = exports.httpRequestDurationMs.startTimer();
        res.on('finish', () => {
            const route = req.route?.path || req.path || 'unknown';
            const labels = { method: req.method, route, status: String(res.statusCode) };
            endTimer(labels);
            exports.httpRequestsTotal.inc(labels);
            if (res.statusCode >= 500) {
                exports.httpRequestErrorsTotal.inc({ ...labels, code: 'SERVER_ERROR' });
            }
        });
        next();
    };
}
async function metricsEndpoint(_req, res) {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
}
exports.default = register;
