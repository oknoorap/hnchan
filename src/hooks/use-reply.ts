import { useState, useCallback } from "react";
import { createContainer } from "unstated-next";
import { useDisclosure } from "@chakra-ui/react";

const useReplyHook = () => {
  const { onOpen: showReply, onClose: hideReply } = useDisclosure();
  const [replyVisibleId, setReplyVisibleId] = useState<string>();
  const onHoverReply = useCallback(
    (id: number, parentId: number, threadId: number) => {
      const replyElement = document.querySelector<HTMLDivElement>(
        `#p${parentId}`
      );

      if (!replyElement) {
        setReplyVisibleId(() => `${threadId}#p${parentId}>${id}`);
        showReply();
        return;
      }

      const rect = replyElement.getBoundingClientRect();
      const isInViewport =
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
          (window.innerWidth || document.documentElement.clientWidth);

      if (isInViewport) {
        replyElement.classList.add("highlight");
      }
    },
    []
  );
  const onLeaveReply = useCallback((_, parentId: number) => {
    const replyElement = document.querySelector<HTMLDivElement>(
      `#p${parentId}`
    );
    if (replyElement) {
      replyElement.classList.remove("highlight");
    }
    setReplyVisibleId(null);
    hideReply();
  }, []);

  return {
    replyVisibleId,
    onHoverReply,
    onLeaveReply,
  };
};

const Container = createContainer(useReplyHook);

export const useReply = Container.useContainer;

export const ReplyProvider = Container.Provider;

export default Container;
