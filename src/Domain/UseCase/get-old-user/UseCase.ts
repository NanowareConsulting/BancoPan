import { prisma } from "@/Adapter";
import { OldUser } from "@/Domain";
import { Either, Left, Right } from "@/Utils/Either";

type OldUserDTO = {
  cpf: string;
};

export class UCGetOldUser {
  public static async execute(
    data: OldUserDTO
  ): Promise<Either<Error, OldUser>> {
    const user = await prisma.oldUser.findUnique({
      where: {
        cpf: data.cpf,
      },
    });

    if (!user) {
      return new Left(new Error("User not found"));
    }

    const oldUser = OldUser.existing(user, user.id);

    return new Right(oldUser);
  }
}
