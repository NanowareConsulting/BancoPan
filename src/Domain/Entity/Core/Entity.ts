import { v4 as uuid } from "uuid";

export abstract class Entity<T> {
  private readonly _id: string;
  private _props: T;

  protected constructor(props: T, id?: string) {
    this._id = id ? id : uuid();
    this._props = props;
  }

  public get id(): string {
    return this._id;
  }

  public get props(): T {
    return this._props;
  }

  public set props(props: T) {
    this._props = props;
  }
}
