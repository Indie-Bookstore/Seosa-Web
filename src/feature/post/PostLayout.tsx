import { PropsWithChildren } from "react";

export default function PostLayout({ children }: PropsWithChildren) {
  return <main className="size-full overflow-y-auto bg-white">{children}</main>;
}
