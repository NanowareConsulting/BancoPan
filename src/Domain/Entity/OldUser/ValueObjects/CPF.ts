import { AuthenticateDocs } from "validation-docs-br";

import { ValueObject } from "@/Domain/Entity/Core";
import { Either, Left, Right } from "@/Utils/Either";

type CPFProps = {
  value: string;
};

export class CPF extends ValueObject<CPFProps> {
  private constructor(props: CPFProps) {
    super(props);
  }

  public static create(value: string): Either<Error, CPF> {
    const isValid = this.schema(value);

    if (!isValid) {
      return new Left(new Error(`Invalid CPF`));
    }

    return new Right(new CPF({ value }));
  }

  private static schema = (data: string) =>
    new AuthenticateDocs().cpf({ data });
}
