import { Button } from "@mui/material";
import { FormEvent } from "react";
import { Store } from "react-notifications-component";

import { Article } from "../../../Components/Article";
import { Input } from "../../../Components/Input";
import { Page } from "../../../Components/Page";
import { useAPI } from "../../../Hooks/API";
import * as S from "./styles";

export function Register() {
  const API = useAPI();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const cpf = formData.get("cpf") as string;
    const password = formData.get("password") as string;
    const passwordConfirm = formData.get("passwordConfirm") as string;

    if (password !== passwordConfirm) {
      return Store.addNotification({
        title: "Erro!",
        message: "As senhas não coincidem!",
        type: "danger",
        insert: "top",
        container: "top-right",
        dismiss: {
          duration: 3000,
        },
      });
    }

    API.registerOldUser({
      name,
      email,
      cpf,
      password,
    });
  }

  return (
    <Page>
      <Article>
        <S.Form onSubmit={onSubmit}>
          <S.Title>Cadastre-se</S.Title>
          <Input label="Nome" name="name" required />
          <Input label="Email" name="email" type="email" required />
          <Input label="CPF" name="cpf" mask="999.999.999-99" required />
          <Input label="Senha" name="password" type="password" required />
          <Input
            label="Confirme a Senha"
            name="passwordConfirm"
            type="password"
            required
          />
          <Button variant="contained" color="primary" type="submit">
            Cadastrar
          </Button>
        </S.Form>
      </Article>
    </Page>
  );
}
