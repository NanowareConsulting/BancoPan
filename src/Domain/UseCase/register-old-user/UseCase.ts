import { OldUserRepo } from "@/Adapter";
import { CPF, Email, Name, OldUser, Password } from "@/Domain";
import { Left, Right } from "@/Utils/Either";

import { RegisterOldUserError } from "./Error";
import {
  IUCRegisterOldUser,
  RegisterOldUserRequest,
  RegisterOldUserResponse,
} from "./interface";

export class UCRegisterOldUser implements IUCRegisterOldUser {
  constructor(private readonly userRepository: OldUserRepo) {}

  async execute(
    data: RegisterOldUserRequest
  ): Promise<RegisterOldUserResponse> {
    const name = Name.create(data.name);
    const email = Email.create(data.email);
    const cpf = CPF.create(data.cpf);
    const password = Password.create(data.password);

    if (name.isLeft()) {
      return new Left(new RegisterOldUserError.InvalidName(data.name));
    }

    if (email.isLeft()) {
      return new Left(new RegisterOldUserError.InvalidEmail(data.email));
    }

    if (cpf.isLeft()) {
      return new Left(new RegisterOldUserError.InvalidCPF(data.cpf));
    }

    if (password.isLeft()) {
      return new Left(new RegisterOldUserError.InvalidPassword(data.password));
    }

    const emailAlreadyExists = await this.userRepository.findByEmail(
      data.email
    );

    if (emailAlreadyExists) {
      return new Left(new RegisterOldUserError.EmailAlreadyExists(data.email));
    }

    const cpfAlreadyExists = await this.userRepository.findByCPF(data.cpf);

    if (cpfAlreadyExists) {
      return new Left(new RegisterOldUserError.CPFAlreadyExists(data.cpf));
    }

    const user = OldUser.create({
      name: name.value,
      email: email.value,
      cpf: cpf.value,
      password: password.value,
    });

    const userCreated = await this.userRepository.save(user);

    return new Right(userCreated);
  }
}
