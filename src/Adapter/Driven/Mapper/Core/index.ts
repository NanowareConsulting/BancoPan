export interface Mapper<P, E> {
  toPersistence: (entity: E) => P;
  toEntity: (persistence: P) => E;
}
