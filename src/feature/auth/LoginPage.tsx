"use client";

import Link from "next/link";
import ArrowBack from "../../../public/icon/arrow-back.svg";
import Kakao from "../../../public/icon/kakao.svg";
import { Button, Input } from "@/common";
import { EmailSignUpRoute } from "./route";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-full gap-4">
      <div className="flex h-14 w-full items-center">
        <ArrowBack
          alt="go back"
          role="button"
          className="cursor-pointer size-6"
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

        <div className="flex flex-col w-full flex-1">
          <div className="flex flex-col justify-between flex-1">
            <div>
              <div className="flex flex-col gap-[10px] w-full h-[204px]">
                <Input
                  label="아이디(이메일)"
                  placeholder="이메일을 입력해주세요."
                />
                <Input label="비밀번호" type="password" />
              </div>

              <div className="flex flex-col gap-[10px] w-full">
                <Button>로그인</Button>

                <Button variant="secondary">
                  <Link href={EmailSignUpRoute.toString()}>
                    이메일로 회원가입하기
                  </Link>
                </Button>
              </div>

              <div
                className="flex justify-center pt-5 text-[10px] text-[#666666]"
                role="button"
              >
                계정 찾기 / 비밀번호 재설정
              </div>
            </div>

            <div className="flex justify-center text-[10px] pb-14 text-[#666666] font-medium">
              책방지기분들은 카카오톡 채널로 연락주세요!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
