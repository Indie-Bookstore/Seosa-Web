"use client";

import { getPostListOptions } from "@/common/services/post";
import { useSuspenseQuery } from "@tanstack/react-query";
import PostListItem from "../../components/PostListItem";
import Link from "next/link";

const PostListClientContainer = () => {
  const { data } = useSuspenseQuery(
    getPostListOptions({ page: 1, size: 10, sort: [] })
  );

  return (
    <div className="flex flex-col px-[18px] gap-[25px] [&>*:last-child]:mb-10">
      {data.posts.map((post) => (
        <Link href={`/post/${post.postId}`} key={post.postId}>
          <PostListItem key={post.postId} post={post} />
        </Link>
      ))}
    </div>
  );
};

export default PostListClientContainer;
