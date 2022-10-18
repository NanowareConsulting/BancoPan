import NotificationBell from "@mui/icons-material/NotificationImportant";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

import * as S from "./styles";

export function Header({ showNotification }: { showNotification?: boolean }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  if (token) {
    return (
      <S.Header>
        <S.Logo onClick={() => navigate("/")} />
        <S.Nav>
          {showNotification && (
            <Button
              color="warning"
              variant="contained"
              onClick={() => {
                window.location.replace("/register-new");
              }}
            >
              <NotificationBell />
            </Button>
          )}
          <Button color="secondary" variant="text">
            Área do Cliente
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.replace("/");
            }}
          >
            Sair
          </Button>
        </S.Nav>
      </S.Header>
    );
  }

  return (
    <S.Header>
      <S.Logo onClick={() => navigate("/")} />
      <S.Nav>
        <Button color="secondary" variant="text">
          Área do Cliente
        </Button>
        <Button variant="contained" onClick={() => navigate("/register")}>
          Abrir Conta
        </Button>
      </S.Nav>
    </S.Header>
  );
}
