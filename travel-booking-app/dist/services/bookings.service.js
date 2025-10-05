"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingsService = void 0;
class BookingsService {
    constructor() {
        this.bookings = [];
    }
    createBooking(data) {
        const now = new Date();
        const newBooking = {
            id: (this.bookings.length + 1).toString(),
            userId: data.userId,
            hotelId: data.hotelId,
            restaurantId: data.restaurantId || '',
            attractionId: data.attractionId || '',
            checkInDate: new Date(data.checkInDate),
            checkOutDate: new Date(data.checkOutDate),
            totalPrice: 0,
            status: 'pending',
            createdAt: now,
            updatedAt: now
        };
        this.bookings.push(newBooking);
        return newBooking;
    }
    getBookingById(bookingId) {
        return this.bookings.find(booking => booking.id === bookingId);
    }
    getAllBookings() {
        return this.bookings;
    }
    deleteBooking(bookingId) {
        const index = this.bookings.findIndex(booking => booking.id === bookingId);
        if (index !== -1) {
            this.bookings.splice(index, 1);
            return true;
        }
        return false;
    }
}
exports.BookingsService = BookingsService;
