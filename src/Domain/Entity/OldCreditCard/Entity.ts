import { Entity } from "..";
import {
  CPF,
  Email,
  ExpirationDate,
  Number,
  SecurityCode,
} from "./ValueObjects";

type OldCreditCardProps = {
  number: Number;
  cpf: CPF;
  email: Email;
  expirationDate: ExpirationDate;
  securityCode: SecurityCode;
};

export class OldCreditCard extends Entity<OldCreditCardProps> {
  private constructor(props: OldCreditCardProps, id?: string) {
    super(props, id);
  }

  public static create(props: OldCreditCardProps): OldCreditCard {
    return new OldCreditCard(props);
  }

  public static existing(props: OldCreditCardProps, id: string): OldCreditCard {
    return new OldCreditCard(props, id);
  }
}
