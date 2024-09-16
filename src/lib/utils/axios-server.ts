import { getSession } from "@/app/auth";
import axios from "axios";
import { refreshToken as handleRefreshToken } from '@/app/auth';

export const axiosServer = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-store",
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
  response => response,
  async (error) => {
    const { response, config } = error;
    const originalRequest = config;
    if (response && response.status === 401) {
      originalRequest._retry = true;
      try {
        const session = await getSession();
        console.log(session);
        // Call your API to refresh session
        // Save the new access token
        // axiosServer.defaults.headers['Authorization'] = `Bearer ${session?.accessToken}`;

        // Retry the original request with the new token
        originalRequest.headers['Authorization'] = `Bearer ${session?.accessToken}`;
        return axiosServer(originalRequest);
      } catch (err) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);
export default axiosServer;