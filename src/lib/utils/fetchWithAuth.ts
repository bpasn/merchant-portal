import { authOption } from "@/lib/auth"
import axios, { AxiosRequestConfig } from "axios";
import axiosClient from "./axios-client";
import { getServerSession } from "next-auth";
export const fetchWithAuth = async <D,>(url: string, config?: AxiosRequestConfig<D>) => {
    const session = await getServerSession(authOption);
    console.log({ session, headers: config!.headers })
    const headers = {
        ...config!.headers,
        Authorization: `Bearer ${session?.accessToken}`
    }
    return axiosClient.get("http://localhost:8888/api/v1" + url, { ...config, headers })
}

export const postWithAuth = async () => {
    const session = await getServerSession(authOption);
    const headers = {
        Authorization: `Bearer ${session?.accessToken}`
    }
    return axios.create({
        baseURL: process.env.API_URL,
        headers
    })
}