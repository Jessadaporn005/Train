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

export const refreshSchema = z.object({
  refreshToken: z.string().min(20)
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

export const hotelListQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  pageSize: z.coerce.number().min(1).max(100).default(10),
  search: z.string().trim().min(1).optional(),
  minPrice: z.coerce.number().min(0).optional(),
  maxPrice: z.coerce.number().min(0).optional(),
  minRating: z.coerce.number().min(0).max(5).optional(),
  sort: z.enum(['price','-price','rating','-rating','name','-name']).optional()
}).refine(d => (d.minPrice === undefined || d.maxPrice === undefined) || d.minPrice <= d.maxPrice, {
  message: 'minPrice must be <= maxPrice', path: ['minPrice']
});

