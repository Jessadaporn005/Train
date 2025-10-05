"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_2 = require("express");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const users_routes_1 = __importDefault(require("./routes/users.routes"));
const hotels_routes_1 = __importDefault(require("./routes/hotels.routes"));
const restaurants_routes_1 = __importDefault(require("./routes/restaurants.routes"));
const attractions_routes_1 = __importDefault(require("./routes/attractions.routes"));
const bookings_routes_1 = __importDefault(require("./routes/bookings.routes"));
const error_middleware_1 = __importDefault(require("./middlewares/error.middleware"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
// Middleware
app.use((0, express_2.json)());
app.use((0, express_2.urlencoded)({ extended: true }));
app.use(body_parser_1.default.json());
// Static frontend (in-memory mode safe; later can still work with real DB)
app.use(express_1.default.static(path_1.default.join(__dirname, '..', 'public')));
// Routes
app.use('/api/auth', auth_routes_1.default);
app.use('/api/users', users_routes_1.default);
app.use('/api/hotels', hotels_routes_1.default);
app.use('/api/restaurants', restaurants_routes_1.default);
app.use('/api/attractions', attractions_routes_1.default);
app.use('/api/bookings', bookings_routes_1.default);
// Error handling middleware
app.use(error_middleware_1.default);
exports.default = app;
