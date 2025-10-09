"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_2 = require("express");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const users_routes_1 = __importDefault(require("./routes/users.routes"));
const hotels_routes_1 = __importDefault(require("./routes/hotels.routes"));
const restaurants_routes_1 = __importDefault(require("./routes/restaurants.routes"));
const attractions_routes_1 = __importDefault(require("./routes/attractions.routes"));
const bookings_routes_1 = __importDefault(require("./routes/bookings.routes"));
const error_middleware_1 = __importDefault(require("./middlewares/error.middleware"));
const requestId_middleware_1 = require("./middlewares/requestId.middleware");
const logger_1 = require("./utils/logger");
const metrics_1 = require("./utils/metrics");
const path_1 = __importDefault(require("path"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const app = (0, express_1.default)();
// Middleware
app.use(requestId_middleware_1.requestIdMiddleware);
app.use((0, logger_1.requestLogger)());
app.use((0, metrics_1.metricsMiddleware)());
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use((0, express_rate_limit_1.default)({ windowMs: 15 * 60 * 1000, max: 300 }));
app.use((0, express_2.json)());
app.use((0, express_2.urlencoded)({ extended: true }));
// (Removed bodyParser.json duplicated with express.json())
// Static frontend (serve home.html as default index)
app.use(express_1.default.static(path_1.default.join(__dirname, '..', 'public'), { index: ['home.html', 'index.html'] }));
// Routes
app.use('/api/auth', auth_routes_1.default);
app.use('/api/users', users_routes_1.default);
app.use('/api/hotels', hotels_routes_1.default);
app.use('/api/restaurants', restaurants_routes_1.default);
app.use('/api/attractions', attractions_routes_1.default);
app.use('/api/bookings', bookings_routes_1.default);
// Health & readiness endpoints
app.get('/health', (_req, res) => res.json({ success: true, status: 'ok', mode: process.env.USE_DB === 'true' ? 'db' : 'in-memory' }));
app.get('/ready', async (_req, res) => {
    // Later: check DB connection or external services
    res.json({ success: true, ready: true });
});
// Metrics (Prometheus)
app.get('/metrics', metrics_1.metricsEndpoint);
// Error handling middleware
app.use(error_middleware_1.default);
exports.default = app;
