// Member: Aiqi Xu
// Auth.js utilities

import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    // google OAuth provider configuration
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    jwt({ token, account }) {
      // persist Google account ID into JWT token
      // only set userId for Google login
      if (account?.provider === "google" && account.providerAccountId) {
        token.userId = account.providerAccountId;
      }

      return token;
    },
    session({ session, token }) {
      // expose userId on session object for client usage
      // attach resolved user ID to session
      if (session.user) {
        session.user.id = token.userId || token.sub || session.user.email || "";
      }

      return session;
    },
  },
  trustHost: true,
});
