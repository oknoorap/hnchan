import { FC } from "react";
import { Box } from "@chakra-ui/react";

import { useStyle } from "hooks/use-style";
import Header from "./header";
import Footer from "./footer";

type LayoutProps = {
  title?: string;
  description?: string;
};

const DefaultLayout: FC<LayoutProps> = ({ title, description, children }) => {
  const { styles } = useStyle();
  return (
    <Box
      sx={{
        p: 2,
        fontFamily: styles.font,
        background: styles.bgColor,
        backgroundImage: styles.bgGradient,
        backgroundRepeat: "no-repeat",
        color: styles.color,
        a: {
          _hover: {
            color: styles.linkHoverColor,
            textDecor: "none",
          },
        },
      }}
    >
      <Header title={title} description={description} />
      <Box as="main">{children}</Box>
      <Footer />
    </Box>
  );
};

export default DefaultLayout;
