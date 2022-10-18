import styled from "styled-components";

export const Title = styled.h1`
  font-size: 36px;
  font-weight: 700;
  color: #414141;
`;

export const Section = styled.section`
  margin-top: 20px;

  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const SectionHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;

  button {
    width: 50px;
  }
`;
