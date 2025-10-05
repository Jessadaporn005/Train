// Generic repository interfaces to allow swapping storage layer later (in-memory, DB, etc.)
export interface FindOptions<T> {
  where?: Partial<T>;
  limit?: number;
  offset?: number;
  orderBy?: keyof T;
  orderDir?: 'asc' | 'desc';
}

export interface Repository<T extends { id: string }> {
  findById(id: string): Promise<T | null>;
  find(options?: FindOptions<T>): Promise<T[]>;
  create(data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T>;
  update(id: string, data: Partial<Omit<T, 'id'>>): Promise<T | null>;
  delete(id: string): Promise<boolean>;
}

// Extended repositories can add domain specific helpers (example: findByEmail for User)
