import { FC, ReactNode, useCallback } from "react";
import {
  Box,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  useDisclosure,
} from "@chakra-ui/react";
import NextLink from "next/link";

type ReplyToProps = {
  replyId: number;
  threadId: number;
  popover?: ReactNode;
};

const ReplyTo: FC<ReplyToProps> = ({ threadId, replyId, popover }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isReplyToOP = replyId === threadId;
  const replyHTMLId = `#p${replyId}`;

  const onHover = useCallback(() => {
    if (isReplyToOP) return;

    const replyElement = document.querySelector<HTMLDivElement>(replyHTMLId);
    if (!replyElement) {
      onOpen();
      return;
    }

    const rect = replyElement.getBoundingClientRect();
    const docHeight =
      window.innerHeight || document.documentElement.clientHeight;
    const isInViewport =
      rect.top >= 0 - rect.height / 3 &&
      rect.bottom <= docHeight + rect.height / 3;

    if (!isInViewport) {
      onOpen();
      return;
    }
    replyElement.classList.add("highlight");
  }, []);

  const onLeave = useCallback(() => {
    if (isReplyToOP) return;

    const replyElement = document.querySelector<HTMLDivElement>(replyHTMLId);
    if (!replyElement) return;

    replyElement.classList.remove("highlight");
    onClose();
  }, []);

  const onClick = useCallback(() => {
    if (isReplyToOP) return;

    document.querySelectorAll(".post").forEach((el) => {
      el.classList.remove("always", "highlight");
    });

    const replyElement = document.querySelector<HTMLDivElement>(replyHTMLId);
    if (!replyElement) return;

    replyElement.classList.add("always", "highlight");
  }, []);

  const link = (
    <Box as="span">
      <NextLink href={`/thread/${threadId}#p${replyId}`} passHref>
        <Link
          mb="4"
          color="navy"
          textDecor="underline"
          _hover={{ textDecor: "underline!important" }}
          onMouseOver={onHover}
          onMouseLeave={onLeave}
          onClick={onClick}
        >
          &gt;&gt;{replyId}
          {isReplyToOP && " (OP)"}
        </Link>
      </NextLink>
    </Box>
  );

  if (!popover) {
    return link;
  }

  return (
    <Popover
      isLazy
      placement="right-start"
      trigger="hover"
      openDelay={0}
      closeDelay={0}
      isOpen={isOpen}
    >
      <PopoverTrigger>{link}</PopoverTrigger>
      <PopoverContent
        bg="none"
        border="none"
        shadow="xs"
        _focus={{ outline: "none" }}
      >
        <PopoverBody p="0">{popover}</PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default ReplyTo;
