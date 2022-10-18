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

  overflow: hidden;
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

export const InnerContent = styled.div`
  box-sizing: border-box;
  background-color: #f5f5f5;
  padding: 100px 0;
  max-width: 1140px;
  margin: 0 auto;

  overflow: hidden;
`;

export const SubTitle = styled.h2`
  color: #03a9f4;
  font-size: 40px;
  font-weight: 700;
  line-height: 48px;
  margin: 0;
  padding: 10px 0 0 10px;
  position: relative;

  ::before {
    background-color: #ff5630;
    content: "";
    display: block;
    height: 10px;
    left: 0;
    position: absolute;
    top: 0;
    width: 10px;
  }
`;

export const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 130px;

  padding-top: 32px;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  p {
    color: #414141;
    font-size: 16px;
    font-weight: 500;
    line-height: 28px;
    margin: 16px 0 0;
  }
`;

export const Icon = styled.img`
  height: 24px;
  width: 24px;
`;

export const a = styled.a`
  color: #03a9f4;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  line-height: 22px;
  margin-top: 16px;
  text-decoration: none;
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
`;
