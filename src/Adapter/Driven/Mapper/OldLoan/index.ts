import { Amount, CPF, Email, Interest, OldLoan } from "@/Domain";

import { Mapper as IMapper } from "../Core";

export namespace OldLoanMapper {
  export type Entity = OldLoan;

  export type Persistence = {
    id: string;
    email: string;
    cpf: string;
    amount: number;
    interest: number;
  };

  class OldLoanMapper implements IMapper<Entity, Persistence> {
    toEntity(p: Persistence): Entity {
      const emailOrError = Email.create(p.email);
      const cpfOrError = CPF.create(p.cpf);
      const amountOrError = Amount.create(p.amount);
      const interestOrError = Interest.create(p.interest);

      if (emailOrError.isLeft()) {
        throw new Error("Invalid email");
      }

      if (cpfOrError.isLeft()) {
        throw new Error("Invalid cpf");
      }

      if (amountOrError.isLeft()) {
        throw new Error("Invalid amount");
      }

      if (interestOrError.isLeft()) {
        throw new Error("Invalid interest");
      }

      const email = emailOrError.value;
      const cpf = cpfOrError.value;
      const amount = amountOrError.value;
      const interest = interestOrError.value;

      return OldLoan.existing(
        {
          email,
          cpf,
          amount,
          interest,
        },
        p.id
      );
    }

    toPersistence(e: Entity): Persistence {
      return {
        id: e.id,
        email: e.props.email.props.value,
        cpf: e.props.cpf.props.value,
        amount: e.props.amount.props.value,
        interest: e.props.interest.props.value,
      };
    }
  }

  const Mapper = new OldLoanMapper();

  export const toEntity = Mapper.toEntity;
  export const toPersistence = Mapper.toPersistence;
}
