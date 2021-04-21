import { Flex, Box, Spinner } from "@chakra-ui/react";

import useStories from "hooks/use-stories";
import { ThreadProvider } from "hooks/use-thread";
import Thread from "views/thread";

const HomepageView = () => {
  const { items, error, isError, isLoading } = useStories("topstories");

  if (isLoading) {
    return (
      <Flex alignItems="center" justifyContent="center" minH="50vh">
        <Spinner color="maroon" mr="1" size="sm" />
        <Box as="span" fontSize="small">
          Loading Threads...
        </Box>
      </Flex>
    );
  }

  if (isError) {
    return <>{JSON.stringify(error)}</>;
  }

  return (
    <Box>
      {items.map((id) => (
        <ThreadProvider key={`thread-${id}`} initialState={id}>
          <Thread />
        </ThreadProvider>
      ))}
    </Box>
  );
};

export default HomepageView;
