import { SWRConfig } from "swr";
import { ChakraProvider } from "@chakra-ui/react";

import theme from "themes/default";

const App = ({ Component, pageProps }) => {
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </SWRConfig>
  );
};

export default App;
