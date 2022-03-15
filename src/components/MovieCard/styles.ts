import styled from 'styled-components';

export const Container = styled.div`
  max-width: 176px;

  img {
    width: 100%;
  }

  div {
    margin-top: 8px;
    line-height: 24px;

    display: flex;
    flex-direction: column;

    span {
      text-transform: uppercase;
      font-size: 14px;
      font-weight: 700;
      color: ${props => props.theme.colors.gray300};
    }
  }
`;
