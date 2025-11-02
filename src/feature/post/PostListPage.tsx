import PostListPageHeader from "./components/PostListPageHeader";
import MainPostListServerContainer from "./container/server/MainPostListServerContainer";

const PostListPage = () => {
  return (
    <div className="size-full flex flex-col gap-[30px] overflow-y-auto">
      <PostListPageHeader />
      <MainPostListServerContainer />
    </div>
  );
};

export default PostListPage;
