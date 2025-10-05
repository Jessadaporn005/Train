"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelsController = void 0;
const hotels_service_1 = require("../services/hotels.service");
class HotelsController {
    constructor() {
        this.hotelsService = new hotels_service_1.HotelsService();
    }
    async getAllHotels(req, res) {
        try {
            const hotels = await this.hotelsService.getAllHotels();
            res.status(200).json(hotels);
        }
        catch (error) {
            res.status(500).json({ message: 'Error retrieving hotels', error });
        }
    }
    async getHotelById(req, res) {
        const { id } = req.params;
        try {
            const hotel = await this.hotelsService.getHotelById(id);
            if (hotel) {
                res.status(200).json(hotel);
            }
            else {
                res.status(404).json({ message: 'Hotel not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Error retrieving hotel', error });
        }
    }
    async createHotel(req, res) {
        const hotelData = req.body;
        try {
            const newHotel = await this.hotelsService.createHotel(hotelData);
            res.status(201).json(newHotel);
        }
        catch (error) {
            res.status(500).json({ message: 'Error creating hotel', error });
        }
    }
    async updateHotel(req, res) {
        const { id } = req.params;
        const hotelData = req.body;
        try {
            const updatedHotel = await this.hotelsService.updateHotel(id, hotelData);
            if (updatedHotel) {
                res.status(200).json(updatedHotel);
            }
            else {
                res.status(404).json({ message: 'Hotel not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Error updating hotel', error });
        }
    }
    async deleteHotel(req, res) {
        const { id } = req.params;
        try {
            const deleted = await this.hotelsService.deleteHotel(id);
            if (deleted) {
                res.status(204).send();
            }
            else {
                res.status(404).json({ message: 'Hotel not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Error deleting hotel', error });
        }
    }
}
exports.HotelsController = HotelsController;
