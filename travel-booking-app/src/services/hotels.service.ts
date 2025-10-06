import { hotelRepository } from '../repositories';
import { Hotel } from '../models/hotel.model';
import { CreateHotelDTO, HotelDTO } from '../dtos/hotel.dto';

export interface HotelListOptions {
    page: number;
    pageSize: number;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    minRating?: number;
    sort?: 'price' | '-price' | 'rating' | '-rating' | 'name' | '-name';
}

export class HotelsService {
    async getAllHotels(opts?: HotelListOptions): Promise<{ data: Hotel[]; total: number; }> {
        const all = await hotelRepository.find();
        if (!opts) return { data: all, total: all.length };
        let filtered = all;
        const { search, minPrice, maxPrice, minRating } = opts;
        if (search) {
            const q = search.toLowerCase();
            filtered = filtered.filter(h => h.name.toLowerCase().includes(q) || (h.location || '').toLowerCase().includes(q));
        }
        if (minPrice !== undefined) filtered = filtered.filter(h => (h.pricePerNight ?? 0) >= minPrice);
        if (maxPrice !== undefined) filtered = filtered.filter(h => (h.pricePerNight ?? 0) <= maxPrice);
        if (minRating !== undefined) filtered = filtered.filter(h => (h.rating ?? 0) >= minRating);
        if (opts.sort) {
            const dir = opts.sort.startsWith('-') ? -1 : 1;
            const field = opts.sort.replace('-', '');
            filtered = [...filtered].sort((a: any, b: any) => {
                const av = (field === 'name' ? a.name : field === 'price' ? a.pricePerNight : field === 'rating' ? a.rating : undefined) ?? 0;
                const bv = (field === 'name' ? b.name : field === 'price' ? b.pricePerNight : field === 'rating' ? b.rating : undefined) ?? 0;
                if (av < bv) return -1 * dir;
                if (av > bv) return 1 * dir;
                return 0;
            });
        }
        const total = filtered.length;
        const page = opts.page;
        const pageSize = opts.pageSize;
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        const pageData = filtered.slice(start, end);
        return { data: pageData, total };
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
