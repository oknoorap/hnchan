import { useState, useMemo, useEffect } from "react";
import dateFormat from "date-fns/format";
import dateFromUnix from "date-fns/fromUnixTime";

import useRequest, { baseURL } from "hooks/use-request";

export type ItemResponse = {
  id: number;
  by: string;
  parent: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  text?: string;
  type: "story";
  url: string;
};

export type ItemResult = {
  id: number;
  text: string;
  title?: string;
  url?: string;
  author: string;
  date: string;
  timestamp: number;
  replies: number[];
  parentId: number;
};

const useThread = (id: number) => {
  const { data, error, isError, isLoading } = useRequest<ItemResponse>(
    "item",
    id
  );
  const [isItemLoading, setItemLoadingStatus] = useState(true);
  const author = useMemo(() => data?.by ?? "", [data]);
  const title = useMemo(() => data?.title ?? "", [data]);
  const url = useMemo(() => data?.url ?? "", [data]);
  const date = useMemo(
    () =>
      dateFormat(
        dateFromUnix(data?.time ?? Date.now()),
        "MM/dd/yy(EEE)hh:mm:ss"
      ),
    [data]
  );

  const [$items, setItems] = useState<ItemResponse[]>([]);
  const [itemCount, setItemCount] = useState(0);
  const items = useMemo<ItemResult[]>(
    () =>
      $items
        .filter((item) => item)
        .map(({ time, parent, by, text, kids, ...rest }) => ({
          ...rest,
          text,
          date: dateFormat(dateFromUnix(time), "MM/dd/yy(EEE)hh:mm:ss"),
          timestamp: time,
          parentId: parent,
          replies: kids,
          author: by,
        }))
        .sort((a, z) => a.timestamp - z.timestamp),
    [$items]
  );
  const latestItems = useMemo(
    () => items.reverse().filter((_, index) => index < 3),
    [items]
  );

  useEffect(() => {
    if (!process.browser) return;
    if (!data?.kids) return;

    const items = [];
    let itemCount = 0;
    const fetchItems = async (ids: number[]) => {
      itemCount += ids.length;

      const itemRequests = ids.map(async (id) => {
        const response = await fetch(`${baseURL}/item/${id}.json`);
        const item = await response.json();
        return item;
      });

      for await (const item of itemRequests) {
        items.push(item);
        if (item?.kids?.length) {
          await fetchItems(item.kids.reverse().filter((_, index) => index < 3));
        }
      }
    };

    fetchItems(data.kids.reverse().filter((_, index) => index < 3)).then(() => {
      setItems(items);
      setItemCount(itemCount);
      setItemLoadingStatus(false);
    });
  }, [data]);

  return {
    id,
    title,
    url,
    author,
    date,
    items,
    itemCount,
    latestItems,
    error,
    isError,
    isLoading,
    isItemLoading,
  };
};

export default useThread;
