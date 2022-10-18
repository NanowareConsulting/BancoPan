import { OldCreditCard } from "@/Domain";
import { Either } from "@/Utils/Either";

import { UseCase } from "../Core";
import { RegisterOldCreditCardError } from "./Error";

export interface IUCRegisterOldCreditCard
  extends UseCase<RegisterOldCreditCardRequest, RegisterOldCreditCardResponse> {
  execute(
    data: RegisterOldCreditCardRequest
  ): Promise<RegisterOldCreditCardResponse>;
}

export type RegisterOldCreditCardRequest = {
  email: string;
  cpf: string;
};

export type RegisterOldCreditCardResponse = Either<
  | RegisterOldCreditCardError.EmailDoesNotExist
  | RegisterOldCreditCardError.CPFDoesNotExist
  | RegisterOldCreditCardError.InvalidCPF
  | RegisterOldCreditCardError.InvalidExpirationDate
  | RegisterOldCreditCardError.InvalidEmail
  | RegisterOldCreditCardError.InvalidNumber
  | RegisterOldCreditCardError.InvalidCPF
  | RegisterOldCreditCardError.InvalidSecurityCode,
  OldCreditCard
>;
