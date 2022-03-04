import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: Roboto, sans-serif;
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
  }
`;
