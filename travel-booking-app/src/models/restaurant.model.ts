export interface Restaurant {
    id: string;
    name: string;
    address: string;
    phone: string;
    email: string;
    website?: string;
    rating: number;
    cuisineType: string;
    description?: string;
    openingHours: string;
    createdAt: Date;
    updatedAt: Date;
}