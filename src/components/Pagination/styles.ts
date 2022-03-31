import styled, { css } from 'styled-components';

interface PaginationItemProps {
  isCurrent?: boolean;
}

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin: 20px 0;

  span {
    padding: 20px;
    font-weight: 700;
    color: ${props => props.theme.colors.lightPurple};
  }
`;

export const PaginationItem = styled.button<PaginationItemProps>`
  border: 0;
  background: transparent;

  padding: 20px;
  font-size: 16px;
  font-weight: 700;
  color: ${props => props.theme.colors.lightPurple};
  cursor: pointer;

  ${props =>
    props.isCurrent &&
    css`
      color: ${props.theme.colors.darkPurple};
    `}
`;
