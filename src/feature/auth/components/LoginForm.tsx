"use client";

import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { LoginFormType } from "../type";
import { Button, Input } from "@/common/ui";
import { LoginProvider, useLogin } from "../provider";
import { useRouter } from "@/common";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { EmailSignUpRoute, ResetPasswordRoute } from "../route";
import SDialog from "@/common/ui/SDialog";

const LoginForm = () => {
  const methods = useForm<LoginFormType>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <LoginProvider>
      <FormProvider {...methods}>
        <form className="flex flex-col w-full flex-1">
          <div className="flex flex-col justify-between flex-1">
            <div>
              <div className="flex flex-col gap-[10px] w-full h-[204px]">
                <EmailInput />
                <PasswordInput />
              </div>

              <div className="flex flex-col gap-[10px] w-full">
                <SubmitButton />
                <SignUpButton />
              </div>

              <div
                className="flex justify-center pt-5 text-[10px] text-[#666666]"
                role="button"
              >
                <Link href={ResetPasswordRoute.toString()}>
                  계정 찾기 / 비밀번호 재설정
                </Link>
              </div>
            </div>

            <div className="flex justify-center text-[10px] pb-14 text-[#666666] font-medium">
              책방지기분들은 카카오톡 채널로 연락주세요!
            </div>
          </div>
        </form>
        <ErrorDialog />
      </FormProvider>
    </LoginProvider>
  );
};

const EmailInput = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<LoginFormType>();

  return (
    <Input
      label="아이디(이메일)"
      placeholder="이메일을 입력해주세요."
      {...register("email", {
        required: "이메일을 입력해주세요.",
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "이메일 형식을 확인해주세요.",
        },
      })}
      message={errors.email?.message}
      messageClassName="text-interacton-red"
      required
    />
  );
};

const PasswordInput = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<LoginFormType>();

  return (
    <Input
      label="비밀번호"
      type="password"
      {...register("password", {
        required: "비밀번호를 입력해주세요.",
      })}
      message={errors.password?.message}
      messageClassName="text-interacton-red"
      required
    />
  );
};

const SubmitButton = () => {
  const {
    handleSubmit,
    formState: { isValid },
  } = useFormContext<LoginFormType>();
  const { isLoading, setIsLoading, setIsErrorDialogOpen } = useLogin();
  const router = useRouter();

  const onSubmit = async (data: LoginFormType) => {
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        console.log("result", result);
        setIsErrorDialogOpen(true);
      } else {
        // TODO: 홈 페이지 경로 변경 필요
        router.push("/");
      }
    } catch {
      setIsErrorDialogOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      type="submit"
      disabled={isLoading || !isValid}
      onClick={handleSubmit(onSubmit)}
    >
      {isLoading ? "로그인 중..." : "로그인"}
    </Button>
  );
};

const SignUpButton = () => {
  return (
    <Button variant="secondary" type="button">
      <Link href={EmailSignUpRoute.toString()}>이메일로 회원가입하기</Link>
    </Button>
  );
};

const ErrorDialog = () => {
  const { isErrorDialogOpen, setIsErrorDialogOpen } = useLogin();

  return (
    <SDialog
      open={isErrorDialogOpen}
      onOpenChange={setIsErrorDialogOpen}
      content={
        <>
          등록되지 않은 아이디거나, 아이디 또는 비밀번호를 잘못 입력했습니다.
          <br />
          다시 확인해주세요.
        </>
      }
      onConfirm={() => setIsErrorDialogOpen(false)}
      onCancel={() => setIsErrorDialogOpen(false)}
    />
  );
};

export default LoginForm;
