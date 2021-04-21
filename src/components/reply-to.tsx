import { FC, ReactNode } from "react";
import {
  Box,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
} from "@chakra-ui/react";
import NextLink from "next/link";

type ReplyToProps = {
  id: number;
  parentId: number;
  threadId: number;
  isPopOverOpen?: boolean;
  onHover?: (id: number, parentId: number, threadId: number) => void;
  onLeave?: (id: number, parentId: number, threadId: number) => void;
  content?: ReactNode;
};

const ReplyTo: FC<ReplyToProps> = ({
  id,
  threadId,
  parentId,
  content,
  isPopOverOpen,
  onHover = () => null,
  onLeave = () => null,
}) => {
  const isReplyToOP = parentId === threadId;
  return (
    <Popover isOpen={isPopOverOpen} placement="right-start">
      <PopoverTrigger>
        <Box as="span">
          <NextLink href={`/thread/${threadId}#p${parentId}`} passHref>
            <Link
              mb="4"
              color="navy"
              textDecor="underline"
              _hover={{ textDecor: "underline!important" }}
              onMouseOver={() =>
                !isReplyToOP && onHover(id, parentId, threadId)
              }
              onMouseLeave={() =>
                !isReplyToOP && onLeave(id, parentId, threadId)
              }
            >
              &gt;&gt;{parentId}
              {isReplyToOP && " (OP)"}
            </Link>
          </NextLink>
        </Box>
      </PopoverTrigger>
      <PopoverContent
        bg="none"
        border="none"
        shadow="xs"
        _focus={{ outline: "none" }}
      >
        <PopoverBody p="0">{content}</PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default ReplyTo;
