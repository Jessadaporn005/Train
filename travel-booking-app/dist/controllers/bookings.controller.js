"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingsController = void 0;
const bookings_service_1 = require("../services/bookings.service");
const response_1 = require("../utils/response");
const domain_errors_1 = require("../errors/domain.errors");
class BookingsController {
    constructor() {
        this.bookingsService = new bookings_service_1.BookingsService();
    }
    async createBooking(req, res) {
        const bookingData = req.body;
        const newBooking = this.bookingsService.createBooking(bookingData);
        return (0, response_1.created)(res, newBooking);
    }
    async getBooking(req, res) {
        const bookingId = req.params.id;
        const booking = this.bookingsService.getBookingById(bookingId);
        if (!booking)
            throw new domain_errors_1.BookingNotFoundError(bookingId);
        return (0, response_1.success)(res, booking);
    }
    async getAllBookings(_req, res) {
        const bookings = this.bookingsService.getAllBookings();
        return (0, response_1.success)(res, bookings);
    }
    async cancelBooking(req, res) {
        const bookingId = req.params.id;
        const result = this.bookingsService.deleteBooking(bookingId);
        if (!result)
            throw new domain_errors_1.BookingNotFoundError(bookingId);
        return (0, response_1.noContent)(res);
    }
}
exports.BookingsController = BookingsController;
