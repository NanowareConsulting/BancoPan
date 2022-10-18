import { OldCreditCardRepo, OldUserRepo } from "@/Adapter";
import {
  CPF,
  Email,
  ExpirationDate,
  Number,
  OldCreditCard,
  SecurityCode,
} from "@/Domain";
import { Left, Right } from "@/Utils/Either";

import { RegisterOldCreditCardError } from "./Error";
import {
  IUCRegisterOldCreditCard,
  RegisterOldCreditCardRequest,
  RegisterOldCreditCardResponse,
} from "./interface";

export class UCRegisterOldCreditCard implements IUCRegisterOldCreditCard {
  constructor(
    private readonly oldCreditCardRepo: OldCreditCardRepo,
    private readonly oldUserRepo: OldUserRepo
  ) {}

  async execute(
    data: RegisterOldCreditCardRequest
  ): Promise<RegisterOldCreditCardResponse> {
    const { cpf, email } = data;

    const random16Digits = (
      Math.floor(Math.random() * 1000000000).toString() +
      Math.floor(Math.random() * 1000000000).toString()
    ).slice(0, 16);

    const random3DigitsNumber = Math.floor(Math.random() * 900 + 100);

    const todayPlus4Years = new Date();

    const emailOrError = Email.create(email);
    const cpfOrError = CPF.create(cpf);
    const numberOrError = Number.create(random16Digits);
    const securityCodeOrError = SecurityCode.create(random3DigitsNumber);
    const expirationDateOrError = ExpirationDate.create(todayPlus4Years);

    if (emailOrError.isLeft()) {
      return new Left(new RegisterOldCreditCardError.InvalidEmail(email));
    }

    if (cpfOrError.isLeft()) {
      return new Left(new RegisterOldCreditCardError.InvalidCPF(cpf));
    }

    if (numberOrError.isLeft()) {
      return new Left(
        new RegisterOldCreditCardError.InvalidNumber(random16Digits)
      );
    }

    if (securityCodeOrError.isLeft()) {
      return new Left(
        new RegisterOldCreditCardError.InvalidSecurityCode(
          `${random3DigitsNumber}`
        )
      );
    }

    if (expirationDateOrError.isLeft()) {
      return new Left(
        new RegisterOldCreditCardError.InvalidExpirationDate(
          `${todayPlus4Years}`
        )
      );
    }

    // const emailExists = await this.oldUserRepo.findByEmail(email);

    // if (!emailExists) {
    //   return new Left(new RegisterOldCreditCardError.EmailDoesNotExist(email));
    // }

    const cpfExists = await this.oldUserRepo.findByCPF(cpf);

    if (!cpfExists) {
      return new Left(new RegisterOldCreditCardError.CPFDoesNotExist(cpf));
    }

    const oldCreditCard = OldCreditCard.create({
      email: emailOrError.value,
      cpf: cpfOrError.value,
      number: numberOrError.value,
      securityCode: securityCodeOrError.value,
      expirationDate: expirationDateOrError.value,
    });

    await this.oldCreditCardRepo.save(oldCreditCard);

    return new Right(oldCreditCard);
  }
}
