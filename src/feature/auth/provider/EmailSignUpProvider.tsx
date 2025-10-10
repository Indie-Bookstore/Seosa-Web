"use client";

import { createContext, useContext, useState } from "react";

type EmailSignUpContextType = {
  isEmailChecked: boolean;
  isNicknameChecked: boolean;

  setIsEmailChecked: (isEmailChecked: boolean) => void;
  setIsNicknameChecked: (isNicknameChecked: boolean) => void;
};

const EmailSignUpContext = createContext<EmailSignUpContextType>({
  isEmailChecked: false,
  isNicknameChecked: false,

  setIsEmailChecked: () => {},
  setIsNicknameChecked: () => {},
});

export const EmailSignUpProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);

  return (
    <EmailSignUpContext.Provider
      value={{
        isEmailChecked,
        isNicknameChecked,
        setIsEmailChecked,
        setIsNicknameChecked,
      }}
    >
      {children}
    </EmailSignUpContext.Provider>
  );
};

export const useEmailSignUp = () => {
  return useContext(EmailSignUpContext);
};
