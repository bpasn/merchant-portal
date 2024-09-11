import axiosServer from "@/lib/utils/axios-server";
import { NextAuthOptions, Session, User } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';
export const authOption: NextAuthOptions = ({
    pages: {
        signIn: "/login",
        signOut: "/"
    },
    callbacks: {
        session: ({ user, session }: { user: User, session: Session }) => {
            return session
        },
        jwt: ({ token }) => token
    },
    providers: [
        CredentialsProvider({
            name: "spring-credential",
            credentials: {
                email: {},
                password: {}
            },
            authorize: async (credential) => {
                const { data } = await axiosServer.post<ApiResponse<User>>("/auth/login", credential);
                if (data) {
                    return data.payload;
                }
                throw new Error("Something went wrong!!");
            }
        })
    ]
});