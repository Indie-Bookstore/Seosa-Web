import React from "react";
import PostDetailServerContainer from "./container/server/PostDetailServerContainer";

const PostDetailPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <PostDetailServerContainer postId={Number(id)} />;
};

export default PostDetailPage;
