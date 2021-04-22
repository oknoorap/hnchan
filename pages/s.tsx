import Layout from "layouts/default";
import StoriesView from "views/stories";

const ShowHNPage = () => {
  return (
    <Layout
      title="Show HN"
      desc="Show HN is for something you've made that other people can play with. HN users can try it out, give you feedback, and ask questions in the thread."
    >
      <StoriesView story="showstories" />
    </Layout>
  );
};
export default ShowHNPage;
