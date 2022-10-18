import { OldLoanMapper, OldUserRepo } from "@/Adapter";
import { OldLoan } from "@/Domain";

import { OldLoanRepo } from "./index";

export class MockOldLoanRepo implements OldLoanRepo {
  private loan: OldLoanMapper.Persistence[] = [];

  constructor(private oldUserRepo: OldUserRepo) {
    this.save = this.save.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.find = this.find.bind(this);
    this.findByEmail = this.findByEmail.bind(this);
    this.findByCPF = this.findByCPF.bind(this);
    this.findAll = this.findAll.bind(this);
    this.exists = this.exists.bind(this);
  }

  async find(id: string): Promise<OldLoan | null> {
    const user = this.loan.find((user) => user.id === id);

    if (!user) return null;
    return OldLoanMapper.toEntity(user);
  }

  async findByEmail(email: string): Promise<OldLoan[] | null> {
    const loan = this.loan.filter((user) => user.email === email);

    if (!loan) return null;

    return loan.map(OldLoanMapper.toEntity);
  }

  async save(user: OldLoan): Promise<OldLoan> {
    try {
      this.find(user.id);
    } catch {
      throw new Error("Loan already exists");
    }

    try {
      await this.oldUserRepo.findByCPF(user.props.cpf.props.value);
    } catch {
      throw new Error("CPF not found");
    }

    this.loan.push(OldLoanMapper.toPersistence(user));

    return user;
  }

  async update(user: OldLoan): Promise<OldLoan> {
    try {
      this.find(user.id);
    } catch {
      throw new Error("Loan not found");
    }

    try {
      await this.oldUserRepo.findByCPF(user.props.cpf.props.value);
    } catch {
      throw new Error("CPF not found");
    }

    const index = this.loan.findIndex((u) => u.id === user.id);

    if (index === -1) throw new Error("Loan not found");

    this.loan[index] = OldLoanMapper.toPersistence(user);

    return user;
  }

  async delete(id: string): Promise<OldLoan> {
    const user = this.find(id);

    if (!user) throw new Error("Loan not found");

    this.loan = this.loan.filter((u) => u.id !== id);

    return user as Promise<OldLoan>;
  }

  async findAll(): Promise<OldLoan[]> {
    return this.loan.map(OldLoanMapper.toEntity);
  }

  async exists(user: OldLoan): Promise<boolean> {
    try {
      this.find(user.id);
      return true;
    } catch {
      return false;
    }
  }

  async findByCPF(cpf: string): Promise<OldLoan[] | null> {
    const loan = this.loan.filter((user) => user.cpf === cpf);

    if (!loan) return null;

    return loan.map(OldLoanMapper.toEntity);
  }
}
