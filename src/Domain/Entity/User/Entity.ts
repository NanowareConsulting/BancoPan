import { Entity } from "..";
import { Email, Name, PasswordHash } from "./ValueObjects";

type UserProps = {
  name: Name;
  email: Email;
  password: PasswordHash;
};

export class User extends Entity<UserProps> {
  private constructor(props: UserProps, id?: string) {
    super(props, id);
  }

  public static create(props: UserProps): User {
    return new User(props);
  }

  public static existing(props: UserProps, id: string): User {
    return new User(props, id);
  }
}
