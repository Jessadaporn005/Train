import { Router } from 'express';
import { BookingsController } from '../controllers/bookings.controller';
import { validateBody } from '../middlewares/validate.middleware';
import { createBookingSchema } from '../validators/schemas';

const router = Router();
const bookingsController = new BookingsController();

// Route to create a new booking
router.post('/', validateBody(createBookingSchema), bookingsController.createBooking.bind(bookingsController));

// Route to get all bookings
router.get('/', bookingsController.getAllBookings.bind(bookingsController));

// Route to get a specific booking by ID
router.get('/:id', bookingsController.getBooking.bind(bookingsController));

// Route to update a booking by ID
// update route not implemented currently
// router.put('/:id', bookingsController.updateBooking.bind(bookingsController));
router.delete('/:id', bookingsController.cancelBooking.bind(bookingsController));

export default router;