import { FC } from "react";
import { Flex, Box, Link } from "@chakra-ui/react";
import NextLink from "next/link";

type ThreadTitleProps = {
  id: number;
  threadId: number;
  author: string;
  date: string;
};

const ThreadTitle: FC<ThreadTitleProps> = ({
  id,
  threadId,
  author,
  date,
  children,
}) => {
  const href = (id: number) => `/thread/${threadId}#p${id}`;
  return (
    <>
      <Flex
        fontSize="sm"
        display="inline-flex"
        alignItems="baseline"
        flexWrap="wrap"
      >
        <Box as="strong" color="#117743" mr="1">
          {author}
        </Box>

        <Box as="span" mr="1">
          {date}
        </Box>

        <Box
          as="span"
          sx={{
            a: {
              color: "maroon!important",
              _hover: { color: "red!important" },
            },
          }}
        >
          <Box as="span" mr="0.5">
            No.
          </Box>
          <NextLink href={href(id)} passHref>
            <Link className="rid">{id}</Link>
          </NextLink>
        </Box>

        {children}
      </Flex>
      <div />
    </>
  );
};

export default ThreadTitle;
