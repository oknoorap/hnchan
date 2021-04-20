import { FC } from "react";
import { Box, Flex, Spinner, useDisclosure } from "@chakra-ui/react";
import { MinusIcon } from "@chakra-ui/icons";

import useThread from "hooks/use-thread";

import Title from "./title";
import Content from "./content";
import Item from "./item";
import ViewMore from "./view-more";

type ThreadProps = {
  id: number;
  parentId?: number;
};

const ThreadView: FC<ThreadProps> = ({ id }) => {
  const { isOpen: isHide, onToggle } = useDisclosure();
  const {
    author,
    date,
    title,
    url,
    latestItems,
    itemCount,
    isItemLoading,
  } = useThread(id);
  const titleProps = { id, author, date };
  const contentProps = { title, url };
  const viewMoreProps = { id, count: itemCount };

  return (
    <Flex
      id={`q${id}`}
      alignItems="baseline"
      py="2"
      borderBottom="1px"
      borderColor="gray.300"
      opacity={isHide && 0.5}
      _first={{ borderTop: "1px", borderColor: "gray.300" }}
    >
      <Box
        as="button"
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        title="Hide Thread"
        bgColor="maroon"
        color="white"
        fontSize="x-small"
        rounded="sm"
        h="4"
        mr="1"
        py="0.5"
        px="1"
        _focus={{ outline: "none" }}
        onClick={onToggle}
      >
        {isHide ? (
          <Box as="span" fontSize="md" fontWeight="bold">
            +
          </Box>
        ) : (
          <MinusIcon />
        )}
      </Box>
      <Box>
        <Title {...titleProps} />
        {!isHide && <Content {...contentProps} />}
        {!isHide && <ViewMore {...viewMoreProps} />}
        {!isHide && isItemLoading && (
          <Flex ml="4">
            <Spinner color="maroon" mr="1" size="sm" />
            <Box as="span" fontSize="small">
              Loading Replies...
            </Box>
          </Flex>
        )}
        {!isHide &&
          latestItems.map((item) => (
            <Item key={item.id} threadId={id} {...item} />
          ))}
      </Box>
    </Flex>
  );
};

export default ThreadView;
