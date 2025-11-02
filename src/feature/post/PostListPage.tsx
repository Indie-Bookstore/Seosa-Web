import PostListPageHeader from "./components/PostListPageHeader";
import PostListServerContainer from "./container/server/PostListServerContainer";

const PostListPage = () => {
  return (
    <div className="size-full flex flex-col gap-[30px]">
      <PostListPageHeader />
      <PostListServerContainer />
    </div>
  );
};

export default PostListPage;
