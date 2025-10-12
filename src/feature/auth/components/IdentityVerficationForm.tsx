"use client";

import { useFormContext } from "react-hook-form";
import { usePasswordReset } from "../provider";
import {
  Button,
  Input,
  useCheckVerificationCodeMuation,
  useSendVerificationCodeMuation,
} from "@/common";
import { ResetPasswordFormType } from "../type";

const IdentityVerficationForm = () => {
  return (
    <form>
      <div className="flex flex-col gap-3 w-full">
        <span className="text-[#666666] font-normal">본인인증</span>
        <div className="flex flex-col gap-2 w-full">
          <EmailInput />
          <VerificationCodeInput />
        </div>
      </div>
    </form>
  );
};

const EmailInput = () => {
  const {
    watch,
    register,
    setError,
    formState: { errors },
  } = useFormContext<ResetPasswordFormType>();
  const { isVerificationCodeSended, setIsVerificationCodeSended } =
    usePasswordReset();
  const { mutate: sendVerificationCode, isPending } =
    useSendVerificationCodeMuation();
  const email = watch("email");
  const isEmailExist = email.length > 0;

  const onSendVerificationCode = async () => {
    if (!isEmailExist) return;

    sendVerificationCode(email, {
      onSuccess: () => {
        setIsVerificationCodeSended(true);
      },
      onError: () => {
        setError("email", {
          message: "가입된 정보가 없습니다. 다시 입력해주세요.",
        });
        setIsVerificationCodeSended(false);
      },
    });
  };

  return (
    <div className="flex gap-2 ">
      <Input
        placeholder="아이디(이메일) 입력"
        inputWrapperClassName="flex-1"
        required
        readOnly={isVerificationCodeSended}
        message={
          isVerificationCodeSended
            ? "인증번호가 전송되었습니다."
            : errors.email?.message
        }
        messageClassName={
          isVerificationCodeSended ? "text-primary" : "text-interacton-red"
        }
        {...register("email", {
          required: "이메일을 입력해주세요.",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "이메일 형식을 확인해주세요.",
          },
        })}
      />
      <div className="w-[86px]">
        <Button
          size="sm"
          fluid
          onClick={onSendVerificationCode}
          disabled={!isEmailExist || !!errors.email || isPending}
          aria-pressed={isVerificationCodeSended}
        >
          인증번호 전송
        </Button>
      </div>
    </div>
  );
};

const VerificationCodeInput = () => {
  const {
    watch,
    register,
    setError,
    formState: { errors },
  } = useFormContext<ResetPasswordFormType>();
  const { setIsVerificationCodeVerified } = usePasswordReset();

  const { mutate: checkVerificationCode, isPending } =
    useCheckVerificationCodeMuation();
  const email = watch("email");
  const verificationCode = watch("verificationCode");
  const isVerificationCodeExist = verificationCode.length > 0;

  const onSendVerificationCode = async () => {
    if (!isVerificationCodeExist) return;

    checkVerificationCode(
      { email, verificationCode },
      {
        onSuccess: () => {
          setIsVerificationCodeVerified(true);
        },
        onError: () => {
          setError("verificationCode", {
            message: "인증번호가 일치하지 않습니다. 다시 입력해주세요.",
          });
          setIsVerificationCodeVerified(false);
        },
      }
    );
  };

  return (
    <div className="flex gap-2 ">
      <Input
        placeholder="인증번호 입력"
        inputWrapperClassName="flex-1"
        required
        message={errors.verificationCode?.message}
        {...register("verificationCode")}
      />

      <div className="w-[86px]">
        <Button
          size="sm"
          fluid
          onClick={onSendVerificationCode}
          disabled={
            !isVerificationCodeExist || !!errors.verificationCode || isPending
          }
        >
          본인인증
        </Button>
      </div>
    </div>
  );
};

export default IdentityVerficationForm;
