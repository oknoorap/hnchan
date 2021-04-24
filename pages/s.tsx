import { NextSeo } from "next-seo";

import Layout from "layouts/default";
import StoriesView from "views/stories";

const seoConfig = {
  title: "Show HN",
  description:
    "Show HN is for something you've made that other people can play with. HN users can try it out, give you feedback, and ask questions in the thread.",
};

const ShowHNPage = () => {
  return (
    <>
      <NextSeo {...seoConfig} title={`/s/ - ${seoConfig.title}`} />
      <Layout {...seoConfig} story="showstories">
        <StoriesView />
      </Layout>
    </>
  );
};
export default ShowHNPage;
