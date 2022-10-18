export interface Mapper<E, P> {
  toEntity(p: P): E;
  toPersistence(e: E): P;
}
