export interface Repo<T> {
  save(entity: T): Promise<T>;
  update(entity: T): Promise<T>;
  delete(entity: T): Promise<T>;
  find(id: string): Promise<T>;
  findAll(): Promise<T[]>;
  exists(entity: T): Promise<boolean>;
}
