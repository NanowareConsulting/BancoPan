import { compareSync, hashSync } from "bcrypt";

import { ValueObject } from "@/Domain/Entity/Core";

type PasswordHashProps = {
  value: string;
};
export class PasswordHash extends ValueObject<PasswordHashProps> {
  private constructor(props: PasswordHashProps) {
    super(props);
  }

  public static create(value: string): PasswordHash {
    const hash = hashSync(value, 10);
    return new PasswordHash({ value: hash });
  }

  public equals(password: PasswordHash): boolean {
    return compareSync(password.props.value, this.props.value);
  }
}
