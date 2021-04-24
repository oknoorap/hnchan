import { FC } from "react";
import { Flex, Box, Spinner } from "@chakra-ui/react";
import dynamic from "next/dynamic";

import useStories from "hooks/use-stories";
import { useStyle } from "hooks/use-style";

const ThreadProvider = dynamic(
  () => import("hooks/use-thread").then((mod) => mod.ThreadProvider),
  {
    ssr: false,
  }
);
const Thread = dynamic(() => import("views/thread"), {
  ssr: false,
});

type StoriesProps = {
  story: string;
};

const StoriesView: FC<StoriesProps> = ({ story = "topstories" }) => {
  const { styles } = useStyle();
  const { items, error, isError, isLoading } = useStories(story);

  if (isLoading) {
    return (
      <Flex alignItems="center" justifyContent="center" minH="50vh">
        <Spinner color={styles.color} mr="1" size="sm" />
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

export default StoriesView;
