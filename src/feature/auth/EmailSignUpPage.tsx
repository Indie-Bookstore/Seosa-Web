"use client";

import { useRouter } from "@/common";
import ArrowBack from "../../../public/icon/arrow-back.svg";
import { EmailSignUpForm } from "./components";

export default function EmailSignUpPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4 pb-[36px] min-h-full">
      <div className="flex h-14 w-full items-center">
        <ArrowBack
          alt="go back"
          role="button"
          className="cursor-pointer size-6"
          onClick={() => router.back()}
        />
      </div>

      <div className="h-[78px] flex items-center">
        <h1 className="text-[24px] font-unbatang -tracking-[0.08rem]">
          이메일로 회원가입하기
        </h1>
      </div>

      <EmailSignUpForm />
    </div>
  );
}
