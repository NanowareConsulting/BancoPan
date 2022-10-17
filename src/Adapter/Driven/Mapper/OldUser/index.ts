import { OldUser } from "@/Domain";

import { Mapper } from "../Core";

type Persistence = {
  id: string;
  cpf: string;
  name: string;
  email: string;
  password: string;
};

type Entity = OldUser;

export class OldUserMapper implements Mapper<Persistence, Entity> {
  toPersistence(entity: Entity): Persistence {
    return {
      id: entity.id,
      cpf: entity.cpf,
      name: entity.name,
      email: entity.email,
      password: entity.password,
    };
  }

  toEntity(persistence: Persistence): Entity {
    return OldUser.existing(
      {
        cpf: persistence.cpf,
        name: persistence.name,
        email: persistence.email,
        password: persistence.password,
      },
      persistence.id
    );
  }
}
