import { getQueryClient } from "@/common";
import {
  getMyPostListOptions,
  getPostListOptions,
} from "@/common/services/post";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import PostListClientContainer from "../client/PostListClientContainer";

const PostListServerContainer = () => {
  const queryClient = getQueryClient();
  queryClient.prefetchQuery(
    getMyPostListOptions({ page: 1, size: 10, sort: [] })
  );
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostListClientContainer />
    </HydrationBoundary>
  );
};

export default PostListServerContainer;
