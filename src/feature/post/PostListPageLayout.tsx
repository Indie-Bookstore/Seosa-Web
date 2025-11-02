import { PropsWithChildren } from "react";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <main className="size-full overflow-y-auto bg-[#FFFBEA]">{children}</main>
  );
}
