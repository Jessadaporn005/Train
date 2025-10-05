"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelsService = void 0;
const repositories_1 = require("../repositories");
class HotelsService {
    async getAllHotels() {
        return repositories_1.hotelRepository.find();
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
