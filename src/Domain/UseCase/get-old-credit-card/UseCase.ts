import { prisma } from "@/Adapter";
import { OldCreditCard } from "@/Domain";
import { Either, Left, Right } from "@/Utils/Either";

type OldCreditCardDTO = {
  cpf: string;
};

export class UCGetOldCreditCard {
  public static async execute(
    data: OldCreditCardDTO
  ): Promise<Either<Error, OldCreditCard[]>> {
    const oldCreditCards = await prisma.oldCreditCard.findMany({
      where: {
        user_cpf: data.cpf,
      },
    });

    if (!oldCreditCards) {
      return new Left(new Error("Credit Card not found"));
    }

    const response = oldCreditCards.map((oldCreditCard) => {
      return OldCreditCard.existing(
        {
          expirationDate: oldCreditCard.exp_date,
          number: oldCreditCard.number,
          securityCode: oldCreditCard.cvv,
          userCpf: oldCreditCard.user_cpf,
          userEmail: oldCreditCard.user_email,
        },
        oldCreditCard.id
      );
    });

    return new Right(response);
  }
}
