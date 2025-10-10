import { ComponentProps } from "react";
import cn from "../util/style";

interface ButtonProps extends ComponentProps<"button"> {
  className?: string;
  fluid?: boolean;
  size?: "sm" | "md";
  variant?: "primary" | "secondary";
}

const Button = ({
  className,
  fluid = false,
  size = "md",
  children,
  type = "button",
  variant = "primary",
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={cn(
        size === "sm" && "h-[42px] text-[13px] font-medium rounded-[11px]",
        size === "md" && "h-11 text-[14px] font-semibold rounded-[22px]",
        variant === "primary" && "bg-primary text-white",
        variant === "secondary" && "border-[1.5px] border-primary text-primary",
        fluid && "w-full",
        rest.disabled &&
          "bg-[#E1E1E1] text-[#888888] !cursor-not-allowed border-none",
        "flex justify-center items-center",
        "aria-pressed:cursor-default aria-pressed:bg-primary/70",
        className
      )}
      type={type}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
