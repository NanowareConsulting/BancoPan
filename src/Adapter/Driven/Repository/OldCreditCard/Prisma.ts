import { OldCreditCardMapper, OldUserRepo } from "@/Adapter";
import { prisma } from "@/Adapter/Driven/Prisma";
import { OldCreditCard } from "@/Domain";

import { OldCreditCardRepo } from "./index";

export class PrismaOldCreditCardRepo implements OldCreditCardRepo {
  public async findByEmail(email: string): Promise<OldCreditCard[] | null> {
    const data = await prisma.oldCreditCard.findMany({
      where: {
        user_email: email,
      },
    });

    const creditCard = data.map((creditCard) =>
      OldCreditCardMapper.toEntity({
        id: creditCard.id,
        number: creditCard.number,
        expiration_date: creditCard.exp_date,
        security_code: creditCard.cvv,
        cpf: creditCard.user_cpf,
        email: creditCard.user_email,
      })
    );

    return creditCard;
  }

  public async save(entity: OldCreditCard): Promise<OldCreditCard> {
    const data = OldCreditCardMapper.toPersistence(entity);

    const creditCard = await prisma.oldCreditCard.create({
      data: {
        id: data.id,
        number: data.number,
        exp_date: data.expiration_date,
        cvv: data.security_code,
        user_cpf: data.cpf,
        user_email: data.email,
      },
    });

    const savedCreditCard = OldCreditCardMapper.toEntity({
      cpf: creditCard.user_cpf,
      email: creditCard.user_email,
      expiration_date: creditCard.exp_date,
      id: creditCard.id,
      number: creditCard.number,
      security_code: creditCard.cvv,
    });

    return savedCreditCard;
  }

  public async find(id: string): Promise<OldCreditCard | null> {
    const data = await prisma.oldCreditCard.findUnique({
      where: {
        id,
      },
    });

    if (!data) return null;

    const creditCard = OldCreditCardMapper.toEntity({
      cpf: data.user_cpf,
      email: data.user_email,
      expiration_date: data.exp_date,
      id: data.id,
      number: data.number,
      security_code: data.cvv,
    });

    return creditCard;
  }

  public async update(entity: OldCreditCard): Promise<OldCreditCard> {
    const data = OldCreditCardMapper.toPersistence(entity);

    const creditCard = await prisma.oldCreditCard.update({
      where: {
        id: entity.id,
      },
      data,
    });

    const updatedCreditCard = OldCreditCardMapper.toEntity({
      cpf: creditCard.user_cpf,
      email: creditCard.user_email,
      expiration_date: creditCard.exp_date,
      id: creditCard.id,
      number: creditCard.number,
      security_code: creditCard.cvv,
    });

    return updatedCreditCard;
  }

  public async findByCPF(cpf: string): Promise<OldCreditCard[] | null> {
    const data = await prisma.oldCreditCard.findMany({
      where: {
        user_cpf: cpf,
      },
    });

    const creditCard = data.map((creditCard) =>
      OldCreditCardMapper.toEntity({
        id: creditCard.id,
        cpf: creditCard.user_cpf,
        email: creditCard.user_email,
        expiration_date: creditCard.exp_date,
        number: creditCard.number,
        security_code: creditCard.cvv,
      })
    );

    return creditCard;
  }

  public async findAll(): Promise<OldCreditCard[]> {
    const data = await prisma.oldCreditCard.findMany();

    const creditCard = data.map((creditCard) =>
      OldCreditCardMapper.toEntity({
        cpf: creditCard.user_cpf,
        email: creditCard.user_email,
        expiration_date: creditCard.exp_date,
        id: creditCard.id,
        number: creditCard.number,
        security_code: creditCard.cvv,
      })
    );

    return creditCard;
  }

  public async exists(entity: OldCreditCard): Promise<boolean> {
    const data = await prisma.oldCreditCard.findUnique({
      where: {
        id: entity.id,
      },
    });

    return data !== null;
  }

  public async delete(id: string): Promise<OldCreditCard> {
    const data = await prisma.oldCreditCard.delete({
      where: {
        id,
      },
    });

    const creditCard = OldCreditCardMapper.toEntity({
      cpf: data.user_cpf,
      email: data.user_email,
      expiration_date: data.exp_date,
      id: data.id,
      number: data.number,
      security_code: data.cvv,
    });

    return creditCard;
  }
}
