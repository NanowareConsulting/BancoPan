import { Page } from "../../../Components/Page";
import * as S from "./styles";

export function LandingPage() {
  return (
    <Page>
      <S.Wrapper>
        <S.Content>
          <div></div>
          <S.Image />
        </S.Content>
      </S.Wrapper>

      <S.InnerContent>
        <S.SubTitle>Acesso rápido</S.SubTitle>
        <S.CardWrapper>
          <S.Card>
            <S.Icon src="https://www.bancopan.com.br/bancopan-institucional/conteudo/home/assets/img/icons/icon_quick_access-money.png" />
            <p>Boleto de financiamento</p>
            <S.a>Ir à página {"->"}</S.a>
          </S.Card>
          <S.Card>
            <S.Icon src="https://www.bancopan.com.br/bancopan-institucional/conteudo/home/assets/img/icons/icon_quick_access-money.png" />
            <p>Fatura de cartão de crédito</p>
            <S.a>Ir à página {"->"}</S.a>
          </S.Card>

          <S.Card>
            <S.Icon src="https://www.bancopan.com.br/bancopan-institucional/conteudo/home/assets/img/icons/icon_quick_access-money.png" />
            <p>Renegociação de dividas</p>
            <S.a>Ir à página {"->"}</S.a>
          </S.Card>

          <S.Card>
            <S.Icon src="https://www.bancopan.com.br/bancopan-institucional/conteudo/home/assets/img/icons/icon_quick_access-money.png" />
            <p>Validador de boletos</p>
            <S.a>Ir à página {"->"}</S.a>
          </S.Card>
        </S.CardWrapper>
      </S.InnerContent>
    </Page>
  );
}
