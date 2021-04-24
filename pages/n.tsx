import { NextSeo } from "next-seo";

import Layout from "layouts/default";
import StoriesView from "views/stories";

const seoConfig = {
  title: "Newest",
  desc: "Latest submitted stories from HackerNews",
};

const NewHNPage = () => {
  return (
    <>
      <NextSeo {...seoConfig} title={`/n/ - ${seoConfig.title}`} />
      <Layout {...seoConfig} story="newstories">
        <StoriesView />
      </Layout>
    </>
  );
};
export default NewHNPage;
