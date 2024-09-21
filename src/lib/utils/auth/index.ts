import { report } from "@/lib/utils";
import axiosServer from "@/lib/utils/axios-server";
import axios from "axios";
import { AuthOptions, getServerSession, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from 'next-auth/providers/credentials';

const authOption: AuthOptions = ({
    pages: {
        signIn: "/sign-in",
        signOut: "/sign-in"
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        session: async ({ session, token }) => {
            const sanitizedToken = Object.keys(token).reduce((p, c) => {
                if (
                    c !== "lat" &&
                    c !== "exp" &&
                    c !== "jti" &&
                    c !== "accessToken" &&
                    c !== "refreshToken"
                ) {
                    return { ...p, [c]: token[c] };
                } else {
                    return p;
                }
            }, {});
            return { ...session, error: token.error, expires: new Date(parseJwt(token.accessToken!).exp * 1000).toISOString(), ...sanitizedToken, accessToken: token.accessToken, refreshToken: token.refreshToken };
        },
        jwt: async ({ token, user }: { token: JWT, user: User; }) => {
            if (typeof user !== "undefined") {
                const jwt = {
                    ...user,
                    accessToken: user.accessToken,
                    refreshToken: user.refreshToken,
                };
                return jwt;
            }
            if (Date.now() / 1000 < Number(parseJwt(token.accessToken!).exp)) {
                return token;
            }
            // accesstoken expired
            return await refreshToken(token);
        }
    },
    session: {
        strategy: "jwt",
        maxAge: Number(process.env.SESSION_TIMEOUT) ?? 900,
        updateAge: Number(process.env.SESSION_TIMEOUT) ?? 900
    },
    providers: [
        CredentialsProvider({
            id: "spring-credential",
            credentials: {
                email: {},
                password: {}
            },
            authorize: async (credential, req) => {
                try {
                    const { data } = await axiosServer.post<{
                        accessToken: string,
                        refreshToken: string,
                    }>("/auth/login", {
                        email: credential?.email,
                        password: credential?.password
                    });
                    if (data) {
                        const decode = parseJwt(data.accessToken);
                        return { accessToken: data.accessToken, refreshToken: data.refreshToken, user: { email: decode.sub } } as any; // คืนค่าผู้ใช้ที่ได้รับการยืนยัน
                    } else {
                        return null; // ผู้ใช้ไม่ถูกต้อง
                    }
                } catch (error) {
                    throw new Error(report(error));
                }
            }
        })
    ],

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

export const refreshToken = async (token: any) => {
    console.log("REFRESH TOKEN")
    try {
        const { data } = await axios.post<{ accessToken: string, refreshToken: string; }>(process.env.API_URL + "/auth/refresh-token", {
            refreshToken: token.refreshToken,
        });
        return {
            ...token,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken ?? token.refreshToken
        };
    } catch (error) {
        return {
            ...token,
            error: "RefreshAccessTokenError"
        };
    }
};
const getSession = async () => await getServerSession(authOption);

export { authOption, getSession };
