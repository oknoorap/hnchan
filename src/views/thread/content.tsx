import { FC } from "react";
import { Flex, Box, Text, Link } from "@chakra-ui/react";
import NextLink from "next/link";

import { ItemResult } from "hooks/use-thread";

type ThradContentProps = Partial<ItemResult & { threadId: number }>;

const ThreadContentView: FC<ThradContentProps> = ({
  title,
  url,
  text,
  parentId,
  threadId,
}) => {
  const isReplyToOP = parentId === threadId;
  return (
    <Box fontSize="small" p="4">
      {parentId > -1 && (
        <NextLink href={`/thread/${parentId}#q${parentId}`} passHref>
          <Link
            textDecor="underline"
            color="navy"
            mb="4"
            _hover={{ textDecor: "underline!important" }}
          >
            &gt;&gt;{parentId}
            {isReplyToOP && " (OP)"}
          </Link>
        </NextLink>
      )}

      {title && <Text fontSize="md">{title}</Text>}

      {text && (
        <Box dangerouslySetInnerHTML={{ __html: text }} sx={{ p: { mb: 2 } }} />
      )}

      {url && (
        <Link href={url} isExternal color="blue">
          {url.slice(0, 64)}
          {url.length > 64 && "..."}
        </Link>
      )}
    </Box>
  );
};

export default ThreadContentView;
