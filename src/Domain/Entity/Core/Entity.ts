import { v4 as uuid, validate } from "uuid";

import { EntityError } from ".";

export abstract class Entity<T> {
  private readonly _id: string;
  private _props: T;

  protected constructor(props: T, id?: string) {
    if (id && !validate(id)) {
      throw new EntityError("Invalid id");
    }

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
