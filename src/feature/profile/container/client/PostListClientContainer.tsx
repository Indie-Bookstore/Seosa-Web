"use client";

import {
  getMyPostListOptions,
  getPostListOptions,
} from "@/common/services/post";
import { useSuspenseQuery } from "@tanstack/react-query";
import Link from "next/link";
import Tab from "../../components/Tab";

const PostListClientContainer = () => {
  return (
    <Tab />
    // <div className="flex flex-col px-[18px] gap-[25px] [&>*:last-child]:mb-10">
    //   {/* {data.posts.map((post) => (
    //     <Link href={`/post/${post.postId}`} key={post.postId}>
    //       <PostListItem key={post.postId} post={post} />
    //     </Link>
    //   ))} */}
    // </div>
  );
};

export default PostListClientContainer;
