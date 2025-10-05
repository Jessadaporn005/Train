import { Request, Response } from 'express';
import { BookingsService } from '../services/bookings.service';
import { BookingDTO } from '../dtos/booking.dto';
import { created, success, noContent } from '../utils/response';
import { BookingNotFoundError } from '../errors/domain.errors';

export class BookingsController {
    private bookingsService: BookingsService;

    constructor() {
        this.bookingsService = new BookingsService();
    }

    public async createBooking(req: Request, res: Response): Promise<Response> {
        const bookingData: BookingDTO = req.body;
        const newBooking = this.bookingsService.createBooking(bookingData);
        return created(res, newBooking);
    }

    public async getBooking(req: Request, res: Response): Promise<Response> {
        const bookingId = req.params.id;
        const booking = this.bookingsService.getBookingById(bookingId);
        if (!booking) throw new BookingNotFoundError(bookingId);
        return success(res, booking);
    }

    public async getAllBookings(_req: Request, res: Response): Promise<Response> {
        const bookings = this.bookingsService.getAllBookings();
        return success(res, bookings);
    }

    public async cancelBooking(req: Request, res: Response): Promise<Response> {
        const bookingId = req.params.id;
        const result = this.bookingsService.deleteBooking(bookingId);
        if (!result) throw new BookingNotFoundError(bookingId);
        return noContent(res);
    }
}