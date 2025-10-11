"use client";

import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { EmailSignUpFormType } from "../type";
import { Button, Input } from "@/common/ui";
import {
  useCheckEmailMuation,
  useCheckNicknameMuation,
  useSignUpMuation,
} from "@/common";
import { EmailSignUpProvider, useEmailSignUp } from "../provider";
import { useEffect, useState } from "react";
import Checked from "../../../../public/icon/checked.svg";
import Prohibition from "../../../../public/icon/prohibition.svg";
import { useRouter } from "@/common";

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
    <EmailSignUpProvider>
      <FormProvider {...methods}>
        <div className="size-full flex-1 flex flex-col justify-between">
          <div className="w-full">
            <div className="flex flex-col w-full">
              <div className="flex flex-col gap-[10px] w-full">
                <NicknameInput />
                <EmailInput />
              </div>
            </div>

            <div className="pt-[35px] flex flex-col gap-2">
              <PasswordInput />
              <PasswordConfirmInput />
            </div>

            <div className="pt-[40px]">
              <Input label="인증번호 (선택)" type="password" />
            </div>
          </div>

          <SubmitButton />
        </div>
      </FormProvider>
    </EmailSignUpProvider>
  );
};

const NicknameInput = () => {
  const {
    register,
    setError,
    formState: { errors },
    watch,
  } = useFormContext<EmailSignUpFormType>();
  const { isNicknameChecked, setIsNicknameChecked } = useEmailSignUp();
  const [isNicknameCheckedMessageShowing, setIsNicknameCheckedMessageShowing] =
    useState(false);
  const { mutate: checkNickname, isPending } = useCheckNicknameMuation();

  const nickname = watch("nickname");
  const isNicknameExist = nickname.length > 0;

  const onCheckNickname = async () => {
    if (!isNicknameExist || isNicknameChecked) return;

    checkNickname(nickname, {
      onSuccess: () => {
        setIsNicknameChecked(true);
      },
      onError: () => {
        setError("nickname", { message: "중복된 닉네임입니다." });
        setIsNicknameChecked(false);
      },
    });
  };

  useEffect(() => {
    if (!isNicknameChecked) return;

    setIsNicknameCheckedMessageShowing(true);
    const timeout = setTimeout(() => {
      setIsNicknameCheckedMessageShowing(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [isNicknameChecked]);

  return (
    <div className="flex gap-2 ">
      <Input
        label="닉네임"
        placeholder="닉네임을 입력해주세요."
        required
        readOnly={isNicknameChecked}
        message={
          isNicknameCheckedMessageShowing
            ? "사용 가능한 닉네임입니다."
            : errors.nickname?.message
        }
        messageClassName={
          isNicknameCheckedMessageShowing
            ? "text-primary"
            : "text-interacton-red"
        }
        inputWrapperClassName="flex-1"
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
        <Button
          size="sm"
          fluid
          onClick={onCheckNickname}
          disabled={!isNicknameExist || !!errors.nickname || isPending}
          aria-pressed={isNicknameChecked}
        >
          {isNicknameChecked ? "확인완료" : "중복확인"}
        </Button>
      </div>
    </div>
  );
};

const EmailInput = () => {
  const {
    watch,
    register,
    setError,
    formState: { errors },
  } = useFormContext<EmailSignUpFormType>();
  const { isEmailChecked, setIsEmailChecked } = useEmailSignUp();
  const [isEmailCheckedMessageShowing, setIsEmailCheckedMessageShowing] =
    useState(false);
  const { mutate: checkEmail, isPending } = useCheckEmailMuation();
  const email = watch("email");
  const isEmailExist = email.length > 0;

  const onCheckEmail = async () => {
    if (!isEmailExist || isEmailChecked) return;

    checkEmail(email, {
      onSuccess: () => {
        setIsEmailChecked(true);
      },
      onError: () => {
        setError("email", { message: "중복된 이메일입니다." });
        setIsEmailChecked(false);
      },
    });
  };

  useEffect(() => {
    if (!isEmailChecked) return;

    setIsEmailCheckedMessageShowing(true);
    const timeout = setTimeout(() => {
      setIsEmailCheckedMessageShowing(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [isEmailChecked]);

  return (
    <div className="flex gap-2 ">
      <Input
        label="아이디(이메일)"
        placeholder="이메일을 입력해주세요."
        inputWrapperClassName="flex-1"
        required
        message={
          isEmailCheckedMessageShowing
            ? "사용 가능한 이메일입니다."
            : errors.email?.message
        }
        messageClassName={
          isEmailCheckedMessageShowing ? "text-primary" : "text-interacton-red"
        }
        {...register("email", {
          required: "이메일을 입력해주세요.",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "이메일 형식을 확인해주세요.",
          },
        })}
      />
      <div className="w-[86px] pt-[22px]">
        <Button
          size="sm"
          fluid
          onClick={onCheckEmail}
          disabled={!isEmailExist || !!errors.email || isPending}
          aria-pressed={isEmailChecked}
        >
          {isEmailChecked ? "확인완료" : "중복확인"}
        </Button>
      </div>
    </div>
  );
};

const PasswordInput = () => {
  const { register, watch } = useFormContext<EmailSignUpFormType>();
  const password = watch("password");
  const validationRules = {
    minLength: (password: string) => password.length >= 8,
    hasLetter: (password: string) => /[a-zA-Z]/.test(password),
    hasNumber: (password: string) => /[0-9]/.test(password),
  };

  const PasswordValidationMessage = () => {
    const minLengthCondition = validationRules.minLength(password);
    const hasLetterCondition = validationRules.hasLetter(password);
    const hasNumberCondition = validationRules.hasNumber(password);

    const conditions = [
      {
        condition: minLengthCondition,
        message: "최소 8자 이상",
      },
      {
        condition: hasLetterCondition,
        message: "최소 1개 이상의 영문자 포함",
      },
      {
        condition: hasNumberCondition,
        message: "최소 1개 이상의 숫자 포함",
      },
    ];

    return (
      <div className="flex flex-col px-[15px] py-[18px] gap-2 bg-sub border border-[#E1E1E1] rounded-[11px] mt-1">
        {conditions.map((condition) => (
          <div key={condition.message} className="flex items-center gap-1.5">
            {condition.condition ? <Checked /> : <Prohibition />}
            <span className="text-[11px]">{condition.message}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Input
      label="비밀번호"
      type="password"
      required
      message={password && (() => <PasswordValidationMessage />)}
      messageClassName="text-interacton-red"
      {...register("password", {
        required: "비밀번호를 입력해주세요.",
        validate: {
          minLength: validationRules.minLength,
          hasLetter: validationRules.hasLetter,
          hasNumber: validationRules.hasNumber,
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
  } = useFormContext<EmailSignUpFormType>();
  const password = watch("password");
  const passwordConfirm = watch("passwordConfirm");

  useEffect(() => {
    if (passwordConfirm) {
      trigger("passwordConfirm");
    }
  }, [password, trigger, passwordConfirm]);

  return (
    <Input
      label="비밀번호 확인"
      type="password"
      required
      message={errors.passwordConfirm?.message}
      messageClassName="text-interacton-red"
      {...register("passwordConfirm", {
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
  const router = useRouter();
  const { handleSubmit, formState } = useFormContext<EmailSignUpFormType>();
  const { isNicknameChecked, isEmailChecked } = useEmailSignUp();
  const { mutate: signUp } = useSignUpMuation();
  const isValid = formState.isValid && isNicknameChecked && isEmailChecked;

  // TODO: 회원가입 실패 핸들링
  const onSubmit = (data: EmailSignUpFormType) => {
    signUp(
      {
        email: data.email,
        nickname: data.nickname,
        password: data.password,
        profileImage: "",
        userRoleCode: "",
      },
      {
        onSuccess: () => {
          router.push("/login");
        },
      }
    );
  };

  return (
    <div className="pt-[112px]">
      <Button
        fluid
        disabled={!isValid}
        type="submit"
        onClick={handleSubmit(onSubmit)}
      >
        회원가입 완료
      </Button>
    </div>
  );
};

export default EmailSignUpForm;
