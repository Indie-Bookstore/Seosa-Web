"use client";

import { PasswordResetProvider, usePasswordReset } from "../provider";
import IdentityVerficationForm from "./IdentityVerficationForm";
import PasswordResetComplete from "./PasswordResetComplete";
import PasswordResetForm from "./PasswordResetForm";

const PasswordResetContent = () => {
  return (
    <PasswordResetProvider>
      <InnerPasswordResetContent />
    </PasswordResetProvider>
  );
};

const InnerPasswordResetContent = () => {
  const { isVerificationCodeVerified, isPasswordReset } = usePasswordReset();

  if (!isVerificationCodeVerified) return <IdentityVerficationForm />;
  if (!isPasswordReset) return <PasswordResetForm />;
  return <PasswordResetComplete />;
};

export default PasswordResetContent;
