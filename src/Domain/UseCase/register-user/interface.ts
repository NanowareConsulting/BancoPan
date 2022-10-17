export interface IUCRegisterUser {
  execute: (data: IUCRegisterUserInput) => Promise<IUCRegisterUserOutput>;
}

export interface IUCRegisterUserInput {
  name: string;
  cpf: string;
  email: string;
  password: string;
}

export interface IUCRegisterUserOutput {
  id: string;
  name: string;
  cpf: string;
  email: string;
}
