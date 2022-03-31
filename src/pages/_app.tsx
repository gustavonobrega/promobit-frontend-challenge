import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClientProvider } from 'react-query';

import { queryClient } from '../services/queryClient';
import { Header } from '../components/Header';

import GlobalStyle from '../styles/global';
import theme from '../styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Header />
        <Component {...pageProps} />
        <GlobalStyle />
      </ThemeProvider>

      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default MyApp;
