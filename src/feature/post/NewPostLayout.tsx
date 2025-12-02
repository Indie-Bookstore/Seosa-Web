import { PropsWithChildren } from "react";

export default function NewPostLayout({ children }: PropsWithChildren) {
  return <main className="px-[18px] h-full flex flex-col">{children}</main>;
}
