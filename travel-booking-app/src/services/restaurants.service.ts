import { Restaurant } from '../models/restaurant.model';

export class RestaurantsService {
    private restaurants: Restaurant[] = [];

    public getAllRestaurants(): Restaurant[] {
        return this.restaurants;
    }

    public getRestaurantById(id: string): Restaurant | null {
        return this.restaurants.find(restaurant => restaurant.id === id) || null;
    }

    public addRestaurant(restaurant: Restaurant): Restaurant {
        this.restaurants.push(restaurant);
        return restaurant;
    }

    public updateRestaurant(id: string, updatedRestaurant: Partial<Restaurant>): Restaurant | null {
        const index = this.restaurants.findIndex(restaurant => restaurant.id === id);
        if (index === -1) return null;
        this.restaurants[index] = { ...this.restaurants[index], ...updatedRestaurant };
        return this.restaurants[index];
    }

    public deleteRestaurant(id: string): boolean {
        const index = this.restaurants.findIndex(restaurant => restaurant.id === id);
        if (index !== -1) {
            this.restaurants.splice(index, 1);
            return true;
        }
        return false;
    }
}