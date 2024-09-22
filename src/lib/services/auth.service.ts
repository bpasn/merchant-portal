"use server"
import { SignUpSchema } from "@/modules/auth/signup";
import { report } from "../utils";
import axiosServer from "../utils/axios-server";

export const signUp = async (body: SignUpSchema) => {
    try {
        await axiosServer.post<ApiResponse<{ token: string; }>>("/auth/register", body);
        return {
            status: "OK"
        };
    } catch (error) {
        throw new Error(report(error));
    }
};