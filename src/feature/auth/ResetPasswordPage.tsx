"use client";

import { useRouter } from "@/common";
import ArrowBack from "../../../public/icon/arrow-back.svg";
import ResetPasswordContent from "./components/PasswordResetContent";

export default function ResetPasswordPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-full gap-4 pb-[36px]">
      <div className="flex h-14 w-full items-center">
        <ArrowBack
          alt="go back"
          role="button"
          className="cursor-pointer size-6"
          onClick={() => router.back()}
        />
      </div>

      <div className="h-[78px] flex items-center">
        <h1 className="text-[24px] font-unbatang">비밀번호 재설정</h1>
      </div>

      <ResetPasswordContent />
    </div>
  );
}
