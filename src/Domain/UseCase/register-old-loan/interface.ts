import { OldLoan } from "@/Domain";
import { Either } from "@/Utils/Either";

import { UseCase } from "../Core";
import { RegisterOldLoanError } from "./Error";

export interface IUCRegisterOldLoan
  extends UseCase<RegisterOldLoanRequest, RegisterOldLoanResponse> {
  execute(data: RegisterOldLoanRequest): Promise<RegisterOldLoanResponse>;
}

export type RegisterOldLoanRequest = {
  email: string;
  cpf: string;
  amount: number;
};

export type RegisterOldLoanResponse = Either<
  | RegisterOldLoanError.EmailDoesNotExist
  | RegisterOldLoanError.CPFDoesNotExist
  | RegisterOldLoanError.InvalidCPF
  | RegisterOldLoanError.InvalidExpirationDate
  | RegisterOldLoanError.InvalidEmail
  | RegisterOldLoanError.InvalidNumber
  | RegisterOldLoanError.InvalidCPF
  | RegisterOldLoanError.InvalidSecurityCode,
  OldLoan
>;
