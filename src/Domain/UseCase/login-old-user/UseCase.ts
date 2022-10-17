import { compareSync } from "bcrypt";

import { prisma } from "@/Adapter";
import { OldUser } from "@/Domain";
import { Either, Left, Right } from "@/Utils/Either";

type OldUserDTO = {
  password: string;
  cpf: string;
};

export class UCLogInOldUser {
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

    if (!compareSync(data.password, user.password)) {
      return new Left(new Error("Incorrect password"));
    }

    return new Right(user);
  }
}
