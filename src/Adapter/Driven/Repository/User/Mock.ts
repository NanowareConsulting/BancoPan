import { UserMapper } from "@/Adapter";
import { User } from "@/Domain";

import { UserRepo } from "./index";

export class MockUserRepo implements UserRepo {
  private users: UserMapper.Persistence[] = [];

  async find(id: string): Promise<User | null> {
    const user = this.users.find((user) => user.id === id);

    if (!user) return null;
    return UserMapper.toEntity(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email);

    if (!user) return null;

    return UserMapper.toEntity(user);
  }

  async save(user: User): Promise<User> {
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

    this.users.push(UserMapper.toPersistence(user));

    return user;
  }

  async update(user: User): Promise<User> {
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

    this.users[index] = UserMapper.toPersistence(user);

    return user;
  }

  async delete(id: string): Promise<User> {
    const user = this.find(id);

    if (!user) throw new Error("User not found");

    this.users = this.users.filter((u) => u.id !== id);

    return user as Promise<User>;
  }

  async findAll(): Promise<User[]> {
    return this.users.map(UserMapper.toEntity);
  }

  async exists(user: User): Promise<boolean> {
    try {
      this.find(user.id);
      return true;
    } catch {
      return false;
    }
  }
}
