import { FC } from "react";
import { Flex, Box, Link } from "@chakra-ui/react";
import NextLink from "next/link";

import { ItemResult } from "hooks/use-thread";

type ThreadTitleProps = Partial<
  ItemResult & {
    threadId: number;
  }
>;

const ThreadTitleView: FC<ThreadTitleProps> = ({
  id,
  parentId,
  author,
  date,
  replies = [],
}) => {
  const href = (id: number) => `/thread/${parentId}#q${id}`;
  return (
    <>
      <Flex fontSize="smaller" display="inline-flex">
        <Box as="strong" color="#117743" mr="1">
          {author}
        </Box>
        <Box as="span" mr="1">
          {date}
        </Box>
        <NextLink href={href(id)} passHref>
          <Link>No. {id}</Link>
        </NextLink>
        {replies.length > 0 && replies.length <= 5 && (
          <Box as="span">
            {replies.map((id) => (
              <NextLink key={`reply-${id}`} href={href(id)} passHref>
                <Link
                  textDecor="underline"
                  color="navy"
                  fontSize="smaller"
                  _hover={{ textDecor: "underline!important" }}
                  _first={{ ml: 2 }}
                  _notLast={{ mr: 1 }}
                >
                  &gt;&gt;{id}
                </Link>
              </NextLink>
            ))}
          </Box>
        )}
      </Flex>
      <div />
    </>
  );
};

export default ThreadTitleView;
