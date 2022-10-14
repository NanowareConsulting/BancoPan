import { Entity } from "../Core";
import { ExpirationDate, Name, Number, SecurityCode } from "./ValueObjects";

type CreditCardProps = {
  number: Number;
  securityCode: SecurityCode;
  expirationDate: ExpirationDate;
  name: Name;
};

export class CreditCard extends Entity<CreditCardProps> {
  private constructor(props: CreditCardProps, id?: string) {
    super(props, id);
  }

  public static create(props: CreditCardProps): CreditCard {
    return new CreditCard(props);
  }

  public static existing(props: CreditCardProps, id: string): CreditCard {
    return new CreditCard(props, id);
  }

  public toJSON() {
    return {
      id: this.id,
      number: this.props.number.props.value,
      securityCode: this.props.securityCode.props.value,
      expirationDate: this.props.expirationDate.props.value,
      name: this.props.name.props.value,
    };
  }
}
