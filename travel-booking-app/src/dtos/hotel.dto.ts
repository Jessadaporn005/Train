export interface HotelDTO {
    id?: string; // optional when creating
    name: string;
    location: string;
    description: string;
    pricePerNight: number;
    amenities: string[];
    rating: number;
    availableRooms: number;
}

export type CreateHotelDTO = Omit<HotelDTO, 'id' | 'rating'> & { rating?: number };
