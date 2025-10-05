import { Request, Response } from 'express';
import { RestaurantsService } from '../services/restaurants.service';
import { Restaurant } from '../models/restaurant.model';
import { success, created, noContent } from '../utils/response';
import { RestaurantNotFoundError } from '../errors/domain.errors';

export class RestaurantsController {
    private restaurantsService: RestaurantsService;

    constructor() {
        this.restaurantsService = new RestaurantsService();
    }

    public async getAllRestaurants(req: Request, res: Response): Promise<void> {
        try {
            const restaurants: Restaurant[] = await this.restaurantsService.getAllRestaurants();
            success(res, restaurants);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving restaurants', error });
        }
    }

    public async getRestaurantById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const restaurant = await this.restaurantsService.getRestaurantById(id);
            if (!restaurant) throw new RestaurantNotFoundError(id);
            success(res, restaurant);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving restaurant', error });
        }
    }

    public async createRestaurant(req: Request, res: Response): Promise<void> {
        const newRestaurant: Restaurant = req.body;
        try {
            const createdRestaurant = await this.restaurantsService.addRestaurant(newRestaurant);
            created(res, createdRestaurant);
        } catch (error) {
            res.status(500).json({ message: 'Error creating restaurant', error });
        }
    }

    public async updateRestaurant(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const updatedData: Restaurant = req.body;
        try {
            const updatedRestaurant = await this.restaurantsService.updateRestaurant(id, updatedData);
            if (!updatedRestaurant) throw new RestaurantNotFoundError(id);
            success(res, updatedRestaurant);
        } catch (error) {
            res.status(500).json({ message: 'Error updating restaurant', error });
        }
    }

    public async deleteRestaurant(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const deleted: boolean = await this.restaurantsService.deleteRestaurant(id);
            if (!deleted) throw new RestaurantNotFoundError(id);
            noContent(res);
        } catch (error) {
            res.status(500).json({ message: 'Error deleting restaurant', error });
        }
    }
}