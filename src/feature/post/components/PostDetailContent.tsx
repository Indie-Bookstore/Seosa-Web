import { PostDetail } from "@/common/services/post";
import Image from "next/image";

const PostDetailContent = ({ post }: { post: PostDetail }) => {
  return (
    <div className="flex flex-col px-[18px] gap-[25px] py-[35px]">
      {post.contentResDtoList.map((content) => (
        <div className="text-sm text-[#111111]" key={content.contentId}>
          {content.contentType === "sentence" ? (
            <div>{content.content}</div>
          ) : (
            <Image
              src={content.content}
              alt={content.content}
              height={174}
              width={324}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default PostDetailContent;
