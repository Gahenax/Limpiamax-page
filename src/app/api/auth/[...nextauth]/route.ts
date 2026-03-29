import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Limpiamax Admin",
      credentials: {
        username: { label: "Usuario", type: "text", placeholder: "Admin" },
        password: { label: "PIN", type: "password" }
      },
      async authorize(credentials) {
        const adminUser = process.env.ADMIN_USER;
        const adminPin = process.env.ADMIN_PIN;

        if (!adminUser || !adminPin) {
          console.error('ADMIN_USER and ADMIN_PIN environment variables must be set');
          return null;
        }

        if (
          credentials?.username === adminUser &&
          credentials?.password === adminPin
        ) {
          return {
            id: "1",
            name: "Administrador Limpiamax",
            email: "admin@limpiamaxweb.com",
            role: "SUPERADMIN"
          };
        }
        return null;
      }
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { role?: string }).role = token.role as string;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
