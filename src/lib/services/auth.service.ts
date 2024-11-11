"use server"
import { SignUpSchema } from "@/modules/auth/signup";
import { report } from "../utils";
import axiosServer from "../utils/axios-server";
import { signIn as signInProvider } from 'next-auth/react'
export const signUp = async (body: Omit<SignUpSchema, "password"> & {
    password: string | null;
    provider?: string | null;
    providerId?: string | null;
}) => {
    try {
        await axiosServer.post<ApiResponse<{ accessToken: string; refreshToken: string }>>("/auth/register", body);
        return {
            status: "OK"
        };
    } catch (error) {
        throw new Error(report(error));
    }
};

export const signIn = async (type: 'default' | 'github', body: {
    email: string;
    password: string | null
}): Promise<{
    accessToken: string;
    refreshToken: string;
}> => {
    try {
        const { data } = await axiosServer.post<ApiResponse<{ accessToken: string, refreshToken: string }>>("/auth/signin", body);
        return data.payload;
    } catch (error) {
        throw new Error(report(error));
    }
}

export const signUpWithProvider = async (body: {
    email: string,
    password: string | null,
    providerId: string,
    name: string,
    provider: string,
}) => {
    try {
        const { data } = await axiosServer.post<ApiResponse<{ accessToken: string; refreshToken: string }>>("/auth/provider/sign-up", body);
        return data.payload;
    } catch (error) {

    }
}