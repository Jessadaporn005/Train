export interface RestaurantDTO {
    id: string;
    name: string;
    address: string;
    phone: string;
    rating: number;
    cuisine: string;
    description?: string;
    website?: string;
}