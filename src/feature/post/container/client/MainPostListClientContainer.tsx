"use client";

import { getMainPostListOptions } from "@/common/services/post";
import { useSuspenseQuery } from "@tanstack/react-query";
import Post from "../../components/Post";

const MainPostListClientContainer = () => {
  const { data } = useSuspenseQuery(
    getMainPostListOptions({ page: 1, size: 10, sort: [] })
  );

  return (
    <div className="flex flex-col px-[18px] gap-[25px]">
      {data.posts.map((post) => (
        <Post key={post.postId} post={post} />
      ))}
    </div>
  );
};

export default MainPostListClientContainer;
