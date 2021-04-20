import Layout from "layouts/default";
import HomepageView from "views/home";

const ShowHNPage = () => {
  return (
    <Layout
      title="Show"
      desc="Show HN is for something you've made that other people can play with. HN users can try it out, give you feedback, and ask questions in the thread."
    >
      <HomepageView />
    </Layout>
  );
};
export default ShowHNPage;
