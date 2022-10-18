import { Button } from "@mui/material";
import { FormEvent } from "react";

import { Article } from "../../../Components/Article";
import { Input } from "../../../Components/Input";
import { Page } from "../../../Components/Page";
import { useAPI } from "../../../Hooks/API";
import * as S from "./styles";

export function RegisterCreditCard() {
  const API = useAPI();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const email = formData.get("email") as string;

    API.registerCreditCard(email);
  }

  return (
    <Page>
      <Article>
        <S.Form onSubmit={onSubmit}>
          <S.Title>Cadastrar Cartão de Crédito</S.Title>
          <Input label="Email" name="email" type="email" required />
          <Button variant="contained" color="primary" type="submit">
            Cadastrar
          </Button>
        </S.Form>
      </Article>
    </Page>
  );
}
