import { prisma } from "@/Adapter";
import { User } from "@/Domain";

import { IUserRepo } from "./interface";

export class PrismaUserRepo implements IUserRepo {
  public async create(user: User): Promise<User> {
    const userCreated = await prisma.user.create({
      data: {
        id: user.id,
        cpf: user.cpf,
        name: user.name,
        email: user.email,
        password: user.password,
      },
      include: {
        creditCards: true,
        loans: true,
      },
    });

    return User.existing(
      {
        cpf: userCreated.cpf,
        name: userCreated.name,
        email: userCreated.email,
        password: userCreated.password,
        creditCards: userCreated.creditCards.map((creditCard) => {
          return {
            id: creditCard.id,
            number: creditCard.number,
            expirationDate: creditCard.exp_date,
            securityCode: creditCard.cvv,
          };
        }),
        loans: userCreated.loans.map((loan) => {
          return {
            id: loan.id,
            amount: loan.amount,
            interest: loan.interest,
            total: loan.total,
          };
        }),
      },
      userCreated.id
    );
  }

  public async findByCpf(cpf: string): Promise<User> {
    const user = await prisma.user.findUnique({
      where: {
        cpf,
      },
      include: {
        creditCards: true,
        loans: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return User.existing(
      {
        cpf: user.cpf,
        name: user.name,
        email: user.email,
        password: user.password,
        creditCards: user.creditCards.map((creditCard) => {
          return {
            id: creditCard.id,
            number: creditCard.number,
            expirationDate: creditCard.exp_date,
            securityCode: creditCard.cvv,
          };
        }),
        loans: user.loans.map((loan) => {
          return {
            id: loan.id,
            amount: loan.amount,
            interest: loan.interest,
            total: loan.total,
          };
        }),
      },
      user.id
    );
  }
}
