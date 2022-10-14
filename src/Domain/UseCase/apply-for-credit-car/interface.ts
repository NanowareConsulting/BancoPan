import { RepositoryError } from "@/Adapter";
import { EntityError } from "@/Domain/Entity";
import { Either } from "@/Utils/Either";

export interface IApplyForCreditCard {
  execute(data: ApplyForCreditCardRequest): Promise<ApplyForCreditCardResponse>;
}

export type ApplyForCreditCardRequest = {
  userId: string;
  name: string;
};

export type ApplyForCreditCardResponse = Either<
  EntityError | RepositoryError,
  {
    id: string;
    number: number;
    securityCode: number;
    expirationDate: Date;
    name: string;
  }
>;
