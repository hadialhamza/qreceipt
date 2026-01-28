// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // 1. Connect to DB
        await connectDB();

        // 2. Check if user exists
        const user = await User.findOne({ email: credentials.email }).select(
          "+password",
        );

        if (!user) {
          throw new Error("Invalid Email or Password");
        }

        // 3. Verify Password (Secure Compare)
        const isMatch = await bcrypt.compare(
          credentials.password,
          user.password,
        );

        if (!isMatch) {
          throw new Error("Invalid Email or Password");
        }

        // 4. Return user object (without password)
        return {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt", // Using JSON Web Tokens for session
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login", // We will create this custom login page later
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
