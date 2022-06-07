import styled from 'styled-components';

export const Container = styled.header`
  width: 100%;
  height: 56px;
  background: ${props => props.theme.colors.lightPurple};
`;

export const Content = styled.div`
  max-width: 1216px;
  height: 100%;
  margin: 0 auto;

  display: flex;
  align-items: center;

  @media (max-width: 1300px) {
    padding: 0 30px;
  }

  @media (max-width: 600px) {
    justify-content: center;

    img {
      width: 140px;
    }
  }
`;
