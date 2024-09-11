import { DefaultSession } from "next-auth";
import { JWT } from 'next-auth';
declare module "next-auth" {
    interface User {
        storeId?: string;
        token?:string;
    }

    interface Session {
        user: User & DefaultSession['user'];
        token?: string;
    }


}

declare module "next-auth/jwt" {
    interface JWT {
        exp?: number;
        lat?: number;
        token?: string;
    }
}