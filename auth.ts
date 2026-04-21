import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt({ token, account }) {
      if (account?.provider === "google" && account.providerAccountId) {
        token.userId = account.providerAccountId;
      }

      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.userId || token.sub || session.user.email || "";
      }

      return session;
    },
  },
  trustHost: true,
});
