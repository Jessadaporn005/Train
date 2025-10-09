import { randomUUID } from 'crypto';

export interface RefreshToken {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date;
  createdAt: Date;
  revokedAt?: Date;
}

export interface RefreshTokenRepository {
  create(userId: string, token: string, expiresAt: Date): Promise<RefreshToken>;
  findByToken(token: string): Promise<RefreshToken | null>;
  revoke(token: string): Promise<void>;
  deleteByUser(userId: string): Promise<void>;
}

export class InMemoryRefreshTokenRepository implements RefreshTokenRepository {
  private store = new Map<string, RefreshToken>();

  async create(userId: string, token: string, expiresAt: Date): Promise<RefreshToken> {
    const rt: RefreshToken = { id: randomUUID(), userId, token, expiresAt, createdAt: new Date() };
    this.store.set(rt.token, rt);
    return rt;
  }

  async findByToken(token: string): Promise<RefreshToken | null> {
    return this.store.get(token) || null;
  }

  async revoke(token: string): Promise<void> {
    const rt = this.store.get(token);
    if (rt) { rt.revokedAt = new Date(); this.store.set(token, rt); }
  }

  async deleteByUser(userId: string): Promise<void> {
    for (const [key, val] of this.store.entries()) {
      if (val.userId === userId) this.store.delete(key);
    }
  }
}