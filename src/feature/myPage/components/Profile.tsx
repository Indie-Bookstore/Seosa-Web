import React from "react";
import UserProfileIcon from "../../../../public/icon/user-profile.svg";
import Edit from "../../../../public/icon/edit.svg";

const Profile = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 pt-[27px] bg-primary">
      <div className="relative">
        <UserProfileIcon className="size-[133px]" />
        <div className="absolute bottom-0 right-0 size-[30px] flex justify-center items-center bg-sub rounded-full">
          <Edit className="size-[14px]" role="button" />
        </div>
      </div>

      <div className="flex justify-center items-center gap-1">
        {/* TODO: 사용자 정보 조회 */}
        <span className="text-white text-[16px] font-medium">서사테스트01</span>
        <span className="text-sm font-extralight text-white">에디터</span>
      </div>
    </div>
  );
};

export default Profile;
