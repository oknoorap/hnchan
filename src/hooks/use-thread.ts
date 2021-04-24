import { useMemo } from "react";
import { createContainer } from "unstated-next";
import { useDisclosure } from "@chakra-ui/react";
import dateFormat from "date-fns/format";
import dateFromUnix from "date-fns/fromUnixTime";

import useRequest from "hooks/use-request";

export type ItemResponse = {
  id: number;
  by: string;
  parent: number;
  kids: number[];
  score: number;
  time: number;
  descendants: number;
  title: string;
  text?: string;
  dead?: boolean;
  deleted?: boolean;
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
  vote: number;
  timestamp: number;
  replies: number[];
  parentId: number;
};

const useThreadHook = (id: number) => {
  const { data, error, isError, isLoading } = useRequest<ItemResponse>(
    "item",
    id
  );
  const url = useMemo(() => data?.url ?? "", [data]);
  const title = useMemo(() => data?.title ?? "", [data]);
  const text = useMemo(() => data?.text ?? "", [data]);
  const author = useMemo(() => data?.by ?? "", [data]);
  const replies = useMemo(() => data?.kids ?? [], [data]);
  const totalReplies = useMemo(() => data?.descendants ?? 0, [data]);
  const vote = useMemo(() => data?.score ?? 0, [data]);
  const date = useMemo(() => {
    const date = dateFromUnix(data?.time ?? Date.now());
    const formattedDate = dateFormat(date, "MM/dd/yy(EEE)hh:mm:ss");
    return formattedDate;
  }, [data]);
  const { isOpen: isHidden, onToggle: onToggleCollapse } = useDisclosure();

  return {
    id,
    title,
    url,
    author,
    date,
    replies,
    totalReplies,
    text,
    vote,
    error,
    isError,
    isLoading,
    isHidden,
    onToggleCollapse,
  };
};

const Container = createContainer(useThreadHook);

export const useThread = Container.useContainer;

export const ThreadProvider = Container.Provider;

export default Container;
