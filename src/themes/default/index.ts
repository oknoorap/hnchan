import { extendTheme } from "@chakra-ui/react";

import global from "./global";

const defaultTheme = extendTheme({
  styles: {
    global,
  },
  fonts: {
    heading: "Tahoma, sans-serif",
  },
});

export default defaultTheme;
