"use client";

import { ComponentProps, ReactNode, useId, useState } from "react";
import cn from "../util/style";
import ClosedEye from "../../../public/icon/closed-eye.svg";
import OpenedEye from "../../../public/icon/opened-eye.svg";

interface InputProps extends ComponentProps<"input"> {
  label?: string;
  inputClassName?: string;
  inputWrapperClassName?: string;
  errorMessage?: string | (() => ReactNode);
}

const Input = ({
  label,
  inputClassName,
  inputWrapperClassName,
  type,
  errorMessage,
  ...rest
}: InputProps) => {
  const htmlFor = useId();
  const [innerType, setInnerType] = useState(type || "text");
  const PasswordIcon = innerType === "password" ? ClosedEye : OpenedEye;

  const handlePasswordVisible = () => {
    setInnerType(innerType === "password" ? "text" : "password");
  };

  return (
    <div className={cn("flex flex-col gap-1 w-full", inputWrapperClassName)}>
      {label && (
        <label
          htmlFor={htmlFor}
          className="font-medium text-xs leading-[18px] text-[#666666]"
        >
          {label}
          {rest.required && <span className="text-interacton-red">*</span>}
        </label>
      )}
      <div className="size-fit relative w-full">
        <input
          {...rest}
          id={htmlFor}
          type={innerType}
          className={cn(
            "w-full border-[1.5px] border-[#CCCCCC] rounded-[11px] px-[13px] leading-6 h-[42px] text-text-primary text-[15px] placeholder:text-[#888888",
            inputClassName
          )}
        />
        {type === "password" && (
          <PasswordIcon
            className="absolute right-[13px] top-1/2 transform -translate-y-1/2"
            role="button"
            onClick={handlePasswordVisible}
          />
        )}
      </div>

      {errorMessage &&
        (typeof errorMessage === "function" ? (
          errorMessage()
        ) : (
          <div className="text-interacton-red text-[10px]">{errorMessage}</div>
        ))}
    </div>
  );
};

export default Input;
