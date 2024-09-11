import { DefaultSession } from "next-auth";
import { JWT } from 'next-auth';
declare module "next-auth" {
    interface User {
        token?: string;
        lat?: number;
        exp?: number;
    }

    interface Session {
        user: Omit<User,"id"> | null;
        token?: string;
    }


}

declare module "next-auth/jwt" {
    interface JWT {
        id?:string;
        exp?: number;
        lat?: number;
        token?: string;
    }
}