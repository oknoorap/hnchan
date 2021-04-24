import { NextSeo } from "next-seo";

import Layout from "layouts/default";
import StoriesView from "views/stories";

const seoConfig = {
  title: "Jobs HN",
  description: "Jobs posted in HackerNews",
};

const JobHNPage = () => {
  return (
    <>
      <NextSeo {...seoConfig} title={`/j/ - ${seoConfig.title}`} />
      <Layout {...seoConfig} story="jobstories">
        <StoriesView />
      </Layout>
    </>
  );
};
export default JobHNPage;
