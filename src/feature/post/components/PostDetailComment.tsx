import {
  Comment,
  getCommentListOptions,
  PostDetail,
} from "@/common/services/post";
import CommentIcon from "../../../../public/icon/comment.svg";
import BookmarkIcon from "../../../../public/icon/bookmark.svg";
import FeatherIcon from "../../../../public/icon/feather.svg";
import { useSuspenseQuery } from "@tanstack/react-query";
import UserProfileIcon from "../../../../public/icon/user-profile.svg?react";
import dayjs from "dayjs";
import { Input } from "@/common";

const PostDetailComment = ({ post }: { post: PostDetail }) => {
  const { data: commentList } = useSuspenseQuery(
    getCommentListOptions({ postId: post.postId })
  );

  return (
    <div className="flex flex-col w-full px-[18px] py-[15px] gap-5">
      <CommentOperation commentList={commentList as unknown as Comment[]} />
      <div className="text-sm font-normal">
        <span className="text-[#666666]">방문후기</span>
        <span className="text-sub">{commentList.length}</span>
      </div>
      <CommentInput />
      {commentList.map((comment) => (
        <CommentItem key={comment.commentId} comment={comment} />
      ))}
    </div>
  );
};

const CommentOperation = ({ commentList }: { commentList: Comment[] }) => {
  return (
    <div className="flex justify-between w-full items-center">
      <div className="flex items-center gap-[2px]">
        <CommentIcon className="size-6" />
        <div className="text-xs font-normal text-primary">
          {commentList.length}
        </div>
      </div>

      <div className="flex gap-[10px] items-center">
        <BookmarkIcon className="size-6" role="button" />
        <FeatherIcon className="size-5" role="button" />
      </div>
    </div>
  );
};

const CommentInput = () => {
  return (
    <div className="flex gap-2 items-center">
      <UserProfileIcon className="size-[30px]" />
      <Input
        inputWrapperClassName="w-full h-[35px]"
        inputClassName="h-[35px]"
      />
    </div>
  );
};

const CommentItem = ({ comment }: { comment: Comment }) => {
  return (
    <div className="flex gap-2 py-3 border-t border-[#E1E1E1]">
      <UserProfileIcon className="size-[30px]" />
      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          <div className="font-medium text-xs text-[#111111]">
            {comment.name}
          </div>
          <div className="text-[10px] text-[#a3a3a3] font-normal">
            {dayjs(comment.createdAt).format("YYYY-MM-DD. HH:mm")}
          </div>
        </div>

        <div className="text-xs font-light text-[#111111]">{comment.text}</div>
      </div>
    </div>
  );
};

export default PostDetailComment;
