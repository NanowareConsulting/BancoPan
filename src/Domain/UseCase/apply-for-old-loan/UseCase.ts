import { prisma } from "@/Adapter";
import { OldLoan } from "@/Domain";
import { Either, Left, Right } from "@/Utils/Either";

type OldLoanDTO = {
  userCpf: string;
  userEmail: string;
  amount: number;
};

export class UCApplyForOldLoan {
  public static async execute(
    data: OldLoanDTO
  ): Promise<Either<Error, OldLoan>> {
    const user = await prisma.oldUser.findUnique({
      where: {
        cpf: data.userCpf,
      },
    });

    if (!user) {
      return new Left(new Error("User not found"));
    }

    const oldLoanOrError = OldLoan.create({
      amount: data.amount,
      userCpf: data.userCpf,
      userEmail: data.userEmail,
    });

    if (oldLoanOrError.isLeft()) {
      return new Left(oldLoanOrError.value);
    }

    const oldLoan = oldLoanOrError.value;

    const response = await prisma.oldLoan.create({
      data: {
        id: oldLoan.id,
        amount: oldLoan.amount,
        interest: oldLoan.interest,
        total: oldLoan.total,
        user_cpf: oldLoan.userCpf,
        user_email: oldLoan.userEmail,
      },
    });

    return new Right(oldLoan);
  }
}
