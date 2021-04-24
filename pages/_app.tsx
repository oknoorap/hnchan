import { SWRConfig } from "swr";
import { DefaultSeo } from "next-seo";
import { ChakraProvider } from "@chakra-ui/react";

import theme from "themes/default";
import { StyleProvider } from "hooks/use-style";
import seoSettings from "../next-seo.config";

const App = ({ Component, pageProps }) => {
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      <DefaultSeo {...seoSettings} />
      <ChakraProvider theme={theme}>
        <StyleProvider>
          <Component {...pageProps} />
        </StyleProvider>
      </ChakraProvider>
    </SWRConfig>
  );
};

export default App;
