import axios, { AxiosError } from "axios";

export const axiosConfig = axios.create({
    baseURL: process.env.API_URL,
    headers: {
        "Content-Type": "application/json"
    }
});
axiosConfig.interceptors.request.use(
    (config) => {
        // สามารถแก้ไข config ก่อนส่ง request ได้ที่นี่
        // const token = localStorage.getItem('token');
        // if (token) {
        //   config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
    },
    (error) => {
        // จัดการกับข้อผิดพลาดก่อนส่ง request
        return Promise.reject(error);
    }
);

// เพิ่ม response interceptor
axiosConfig.interceptors.response.use(
    (response) => {
        // สามารถจัดการกับ response ก่อนจะส่งไปให้กับ function ที่เรียกใช้งาน
        return response;
    },
    (error) => {
        // จัดการกับข้อผิดพลาดที่เกิดขึ้นใน response
        if (error.response && error.response.status === 401) {
            // เช่น หากเจอ 401 Unauthorized ให้ทำการ logout หรือ redirect
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
);