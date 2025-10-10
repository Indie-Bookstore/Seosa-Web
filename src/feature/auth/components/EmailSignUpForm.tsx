"use client";

import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { EmailSignUpFormType } from "../type";
import { Button, Input } from "@/common/ui";
import { checkNickname } from "@/common/services";

const EmailSignUpForm = () => {
  const methods = useForm<EmailSignUpFormType>({
    mode: "onChange",
    defaultValues: {
      nickname: "",
      email: "",
      password: "",
      passwordConfirm: "",
      certificationCode: "",
    },
  });
  return (
    <FormProvider {...methods}>
      <div className="size-full flex flex-col justify-between">
        <div className="w-full">
          <div className="flex flex-col w-full">
            <div className="flex flex-col gap-[10px] w-full">
              <NicknameInput />
              <EmailInput />
            </div>
          </div>

          <div className="pt-[35px] flex flex-col gap-2">
            <PasswordInput />
          </div>

          <div className="pt-[40px]">
            <Input label="인증번호 (선택)" type="password" />
          </div>
        </div>

        <div className="pt-[112px]">
          <Button fluid>회원가입 완료</Button>
        </div>
      </div>
    </FormProvider>
  );
};

const NicknameInput = () => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<EmailSignUpFormType>();

  const onCheckNickname = async () => {
    const nickname = watch("nickname");
    const response = await checkNickname(nickname);
    console.log(response);
  };

  return (
    <div className="flex gap-2 ">
      <Input
        label="닉네임"
        placeholder="닉네임을 입력해주세요."
        required
        errorMessage={errors.nickname?.message}
        {...register("nickname", {
          required: "닉네임을 입력해주세요.",
          maxLength: {
            value: 10,
            message: "10자 이내로 입력해주세요.",
          },
          pattern: {
            value: /^[가-힣0-9]+$/,
            message: "한글과 숫자만 입력해주세요.",
          },
        })}
      />
      <div className="w-[86px] pt-[22px]">
        <Button size="sm" fluid onClick={onCheckNickname}>
          중복확인
        </Button>
      </div>
    </div>
  );
};

const EmailInput = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<EmailSignUpFormType>();

  return (
    <div className="flex gap-2 ">
      <Input
        label="아이디(이메일)"
        placeholder="이메일을 입력해주세요."
        required
        errorMessage={errors.email?.message}
        {...register("email", {
          required: "이메일을 입력해주세요.",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "이메일 형식을 확인해주세요.",
          },
        })}
      />
      <div className="w-[86px] pt-[22px]">
        <Button size="sm" fluid>
          중복확인
        </Button>
      </div>
    </div>
  );
};

const PasswordInput = () => {
  return (
    <>
      <Input label="비밀번호" type="password" required />
      <Input type="password" />
    </>
  );
};

export default EmailSignUpForm;
