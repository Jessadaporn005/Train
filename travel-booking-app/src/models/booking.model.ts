export interface Booking {
    id: string;
    userId: string;
    hotelId: string;
    restaurantId: string;
    attractionId: string;
    checkInDate: Date;
    checkOutDate: Date;
    totalPrice: number;
    status: 'pending' | 'confirmed' | 'canceled';
    createdAt: Date;
    updatedAt: Date;
}