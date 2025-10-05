"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantsController = void 0;
const restaurants_service_1 = require("../services/restaurants.service");
const response_1 = require("../utils/response");
const domain_errors_1 = require("../errors/domain.errors");
class RestaurantsController {
    constructor() {
        this.restaurantsService = new restaurants_service_1.RestaurantsService();
    }
    async getAllRestaurants(req, res) {
        try {
            const restaurants = await this.restaurantsService.getAllRestaurants();
            (0, response_1.success)(res, restaurants);
        }
        catch (error) {
            res.status(500).json({ message: 'Error retrieving restaurants', error });
        }
    }
    async getRestaurantById(req, res) {
        const { id } = req.params;
        try {
            const restaurant = await this.restaurantsService.getRestaurantById(id);
            if (!restaurant)
                throw new domain_errors_1.RestaurantNotFoundError(id);
            (0, response_1.success)(res, restaurant);
        }
        catch (error) {
            res.status(500).json({ message: 'Error retrieving restaurant', error });
        }
    }
    async createRestaurant(req, res) {
        const newRestaurant = req.body;
        try {
            const createdRestaurant = await this.restaurantsService.addRestaurant(newRestaurant);
            (0, response_1.created)(res, createdRestaurant);
        }
        catch (error) {
            res.status(500).json({ message: 'Error creating restaurant', error });
        }
    }
    async updateRestaurant(req, res) {
        const { id } = req.params;
        const updatedData = req.body;
        try {
            const updatedRestaurant = await this.restaurantsService.updateRestaurant(id, updatedData);
            if (!updatedRestaurant)
                throw new domain_errors_1.RestaurantNotFoundError(id);
            (0, response_1.success)(res, updatedRestaurant);
        }
        catch (error) {
            res.status(500).json({ message: 'Error updating restaurant', error });
        }
    }
    async deleteRestaurant(req, res) {
        const { id } = req.params;
        try {
            const deleted = await this.restaurantsService.deleteRestaurant(id);
            if (!deleted)
                throw new domain_errors_1.RestaurantNotFoundError(id);
            (0, response_1.noContent)(res);
        }
        catch (error) {
            res.status(500).json({ message: 'Error deleting restaurant', error });
        }
    }
}
exports.RestaurantsController = RestaurantsController;
