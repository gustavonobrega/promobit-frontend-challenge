import styled, { css } from 'styled-components';

interface FilterButtonProps {
  selected: boolean;
}

export const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export const FilterMovies = styled.div`
  height: 456px;
  padding: 40px 16px;
  background: ${props => props.theme.colors.darkPurple};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    color: ${props => props.theme.colors.white};
    font-size: 48px;
    text-align: center;
  }

  span {
    margin-top: 40px;
    font-size: 14px;
    font-weight: 700;
    color: ${props => props.theme.colors.white};
    text-transform: uppercase;
  }

  ul {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 12px;

    max-width: 1216px;
    margin-top: 16px;
    list-style: none;
  }

  @media (max-width: 600px) {
    align-items: flex-start;

    h1 {
      text-align: start;
      font-size: 24px;
    }

    ul {
      justify-content: flex-start;
    }
  }
`;

export const FilterButton = styled.button<FilterButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 8px 16px;
  border-radius: 4px;
  border: 0;
  font-weight: 700;
  color: ${props => props.theme.colors.gray700};
  background: ${props => props.theme.colors.white};
  cursor: pointer;
  transition: 0.5s;

  &:not(:disabled):hover {
    filter: brightness(0.9);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    margin-left: 9px;
  }

  ${props =>
    props.selected &&
    css`
      background: ${props.theme.colors.orange};
      color: ${props.theme.colors.white};
    `}

  @media (max-width: 600px) {
    padding: 6px 16px;
    font-size: 12px;
  }
`;

export const Movies = styled.div`
  max-width: 1216px;
  width: 100%;
  margin: 29px auto;

  display: flex;
  flex-wrap: wrap;
  gap: 32px;

  a {
    color: inherit;
    text-decoration: none;
  }

  @media (max-width: 1300px) {
    padding: 0 30px;
    justify-content: center;
  }

  @media (max-width: 600px) {
    gap: 16px;
    padding: 0 16px;
  }
`;

export const Loading = styled.div`
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  div {
    width: 80px;
    height: 80px;
  }
`;

export const Error = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  h1 {
    color: ${props => props.theme.colors.darkPurple};
  }
`;
