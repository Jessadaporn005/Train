import { Router } from 'express';
import { RestaurantsController } from '../controllers/restaurants.controller';

const router = Router();
const restaurantsController = new RestaurantsController();

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

export default router;