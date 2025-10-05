import { Repository } from '../base.repository';
import { Hotel } from '../../models/hotel.model';
import { randomUUID } from 'crypto';

export class InMemoryHotelRepository implements Repository<Hotel> {
  private store = new Map<string, Hotel>();

  async findById(id: string): Promise<Hotel | null> {
    return this.store.get(id) || null;
  }

  async find(): Promise<Hotel[]> { // ignore filtering for now
    return Array.from(this.store.values());
  }

  async create(data: Omit<Hotel, 'id'>): Promise<Hotel> { // Hotel interface currently has no createdAt/updatedAt
    const hotel: Hotel = { id: randomUUID(), ...data } as Hotel;
    this.store.set(hotel.id, hotel);
    return hotel;
  }

  async update(id: string, data: Partial<Omit<Hotel, 'id'>>): Promise<Hotel | null> {
    const existing = this.store.get(id);
    if (!existing) return null;
    const updated: Hotel = { ...existing, ...data };
    this.store.set(id, updated);
    return updated;
  }

  async delete(id: string): Promise<boolean> {
    return this.store.delete(id);
  }
}
