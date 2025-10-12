"use client";

import { useFormContext } from "react-hook-form";
import { ResetPasswordFormType } from "../type";
import { Button, Input, useResetPasswordMuation } from "@/common";
import PasswordValidationMessage from "./PasswordValidationMessage";
import { passwordValidator } from "../util";
import { useEffect } from "react";
import { usePasswordReset } from "../provider";

const PasswordResetForm = () => {
  return (
    <form className="flex flex-1 flex-col justify-between w-full">
      <div className="flex flex-col gap-3 w-full">
        <span className="text-[#666666] font-normal">
          비밀번호를 재설정해주세요.
        </span>
        <div className="flex flex-col gap-[9px] w-full">
          <PasswordInput />
          <PasswordConfirmInput />
        </div>
      </div>

      <SubmitButton />
    </form>
  );
};
const PasswordInput = () => {
  const { register, watch } = useFormContext<ResetPasswordFormType>();
  const password = watch("newPassword");

  return (
    <Input
      placeholder="새로운 비밀번호"
      type="password"
      required
      message={
        password && (() => <PasswordValidationMessage password={password} />)
      }
      {...register("newPassword", {
        required: "비밀번호를 입력해주세요.",
        validate: {
          minLength: passwordValidator.minLength,
          hasLetter: passwordValidator.hasLetter,
          hasNumber: passwordValidator.hasNumber,
        },
      })}
    />
  );
};

const PasswordConfirmInput = () => {
  const {
    register,
    watch,
    formState: { errors },
    trigger,
  } = useFormContext<ResetPasswordFormType>();
  const password = watch("newPassword");
  const passwordConfirm = watch("newPasswordConfirm");

  useEffect(() => {
    if (passwordConfirm) {
      trigger("newPasswordConfirm");
    }
  }, [password, trigger, passwordConfirm]);

  return (
    <Input
      placeholder="비밀번호 확인"
      type="password"
      required
      message={errors.newPasswordConfirm?.message}
      {...register("newPasswordConfirm", {
        required: "비밀번호 확인을 입력해주세요.",
        validate: (value) => {
          if (value !== password) {
            return "새로운 비밀번호와 동일하게 입력해주세요.";
          }
        },
      })}
    />
  );
};

const SubmitButton = () => {
  const { handleSubmit, formState, watch } =
    useFormContext<ResetPasswordFormType>();
  const { setIsPasswordReset } = usePasswordReset();
  const { mutate: resetPassword } = useResetPasswordMuation();
  const email = watch("email");
  const newPassword = watch("newPassword");

  const onSubmit = () => {
    resetPassword(
      { email, newPassword },
      {
        onSuccess: () => {
          setIsPasswordReset(true);
        },
        // TODO: 비밀번호 재설정 실패 핸들링
        onError: () => {},
      }
    );
  };

  return (
    <Button
      type="submit"
      disabled={!formState.isValid}
      onClick={handleSubmit(onSubmit)}
    >
      비밀번호 재설정
    </Button>
  );
};

export default PasswordResetForm;
