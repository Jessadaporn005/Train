interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

interface Hotel {
    id: string;
    name: string;
    location: string;
    rating: number;
    pricePerNight: number;
    amenities: string[];
    createdAt: Date;
    updatedAt: Date;
}

interface Restaurant {
    id: string;
    name: string;
    cuisine: string;
    location: string;
    rating: number;
    createdAt: Date;
    updatedAt: Date;
}

interface Attraction {
    id: string;
    name: string;
    description: string;
    location: string;
    openingHours: string;
    createdAt: Date;
    updatedAt: Date;
}

interface Booking {
    id: string;
    userId: string;
    hotelId: string;
    restaurantId: string;
    attractionId: string;
    checkInDate: Date;
    checkOutDate: Date;
    createdAt: Date;
    updatedAt: Date;
}