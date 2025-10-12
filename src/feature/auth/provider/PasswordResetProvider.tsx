"use client";

import { createContext, useContext, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ResetPasswordFormType } from "../type";

interface PasswordResetContextType {
  isVerificationCodeSended: boolean;
  setIsVerificationCodeSended: (isVerificationCodeSended: boolean) => void;
  isVerificationCodeVerified: boolean;
  setIsVerificationCodeVerified: (isVerificationCodeVerified: boolean) => void;
  isPasswordReset: boolean;
  setIsPasswordReset: (isPasswordReset: boolean) => void;
}

const PasswordResetContext = createContext<
  PasswordResetContextType | undefined
>(undefined);

export const PasswordResetProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isVerificationCodeSended, setIsVerificationCodeSended] =
    useState(false);
  const [isVerificationCodeVerified, setIsVerificationCodeVerified] =
    useState(false);
  const [isPasswordReset, setIsPasswordReset] = useState(false);

  const methods = useForm<ResetPasswordFormType>({
    mode: "onChange",
    defaultValues: {
      email: "",
      verificationCode: "",
      newPassword: "",
      newPasswordConfirm: "",
    },
  });

  return (
    <PasswordResetContext.Provider
      value={{
        isVerificationCodeSended,
        setIsVerificationCodeSended,
        isVerificationCodeVerified,
        setIsVerificationCodeVerified,
        isPasswordReset,
        setIsPasswordReset,
      }}
    >
      <FormProvider {...methods}>{children}</FormProvider>
    </PasswordResetContext.Provider>
  );
};

export const usePasswordReset = () => {
  const context = useContext(PasswordResetContext);
  if (!context) {
    throw new Error(
      "usePasswordReset must be used within a PasswordResetProvider"
    );
  }
  return context;
};
