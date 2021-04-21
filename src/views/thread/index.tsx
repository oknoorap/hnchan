import { FC } from "react";
import { Box, Flex, Text, Link } from "@chakra-ui/react";
import { MinusIcon } from "@chakra-ui/icons";

import { ReplyProvider, useReply } from "hooks/use-reply";
import { useThread } from "hooks/use-thread";
import { ThreadRepliesProvider } from "hooks/use-thread-replies";
import ThreadTitle from "components/thread-title";
import ThreadContent from "components/thread-content";

import ThreadReplies from "./replies";

const ThreadView: FC = () => {
  const {
    id,
    author,
    date,
    title,
    url,
    vote,
    isHidden,
    onToggleCollapse,
  } = useThread();

  return (
    <Flex
      id={`q${id}`}
      alignItems="baseline"
      py="2"
      borderBottom="1px"
      borderColor="gray.300"
      opacity={isHidden && 0.5}
      _first={{ borderTop: "1px", borderColor: "gray.300" }}
    >
      <Flex
        as="button"
        h="4"
        mr="1"
        py="0.5"
        px="1"
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        title="Hide Thread"
        bgColor="maroon"
        color="white"
        fontSize="x-small"
        rounded="sm"
        _focus={{ outline: "none" }}
        onClick={onToggleCollapse}
      >
        {isHidden ? (
          <Box as="span" fontSize="md" fontWeight="bold" children="+" />
        ) : (
          <MinusIcon />
        )}
      </Flex>

      <Box>
        <ThreadTitle id={id} threadId={id} author={author} date={date}>
          <Box as="span" ml="2">
            <Box as="span" fontSize="xs" mr="0.5">
              &#9650;
            </Box>
            <Box as="span">{vote}</Box>
          </Box>
        </ThreadTitle>

        <ReplyProvider>
          {!isHidden && (
            <ThreadContent>
              <Text fontSize="md">{title}</Text>
              <Link rel="noopener" color="blue" href={url} isExternal>
                {url.slice(0, 64)}
                {url.length > 64 && "..."}
              </Link>
            </ThreadContent>
          )}

          <ThreadRepliesProvider>
            {!isHidden && <ThreadReplies />}
          </ThreadRepliesProvider>
        </ReplyProvider>
      </Box>
    </Flex>
  );
};

export default ThreadView;
