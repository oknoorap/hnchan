import { FC, useEffect } from "react";
import { Flex, Box } from "@chakra-ui/react";

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
  const { replies: threadReplies, fetchReply } = useThreadReplies();
  const { id, date, author, text, parentId, replies } = useThreadReply();
  const hasParentId = parentId > -1;
  const isParentNotThread = parentId !== threadId;
  const replyTo =
    hasParentId && isParentNotThread
      ? threadReplies.find((item) => item.id === parentId)
      : null;

  useEffect(() => {
    if (!process.browser) return;
    if (hasParentId && isParentNotThread) {
      fetchReply(parentId);
    }
  }, [fetchReply]);

  return (
    <Flex
      id={`p${id}`}
      className="post"
      justifyContent="flex-start"
      w={isPopover ? "30vw" : null}
      _notLast={!isPopover && { mb: 2 }}
      sx={{
        "&.highlight, &.always": {
          ">.box": {
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
        <ReplyTitle id={id} threadId={threadId} author={author} date={date}>
          {replies?.length > 0 && (
            <Box fontSize="x-small" ml="2">
              {replies.map((replyId, index) => (
                <Box
                  key={`replied-by-${replyId}-${index}`}
                  as="span"
                  _notLast={{ mr: 1 }}
                >
                  <ReplyTo replyId={replyId} threadId={threadId} />
                </Box>
              ))}
            </Box>
          )}
        </ReplyTitle>
        <ReplyContent
          isHtml
          isPopover={isPopover}
          children={text}
          preContent={
            hasParentId && (
              <ReplyTo
                replyId={parentId}
                threadId={threadId}
                popover={
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
