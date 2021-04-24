import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const ThreadProvider = dynamic(
  () => import("hooks/use-thread").then((mod) => mod.ThreadProvider),
  {
    ssr: false,
  }
);
const Thread = dynamic(() => import("views/thread"), {
  ssr: false,
});

const ThreadSingleView = () => {
  const {
    query: { threadId },
  } = useRouter();
  return (
    <ThreadProvider initialState={parseInt(threadId as string)}>
      <Thread />
    </ThreadProvider>
  );
};

export default ThreadSingleView;
