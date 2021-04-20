import { FC } from "react";
import { Box } from "@chakra-ui/react";

import Header from "./header";
import Footer from "./footer";

type LayoutProps = {
  title?: string;
  desc?: string;
};

const DefaultLayout: FC<LayoutProps> = ({ title, desc, children }) => {
  return (
    <Box
      sx={{
        a: {
          _hover: {
            color: "red",
            textDecor: "none",
          },
        },
      }}
    >
      <Header title={title} desc={desc} />
      <Box as="main">{children}</Box>
      <Footer />
    </Box>
  );
};

export default DefaultLayout;
