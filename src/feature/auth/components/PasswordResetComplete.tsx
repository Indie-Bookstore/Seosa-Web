import { Button } from "@/common";
import dayjs from "dayjs";
import Link from "next/link";
import { LoginRoute } from "../route";

const PasswordResetComplete = () => {
  return (
    <div className="flex flex-col flex-1 w-full">
      <div className="flex flex-col justify-start flex-1 pt-[188px] mx-auto items-center gap-[47px] w-[145px] text-center">
        <span className="font-medium text-[#111111] text-[17px] text-nowrap">
          회원님의 비밀번호가
          <br />
          변경되었습니다.
        </span>
        <span className="font-normal text-xs text-[#487153]">
          변경일: {dayjs().format("YYYY. MM. DD")}
        </span>
      </div>
      <Button>
        <Link href={LoginRoute.toString()}>로그인</Link>
      </Button>
    </div>
  );
};

export default PasswordResetComplete;
