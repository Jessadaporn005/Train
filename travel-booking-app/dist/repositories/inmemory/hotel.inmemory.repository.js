"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryHotelRepository = void 0;
const crypto_1 = require("crypto");
class InMemoryHotelRepository {
    constructor() {
        this.store = new Map();
    }
    async findById(id) {
        return this.store.get(id) || null;
    }
    async find() {
        return Array.from(this.store.values());
    }
    async create(data) {
        const hotel = { id: (0, crypto_1.randomUUID)(), ...data };
        this.store.set(hotel.id, hotel);
        return hotel;
    }
    async update(id, data) {
        const existing = this.store.get(id);
        if (!existing)
            return null;
        const updated = { ...existing, ...data };
        this.store.set(id, updated);
        return updated;
    }
    async delete(id) {
        return this.store.delete(id);
    }
}
exports.InMemoryHotelRepository = InMemoryHotelRepository;
