// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    accessToken?: string;
    refreshToken?: string;
    userRole?: string;
    userId?: number;
  }

  interface Session {
    accessToken?: string;
    refreshToken?: string;
    userRole?: string;
    userId?: number;
    user?: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    userRole?: string;
    userId?: number;
  }
}
