import { authOption } from "@/app/auth";
import NextAuth from "next-auth";

const handler = NextAuth(authOption);

export { handler as GET, handler as POST, handler as signIn, handler as signOut }