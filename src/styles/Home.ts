import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export const FilterMovies = styled.div`
  width: 100%;
  height: 456px;
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
`;

export const FilterButtons = styled.ul`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;

  max-width: 1216px;
  margin-top: 16px;
  list-style: none;

  button {
    padding: 8px 16px;
    border-radius: 4px;
    border: 0;
    font-weight: 700;
    color: ${props => props.theme.colors.gray700};
    background: ${props => props.theme.colors.white};
    cursor: pointer;
    transition: 0.5s;

    &:hover {
      filter: brightness(0.9);
    }
  }
`;

export const Movies = styled.div`
  max-width: 1216px;
  margin: 29px auto;

  display: flex;
  flex-wrap: wrap;
  gap: 32px;

  @media (max-width: 1000px) {
    justify-content: center;
  }
`;
