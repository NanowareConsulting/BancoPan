import { OldLoanRepo, OldUserRepo } from "@/Adapter";
import { Amount, CPF, Email, Interest, OldLoan } from "@/Domain";
import { Left, Right } from "@/Utils/Either";

import { RegisterOldLoanError } from "./Error";
import {
  IUCRegisterOldLoan,
  RegisterOldLoanRequest,
  RegisterOldLoanResponse,
} from "./interface";

export class UCRegisterOldLoan implements IUCRegisterOldLoan {
  constructor(
    private readonly oldLoanRepo: OldLoanRepo,
    private readonly oldUserRepo: OldUserRepo
  ) {}

  async execute(
    data: RegisterOldLoanRequest
  ): Promise<RegisterOldLoanResponse> {
    const emailOrError = Email.create(data.email);
    const cpfOrError = CPF.create(data.cpf);
    const amountOrError = Amount.create(data.amount);
    const interestOrError = Interest.create(0.1);

    if (emailOrError.isLeft()) {
      return new Left(
        new RegisterOldLoanError.InvalidEmail(emailOrError.value.message)
      );
    }

    if (cpfOrError.isLeft()) {
      return new Left(
        new RegisterOldLoanError.InvalidCPF(cpfOrError.value.message)
      );
    }

    if (amountOrError.isLeft()) {
      return new Left(
        new RegisterOldLoanError.InvalidNumber(amountOrError.value.message)
      );
    }

    if (interestOrError.isLeft()) {
      return new Left(
        new RegisterOldLoanError.InvalidNumber(interestOrError.value.message)
      );
    }

    const email = emailOrError.value;
    const cpf = cpfOrError.value;
    const amount = amountOrError.value;
    const interest = interestOrError.value;

    const emailExists = await this.oldUserRepo.findByEmail(data.email);

    if (!emailExists) {
      return new Left(
        new RegisterOldLoanError.EmailDoesNotExist(email.props.value)
      );
    }

    const cpfExists = await this.oldUserRepo.findByCPF(data.cpf);

    if (!cpfExists) {
      return new Left(
        new RegisterOldLoanError.CPFDoesNotExist(cpf.props.value)
      );
    }

    const oldLoan = OldLoan.create({
      amount,
      cpf,
      email,
      interest,
    });

    const oldLoanOrError = await this.oldLoanRepo.save(oldLoan);

    return new Right(oldLoanOrError);
  }
}
