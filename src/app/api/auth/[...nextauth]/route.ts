// src/app/api/auth/[...nextauth]/route.ts
import type { User, Session as NextAuthSession, AuthOptions } from "next-auth";
import type { JWT as NextAuthJWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthenticationResponseSchema } from "@/lib/schemas/auth-reponse";
import { CRITIQ_BACKEND_URL } from "@/lib/config";
import NextAuth from "next-auth";
import { parseExceptionResponse } from "@/lib/schemas/exception-response";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Email + Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Missing email or password");
        }

        const res = await fetch(`${CRITIQ_BACKEND_URL}/auth/authenticate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        // parse the JSON payload
        const payload = await res.json();
        const parsed = AuthenticationResponseSchema.safeParse(payload);

        // Handle any errors: HTTP status not OK or Zod parse failed
        if (!res.ok || !parsed.success) {
          let errMsg = "Authentication failed";

          try {
            const err = parseExceptionResponse(payload);
            errMsg = err.message;
          } catch {
            // if parsing fails, fallback to Zod error or generic message
            if (!parsed.success && parsed.error.errors.length) {
              errMsg = parsed.error.errors[0].message;
            }
          }

          throw new Error(errMsg);
        }

        // we now have a fully–typed AuthenticationResponse
        const { user, token } = parsed.data;

        // NextAuth.User.id must be a string, so coerce it
        return {
          id: user.id.toString(),
          email: user.email,
          name: user.fullName,
          username: user.username,
          fullName: user.fullName,
          profilePictureUrl: user.profilePictureUrl,
          dateOfBirth: user.dateOfBirth,
          termsAccepted: user.termsAccepted,
          termsAcceptedAt: user.termsAcceptedAt,
          newsletterOptIn: user.newsletterOptIn,
          newsletterOptInAt: user.newsletterOptInAt,
          accountLocked: user.accountLocked,
          enabled: user.enabled,
          roles: user.roles,
          token,
        };
      },
    }),
  ],

  pages: {
    signIn: "/auth/login",
  },

  callbacks: {
    async jwt({
      token,
      user,
    }: {
      token: NextAuthJWT;
      user?: User;
    }): Promise<NextAuthJWT> {
      if (user) {
        token.accessToken = user.token;
        token.user = user;
      }
      return token;
    },
    async session({
      session,
      token,
    }: {
      session: NextAuthSession;
      token: NextAuthJWT;
    }): Promise<NextAuthSession> {
      session.accessToken = token.accessToken!;
      session.user = token.user!;
      return session;
    },
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
