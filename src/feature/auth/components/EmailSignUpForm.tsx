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

import { useRouter } from "@/common";
import { LoginRoute } from "../route";
import { passwordValidator } from "../util";
import PasswordValidationMessage from "./PasswordValidationMessage";
import { Popover, PopoverContent, PopoverTrigger } from "@/common/ui/Popover";
import Help from "../../../../public/icon/help.svg";

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
              <CertificationCodeInput />
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

  return (
    <Input
      label="비밀번호"
      type="password"
      placeholder="8자 이상의 비밀번호"
      required
      message={
        password && (() => <PasswordValidationMessage password={password} />)
      }
      {...register("password", {
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
      placeholder="비밀번호 확인"
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

const CertificationCodeInput = () => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const {
    register,
    formState: { errors },
  } = useFormContext<EmailSignUpFormType>();

  return (
    <Input
      label={() => (
        <div className="flex items-end">
          <span>인증번호(선택)</span>
          <Popover open={tooltipOpen} onOpenChange={setTooltipOpen}>
            <PopoverTrigger
              onMouseEnter={() => setTooltipOpen(true)}
              onMouseLeave={() => setTooltipOpen(false)}
              onClick={(e) => e.preventDefault()}
            >
              <Help />
            </PopoverTrigger>
            <PopoverContent
              className="w-[220px] px-2 py-[6px] rounded-[16px] bg-[#FFFBEA] border border-[#CCCCCC]"
              side="top"
              align="start"
              onMouseEnter={() => setTooltipOpen(true)}
              onMouseLeave={() => setTooltipOpen(false)}
            >
              <div className="text-[9px] text-[#666666]">
                인증코드는 에디터와 책방지기분들에 한해 발급됩니다. 발급을
                원하시는 에디터/책방지기 분들은 카카오톡 채널(@ 채널이름)으로
                연락주시길 바랍니다.
              </div>
            </PopoverContent>
          </Popover>
        </div>
      )}
      placeholder="인증번호를 받으신 분들만 입력해주세요."
      message={errors.certificationCode?.message}
      {...register("certificationCode")}
    />
  );
};

const SubmitButton = () => {
  const router = useRouter();
  const { handleSubmit, formState, setError } =
    useFormContext<EmailSignUpFormType>();
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
        userRoleCode: data.certificationCode,
      },
      {
        onSuccess: () => {
          router.push(LoginRoute.toString());
        },
        onError: () => {
          setError("certificationCode", {
            message: "인증번호가 일치하지 않습니다. 다시 입력해주세요.",
          });
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
