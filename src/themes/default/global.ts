import { CSSProperties } from "react";

type GlobalStyles = {
  [key: string]: CSSProperties | GlobalStyles;
};

const globalStyles: GlobalStyles = {
  html: {
    minHeight: "100vh",
  },
  body: {
    height: "100%",
    padding: 0,
    margin: 0,
  },
  a: {
    ":focus": {
      outline: "none",
      boxShadow: "none!important",
    },
  },
};

export default globalStyles;
