"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryUserRepository = void 0;
const crypto_1 = require("crypto");
class InMemoryUserRepository {
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
        const now = new Date();
        const user = { id: (0, crypto_1.randomUUID)(), createdAt: now, updatedAt: now, ...data };
        this.store.set(user.id, user);
        return user;
    }
    async update(id, data) {
        const existing = this.store.get(id);
        if (!existing)
            return null;
        const updated = { ...existing, ...data, updatedAt: new Date() };
        this.store.set(id, updated);
        return updated;
    }
    async delete(id) {
        return this.store.delete(id);
    }
    async findByEmail(email) {
        return Array.from(this.store.values()).find(u => u.email === email) || null;
    }
}
exports.InMemoryUserRepository = InMemoryUserRepository;
