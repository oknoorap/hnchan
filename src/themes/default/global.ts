import { CSSProperties } from "react";

type GlobalStyles = {
  [key: string]: CSSProperties | GlobalStyles;
};

const globalStyles: GlobalStyles = {
  html: {
    minHeight: "100vh",
  },
  body: {
    fontFamily: "sans-serif",
    background: "hsl(60deg 100% 97%)",
    backgroundImage: `linear-gradient(to bottom, #fed5ae 0%, hsl(60deg 100% 97%) 100px)`,
    backgroundRepeat: "no-repeat",
    color: "maroon",
    height: "100%",
    padding: "5px",
  },
  a: {
    ":focus": {
      outline: "none",
      boxShadow: "none!important",
    },
  },
};

export default globalStyles;
