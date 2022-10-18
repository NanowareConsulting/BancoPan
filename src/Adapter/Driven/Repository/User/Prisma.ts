import { UserMapper } from "@/Adapter";
import { prisma } from "@/Adapter/Driven/Prisma";
import { User } from "@/Domain";

import { UserRepo } from "./index";

export class PrismaUserRepo implements UserRepo {
  public async findByCpf(cpf: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }

  public async save(entity: User): Promise<User> {
    const data = UserMapper.toPersistence(entity);

    const user = await prisma.user.create({
      data,
    });

    return UserMapper.toEntity(user);
  }

  public async find(id: string): Promise<User | null> {
    const data = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!data) return null;

    const user = UserMapper.toEntity(data);

    return user;
  }

  public async update(entity: User): Promise<User> {
    const data = UserMapper.toPersistence(entity);

    const user = await prisma.user.update({
      where: {
        id: entity.id,
      },
      data,
    });

    return UserMapper.toEntity(user);
  }

  public async findByEmail(email: string): Promise<User | null> {
    const data = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!data) return null;

    const user = UserMapper.toEntity(data);

    return user;
  }

  public async delete(id: string): Promise<User> {
    const data = await prisma.user.delete({
      where: {
        id,
      },
    });

    const user = UserMapper.toEntity(data);

    return user;
  }

  public async exists(entity: User): Promise<boolean> {
    const data = await prisma.user.findUnique({
      where: {
        id: entity.id,
      },
    });

    return data !== null;
  }

  public async findAll(): Promise<User[]> {
    const data = await prisma.user.findMany();

    const users = data.map((user: UserMapper.Persistence) =>
      UserMapper.toEntity(user)
    );

    return users;
  }
}
