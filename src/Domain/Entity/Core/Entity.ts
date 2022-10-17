import { v4 as uuid } from "uuid";

export abstract class Entity {
  public readonly id: string;

  protected constructor(id?: string) {
    this.id = id ?? uuid();
  }
}
