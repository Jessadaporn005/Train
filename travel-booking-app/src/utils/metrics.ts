import client from 'prom-client';

// Register collects default metrics (Node.js process metrics)
const register = new client.Registry();
client.collectDefaultMetrics({ register, prefix: 'travel_app_' });

// Custom metrics
export const httpRequestDurationMs = new client.Histogram({
  name: 'http_request_duration_ms',
  help: 'HTTP request duration in ms',
  labelNames: ['method', 'route', 'status'],
  buckets: [5, 10, 25, 50, 100, 250, 500, 1000, 2000]
});
register.registerMetric(httpRequestDurationMs);

export const httpRequestsTotal = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status']
});
register.registerMetric(httpRequestsTotal);

export const httpRequestErrorsTotal = new client.Counter({
  name: 'http_request_errors_total',
  help: 'Total number of errored HTTP requests',
  labelNames: ['method', 'route', 'status', 'code']
});
register.registerMetric(httpRequestErrorsTotal);

export const authLoginsTotal = new client.Counter({
  name: 'auth_logins_total',
  help: 'Total successful logins'
});
register.registerMetric(authLoginsTotal);

export const authLoginFailuresTotal = new client.Counter({
  name: 'auth_login_failures_total',
  help: 'Total failed login attempts'
});
register.registerMetric(authLoginFailuresTotal);

// Middleware to measure request durations
export function metricsMiddleware() {
  return (req: any, res: any, next: any) => {
    if (req.path === '/metrics') return next();
    const endTimer = httpRequestDurationMs.startTimer();
    res.on('finish', () => {
      const route = req.route?.path || req.path || 'unknown';
      const labels = { method: req.method, route, status: String(res.statusCode) };
      endTimer(labels);
      httpRequestsTotal.inc(labels);
      if (res.statusCode >= 500) {
        httpRequestErrorsTotal.inc({ ...labels, code: 'SERVER_ERROR' });
      }
    });
    next();
  };
}

export async function metricsEndpoint(_req: any, res: any) {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
}

export default register;