"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantsController = void 0;
const restaurants_service_1 = require("../services/restaurants.service");
class RestaurantsController {
    constructor() {
        this.restaurantsService = new restaurants_service_1.RestaurantsService();
    }
    async getAllRestaurants(req, res) {
        try {
            const restaurants = await this.restaurantsService.getAllRestaurants();
            res.status(200).json(restaurants);
        }
        catch (error) {
            res.status(500).json({ message: 'Error retrieving restaurants', error });
        }
    }
    async getRestaurantById(req, res) {
        const { id } = req.params;
        try {
            const restaurant = await this.restaurantsService.getRestaurantById(id);
            if (!restaurant) {
                res.status(404).json({ message: 'Restaurant not found' });
                return;
            }
            res.status(200).json(restaurant);
        }
        catch (error) {
            res.status(500).json({ message: 'Error retrieving restaurant', error });
        }
    }
    async createRestaurant(req, res) {
        const newRestaurant = req.body;
        try {
            const createdRestaurant = await this.restaurantsService.addRestaurant(newRestaurant);
            res.status(201).json(createdRestaurant);
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
            if (!updatedRestaurant) {
                res.status(404).json({ message: 'Restaurant not found' });
                return;
            }
            res.status(200).json(updatedRestaurant);
        }
        catch (error) {
            res.status(500).json({ message: 'Error updating restaurant', error });
        }
    }
    async deleteRestaurant(req, res) {
        const { id } = req.params;
        try {
            const deleted = await this.restaurantsService.deleteRestaurant(id);
            if (!deleted) {
                res.status(404).json({ message: 'Restaurant not found' });
                return;
            }
            res.status(204).send();
        }
        catch (error) {
            res.status(500).json({ message: 'Error deleting restaurant', error });
        }
    }
}
exports.RestaurantsController = RestaurantsController;
