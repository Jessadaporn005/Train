"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hotelListQuerySchema = exports.createBookingSchema = exports.createHotelSchema = exports.refreshSchema = exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    username: zod_1.z.string().min(2).max(50),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    confirmPassword: zod_1.z.string().min(6)
}).refine(d => d.password === d.confirmPassword, { message: 'Passwords do not match', path: ['confirmPassword'] });
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(1)
});
exports.refreshSchema = zod_1.z.object({
    refreshToken: zod_1.z.string().min(20)
});
exports.createHotelSchema = zod_1.z.object({
    name: zod_1.z.string().min(2),
    location: zod_1.z.string().min(2),
    description: zod_1.z.string().optional().default(''),
    pricePerNight: zod_1.z.coerce.number().min(0),
    amenities: zod_1.z.array(zod_1.z.string()).optional().default([]),
    rating: zod_1.z.coerce.number().min(0).max(5).optional().default(0),
    availableRooms: zod_1.z.coerce.number().min(0).optional().default(0)
});
exports.createBookingSchema = zod_1.z.object({
    userId: zod_1.z.string().min(1),
    hotelId: zod_1.z.string().min(1),
    restaurantId: zod_1.z.string().optional(),
    attractionId: zod_1.z.string().optional(),
    checkInDate: zod_1.z.coerce.date(),
    checkOutDate: zod_1.z.coerce.date(),
    numberOfGuests: zod_1.z.coerce.number().min(1).max(20),
    specialRequests: zod_1.z.string().max(500).optional()
}).refine(d => d.checkOutDate > d.checkInDate, { message: 'checkOutDate must be after checkInDate', path: ['checkOutDate'] });
exports.hotelListQuerySchema = zod_1.z.object({
    page: zod_1.z.coerce.number().min(1).default(1),
    pageSize: zod_1.z.coerce.number().min(1).max(100).default(10),
    search: zod_1.z.string().trim().min(1).optional(),
    minPrice: zod_1.z.coerce.number().min(0).optional(),
    maxPrice: zod_1.z.coerce.number().min(0).optional(),
    minRating: zod_1.z.coerce.number().min(0).max(5).optional(),
    sort: zod_1.z.enum(['price', '-price', 'rating', '-rating', 'name', '-name']).optional()
}).refine(d => (d.minPrice === undefined || d.maxPrice === undefined) || d.minPrice <= d.maxPrice, {
    message: 'minPrice must be <= maxPrice', path: ['minPrice']
});
