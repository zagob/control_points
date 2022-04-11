import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { TimeProvider } from "../contexts/TimeContext";

import { theme } from "../styles/global";
import { AuthProvider } from "../contexts/AuthContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <TimeProvider>
          <Component {...pageProps} />
        </TimeProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
