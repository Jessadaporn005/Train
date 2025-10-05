import express from 'express';
import bodyParser from 'body-parser';
import { json, urlencoded } from 'express';
import authRoutes from './routes/auth.routes';
import usersRoutes from './routes/users.routes';
import hotelsRoutes from './routes/hotels.routes';
import restaurantsRoutes from './routes/restaurants.routes';
import attractionsRoutes from './routes/attractions.routes';
import bookingsRoutes from './routes/bookings.routes';
import errorHandler from './middlewares/error.middleware';
import { requestIdMiddleware } from './middlewares/requestId.middleware';
import { requestLogger } from './utils/logger';
import path from 'path';

const app = express();

// Middleware
app.use(requestIdMiddleware);
app.use(requestLogger());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(bodyParser.json());

// Static frontend (in-memory mode safe; later can still work with real DB)
app.use(express.static(path.join(__dirname, '..', 'public')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/hotels', hotelsRoutes);
app.use('/api/restaurants', restaurantsRoutes);
app.use('/api/attractions', attractionsRoutes);
app.use('/api/bookings', bookingsRoutes);

// Health & readiness endpoints
app.get('/health', (_req, res) => res.json({ success: true, status: 'ok', mode: process.env.USE_DB === 'true' ? 'db' : 'in-memory' }));
app.get('/ready', async (_req, res) => {
	// Later: check DB connection or external services
	res.json({ success: true, ready: true });
});

// Error handling middleware
app.use(errorHandler);

export default app;