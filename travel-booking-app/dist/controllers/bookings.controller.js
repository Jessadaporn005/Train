"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingsController = void 0;
const bookings_service_1 = require("../services/bookings.service");
class BookingsController {
    constructor() {
        this.bookingsService = new bookings_service_1.BookingsService();
    }
    async createBooking(req, res) {
        const bookingData = req.body;
        try {
            const newBooking = this.bookingsService.createBooking(bookingData);
            return res.status(201).json(newBooking);
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    async getBooking(req, res) {
        const bookingId = req.params.id;
        try {
            const booking = this.bookingsService.getBookingById(bookingId);
            if (!booking)
                return res.status(404).json({ message: 'Booking not found' });
            return res.status(200).json(booking);
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    async getAllBookings(_req, res) {
        try {
            const bookings = this.bookingsService.getAllBookings();
            return res.status(200).json(bookings);
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    async cancelBooking(req, res) {
        const bookingId = req.params.id;
        try {
            const result = this.bookingsService.deleteBooking(bookingId);
            if (!result)
                return res.status(404).json({ message: 'Booking not found' });
            return res.status(204).send();
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}
exports.BookingsController = BookingsController;
