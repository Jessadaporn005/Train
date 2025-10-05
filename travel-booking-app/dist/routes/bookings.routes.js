"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bookings_controller_1 = require("../controllers/bookings.controller");
const validate_middleware_1 = require("../middlewares/validate.middleware");
const schemas_1 = require("../validators/schemas");
const router = (0, express_1.Router)();
const bookingsController = new bookings_controller_1.BookingsController();
// Route to create a new booking
router.post('/', (0, validate_middleware_1.validateBody)(schemas_1.createBookingSchema), bookingsController.createBooking.bind(bookingsController));
// Route to get all bookings
router.get('/', bookingsController.getAllBookings.bind(bookingsController));
// Route to get a specific booking by ID
router.get('/:id', bookingsController.getBooking.bind(bookingsController));
// Route to update a booking by ID
// update route not implemented currently
// router.put('/:id', bookingsController.updateBooking.bind(bookingsController));
router.delete('/:id', bookingsController.cancelBooking.bind(bookingsController));
exports.default = router;
