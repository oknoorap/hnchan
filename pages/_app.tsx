import { SWRConfig } from "swr";
import { DefaultSeo } from "next-seo";
import { ChakraProvider } from "@chakra-ui/react";

import theme from "themes/default";
import seoSettings from "../next-seo.config";

const App = ({ Component, pageProps }) => {
  return (
    <SWRConfig
      value={{
        refreshInterval: 500,
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      <DefaultSeo {...seoSettings} />
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </SWRConfig>
  );
};

export default App;
