import { report } from "@/lib/utils";
import axiosServer from "@/lib/utils/axios-server";
import { AuthOptions, getServerSession, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from 'next-auth/providers/credentials';
const authOption: AuthOptions = ({
    pages: {
        signIn: "/sign-in",
        signOut: "/sign-in"
    },
    callbacks: {
        session: async ({ user, session, token }: { user: User, session: Session, token: JWT; }) => {
            const isTokenValid = getIsTokenValid(token.token!);
            if (!isTokenValid) return {} as Session;
            session.user = token;
            return session;
        },
        jwt: async ({ token, user }: { token: JWT; user?: User; }) => {
            return {} as JWT
            return { ...token, ...user };
        }
    },
    session: {
        strategy: "jwt"
    },
    providers: [
        CredentialsProvider({
            id: "spring-credential",
            credentials: {
                email: {},
                password: {}
            },
            authorize: async (credential) => {
                try {
                    const { data } = await axiosServer.post<ApiResponse<{ token: string; }>>("/auth/login", {
                        email: credential?.email,
                        password: credential?.password
                    });
                    if (data.payload) {
                        const decode = JSON.parse(atob(data.payload.token.split('.').at(1)!));
                        const user = { ...data.payload, email: decode.sub, lat: decode.lat, exp: decode.exp } as User;
                        console.log(user);
                        return user; // คืนค่าผู้ใช้ที่ได้รับการยืนยัน
                    } else {
                        return null; // ผู้ใช้ไม่ถูกต้อง
                    }
                } catch (error) {
                    throw new Error(report(error));
                }
            }
        })
    ]
});
export const parseJwt = (token: string) => {
    try {
        // atob: decodes base64 strings
        return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
        return null;
    }
};
export const getIsTokenValid = (token: string) => {
    if (!token) return false;

    //In JavaScript, a time stamp is the number of milliseconds that have passed since January 1, 1970.

    const jwtExpireTimestamp = parseJwt(token).exp;
    //In this case, since the exp value is in seconds format, we need to convert it to milliseconds format in the next step. 

    const jwtExpireDateTime = new Date(jwtExpireTimestamp * 1000);
    //Now we have expiration date of the token 

    if (jwtExpireDateTime < new Date()) {
        console.log("API token expired");
        return false;
    }

    return true;
};
const getSession = () => getServerSession(authOption);

export { authOption, getSession };
