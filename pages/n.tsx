import Layout from "layouts/default";
import StoriesView from "views/stories";

const NewHNPage = () => {
  return (
    <Layout title="New" desc="All newest stories">
      <StoriesView story="newstories" />
    </Layout>
  );
};
export default NewHNPage;
