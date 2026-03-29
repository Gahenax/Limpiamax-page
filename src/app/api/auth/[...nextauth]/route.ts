import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Limpiamax Admin",
      credentials: {
        username: { label: "Usuario", type: "text", placeholder: "LimpiamaxAdmin" },
        password: { label: "PIN", type: "password" }
      },
      async authorize(credentials) {
        // Validación soberana contra las variables de entorno
        const adminUser = process.env.ADMIN_USER || "LimpiamaxAdmin";
        const adminPin = process.env.ADMIN_PIN || "limpiamax2026";

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
    maxAge: 30 * 24 * 60 * 60, // 30 días de sesión para comodidad operativa
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
});

export { handler as GET, handler as POST };
