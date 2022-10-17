import { prisma } from "@/Adapter";
import { OldUser } from "@/Domain";
import { Either, Left, Right } from "@/Utils/Either";

type OldUserDTO = {
  name: string;
  email: string;
  password: string;
  cpf: string;
};

export class UCRegisterOldUser {
  public static async execute(
    data: OldUserDTO
  ): Promise<Either<Error, OldUser>> {
    const oldUserOrError = OldUser.create(data);

    if (oldUserOrError.isLeft()) {
      return new Left(oldUserOrError.value);
    }

    const oldUser = oldUserOrError.value;

    const userAlreadyExists = await prisma.oldUser.findUnique({
      where: {
        cpf: oldUser.cpf,
      },
    });

    if (userAlreadyExists) {
      return new Left(new Error("User already exists"));
    }

    await prisma.oldUser.create({
      data: {
        id: oldUser.id,
        name: oldUser.name,
        email: oldUser.email,
        password: oldUser.password,
        cpf: oldUser.cpf,
      },
    });

    return new Right(oldUser);
  }
}
