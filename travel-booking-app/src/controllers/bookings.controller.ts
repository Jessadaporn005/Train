import { Request, Response } from 'express';
import { BookingsService } from '../services/bookings.service';
import { BookingDTO } from '../dtos/booking.dto';

export class BookingsController {
    private bookingsService: BookingsService;

    constructor() {
        this.bookingsService = new BookingsService();
    }

    public async createBooking(req: Request, res: Response): Promise<Response> {
        const bookingData: BookingDTO = req.body;
        try {
            const newBooking = this.bookingsService.createBooking(bookingData);
            return res.status(201).json(newBooking);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    public async getBooking(req: Request, res: Response): Promise<Response> {
        const bookingId = req.params.id;
        try {
            const booking = this.bookingsService.getBookingById(bookingId);
            if (!booking) return res.status(404).json({ message: 'Booking not found' });
            return res.status(200).json(booking);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    public async getAllBookings(_req: Request, res: Response): Promise<Response> {
        try {
            const bookings = this.bookingsService.getAllBookings();
            return res.status(200).json(bookings);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    public async cancelBooking(req: Request, res: Response): Promise<Response> {
        const bookingId = req.params.id;
        try {
            const result = this.bookingsService.deleteBooking(bookingId);
            if (!result) return res.status(404).json({ message: 'Booking not found' });
            return res.status(204).send();
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
}