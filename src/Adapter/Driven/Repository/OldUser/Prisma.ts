import { prisma } from "@/Adapter/Driven/Prisma";
import { OldUser } from "@/Domain";

import { OldUserMapper } from "../../Mapper";
import { OldUserRepo } from "./interface";

export class PrismaOldUserRepo implements OldUserRepo {
  public async findByCpf(cpf: string): Promise<OldUser | null> {
    const data = await prisma.oldUser.findUnique({
      where: {
        cpf,
      },
    });

    if (!data) return null;

    const user = OldUserMapper.toEntity(data);

    return user;
  }

  public async save(entity: OldUser): Promise<OldUser> {
    const data = OldUserMapper.toPersistence(entity);

    const user = await prisma.oldUser.create({
      data,
    });

    const savedUser = OldUserMapper.toEntity(user);

    return savedUser;
  }

  public async find(id: string): Promise<OldUser | null> {
    const data = await prisma.oldUser.findUnique({
      where: {
        id,
      },
    });

    if (!data) return null;

    const user = OldUserMapper.toEntity(data);

    return user;
  }

  public async update(entity: OldUser): Promise<OldUser> {
    const data = OldUserMapper.toPersistence(entity);

    const user = await prisma.oldUser.update({
      where: {
        id: entity.id,
      },
      data,
    });

    const updatedUser = OldUserMapper.toEntity(user);

    return updatedUser;
  }

  public async findByEmail(email: string): Promise<OldUser | null> {
    const data = await prisma.oldUser.findUnique({
      where: {
        email,
      },
    });

    if (!data) return null;

    const user = OldUserMapper.toEntity(data);

    return user;
  }

  public async findByCPF(cpf: string): Promise<OldUser | null> {
    const data = await prisma.oldUser.findUnique({
      where: {
        cpf,
      },
    });

    if (!data) return null;

    const user = OldUserMapper.toEntity(data);

    return user;
  }

  public async findAll(): Promise<OldUser[]> {
    const data = await prisma.oldUser.findMany();

    const users = data.map((user: OldUserMapper.Persistence) =>
      OldUserMapper.toEntity(user)
    );

    return users;
  }

  public async delete(id: string): Promise<OldUser> {
    const data = await prisma.oldUser.delete({
      where: {
        id,
      },
    });

    const user = OldUserMapper.toEntity(data);

    return user;
  }

  public async exists(entity: OldUser): Promise<boolean> {
    const data = await prisma.oldUser.findUnique({
      where: {
        id: entity.id,
      },
    });

    return !!data;
  }
}
