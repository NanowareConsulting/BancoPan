import { OldLoanMapper, OldUserRepo } from "@/Adapter";
import { prisma } from "@/Adapter/Driven/Prisma";
import { OldLoan } from "@/Domain";

import { OldLoanRepo } from "./index";

export class PrismaOldLoanRepo implements OldLoanRepo {
  public async findByEmail(email: string): Promise<OldLoan[] | null> {
    const data = await prisma.oldLoan.findMany({
      where: {
        user_email: email,
      },
    });

    const loan = data.map((loan) =>
      OldLoanMapper.toEntity({
        ...loan,
        cpf: loan.user_cpf,
        email: loan.user_email,
      })
    );

    return loan;
  }

  public async save(entity: OldLoan): Promise<OldLoan> {
    const data = OldLoanMapper.toPersistence(entity);

    const loan = await prisma.oldLoan.create({
      data: {
        id: data.id,
        user_cpf: data.cpf,
        user_email: data.email,
        amount: data.amount,
        interest: data.interest,
      },
    });

    const savedLoan = OldLoanMapper.toEntity({
      ...loan,
      cpf: loan.user_cpf,
      email: loan.user_email,
    });

    return savedLoan;
  }

  public async find(id: string): Promise<OldLoan | null> {
    const data = await prisma.oldLoan.findUnique({
      where: {
        id,
      },
    });

    if (!data) return null;

    const loan = OldLoanMapper.toEntity({
      ...data,
      cpf: data.user_cpf,
      email: data.user_email,
    });

    return loan;
  }

  public async update(entity: OldLoan): Promise<OldLoan> {
    const data = OldLoanMapper.toPersistence(entity);

    const loan = await prisma.oldLoan.update({
      where: {
        id: entity.id,
      },
      data,
    });

    const updatedLoan = OldLoanMapper.toEntity({
      ...loan,
      cpf: loan.user_cpf,
      email: loan.user_email,
    });

    return updatedLoan;
  }

  public async delete(id: string): Promise<OldLoan> {
    const data = await prisma.oldLoan.delete({
      where: {
        id,
      },
    });

    const loan = OldLoanMapper.toEntity({
      ...data,
      cpf: data.user_cpf,
      email: data.user_email,
    });

    return loan;
  }

  public async findByCPF(cpf: string): Promise<OldLoan[] | null> {
    const data = await prisma.oldLoan.findMany({
      where: {
        user_cpf: cpf,
      },
    });

    const loan = data.map((loan) =>
      OldLoanMapper.toEntity({
        ...loan,
        cpf: loan.user_cpf,
        email: loan.user_email,
      })
    );

    return loan;
  }

  public async exists(entity: OldLoan): Promise<boolean> {
    const data = await prisma.oldLoan.findUnique({
      where: {
        id: entity.id,
      },
    });

    return !!data;
  }

  public async findAll(): Promise<OldLoan[]> {
    const data = await prisma.oldLoan.findMany();

    const loan = data.map((loan) =>
      OldLoanMapper.toEntity({
        ...loan,
        cpf: loan.user_cpf,
        email: loan.user_email,
      })
    );

    return loan;
  }
}
