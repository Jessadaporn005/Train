// Simple repository factory / singletons (in-memory implementation for now)
import { InMemoryUserRepository } from './inmemory/user.inmemory.repository';
import { InMemoryHotelRepository } from './inmemory/hotel.inmemory.repository';

// Later you can switch by checking process.env.STORAGE_DRIVER === 'db'

export const userRepository = new InMemoryUserRepository();
export const hotelRepository = new InMemoryHotelRepository();
