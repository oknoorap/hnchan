import Layout from "layouts/default";
import StoriesView from "views/stories";

const AskHNPage = () => {
  return (
    <Layout title="Ask HN" desc="Lists questions and other text submissions">
      <StoriesView story="askstories" />
    </Layout>
  );
};
export default AskHNPage;
