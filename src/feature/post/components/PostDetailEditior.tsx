import { PostDetail } from "@/common/services/post";
import UserProfileIcon from "../../../../public/icon/user-profile.svg";

const PostDetailEditior = ({ post }: { post: PostDetail }) => {
  return (
    <div className="w-full h-[142px] bg-[#E1E1E1] flex flex-col justify-center items-center gap-2">
      <UserProfileIcon className="size-[53px]" />

      <div className="flex flex-col justify-center items-center">
        <div className="text-primary font-normal text-[11px]">에디터</div>
        <div className="text-[13px] font-medium text-[#111111]">
          {post.nickname}
        </div>
      </div>
    </div>
  );
};

export default PostDetailEditior;
