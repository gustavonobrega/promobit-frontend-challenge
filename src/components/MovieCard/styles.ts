import styled from 'styled-components';

export const Container = styled.div`
  max-width: 176px;
  transition: 0.3s;

  &:hover {
    transform: scale(1.05);
  }

  img {
    width: 100%;
    border-radius: 4px;
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

  @media (max-width: 600px) {
    max-width: 156px;

    div {
      line-height: 20px;

      strong {
        font-size: 14px;
      }

      span {
        font-size: 12px;
      }
    }
  }
`;
