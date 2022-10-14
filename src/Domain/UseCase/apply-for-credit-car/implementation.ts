import { IUserRepository } from "@/Adapter";
import { Left } from "@/Utils/Either";

import {
  ApplyForCreditCardRequest,
  ApplyForCreditCardResponse,
  IApplyForCreditCard,
} from "./interface";

export class UCApplyForCreditCard implements IApplyForCreditCard {
  constructor(private userRepository: IUserRepository) {
    this.execute = this.execute.bind(this);
  }

  async execute(
    data: ApplyForCreditCardRequest
  ): Promise<ApplyForCreditCardResponse> {
    const userOrError = await this.userRepository.find(data.userId);
  }
}
