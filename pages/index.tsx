import { NextSeo } from "next-seo";

import Layout from "layouts/default";
import StoriesView from "views/stories";

const seoConfig = {
  title: "Top Stories",
  description:
    "The stories and information posted here are taken from HackerNews API. This project is intended to be not a real thing, just as fun project.",
};

const HomePage = () => {
  return (
    <>
      <NextSeo {...seoConfig} title="HackerNews Chan" titleTemplate="%s" />
      <Layout {...seoConfig} story="topstories">
        <StoriesView />
      </Layout>
    </>
  );
};

export default HomePage;
