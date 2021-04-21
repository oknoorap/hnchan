import { useState, useMemo, useEffect, useCallback } from "react";
import { createContainer } from "unstated-next";
import { useRouter } from "next/router";
import dateFormat from "date-fns/format";
import dateFromUnix from "date-fns/fromUnixTime";
import uniqBy from "lodash.uniqby";
import flatten from "lodash.flatten";

import { baseURL } from "hooks/use-request";
import { useThread, ItemResponse, ItemResult } from "hooks/use-thread";

const useThreadRepliesHook = () => {
  const {
    query: { threadId: routerThreadId },
  } = useRouter();
  const { isLoading, id: threadId, replies: replyIds } = useThread();
  const [isRepliesLoading, setRepliesLoadingStatus] = useState(true);
  const [$replies, setReplies] = useState<ItemResponse[]>([]);
  const replies = useMemo<ItemResult[]>(
    () =>
      $replies
        .filter((item) => !item.dead && !item.deleted)
        .map(
          ({
            time,
            parent: parentId,
            by: author,
            text,
            kids: replies,
            score: vote,
            ...rest
          }) => ({
            ...rest,
            text,
            date: dateFormat(dateFromUnix(time), "MM/dd/yy(EEE)hh:mm:ss"),
            timestamp: time,
            parentId,
            replies,
            vote,
            author,
          })
        )
        .sort((a, z) => z.timestamp - a.timestamp),
    [$replies]
  );
  const latestReplies = useMemo(
    () => replies.reverse().filter((_, index) => index < 3),
    [replies]
  );

  const fetchReply = useCallback(async (id: number) => {
    let isSubscribed = true;
    const response = await fetch(`${baseURL}/item/${id}.json`);
    const item = await response.json();
    setReplies((items) => uniqBy([...items, item], "id"));

    return () => {
      isSubscribed = false;
    };
  }, []);

  useEffect(() => {
    if (!process.browser) return;
    if (isLoading) return;
    let isSubscribed = true;

    const replies = [];
    const fetchItems = async (ids: number[]) => {
      const itemRequests = ids.map(async (id) => {
        const response = await fetch(`${baseURL}/item/${id}.json`);
        const item: ItemResponse = await response.json();
        return item;
      });

      try {
        for await (const item of itemRequests) {
          replies.push(item);
          if (!routerThreadId && item?.kids?.length) {
            await fetchItems(
              item.kids.reverse().filter((_, index) => index < 3)
            );
          }
        }
      } catch {}
    };

    fetchItems(
      routerThreadId
        ? replyIds
        : replyIds.reverse().filter((_, index) => index < 3)
    )
      .then(() => {
        setReplies((items) => uniqBy([...items, ...replies], "id"));
        setRepliesLoadingStatus(false);
      })
      .then(() => {
        if (routerThreadId) {
          fetchItems(flatten(replies.map(({ kids }) => kids)));
        }
      });

    return () => {
      isSubscribed = false;
    };
  }, [isLoading, threadId, replyIds]);

  return {
    replies,
    latestReplies,
    isRepliesLoading,
    fetchReply,
  };
};

const Container = createContainer(useThreadRepliesHook);

export const useThreadReplies = Container.useContainer;

export const ThreadRepliesProvider = Container.Provider;

export default Container;
