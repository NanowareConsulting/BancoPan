import Document from "@mui/icons-material/DocumentScanner";
import Email from "@mui/icons-material/Email";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Article } from "../../../Components/Article";
import { Page } from "../../../Components/Page";
import { useAPI } from "../../../Hooks/API";
import * as S from "./styles";

const formatter = new Intl.DateTimeFormat("pt-BR", {
  year: "numeric",
  month: "long",
});

export function User() {
  const navigate = useNavigate();

  const [data, setData] = useState<any>({});
  const [showNotification, setShowNotification] = useState(false);
  const API = useAPI();

  async function getData() {
    return await API.getUserData();
  }

  useEffect(() => {
    getData().then((response) => {
      setData(response.data);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let email = data?.user?.email;

    for (let i = 0; i < data?.creditCards?.length; i++) {
      if (
        data?.creditCards[i]?._props?.email?.props?.value &&
        data?.creditCards[i]?._props?.email?.props?.value !== email
      ) {
        setShowNotification(true);
      }
    }
  }, [data, showNotification]);

  return (
    <Page showNotification={showNotification}>
      <Article>
        <S.Title>Olá, {data?.user?.name}!</S.Title>
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
          }}
        >
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <Email />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={data?.user?.email} />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <Document />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={data?.user?.cpf} />
          </ListItem>
        </List>
        <S.Section>
          <S.SectionHeader>
            <S.Title>Cartões de Crédito</S.Title>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/register-credit-card")}
            >
              +
            </Button>
          </S.SectionHeader>
          <S.Content>
            {data?.creditCards?.map((card: any) => (
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {card._props?.number?.props?.value}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {card._props?.securityCode?.props?.value}
                    <br />
                    {formatter.format(
                      new Date(card._props?.expirationDate?.props?.value)
                    )}
                  </Typography>
                  <Typography variant="body2">
                    Email : {card._props?.email?.props?.value}
                  </Typography>
                </CardContent>
              </Card>
            ))}
            {data.creditCards?.length === 0 && (
              <Typography variant="subtitle1" component="div">
                Você não possui cartões de crédito cadastrados!
              </Typography>
            )}
          </S.Content>
        </S.Section>
        <S.Section>
          <S.SectionHeader>
            <S.Title>Empréstimos</S.Title>
            <Button variant="contained">+</Button>
          </S.SectionHeader>
          <S.Content>
            {data?.loans?.map((card: any) => (
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    asd
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    adjective
                  </Typography>
                  <Typography variant="body2">
                    well meaning and kindly.
                    <br />
                    {'"a benevolent smile"'}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            ))}
            {data.loans?.length === 0 && (
              <Typography variant="subtitle1" component="div">
                Você não possui empréstimos cadastrados!
              </Typography>
            )}
          </S.Content>
        </S.Section>
      </Article>
    </Page>
  );
}
