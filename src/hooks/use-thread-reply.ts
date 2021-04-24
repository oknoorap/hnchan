import { useEffect, useRef } from "react";
import { createContainer } from "unstated-next";

import { ItemResult } from "hooks/use-thread";

type ThreadReplyOptions = ItemResult & {
  isPopover?: boolean;
};

const useThreadReplyHook = (reply: ThreadReplyOptions) => {
  return {
    ...reply,
  };
};

const Container = createContainer(useThreadReplyHook);

export const useThreadReply = Container.useContainer;

export const ThreadReplyProvider = Container.Provider;

export default Container;
