// import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcryptjs";
// import { Session } from "next-auth";
// import { JWT } from "next-auth/jwt";
// import { User } from 'next-auth';
// import { prisma } from '@/app/lib/prisma';
// import { NextAuthConfig } from "next-auth";

// interface customJWT extends JWT {
//   id?: string;
//   isVerified?: boolean;
// }

// export const authOptions: NextAuthConfig = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       id: 'credentials',
//       credentials: {
//         identifier: { label: "Email or Username", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials): Promise<any> {
//         if (!credentials?.identifier || !credentials.password) {
//           throw new Error("Missing credentials");
//         }

//         // Find user by email or name
//         const user = await prisma.user.findFirst({
//           where: { OR: [{ email: credentials.identifier }, { name: credentials.identifier }] },
//         });

//         if (!user) {
//           throw new Error("No user found with these credentials");
//         }

//         // Check if the provided password matches the stored password
//         const toBecheckedPassword=credentials.password.toString();
//         const isPasswordCorrect =  bcrypt.compare(toBecheckedPassword, user.password);
//         if (!isPasswordCorrect)  throw new Error("Password is incorrect")

//         // Verify user status
//         if (!user.isVerified) {
//           throw new Error("Account unverified. Please verify before logging in.");
//         }

//         return user;
//       },
//     }),
//   ],

//   callbacks: {
//     async jwt({ token, user }: { token: JWT; user?: User }) {
//       const currentToken = token as customJWT;
//       if (user) {
//         currentToken.id = user.id;
//         currentToken.name = user.name;
//         currentToken.email = user.email;
//         currentToken.isVerified = user.isVerified;
//       }
//       return currentToken;
//     },
//     async session({ session, token }: { session: Session; token: JWT }) {
//       const currentToken = token as customJWT;
//       session.user = {
//         id: currentToken.id,
//         name: currentToken.name,
//         email: currentToken.email,
//         isVerified: currentToken.isVerified,
//       };
//       return session;
//     },
//   },

//   pages: {
//     signIn: "/signin",
//   },
//   session: {
//     strategy: "jwt",
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// };
