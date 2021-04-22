import Layout from "layouts/default";
import StoriesView from "views/stories";

const JobHNPage = () => {
  return (
    <Layout title="Jobs HN" desc="Jobs posted in HackerNews">
      <StoriesView story="jobstories" />
    </Layout>
  );
};
export default JobHNPage;
