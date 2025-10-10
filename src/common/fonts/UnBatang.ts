import localFont from "next/font/local";

export const Unbatang = localFont({
  src: [
    {
      path: "../../../public/fonts/UnBatang.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/UnBatangBold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-unbatang",
});
