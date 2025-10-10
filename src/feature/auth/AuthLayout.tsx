import { PropsWithChildren } from "react";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <main className="px-[18px] size-full overflow-y-auto">{children}</main>
  );
}
