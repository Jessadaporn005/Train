"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelsService = void 0;
const repositories_1 = require("../repositories");
class HotelsService {
    async getAllHotels(opts) {
        const all = await repositories_1.hotelRepository.find();
        if (!opts)
            return { data: all, total: all.length };
        let filtered = all;
        const { search, minPrice, maxPrice, minRating } = opts;
        if (search) {
            const q = search.toLowerCase();
            filtered = filtered.filter(h => h.name.toLowerCase().includes(q) || (h.location || '').toLowerCase().includes(q));
        }
        if (minPrice !== undefined)
            filtered = filtered.filter(h => (h.pricePerNight ?? 0) >= minPrice);
        if (maxPrice !== undefined)
            filtered = filtered.filter(h => (h.pricePerNight ?? 0) <= maxPrice);
        if (minRating !== undefined)
            filtered = filtered.filter(h => (h.rating ?? 0) >= minRating);
        if (opts.sort) {
            const dir = opts.sort.startsWith('-') ? -1 : 1;
            const field = opts.sort.replace('-', '');
            filtered = [...filtered].sort((a, b) => {
                const av = (field === 'name' ? a.name : field === 'price' ? a.pricePerNight : field === 'rating' ? a.rating : undefined) ?? 0;
                const bv = (field === 'name' ? b.name : field === 'price' ? b.pricePerNight : field === 'rating' ? b.rating : undefined) ?? 0;
                if (av < bv)
                    return -1 * dir;
                if (av > bv)
                    return 1 * dir;
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
    async getHotelById(id) {
        return repositories_1.hotelRepository.findById(id);
    }
    async createHotel(data) {
        return repositories_1.hotelRepository.create({
            name: data.name,
            location: data.location,
            description: data.description,
            pricePerNight: data.pricePerNight,
            amenities: data.amenities,
            rating: data.rating ?? 0,
            availableRooms: data.availableRooms
        });
    }
    async updateHotel(id, data) {
        return repositories_1.hotelRepository.update(id, data);
    }
    async deleteHotel(id) {
        return repositories_1.hotelRepository.delete(id);
    }
}
exports.HotelsService = HotelsService;
