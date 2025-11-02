"use client";

import { getPostDetailOptions } from "@/common/services/post";
import { useSuspenseQuery } from "@tanstack/react-query";
import PostDetailHeader from "../../components/PostDetailHeader";
import PostDetailContent from "../../components/PostDetailContent";
import PostDetailProduct from "../../components/PostDetailProduct";
import PostDetailBookStore from "../../components/PostDetailBookStore";
import PostDetailEditior from "../../components/PostDetailEditior";
import PostDetailComment from "../../components/PostDetailComment";

const PostDetailClientContainer = ({ postId }: { postId: number }) => {
  const { data } = useSuspenseQuery(getPostDetailOptions({ postId }));

  return (
    <div>
      <PostDetailHeader post={data} />
      <PostDetailContent post={data} />
      <PostDetailProduct post={data} />
      <PostDetailBookStore post={data} />
      <PostDetailEditior post={data} />
      <PostDetailComment post={data} />
    </div>
  );
};

export default PostDetailClientContainer;
