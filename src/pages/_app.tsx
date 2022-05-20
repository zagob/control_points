import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { TimeProvider } from "../contexts/TimeContext";

import { theme } from "../styles/global";
import { AuthProvider } from "../contexts/AuthContext";
import { QueryClientProvider } from "react-query";
import { queryClient } from "../services/queryClient";
import { ReactQueryDevtools } from 'react-query/devtools'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <TimeProvider>
            <Component {...pageProps} />
            <ReactQueryDevtools initialIsOpen={false} />
          </TimeProvider>
        </AuthProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
