import { Flex, Box, Spinner, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";

import { useStyle } from "hooks/use-style";
import { useThread } from "hooks/use-thread";
import { useThreadReplies } from "hooks/use-thread-replies";
import { ThreadReplyProvider } from "hooks/use-thread-reply";

import ThreadReply from "./reply-item";

const ThreadRepliesView = () => {
  const {
    query: { threadId: routerThreadId },
  } = useRouter();
  const { styles } = useStyle();
  const { id: threadId, replies, totalReplies } = useThread();
  const {
    isRepliesLoading,
    replies: threadReplies,
    latestReplies,
  } = useThreadReplies();

  if (isRepliesLoading) {
    return (
      <Flex ml="4">
        <Spinner color={styles.color} mr="1" size="sm" />
        <Box as="span" fontSize="small">
          Loading Replies...
        </Box>
      </Flex>
    );
  }

  if (!replies.length) {
    return null;
  }

  return (
    <>
      {!routerThreadId && totalReplies > 5 && (
        <Box fontSize="small" color={styles.omittedColor} ml="4" mb="2">
          <Box as="span" mr="1">
            {totalReplies} reply omitted.
          </Box>
          <NextLink href={`/thread/${threadId}`} passHref>
            <Link color={styles.linkBrightColor}>Click here</Link>
          </NextLink>{" "}
          <Box as="span">to view.</Box>
        </Box>
      )}

      {(routerThreadId ? threadReplies : latestReplies).map((reply, index) => (
        <ThreadReplyProvider
          key={`reply-${reply.id}-${index}`}
          initialState={reply}
        >
          <ThreadReply />
        </ThreadReplyProvider>
      ))}
    </>
  );
};

export default ThreadRepliesView;
