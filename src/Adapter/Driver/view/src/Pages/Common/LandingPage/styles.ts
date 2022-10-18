import styled from "styled-components";

import Cards from "../../../Assets/Cards.webp";

export const Wrapper = styled.div`
  margin-top: -50px;

  width: 100%;
  height: 480px;
  background-color: #07b2fd;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  place-items: center;

  max-width: 1200px;
  height: 100%;
  width: 100%;

  overflow: hidden;
`;

export const Image = styled.img`
  height: 100%;
  object-fit: cover;
  content: url(${Cards});
`;
