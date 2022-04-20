import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export const MovieInfo = styled.section`
  height: 660px;
  background: ${props => props.theme.colors.darkPurple};
`;

export const MovieInfoContent = styled.div`
  max-width: 1216px;
  margin: 0 auto;
  padding: 0 30px;
`;

export const MovieBody = styled.div`
  max-width: 1216px;
  margin: 0 auto;
  padding: 0 30px;
`;
