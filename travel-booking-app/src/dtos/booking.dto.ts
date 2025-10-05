export interface BookingDTO {
    userId: string;
    hotelId: string;
    restaurantId?: string;
    attractionId?: string;
    checkInDate: Date;
    checkOutDate: Date;
    numberOfGuests: number;
    specialRequests?: string;
}