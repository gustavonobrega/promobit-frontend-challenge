import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export const MovieHeader = styled.header`
  max-height: 600px;
  background: ${props => props.theme.colors.darkPurple};
`;

export const MovieInfoContent = styled.div`
  display: flex;

  max-width: 1216px;
  width: 100%;
  height: 100%;
  margin: 0 auto;

  padding: 72px 0 0 30px;

  img {
    height: 574px;
    width: 383px;

    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    margin-right: 33px;
  }
`;

export const AboutTheMovie = styled.div`
  display: flex;
  flex-direction: column;

  color: ${props => props.theme.colors.white};

  h1 {
    font-size: 32px;
  }

  div {
    margin-top: 8px;

    span {
      font-size: 18px;
      font-weight: 400;
      color: ${props => props.theme.colors.gray200};
    }
  }

  > strong {
    margin-top: 32px;
    font-size: 20px;
  }

  > p {
    margin-top: 8px;
    line-height: 24px;
    color: ${props => props.theme.colors.gray200};
  }

  ul {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;

    margin-top: 24px;
    list-style: none;

    li {
      strong {
        line-height: 24px;
      }

      p {
        line-height: 20px;
        font-size: 14px;
        color: ${props => props.theme.colors.gray200};
      }
    }
  }
`;

export const MovieRating = styled.div`
  display: flex;
  align-items: center;

  div {
    width: 60px;
    height: 60px;

    .CircularProgressbar-text {
      fill: #14ff00;
      font-size: 26px;
      font-weight: 700;
    }
    .CircularProgressbar-path {
      stroke: #14ff00;
    }
    .CircularProgressbar-trail {
      stroke: transparent;
    }
    .CircularProgressbar-background {
      fill: #42246d;
    }
  }

  p {
    margin-left: 11px;
    line-height: 20px;
  }
`;

export const MovieBody = styled.main`
  max-width: 1216px;
  width: 100%;
  margin: 74px auto;
  padding-left: 30px;
`;

export const MovieCast = styled.section`
  width: 100%;

  h1 {
    font-size: 28px;
    margin-bottom: 24px;
  }

  ul {
    display: flex;
    gap: 16px;
    overflow-x: scroll;
    list-style: none;
    padding-bottom: 26px;

    ::-webkit-scrollbar {
      height: 12px;
    }

    ::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background: #adadad;
    }

    ::-webkit-scrollbar-track {
      border-radius: 10px;
      background: ${props => props.theme.colors.gray200};
    }

    li {
      min-width: 190px;
      height: 336px;
      padding: 8px;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      border-radius: 4px;
      background: ${props => props.theme.colors.white};

      img {
        width: 100%;
        height: 222px;

        border-radius: 4px;
        margin-bottom: 14px;
      }

      strong {
        font-size: 18px;
        line-height: 30px;
      }

      p {
        margin-top: 4px;
        line-height: 24px;
        color: ${props => props.theme.colors.gray700};
      }
    }
  }
`;

export const MovieTrailer = styled.section`
  width: 100%;
  margin-top: 39px;

  h1 {
    font-size: 28px;
    margin-bottom: 24px;
  }

  div {
    background-color: ${props => props.theme.colors.gray300};

    width: 907px;
    height: 510px;
  }
`;

export const MovieRecommendations = styled.section`
  width: 100%;
  margin-top: 64px;

  h1 {
    font-size: 28px;
    margin-bottom: 24px;
  }

  > div {
    width: 100%;
    display: flex;
    gap: 32px;

    a {
      color: inherit;
      text-decoration: none;
    }
  }
`;
