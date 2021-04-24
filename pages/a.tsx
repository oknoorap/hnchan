import { NextSeo } from "next-seo";

import Layout from "layouts/default";
import StoriesView from "views/stories";

const seoConfig = {
  title: "Ask HN",
  description: "Lists questions and other text submissions",
};

const AskHNPage = () => {
  return (
    <>
      <NextSeo {...seoConfig} title={`/a/ - ${seoConfig.title}`} />
      <Layout {...seoConfig} story="askstories">
        <StoriesView />
      </Layout>
    </>
  );
};
export default AskHNPage;
