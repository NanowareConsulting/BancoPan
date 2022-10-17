import { prisma } from "@/Adapter";
import { OldLoan } from "@/Domain";
import { Either, Left, Right } from "@/Utils/Either";

type OldLoanDTO = {
  cpf: string;
};

export class UCGetOldLoan {
  public static async execute(
    data: OldLoanDTO
  ): Promise<Either<Error, OldLoan[]>> {
    const oldLoans = await prisma.oldLoan.findMany({
      where: {
        user_cpf: data.cpf,
      },
    });

    if (!oldLoans) {
      return new Left(new Error("Credit Card not found"));
    }

    const response = oldLoans.map((oldLoan) => {
      return OldLoan.existing(
        {
          amount: oldLoan.amount,
          interest: oldLoan.interest,
          total: oldLoan.total,
          userCpf: oldLoan.user_cpf,
          userEmail: oldLoan.user_email,
        },
        oldLoan.id
      );
    });

    return new Right(response);
  }
}
