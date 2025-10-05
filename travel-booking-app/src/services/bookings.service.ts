import { Booking } from '../models/booking.model';
import { BookingDTO } from '../dtos/booking.dto';

export class BookingsService {
    private bookings: Booking[] = [];

    public createBooking(data: BookingDTO): Booking {
        const now = new Date();
        const newBooking: Booking = {
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

    public getBookingById(bookingId: string): Booking | undefined {
        return this.bookings.find(booking => booking.id === bookingId);
    }

    public getAllBookings(): Booking[] {
        return this.bookings;
    }

    public deleteBooking(bookingId: string): boolean {
        const index = this.bookings.findIndex(booking => booking.id === bookingId);
        if (index !== -1) {
            this.bookings.splice(index, 1);
            return true;
        }
        return false;
    }
}