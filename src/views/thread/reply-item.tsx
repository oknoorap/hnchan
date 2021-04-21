import { FC, useMemo, useEffect } from "react";
import { Flex, Box } from "@chakra-ui/react";

import { useReply } from "hooks/use-reply";
import { useThread } from "hooks/use-thread";
import { useThreadReplies } from "hooks/use-thread-replies";
import { useThreadReply, ThreadReplyProvider } from "hooks/use-thread-reply";
import ReplyTitle from "components/thread-title";
import ReplyContent from "components/thread-content";
import ReplyTo from "components/reply-to";

type ThreadReplyItemProps = {
  isPopover?: boolean;
};

const ThreadReplyItemView: FC<ThreadReplyItemProps> = ({
  isPopover = false,
}) => {
  const { id: threadId } = useThread();
  const { replies, fetchReply } = useThreadReplies();
  const { onHoverReply, onLeaveReply, replyVisibleId } = useReply();
  const { id, date, author, text, parentId } = useThreadReply();
  const hasParentId = parentId > -1;
  const isParentIdNotThreadId = parentId !== threadId;
  const replyTo =
    hasParentId && isParentIdNotThreadId
      ? replies.find((item) => item.id === parentId)
      : null;

  // useEffect(() => {
  //   if (!process.browser) return;
  //   if (hasParentId && isParentIdNotThreadId) {
  //     fetchReply(parentId);
  //   }
  // }, [fetchReply]);

  return (
    <Flex
      id={`p${id}`}
      justifyContent="flex-start"
      w={isPopover ? "30vw" : null}
      _notLast={!isPopover && { mb: 2 }}
      sx={{
        "&.highlight": {
          ".box": {
            bgColor: "#f0c0b0",
            borderColor: "#d99f91",
          },
        },
      }}
    >
      {!isPopover && (
        <Box as="span" color="#e0bfb7" mr="1">
          &gt;&gt;
        </Box>
      )}

      <Box
        className="box"
        bgColor="#f0e0d6"
        borderWidth={isPopover ? "1px" : "0 1px 1px 0"}
        borderColor="#d9bfb7"
        py="1"
        px="4"
        w={isPopover ? "100%" : null}
      >
        <ReplyTitle id={id} threadId={threadId} author={author} date={date} />
        <ReplyContent
          isHtml
          children={text}
          preContent={
            hasParentId && (
              <ReplyTo
                id={id}
                parentId={parentId}
                threadId={threadId}
                isPopOverOpen={
                  replyVisibleId === `${threadId}#p${parentId}>${id}`
                }
                onHover={onHoverReply}
                onLeave={onLeaveReply}
                content={
                  replyTo && (
                    <ThreadReplyProvider
                      initialState={{ ...replyTo, isPopover: true }}
                    >
                      <ThreadReplyItemView isPopover />
                    </ThreadReplyProvider>
                  )
                }
              />
            )
          }
          sx={{
            "a:not(.tid)": { color: "navy" },
          }}
        />
      </Box>
    </Flex>
  );
};

export default ThreadReplyItemView;
