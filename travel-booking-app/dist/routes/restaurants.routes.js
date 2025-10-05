"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const restaurants_controller_1 = require("../controllers/restaurants.controller");
const router = (0, express_1.Router)();
const restaurantsController = new restaurants_controller_1.RestaurantsController();
// Route to get all restaurants
router.get('/', restaurantsController.getAllRestaurants);
// Route to get a restaurant by ID
router.get('/:id', restaurantsController.getRestaurantById);
// Route to create a new restaurant
router.post('/', restaurantsController.createRestaurant);
// Route to update a restaurant by ID
router.put('/:id', restaurantsController.updateRestaurant);
// Route to delete a restaurant by ID
router.delete('/:id', restaurantsController.deleteRestaurant);
exports.default = router;
