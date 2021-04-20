import { FC } from "react";
import { Flex, Box } from "@chakra-ui/react";

import { ItemResult } from "hooks/use-thread";
import Title from "./title";
import Content from "./content";

type ThreadItemProps = ItemResult & {
  threadId: number;
};

const ThreadItemView: FC<ThreadItemProps> = ({
  id,
  author,
  text,
  date,
  parentId,
  threadId,
  replies,
}) => {
  return (
    <Flex id={`q${id}`} justifyContent="flex-start" _notLast={{ mb: 2 }}>
      <Box as="span" color="#e0bfb7" mr="1">
        &gt;&gt;
      </Box>

      <Box
        bgColor="#f0e0d6"
        borderWidth="0 1px 1px 0"
        borderColor="#d9bfb7"
        py="0.5"
        px="3"
      >
        <Title
          id={id}
          parentId={parentId}
          threadId={threadId}
          author={author}
          date={date}
          replies={replies}
        />
        <Content text={text} parentId={parentId} threadId={threadId} />
      </Box>
    </Flex>
  );
};

export default ThreadItemView;
