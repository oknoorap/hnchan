import { useCallback, useMemo, FormEvent } from "react";
import { createContainer } from "unstated-next";

import useStorage from "hooks/use-storage";

const LocalStorageKey = {
  STYLE: "hn-chan-style",
};

type Styles = {
  font: string;
  bgColor: string;
  bgGradient?: string;
  color: string;
  boxColor: string;
  boxColor2: string;
  omittedColor: string;
  authorColor: string;
  linkColor: string;
  linkHoverColor: string;
  linkBrightColor: string;
  linkInBoxColor: string;
  borderColor: string;
  borderColor2: string;
  expandCollapseBtnColor: string;
};

const useStyleHook = () => {
  const [style, setStyle] = useStorage<string>(
    LocalStorageKey.STYLE,
    "yotsuba-new"
  );
  const styles = useMemo<Styles>(() => {
    switch (style) {
      case "yotsuba-new":
        return {
          font: "sans-serif",
          bgColor: "hsl(60deg 100% 97%)",
          bgGradient:
            "linear-gradient(to bottom, #fed5ae 0%, hsl(60deg 100% 97%) 100px)",
          color: "maroon",
          boxColor: "#f0e0d6",
          boxColor2: "#f0c0b0",
          omittedColor: "#707070",
          authorColor: "#117743",
          linkColor: "blue",
          linkHoverColor: "red",
          linkBrightColor: "blue",
          linkInBoxColor: "navy",
          borderColor: "#d9bfb7",
          borderColor2: "#d99f91",
          expandCollapseBtnColor: "maroon",
        };
      case "yotsuba-b-new":
        return {
          font: "sans-serif",
          bgColor: "#eef2ff",
          bgGradient: "linear-gradient(to bottom, #d1d5ee 0%, #eef2ff 100px)",
          color: "black",
          boxColor: "#d6daf0",
          boxColor2: "#d6bad0",
          omittedColor: "#707070",
          authorColor: "#117743",
          linkColor: "#34345c",
          linkHoverColor: "red",
          linkBrightColor: "#34345c",
          linkInBoxColor: "#34345C",
          borderColor: "#b7c5d9",
          borderColor2: "#ba9dbf",
          expandCollapseBtnColor: "#8994ce",
        };
      case "futaba-new":
        return {
          font: "",
          bgColor: "",
          bgGradient: "",
          color: "",
          boxColor: "",
          boxColor2: "",
          omittedColor: "",
          authorColor: "",
          linkColor: "",
          linkHoverColor: "",
          linkBrightColor: "",
          linkInBoxColor: "",
          borderColor: "",
          borderColor2: "",
          expandCollapseBtnColor: "",
        };
      case "burichan-new":
        return {
          font: "",
          bgColor: "",
          bgGradient: "",
          color: "",
          boxColor: "",
          boxColor2: "",
          omittedColor: "",
          authorColor: "",
          linkColor: "",
          linkHoverColor: "",
          linkBrightColor: "",
          linkInBoxColor: "",
          borderColor: "",
          borderColor2: "",
          expandCollapseBtnColor: "",
        };
      case "tomorrow":
        return {
          font: "",
          bgColor: "",
          bgGradient: "",
          color: "",
          boxColor: "",
          boxColor2: "",
          omittedColor: "",
          authorColor: "",
          linkColor: "",
          linkHoverColor: "",
          linkBrightColor: "",
          linkInBoxColor: "",
          borderColor: "",
          borderColor2: "",
          expandCollapseBtnColor: "",
        };
      case "photon":
        return {
          font: "",
          bgColor: "",
          bgGradient: "",
          color: "",
          boxColor: "",
          boxColor2: "",
          omittedColor: "",
          authorColor: "",
          linkColor: "",
          linkHoverColor: "",
          linkBrightColor: "",
          linkInBoxColor: "",
          borderColor: "",
          borderColor2: "",
          expandCollapseBtnColor: "",
        };
    }
  }, [style]);

  const changeStyle = useCallback((event: FormEvent<HTMLSelectElement>) => {
    setStyle(event.currentTarget.value);
  }, []);

  return {
    style,
    styles,
    changeStyle,
  };
};

const Container = createContainer(useStyleHook);

export const useStyle = Container.useContainer;

export const StyleProvider = Container.Provider;

export default Container;
