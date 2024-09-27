import { getSession } from "@/lib/utils/auth";
import axios from "axios";
import { signOut } from "next-auth/react";

export const axiosServer = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-store",
    "x-api-key": process.env.X_API_KEY
  },
});


axiosServer.interceptors.request.use(
  async (config) => {
    if (!config.headers['Authorization']) {
      const session = await getSession();
      config.headers['Authorization'] = `Bearer ${session?.accessToken}`;
    }
    return config;
  },
  (error) => {
    // จัดการกับข้อผิดพลาดก่อนส่ง request
    return Promise.reject(error);
  }
);

axiosServer.interceptors.response.use(
  async (response) => {
    if (response && response.status === 401) {
     await signOut();
    }
    return response;
  },
  (error) => {

    return Promise.reject(error);
  }
);

export default axiosServer;