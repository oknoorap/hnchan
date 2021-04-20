import { useState, useMemo, useCallback } from "react";
import useRequest from "hooks/use-request";

const perPage = 30;

const useStories = (path: string) => {
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

export default useStories;
