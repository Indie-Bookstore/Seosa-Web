"use client";

import { useFormContext } from "react-hook-form";
import type { NewPostForm } from "../types";

const NewPostFormTitle = () => {
  const { register } = useFormContext<NewPostForm>();
  return (
    <div className="pt-10 pb-[30px] border-b border-[#e1e1e1] flex flex-col gap-3">
      <input
        type="text"
        placeholder="아티클 제목 입력"
        {...register("title")}
        className="placeholder:text-[#888888] placeholder:font-medium text-2xl"
      />
      <input
        type="text"
        placeholder="위치 입력"
        {...register("location")}
        className="placeholder:text-[#888888] placeholder:font-normal text-base"
      />
    </div>
  );
};

export default NewPostFormTitle;
