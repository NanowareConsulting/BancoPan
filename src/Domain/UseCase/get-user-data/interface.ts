import { OldCreditCard, OldLoan, OldUser } from "@/Domain";
import { Either } from "@/Utils/Either";

import { UseCase } from "../Core";
import { GetUserDataError } from "./Error";

export interface IUCGetUserData
  extends UseCase<GetUserDataRequest, GetUserDataResponse> {
  execute(data: GetUserDataRequest): Promise<GetUserDataResponse>;
}

export type GetUserDataRequest = {
  id: string;
  cpf: string;
};

export type GetUserDataResponse = Either<
  GetUserDataError.UserNotFound,
  {
    user: {
      id: string;
      name: string;
      cpf: string;
      email: string;
    };
    creditCards: OldCreditCard[];
    loans: OldLoan[];
  }
>;
