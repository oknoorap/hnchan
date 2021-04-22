import Layout from "layouts/default";
import StoriesView from "views/stories";

const HomePage = () => {
  return (
    <Layout
      title="Top Stories"
      desc="The stories and information posted here are taken from HackerNews API. This project is intended to be not a real thing, just as fun project."
    >
      <StoriesView story="topstories" />
    </Layout>
  );
};

export default HomePage;
