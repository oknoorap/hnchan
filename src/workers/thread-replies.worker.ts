import * as Comlink from "comlink";
import flatten from "lodash/flatten";
import uniq from "lodash/uniq";

import { baseURL } from "hooks/use-request";
import { ItemResponse } from "hooks/use-thread";

type FetchItemOptions = {
  ids: number[];
  isLatestItems?: boolean;
};

export type ThreadRepliesWorker = {
  fetchReplies: (options: FetchItemOptions) => Promise<ItemResponse[]>;
  harvestReplies: (cb: (replies: ItemResponse[]) => Promise<void>) => void;
  refetchReplies: (initialThread: ItemResponse[]) => void;
};

const fetchReplies = async ({ ids, isLatestItems }: FetchItemOptions) => {
  const replies: ItemResponse[] = [];

  const itemRequests = ids.map(async (id) => {
    const response = await fetch(`${baseURL}/item/${id}.json`);
    const item: ItemResponse = await response.json();
    return item;
  });

  for await (const item of itemRequests) {
    replies.push(item);

    if (isLatestItems && item?.kids?.length) {
      const kids = await fetchReplies({
        ids: item.kids.reverse().filter((_, index) => index < 3),
        isLatestItems,
      });

      for (const reply of kids) {
        replies.push(reply);
      }
    }
  }

  return replies;
};

let replies: ItemResponse[] = [];
let interval;
let intervalCount = 0;

const refetchReplies = async (requestedReplies: ItemResponse[]) => {
  const ids = uniq(
    flatten(requestedReplies.map((item) => item?.kids).filter((item) => item))
  );

  if (ids.length) {
    replies = await fetchReplies({
      ids,
    });
  }
};

const harvestReplies = (cb) => {
  interval = setInterval(async () => {
    if (intervalCount > 300 && !replies.length) {
      clearInterval(interval);
    }

    if (replies.length) {
      const repliesCopy = [...replies];
      replies = [];

      await cb(repliesCopy);
      refetchReplies(repliesCopy);
    }
    intervalCount++;
  }, 200);
};

const workerApi: ThreadRepliesWorker = {
  fetchReplies,
  harvestReplies,
  refetchReplies,
};

Comlink.expose(workerApi);
