import { z } from 'zod';

export const registerSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6)
}).refine(d => d.password === d.confirmPassword, { message: 'Passwords do not match', path: ['confirmPassword'] });

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

export const createHotelSchema = z.object({
  name: z.string().min(2),
  location: z.string().min(2),
  description: z.string().optional().default(''),
  pricePerNight: z.coerce.number().min(0),
  amenities: z.array(z.string()).optional().default([]),
  rating: z.coerce.number().min(0).max(5).optional().default(0),
  availableRooms: z.coerce.number().min(0).optional().default(0)
});

export const createBookingSchema = z.object({
  userId: z.string().min(1),
  hotelId: z.string().min(1),
  restaurantId: z.string().optional(),
  attractionId: z.string().optional(),
  checkInDate: z.coerce.date(),
  checkOutDate: z.coerce.date(),
  numberOfGuests: z.coerce.number().min(1).max(20),
  specialRequests: z.string().max(500).optional()
}).refine(d => d.checkOutDate > d.checkInDate, { message: 'checkOutDate must be after checkInDate', path: ['checkOutDate'] });
