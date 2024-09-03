import axios from "axios";

// สร้าง instance ของ Axios
 const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_APP_URL, // กำหนด base URL จาก environment variable
    timeout: 5000, // ระยะเวลา timeout
    headers: { 'Content-Type': 'application/json' , "Cache-Control": "no-cache"}, // Header เริ่มต้น
  });
  
  // เพิ่ม request interceptor
  axiosClient.interceptors.request.use(
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
  axiosClient.interceptors.response.use(
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

  export default axiosClient;