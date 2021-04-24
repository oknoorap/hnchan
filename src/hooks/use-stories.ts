import { useState, useMemo, useCallback } from "react";
import { createContainer } from "unstated-next";
import useRequest from "hooks/use-request";

const perPage = 30;

const useStoriesHook = (path: string) => {
  const response = useRequest<number[]>(path);
  const [visibleItem, setVisibleItem] = useState(perPage);
  const items = useMemo(() => (response.data || []).slice(0, visibleItem), [
    response.data,
    visibleItem,
  ]);
  const loadMore = useCallback(() => {
    if (!response.data) return;
    if (visibleItem >= response.data.length) return;
    setVisibleItem((visibleItem) => visibleItem + perPage);
  }, [response.data]);

  return {
    ...response,
    items,
    loadMore,
  };
};

const Container = createContainer(useStoriesHook);

export const useStories = Container.useContainer;

export const StoriesProvider = Container.Provider;

export default useStoriesHook;
