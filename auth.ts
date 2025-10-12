import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signIn as apiSignIn } from "./src/common/services/auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const result = await apiSignIn({
            email: credentials.email as string,
            password: credentials.password as string,
          });

          if (result.accessToken) {
            const payload = JSON.parse(atob(result.accessToken.split(".")[1]));

            return {
              email: credentials.email as string,
              accessToken: result.accessToken,
              refreshToken: result.refreshToken,
              userRole: payload.userRole,
              userId: payload.userId,
            };
          }
          return null;
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as any).accessToken;
        token.refreshToken = (user as any).refreshToken;
        token.userRole = (user as any).userRole;
        token.userId = (user as any).userId;
      }
      return token;
    },
    async session({ session, token }) {
      const extendedSession = session as any;
      extendedSession.accessToken = token.accessToken as string;
      extendedSession.refreshToken = token.refreshToken as string;
      extendedSession.userRole = token.userRole as string;
      extendedSession.userId = token.userId as number;
      return extendedSession;
    },
  },
  pages: {
    signIn: "/login",
  },
});
