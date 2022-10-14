import { CreditCard, Entity } from "..";
import { Email, Name, Password } from "./ValueObjects";

type UserProps = {
  name: Name;
  email: Email;
  password: Password;
  creditCards: CreditCard[];
};

export class User extends Entity<UserProps> {
  private constructor(props: UserProps, id?: string) {
    super(props, id);
  }

  public static create(props: Omit<UserProps, "creditCards">): User {
    return new User({
      ...props,
      creditCards: [],
    });
  }

  public static existing(props: UserProps, id: string): User {
    return new User(props, id);
  }

  public toJSON() {
    return {
      id: this.id,
      name: this.props.name.props.value,
      email: this.props.email.props.value,
      password: this.props.password.props.value,
      creditCards: this.props.creditCards.map((creditCard) =>
        creditCard.toJSON()
      ),
    };
  }
}
