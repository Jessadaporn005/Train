export interface Hotel {
    id: string;
    name: string;
    location: string;
    description: string;
    pricePerNight: number;
    amenities: string[];
    rating: number;
    availableRooms: number;
}