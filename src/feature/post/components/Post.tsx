import type { Post } from "@/common/services/post";
import dayjs from "dayjs";
import React from "react";

const Post = ({ post }: { post: Post }) => {
  return (
    <div
      className="size-[324px] rounded-[10px] flex flex-col justify-end px-4 py-[25px]"
      style={{ backgroundImage: `url(${post.thumbnailUrl})` }}
    >
      <div className="flex flex-col w-full gap-1.5">
        <div className="flex items-center gap-1.5">
          <span className="text-[14px] font-medium text-white">
            {post.userName}
          </span>
          <span className="text-[14px] text-white">
            {dayjs(post.createdAt).format("YYYY.MM.DD")}
          </span>
        </div>

        <div className="font-medium text-[20px] text-white">{post.title}</div>
      </div>
    </div>
  );
};

export default Post;
