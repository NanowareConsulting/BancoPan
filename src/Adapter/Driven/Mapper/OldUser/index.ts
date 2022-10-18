import { CPF, Email, Name, OldUser, Password } from "@/Domain";

import { Mapper as IMapper } from "../Core";

export namespace OldUserMapper {
  export type Entity = OldUser;

  export type Persistence = {
    id: string;
    name: string;
    cpf: string;
    email: string;
    password: string;
  };

  class OldUserMapper implements IMapper<Entity, Persistence> {
    toEntity(p: Persistence): Entity {
      const nameOrError = Name.create(p.name);
      const emailOrError = Email.create(p.email);
      const cpfOrError = CPF.create(p.cpf);
      const passwordOrError = Password.existing(p.password);

      if (nameOrError.isLeft()) throw new Error("Invalid name");

      if (emailOrError.isLeft()) throw new Error("Invalid email");

      if (cpfOrError.isLeft()) throw new Error("Invalid cpf");

      const name = nameOrError.value;
      const email = emailOrError.value;
      const password = passwordOrError;
      const cpf = cpfOrError.value;

      return OldUser.existing(
        {
          name,
          email,
          cpf,
          password,
        },
        p.id
      );
    }

    toPersistence(e: Entity): Persistence {
      return {
        id: e.id,
        name: e.props.name.props.value,
        email: e.props.email.props.value,
        cpf: e.props.cpf.props.value,
        password: e.props.password.props.value,
      };
    }
  }

  const Mapper = new OldUserMapper();

  export const toEntity = Mapper.toEntity;
  export const toPersistence = Mapper.toPersistence;
}
