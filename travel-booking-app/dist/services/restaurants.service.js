"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantsService = void 0;
class RestaurantsService {
    constructor() {
        this.restaurants = [];
    }
    getAllRestaurants() {
        return this.restaurants;
    }
    getRestaurantById(id) {
        return this.restaurants.find(restaurant => restaurant.id === id) || null;
    }
    addRestaurant(restaurant) {
        this.restaurants.push(restaurant);
        return restaurant;
    }
    updateRestaurant(id, updatedRestaurant) {
        const index = this.restaurants.findIndex(restaurant => restaurant.id === id);
        if (index === -1)
            return null;
        this.restaurants[index] = { ...this.restaurants[index], ...updatedRestaurant };
        return this.restaurants[index];
    }
    deleteRestaurant(id) {
        const index = this.restaurants.findIndex(restaurant => restaurant.id === id);
        if (index !== -1) {
            this.restaurants.splice(index, 1);
            return true;
        }
        return false;
    }
}
exports.RestaurantsService = RestaurantsService;
