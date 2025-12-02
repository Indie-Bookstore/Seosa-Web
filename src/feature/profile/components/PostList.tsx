import { getMyPostListOptions } from "@/common/services/post";
import { useSuspenseQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";

const PostList = ({ value }: { value: "bookmark" | "comment" | "edit" }) => {
  const { data } = useSuspenseQuery(
    getMyPostListOptions({ page: 1, size: 10, sort: [] })
  );

  return (
    <>
      <div className="flex justify-between items-center px-[18px] h-12">
        <span className="text-[#666666] font-medium">방문 후기</span>
        <div className="px-3 py-2 rounded-[17px] bg-[#ffeeaa] flex flex-col items-center justify-center">
          <span className="text-primary font-medium text-xs">편집</span>
        </div>
      </div>
      <div className="grid grid-cols-3 px-[18px] pt-3 gap-3">
        {data.posts.map((post) => (
          <div key={post.postId} className="relative">
            <Image
              src={post.thumbnailUrl}
              alt={post.title}
              width={100}
              height={100}
              className="h-[100px] w-[100px] object-cover rounded-sm"
            />

            <div className="absolute bottom-2 left-2 right-2">
              <span className="text-white font-medium text-[10px]">
                {post.title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PostList;
