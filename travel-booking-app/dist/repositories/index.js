"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenRepository = exports.hotelRepository = exports.userRepository = void 0;
// Simple repository factory / singletons (in-memory implementation for now)
const user_inmemory_repository_1 = require("./inmemory/user.inmemory.repository");
const hotel_inmemory_repository_1 = require("./inmemory/hotel.inmemory.repository");
const refreshToken_inmemory_repository_1 = require("./inmemory/refreshToken.inmemory.repository");
// Later you can switch by checking process.env.STORAGE_DRIVER === 'db'
exports.userRepository = new user_inmemory_repository_1.InMemoryUserRepository();
exports.hotelRepository = new hotel_inmemory_repository_1.InMemoryHotelRepository();
exports.refreshTokenRepository = new refreshToken_inmemory_repository_1.InMemoryRefreshTokenRepository();
