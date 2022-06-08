import styled, { css } from 'styled-components';
import { RiArrowRightSLine } from 'react-icons/ri';

interface PaginationItemProps {
  isCurrent?: boolean;
}

export const Container = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  list-style: none;

  margin: 20px 0;
`;

export const PaginationItem = styled.button<PaginationItemProps>`
  border: 0;
  background: transparent;

  padding: 20px;
  font-size: 16px;
  font-weight: 700;
  color: ${props => props.theme.colors.lightPurple};
  cursor: pointer;

  &:disabled {
    cursor: default;
  }

  ${props =>
    props.isCurrent &&
    css`
      color: ${props.theme.colors.darkPurple};
    `}

  @media (max-width: 600px) {
    padding: 10px;
  }
`;

const ArrowsCSS = css`
  width: 22px;
  height: 22px;
`;

export const RightArrow = styled(RiArrowRightSLine)`
  ${ArrowsCSS}
`;
