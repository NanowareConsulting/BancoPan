import { OldCreditCardMapper, OldUserRepo } from "@/Adapter";
import { OldCreditCard } from "@/Domain";

import { OldCreditCardRepo } from "./index";

export class MockOldCreditCardRepo implements OldCreditCardRepo {
  private creditCard: OldCreditCardMapper.Persistence[] = [];

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

  async find(id: string): Promise<OldCreditCard | null> {
    const user = this.creditCard.find((user) => user.id === id);

    if (!user) return null;
    return OldCreditCardMapper.toEntity(user);
  }

  async findByEmail(email: string): Promise<OldCreditCard[] | null> {
    const creditCards = this.creditCard.filter((user) => user.email === email);

    if (!creditCards) return null;

    return creditCards.map(OldCreditCardMapper.toEntity);
  }

  async save(user: OldCreditCard): Promise<OldCreditCard> {
    try {
      this.find(user.id);
    } catch {
      throw new Error("Credit Card already exists");
    }

    try {
      await this.oldUserRepo.findByCPF(user.props.cpf.props.value);
    } catch {
      throw new Error("CPF not found");
    }

    this.creditCard.push(OldCreditCardMapper.toPersistence(user));

    return user;
  }

  async update(user: OldCreditCard): Promise<OldCreditCard> {
    try {
      this.find(user.id);
    } catch {
      throw new Error("Credit Card not found");
    }

    try {
      await this.oldUserRepo.findByCPF(user.props.cpf.props.value);
    } catch {
      throw new Error("CPF not found");
    }

    const index = this.creditCard.findIndex((u) => u.id === user.id);

    if (index === -1) throw new Error("Credit Card not found");

    this.creditCard[index] = OldCreditCardMapper.toPersistence(user);

    return user;
  }

  async delete(id: string): Promise<OldCreditCard> {
    const user = this.find(id);

    if (!user) throw new Error("Credit Card not found");

    this.creditCard = this.creditCard.filter((u) => u.id !== id);

    return user as Promise<OldCreditCard>;
  }

  async findAll(): Promise<OldCreditCard[]> {
    return this.creditCard.map(OldCreditCardMapper.toEntity);
  }

  async exists(user: OldCreditCard): Promise<boolean> {
    try {
      this.find(user.id);
      return true;
    } catch {
      return false;
    }
  }

  async findByCPF(cpf: string): Promise<OldCreditCard[] | null> {
    const creditCards = this.creditCard.filter((user) => user.cpf === cpf);

    if (!creditCards) return null;

    return creditCards.map(OldCreditCardMapper.toEntity);
  }
}
