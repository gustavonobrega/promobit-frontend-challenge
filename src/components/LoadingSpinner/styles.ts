import styled, { keyframes } from 'styled-components';

const spinner = keyframes`
  to {
    transform: rotate(1turn);
  }
`;

export const Container = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  border: 6px solid ${props => props.theme.colors.white};
  border-top-color: ${props => props.theme.colors.lightPurple};

  animation: ${spinner} 1s infinite;
`;
