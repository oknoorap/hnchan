import { useRouter } from "next/router";
import { NextSeo } from "next-seo";

import Layout from "layouts/default";
import ThreadSinglePageView from "views/single";

const ThreadSinglePage = () => {
  const {
    query: { threadId },
  } = useRouter();
  const seoConfig = {
    title: `View Thread`,
    description: `All replies to thread ${threadId}`,
  };

  return (
    <>
      <NextSeo {...seoConfig} title={`/thread/${threadId}`} />
      <Layout {...seoConfig}>
        <ThreadSinglePageView />
      </Layout>
    </>
  );
};

export default ThreadSinglePage;
