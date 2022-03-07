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
  padding: 0 30px;

  display: flex;
  align-items: center;
`;
