import { Repository } from '../base.repository';
import { User } from '../../models/user.model';
import { randomUUID } from 'crypto';

export interface UserRepository extends Repository<User> {
  findByEmail(email: string): Promise<User | null>;
}

export class InMemoryUserRepository implements UserRepository {
  private store = new Map<string, User>();

  async findById(id: string): Promise<User | null> {
    return this.store.get(id) || null;
  }

  async find(): Promise<User[]> { // ignoring filtering for now
    return Array.from(this.store.values());
  }

  async create(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const now = new Date();
    const user: User = { id: randomUUID(), createdAt: now, updatedAt: now, ...data };
    this.store.set(user.id, user);
    return user;
  }

  async update(id: string, data: Partial<Omit<User, 'id'>>): Promise<User | null> {
    const existing = this.store.get(id);
    if (!existing) return null;
    const updated: User = { ...existing, ...data, updatedAt: new Date() };
    this.store.set(id, updated);
    return updated;
  }

  async delete(id: string): Promise<boolean> {
    return this.store.delete(id);
  }

  async findByEmail(email: string): Promise<User | null> {
    return Array.from(this.store.values()).find(u => u.email === email) || null;
  }
}
