import { Flex, Box, Button, Spinner } from "@chakra-ui/react";

import useStories from "hooks/use-stories";
import Thread from "views/thread";

const HomepageView = () => {
  const { items, error, isError, isLoading, loadMore } = useStories(
    "topstories"
  );

  if (isLoading) {
    return (
      <Flex alignItems="center" justifyContent="center" minH="50vh">
        <Spinner color="maroon" mr="1" size="sm" />
        <Box as="span" fontSize="small">
          Loading...
        </Box>
      </Flex>
    );
  }

  if (isError) {
    return <>{JSON.stringify(error)}</>;
  }

  return (
    <Box>
      {items.map((itemId) => (
        <Thread key={`item-${itemId}`} id={itemId} parentId={itemId} />
      ))}
      <Button onClick={loadMore}>Load More</Button>
    </Box>
  );
};

export default HomepageView;
