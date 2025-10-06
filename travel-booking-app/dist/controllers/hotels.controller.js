"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelsController = void 0;
const hotels_service_1 = require("../services/hotels.service");
const response_1 = require("../utils/response");
const domain_errors_1 = require("../errors/domain.errors");
class HotelsController {
    constructor() {
        this.hotelsService = new hotels_service_1.HotelsService();
    }
    async getAllHotels(req, res) {
        try {
            const query = req.queryValidated; // validated by middleware
            const { data, total } = await this.hotelsService.getAllHotels({
                page: query?.page,
                pageSize: query?.pageSize,
                search: query?.search,
                minPrice: query?.minPrice,
                maxPrice: query?.maxPrice,
                minRating: query?.minRating,
                sort: query?.sort
            });
            (0, response_1.paginated)(res, data, total, query.page, query.pageSize);
        }
        catch (error) {
            res.status(500).json({ message: 'Error retrieving hotels', error });
        }
    }
    async getHotelById(req, res) {
        const { id } = req.params;
        try {
            const hotel = await this.hotelsService.getHotelById(id);
            if (!hotel)
                throw new domain_errors_1.HotelNotFoundError(id);
            (0, response_1.success)(res, hotel);
        }
        catch (error) {
            res.status(500).json({ message: 'Error retrieving hotel', error });
        }
    }
    async createHotel(req, res) {
        const hotelData = req.body;
        try {
            const newHotel = await this.hotelsService.createHotel(hotelData);
            (0, response_1.created)(res, newHotel);
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
            if (!updatedHotel)
                throw new domain_errors_1.HotelNotFoundError(id);
            (0, response_1.success)(res, updatedHotel);
        }
        catch (error) {
            res.status(500).json({ message: 'Error updating hotel', error });
        }
    }
    async deleteHotel(req, res) {
        const { id } = req.params;
        try {
            const deleted = await this.hotelsService.deleteHotel(id);
            if (!deleted)
                throw new domain_errors_1.HotelNotFoundError(id);
            (0, response_1.noContent)(res);
        }
        catch (error) {
            res.status(500).json({ message: 'Error deleting hotel', error });
        }
    }
}
exports.HotelsController = HotelsController;
