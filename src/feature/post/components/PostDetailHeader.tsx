import { PostDetail } from "@/common/services/post";
import dayjs from "dayjs";

const PostDetailHeader = ({ post }: { post: PostDetail }) => {
  return (
    <div className="flex flex-col w-full bg-primary justify-center items-center gap-[10px] py-10">
      <div className="text-[#fdfdfd] font-medium text-2xl">{post.title}</div>
      <div className="font-light text-white text-[11px]">
        {dayjs(post.createdAt).format("YYYY.MM.DD")}
      </div>
    </div>
  );
};

export default PostDetailHeader;
