export interface Repo<T> {
  save(entity: T): Promise<T>;
  update(entity: T): Promise<T>;
  delete(id: string): Promise<T>;
  find(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  exists(entity: T): Promise<boolean>;
}
