export namespace RegisterOldUserError {
  export class EmailAlreadyExists extends Error {
    constructor(email: string) {
      super(`Email '${email}' already exists`);
    }
  }

  export class CPFAlreadyExists extends Error {
    constructor(cpf: string) {
      super(`CPF '${cpf}' already exists`);
    }
  }

  export class InvalidName extends Error {
    constructor(name: string) {
      super(`Name '${name}' is invalid`);
    }
  }

  export class InvalidEmail extends Error {
    constructor(email: string) {
      super(`Email '${email}' is invalid`);
    }
  }

  export class InvalidPassword extends Error {
    constructor(password: string) {
      super(`Password '${password}' is invalid`);
    }
  }

  export class InvalidCPF extends Error {
    constructor(cpf: string) {
      super(`CPF '${cpf}' is invalid`);
    }
  }
}
