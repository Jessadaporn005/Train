import { hotelRepository } from '../repositories';
import { Hotel } from '../models/hotel.model';
import { CreateHotelDTO, HotelDTO } from '../dtos/hotel.dto';

export class HotelsService {
    async getAllHotels(): Promise<Hotel[]> {
        return hotelRepository.find();
    }

    async getHotelById(id: string): Promise<Hotel | null> {
        return hotelRepository.findById(id);
    }

    async createHotel(data: CreateHotelDTO): Promise<Hotel> {
        return hotelRepository.create({
            name: data.name,
            location: data.location,
            description: data.description,
            pricePerNight: data.pricePerNight,
            amenities: data.amenities,
            rating: data.rating ?? 0,
            availableRooms: data.availableRooms
        });
    }

    async updateHotel(id: string, data: Partial<HotelDTO>): Promise<Hotel | null> {
        return hotelRepository.update(id, data);
    }

    async deleteHotel(id: string): Promise<boolean> {
        return hotelRepository.delete(id);
    }
}
