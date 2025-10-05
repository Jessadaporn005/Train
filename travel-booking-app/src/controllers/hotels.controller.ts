import { Request, Response } from 'express';
import { HotelsService } from '../services/hotels.service';
import { CreateHotelDTO, HotelDTO } from '../dtos/hotel.dto';
import { success, created, noContent } from '../utils/response';
import { HotelNotFoundError } from '../errors/domain.errors';

export class HotelsController {
    private hotelsService: HotelsService;

    constructor() {
        this.hotelsService = new HotelsService();
    }

    public async getAllHotels(req: Request, res: Response): Promise<void> {
        try {
            const hotels = await this.hotelsService.getAllHotels();
            success(res, hotels);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving hotels', error });
        }
    }

    public async getHotelById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const hotel = await this.hotelsService.getHotelById(id);
            if (!hotel) throw new HotelNotFoundError(id);
            success(res, hotel);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving hotel', error });
        }
    }

    public async createHotel(req: Request, res: Response): Promise<void> {
        const hotelData: CreateHotelDTO = req.body;
        try {
            const newHotel = await this.hotelsService.createHotel(hotelData);
            created(res, newHotel);
        } catch (error) {
            res.status(500).json({ message: 'Error creating hotel', error });
        }
    }

    public async updateHotel(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
    const hotelData: Partial<HotelDTO> = req.body;
        try {
            const updatedHotel = await this.hotelsService.updateHotel(id, hotelData);
            if (!updatedHotel) throw new HotelNotFoundError(id);
            success(res, updatedHotel);
        } catch (error) {
            res.status(500).json({ message: 'Error updating hotel', error });
        }
    }

    public async deleteHotel(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const deleted = await this.hotelsService.deleteHotel(id);
            if (!deleted) throw new HotelNotFoundError(id);
            noContent(res);
        } catch (error) {
            res.status(500).json({ message: 'Error deleting hotel', error });
        }
    }
}