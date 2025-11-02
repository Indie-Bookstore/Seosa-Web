import Image from "next/image";
import React from "react";

const PostListPageHeader = () => {
  return (
    <div className="w-full flex flex-col gap-[11px]">
      <div className="flex justify-start py-[22px] px-[18px]">
        <Image src="/icon/logo.svg" alt="logo" width={36} height={36} />
      </div>

      <div className="flex flex-col w-full gap-[14px]">
        <div className="flex items-center pl-[18px] gap-[15px]">
          <h1 className="text-4xl font-unbatang text-primary">글모음</h1>
          <div className="h-[1.5px] flex-1 bg-primary" />
        </div>

        <div className="flex items-center pr-[18px] gap-[15px]">
          <div className="h-[1.5px] flex-1 bg-primary" />
          <h1 className="text-xs font-unbatang text-primary">
            독립 출만풂을 사랑하는 사람들의 이야기
          </h1>
        </div>
      </div>
    </div>
  );
};

export default PostListPageHeader;
