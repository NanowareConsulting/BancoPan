import {
  CPF,
  Email,
  ExpirationDate,
  Number,
  OldCreditCard,
  SecurityCode,
} from "@/Domain";

import { Mapper as IMapper } from "../Core";

export namespace OldCreditCardMapper {
  export type Entity = OldCreditCard;

  export type Persistence = {
    id: string;
    number: string;
    security_code: number;
    expiration_date: Date;
    email: string;
    cpf: string;
  };

  class OldCreditCardMapper implements IMapper<Entity, Persistence> {
    toEntity(p: Persistence): Entity {
      const numberOrError = Number.create(p.number);
      const securityCodeOrError = SecurityCode.create(p.security_code);
      const expirationDateOrError = ExpirationDate.create(p.expiration_date);
      const emailOrError = Email.create(p.email);
      const cpfOrError = CPF.create(p.cpf);

      if (emailOrError.isLeft()) throw new Error("Invalid email");

      if (cpfOrError.isLeft()) throw new Error("Invalid cpf");

      if (numberOrError.isLeft()) throw new Error("Invalid number");

      if (securityCodeOrError.isLeft())
        throw new Error("Invalid security code");

      if (expirationDateOrError.isLeft())
        throw new Error("Invalid expiration date");

      return OldCreditCard.existing(
        {
          number: numberOrError.value,
          securityCode: securityCodeOrError.value,
          expirationDate: expirationDateOrError.value,
          email: emailOrError.value,
          cpf: cpfOrError.value,
        },
        p.id
      );
    }

    toPersistence(e: Entity): Persistence {
      return {
        id: e.id,
        number: e.props.number.props.value,
        security_code: e.props.securityCode.props.value,
        expiration_date: e.props.expirationDate.props.value,
        email: e.props.email.props.value,
        cpf: e.props.cpf.props.value,
      };
    }
  }

  const Mapper = new OldCreditCardMapper();

  export const toEntity = Mapper.toEntity;
  export const toPersistence = Mapper.toPersistence;
}
