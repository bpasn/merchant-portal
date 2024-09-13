import { getSession } from "@/app/auth";
import axios from "axios";

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
      console.log(session)
      config.headers['Authorization'] = `Bearer ${session?.accessToken}`
    }
    return config;
  },
  (error) => {
    // จัดการกับข้อผิดพลาดก่อนส่ง request
    return Promise.reject(error);
  }
);

// axiosServer.interceptors.response.use(
//   response => {
//     return response;
//   },
//   async (error) => {
//     const { response, config } = error;
//     if (response && response.status === 401) {
//       return axiosServer(config);
//     }
//     return Promise.reject(error);
//   }
// );
export default axiosServer;