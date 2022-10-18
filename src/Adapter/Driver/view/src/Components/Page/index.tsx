import { Header } from "../Header";
import { Main } from "../Main";
import * as S from "./styles";

export function Page({
  children,
  showNotification,
}: {
  children: React.ReactNode;
  showNotification?: boolean;
}) {
  return (
    <S.Page>
      <Header showNotification={showNotification} />
      <Main>{children}</Main>
    </S.Page>
  );
}
