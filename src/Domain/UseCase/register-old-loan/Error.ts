export namespace RegisterOldLoanError {
  export class EmailDoesNotExist extends Error {
    constructor(email: string) {
      super(`Email '${email}' does not exist`);
    }
  }

  export class CPFDoesNotExist extends Error {
    constructor(cpf: string) {
      super(`CPF '${cpf}' does not exist`);
    }
  }

  export class InvalidEmail extends Error {
    constructor(email: string) {
      super(`Email '${email}' is invalid`);
    }
  }

  export class InvalidCPF extends Error {
    constructor(cpf: string) {
      super(`CPF '${cpf}' is invalid`);
    }
  }

  export class InvalidNumber extends Error {
    constructor(number: string) {
      super(`Number '${number}' is invalid`);
    }
  }

  export class InvalidSecurityCode extends Error {
    constructor(securityCode: string) {
      super(`SecurityCode '${securityCode}' is invalid`);
    }
  }

  export class InvalidExpirationDate extends Error {
    constructor(expirationDate: string) {
      super(`ExpirationDate '${expirationDate}' is invalid`);
    }
  }
}
