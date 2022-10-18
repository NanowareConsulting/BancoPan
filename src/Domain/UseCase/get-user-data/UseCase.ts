import { OldCreditCardRepo, OldLoanRepo, OldUserRepo } from "@/Adapter";
import { Left, Right } from "@/Utils/Either";

import { GetUserDataError } from "./Error";
import {
  GetUserDataRequest,
  GetUserDataResponse,
  IUCGetUserData,
} from "./interface";

export class UCGetUserData implements IUCGetUserData {
  constructor(
    private readonly oldUserRepository: OldUserRepo,
    private readonly oldCreditCardRepo: OldCreditCardRepo,
    private readonly oldLoanRepo: OldLoanRepo
  ) {}

  async execute(data: GetUserDataRequest): Promise<GetUserDataResponse> {
    const { cpf } = data;

    const user = await this.oldUserRepository.findByCPF(cpf);

    if (!user) {
      return new Left(new GetUserDataError.UserNotFound());
    }

    const creditCards = (await this.oldCreditCardRepo.findByCPF(cpf)) ?? [];

    const loans = (await this.oldLoanRepo.findByCPF(cpf)) ?? [];

    return new Right({
      user: {
        id: user.id,
        name: user.props.name.props.value,
        cpf: user.props.cpf.props.value,
        email: user.props.email.props.value,
      },
      creditCards,
      loans,
    });
  }
}
