import { Entity } from "..";
import { Amount, CPF, Email, Interest } from "./ValueObjects";

type OldLoanProps = {
  cpf: CPF;
  email: Email;
  amount: Amount;
  interest: Interest;
};

export class OldLoan extends Entity<OldLoanProps> {
  private constructor(props: OldLoanProps, id?: string) {
    super(props, id);
  }

  public static create(props: OldLoanProps): OldLoan {
    return new OldLoan(props);
  }

  public static existing(props: OldLoanProps, id: string): OldLoan {
    return new OldLoan(props, id);
  }
}
