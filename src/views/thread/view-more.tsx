import { FC } from "react";
import { Box, Link } from "@chakra-ui/react";
import NextLink from "next/link";

type ThreadViewOptions = {
  id: number;
  count: number;
};

const ThreadViewMore: FC<ThreadViewOptions> = ({ count, id }) => {
  if (count < 5) {
    return null;
  }

  return (
    <Box fontSize="small" color="#707070" ml="4" mb="2">
      {count} reply omitted.{" "}
      <NextLink href={`/thread/${id}`} passHref>
        <Link color="blue">Click here</Link>
      </NextLink>{" "}
      to view.
    </Box>
  );
};

export default ThreadViewMore;
