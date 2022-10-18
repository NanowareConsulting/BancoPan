import { OldUserMapper } from "@/Adapter";
import { OldUser } from "@/Domain";

import { OldUserRepo } from "./index";

export class MockOldUserRepo implements OldUserRepo {
  private users: OldUserMapper.Persistence[] = [];

  async find(id: string): Promise<OldUser | null> {
    const user = this.users.find((user) => user.id === id);

    if (!user) return null;
    return OldUserMapper.toEntity(user);
  }

  async findByEmail(email: string): Promise<OldUser | null> {
    const user = this.users.find((user) => user.email === email);

    if (!user) return null;

    return OldUserMapper.toEntity(user);
  }

  async save(user: OldUser): Promise<OldUser> {
    try {
      this.find(user.id);
    } catch {
      throw new Error("User already exists");
    }

    try {
      this.findByEmail(user.props.email.props.value);
    } catch {
      throw new Error("Email already in use");
    }

    this.users.push(OldUserMapper.toPersistence(user));

    return user;
  }

  async update(user: OldUser): Promise<OldUser> {
    try {
      this.find(user.id);
    } catch {
      throw new Error("User not found");
    }

    try {
      this.findByEmail(user.props.email.props.value);
    } catch {
      throw new Error("Email already in use");
    }

    const index = this.users.findIndex((u) => u.id === user.id);

    if (index === -1) throw new Error("User not found");

    this.users[index] = OldUserMapper.toPersistence(user);

    return user;
  }

  async delete(id: string): Promise<OldUser> {
    const user = this.find(id);

    if (!user) throw new Error("User not found");

    this.users = this.users.filter((u) => u.id !== id);

    return user as Promise<OldUser>;
  }

  async findAll(): Promise<OldUser[]> {
    return this.users.map(OldUserMapper.toEntity);
  }

  async exists(user: OldUser): Promise<boolean> {
    try {
      this.find(user.id);
      return true;
    } catch {
      return false;
    }
  }

  async findByCPF(cpf: string): Promise<OldUser | null> {
    const user = this.users.find((user) => user.cpf === cpf);

    if (!user) return null;

    return OldUserMapper.toEntity(user);
  }
}
