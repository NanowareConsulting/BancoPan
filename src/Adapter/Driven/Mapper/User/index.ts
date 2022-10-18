import { Email, Name, Password, User } from "@/Domain";

import { Mapper as IMapper } from "../Core";

export namespace UserMapper {
  export type Entity = User;

  export type Persistence = {
    id: string;
    name: string;
    email: string;
    password: string;
  };

  class UserMapper implements IMapper<Entity, Persistence> {
    toEntity(p: Persistence): Entity {
      const nameOrError = Name.create(p.name);
      const emailOrError = Email.create(p.email);
      const passwordOrError = Password.create(p.password);

      if (nameOrError.isLeft()) throw new Error("Invalid name");

      if (emailOrError.isLeft()) throw new Error("Invalid email");

      if (passwordOrError.isLeft()) throw new Error("Invalid password");

      const name = nameOrError.value;
      const email = emailOrError.value;
      const password = passwordOrError.value;

      return User.existing(
        {
          name,
          email,
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
        password: e.props.password.props.value,
      };
    }
  }

  const Mapper = new UserMapper();

  export const toEntity = Mapper.toEntity;
  export const toPersistence = Mapper.toPersistence;
}
