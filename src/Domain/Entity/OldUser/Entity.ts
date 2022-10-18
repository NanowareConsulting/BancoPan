import { Entity } from "..";
import { CPF, Email, Name, PasswordHash } from "./ValueObjects";

type OldUserProps = {
  name: Name;
  email: Email;
  cpf: CPF;
  password: PasswordHash;
};

export class OldUser extends Entity<OldUserProps> {
  private constructor(props: OldUserProps, id?: string) {
    super(props, id);
  }

  public static create(props: OldUserProps): OldUser {
    return new OldUser(props);
  }

  public static existing(props: OldUserProps, id: string): OldUser {
    return new OldUser(props, id);
  }
}
