import styled from "styled-components";

import BancoPanLogo from "../../Assets/Logo.svg";

export const Header = styled.header`
  box-sizing: border-box;

  position: fixed;
  top: 0;
  left: 0;

  width: 100vw;
  height: 60px;

  background-color: #fff;

  display: flex;
  justify-content: space-between;
  padding: 15px 20px;

  height: 70px;
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const Logo = styled.img`
  height: 100%;

  content: url(${BancoPanLogo});

  cursor: pointer;
`;
