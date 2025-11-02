import { getQueryClient } from "@/common";
import {
  getCommentListOptions,
  getPostDetailOptions,
} from "@/common/services/post";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import PostDetailClientContainer from "../client/PostDetailClientContainer";

const PostDetailServerContainer = ({ postId }: { postId: number }) => {
  const queryClient = getQueryClient();
  queryClient.prefetchQuery(getPostDetailOptions({ postId }));
  queryClient.prefetchQuery(getCommentListOptions({ postId }));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostDetailClientContainer postId={postId} />
    </HydrationBoundary>
  );
};

export default PostDetailServerContainer;
