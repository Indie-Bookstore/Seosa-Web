"use client";

import { useRouter } from "@/common";
import ArrowBack from "../../../public/icon/arrow-back.svg";
import Kakao from "../../../public/icon/kakao.svg";
import { LoginForm } from "./components";

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-full gap-4">
      <div className="flex h-14 w-full items-center">
        <ArrowBack
          alt="go back"
          role="button"
          className="cursor-pointer size-6"
          onClick={() => router.back()}
        />
      </div>

      <div className="h-[78px] flex items-center">
        <h1 className="text-[24px] font-unbatang">로그인/회원가입</h1>
      </div>

      <div className="flex flex-col flex-1 w-full gap-[30px]">
        <button className="w-full h-11 flex justify-center items-center bg-[#FEE500] rounded-[22px] px-[23.5px] py-[11.5px]">
          <Kakao alt="kakao" className="size-[18px]" />
          <div className="flex-1 font-semibold font-apple text-sm translate-y-px">
            카카오로 3초만에 시작하기
          </div>
        </button>

        <LoginForm />
      </div>
    </div>
  );
}
