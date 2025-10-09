"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryRefreshTokenRepository = void 0;
const crypto_1 = require("crypto");
class InMemoryRefreshTokenRepository {
    constructor() {
        this.store = new Map();
    }
    async create(userId, token, expiresAt) {
        const rt = { id: (0, crypto_1.randomUUID)(), userId, token, expiresAt, createdAt: new Date() };
        this.store.set(rt.token, rt);
        return rt;
    }
    async findByToken(token) {
        return this.store.get(token) || null;
    }
    async revoke(token) {
        const rt = this.store.get(token);
        if (rt) {
            rt.revokedAt = new Date();
            this.store.set(token, rt);
        }
    }
    async deleteByUser(userId) {
        for (const [key, val] of this.store.entries()) {
            if (val.userId === userId)
                this.store.delete(key);
        }
    }
}
exports.InMemoryRefreshTokenRepository = InMemoryRefreshTokenRepository;
