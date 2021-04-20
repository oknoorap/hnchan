import Layout from "layouts/default";
import HomepageView from "views/home";

const HomePage = () => {
  return (
    <Layout
      title="Top Stories"
      desc="The stories and information posted here are taken from HackerNews API. This project is intended to be not a real thing, just as fun project."
    >
      <HomepageView />
    </Layout>
  );
};

export default HomePage;
