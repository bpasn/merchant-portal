'use client';
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import axiosServer from "../utils/axios-server";

const useAxiosAuth = () => {
    const { data: session } = useSession();
    useEffect(() => {
        const requestIntercept = axiosServer.interceptors.request.use(
            (config) => {
                if (!config.headers["Authorization"]) {
                    config.headers['Authorization'] = `Bearer ${session?.user?.accessToken}`;
                }
                return config;
            }
        );
        return () => {
            axiosServer.interceptors.request.eject(requestIntercept);
        };
    }, [session]);

    return axiosServer;
};

export default useAxiosAuth;