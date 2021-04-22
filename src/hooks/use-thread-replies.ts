import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { createContainer } from "unstated-next";
import { useRouter } from "next/router";
import dateFormat from "date-fns/format";
import dateFromUnix from "date-fns/fromUnixTime";
import uniqBy from "lodash/uniqBy";
import * as Comlink from "comlink";

import { useThread, ItemResponse, ItemResult } from "hooks/use-thread";
import { ThreadRepliesWorker } from "workers/thread-replies.worker";

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

  const workerRef = useRef<Worker>();
  const comlinkRef = useRef<Comlink.Remote<ThreadRepliesWorker>>();

  const fetchReply = useCallback(
    async (id: number) => {
      if (!comlinkRef.current) return;
      if ($replies.find((item) => item.id)) return;

      let subscribed = true;
      const reply = await comlinkRef.current.fetchReplies({
        ids: [id],
      });

      setReplies((items) => uniqBy([...items, ...reply], "id"));

      return () => {
        subscribed = false;
      };
    },
    [$replies]
  );

  useEffect(() => {
    if (!process.browser) return;
    if (isLoading) return;

    const isLatestItems = !routerThreadId;
    workerRef.current = new Worker("/thread.worker.js");
    comlinkRef.current = Comlink.wrap(workerRef.current);

    (async () => {
      const ids = replyIds.reverse().filter((_, index) => index < 3);
      const replies = await comlinkRef.current.fetchReplies({
        ids,
        isLatestItems,
      });

      if (!isLatestItems) {
        comlinkRef.current.refetchReplies(replies);
        comlinkRef.current.harvestReplies(
          Comlink.proxy(async (replies) => {
            setReplies((items) => uniqBy([...items, ...replies], "id"));
          })
        );
      }

      setReplies(uniqBy(replies, "id"));
      setRepliesLoadingStatus(false);
    })();

    return () => {
      workerRef.current?.terminate();
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
