import { Button } from "@chakra-ui/react";

import { useStories } from "hooks/use-stories";

const LoadMore = () => {
  const { loadMore } = useStories();
  return (
    <Button
      size="xs"
      fontSize="xs"
      fontWeight="normal"
      rounded="none"
      color="black"
      bgColor="white"
      border="1px"
      borderColor="gray"
      onClick={loadMore}
    >
      Load More
    </Button>
  );
};

export default LoadMore;
