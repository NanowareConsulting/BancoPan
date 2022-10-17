import { prisma } from "@/Adapter";
import { OldCreditCard } from "@/Domain";
import { Either, Left, Right } from "@/Utils/Either";

type OldCreditCardDTO = {
  userCpf: string;
  userEmail: string;
};

export class UCApplyForOldCreditCard {
  public static async execute(
    data: OldCreditCardDTO
  ): Promise<Either<Error, OldCreditCard>> {
    const oldCreditCardOrError = OldCreditCard.create(data);

    if (oldCreditCardOrError.isLeft()) {
      return new Left(oldCreditCardOrError.value);
    }

    const user = await prisma.oldUser.findUnique({
      where: {
        cpf: data.userCpf,
      },
    });

    if (!user) {
      return new Left(new Error("User not found"));
    }

    const oldCreditCard = oldCreditCardOrError.value;

    await prisma.oldCreditCard.create({
      data: {
        id: oldCreditCard.id,
        number: oldCreditCard.number,
        cvv: oldCreditCard.securityCode,
        exp_date: oldCreditCard.expirationDate,
        user_cpf: oldCreditCard.userCpf,
        user_email: oldCreditCard.userEmail,
      },
    });

    return new Right(oldCreditCard);
  }
}
