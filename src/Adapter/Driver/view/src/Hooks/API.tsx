import axios from "axios";
import { Store } from "react-notifications-component";

export function useAPI() {
  const api = () =>
    axios.create({
      baseURL: "http://localhost:3333/",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

  async function registerOldUser({
    name,
    email,
    cpf,
    password,
  }: {
    name: string;
    email: string;
    cpf: string;
    password: string;
  }) {
    try {
      const response = await api().post("/old/users", {
        name,
        email,
        cpf,
        password,
      });

      Store.addNotification({
        title: "Sucesso!",
        message: "Usuário cadastrado com sucesso!",
        type: "success",
        insert: "top",
        container: "top-right",
        dismiss: {
          duration: 3000,
          onScreen: true,
        },
      });

      localStorage.setItem("token", response.data.token);
      window.location.href = "/user";
    } catch (err: any) {
      Store.addNotification({
        title: "Erro!",
        message: err.response.data.message || "Erro ao cadastrar usuário!",
        type: "danger",
        insert: "top",
        container: "top-right",
        dismiss: {
          duration: 3000,
        },
      });
    }
  }

  async function registerNewUser({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) {
    try {
      await api().post("/users", {
        name,
        email,
        password,
      });

      Store.addNotification({
        title: "Sucesso!",
        message: "Usuário cadastrado com sucesso!",
        type: "success",
        insert: "top",
        container: "top-right",
        dismiss: {
          duration: 3000,
          onScreen: true,
        },
        onRemoval: () => (window.location.href = "/"),
      });
    } catch (err: any) {
      Store.addNotification({
        title: "Erro!",
        message: err.response.data.message || "Erro ao cadastrar usuário!",
        type: "danger",
        insert: "top",
        container: "top-right",
        dismiss: {
          duration: 3000,
        },
      });
    }
  }

  async function getUserData() {
    try {
      const response = await api().get("/users/data");

      return response.data;
    } catch (err: any) {
      Store.addNotification({
        title: "Erro!",
        message:
          err.response.data.message || "Erro ao buscar dados do usuário!",
        type: "danger",
        insert: "top",
        container: "top-right",
        dismiss: {
          duration: 3000,
        },
      });
    }
  }

  async function registerCreditCard(email: string) {
    try {
      await api().post("/old/credit-cards", {
        email,
      });

      Store.addNotification({
        title: "Sucesso!",
        message: "Cartão cadastrado com sucesso!",
        type: "success",
        insert: "top",
        container: "top-right",
        dismiss: {
          duration: 3000,
          onScreen: true,
        },
        onRemoval: () => (window.location.href = "/user"),
      });
    } catch (err: any) {
      Store.addNotification({
        title: "Erro!",
        message: err.response.data.message || "Erro ao cadastrar cartão!",
        type: "danger",
        insert: "top",
        container: "top-right",
        dismiss: {
          duration: 3000,
        },
      });
    }
  }

  return {
    registerOldUser,
    getUserData,
    registerCreditCard,
    registerNewUser,
  };
}
