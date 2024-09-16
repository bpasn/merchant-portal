import axios from "axios";

// สร้าง instance ของ Axios
 const axiosClient = axios.create({
    baseURL: process.env.API_URL, // กำหนด base URL จาก environment variable
    timeout: 5000, // ระยะเวลา timeout
    headers: { 'Content-Type': 'application/json' , "Cache-Control": "no-cache"}, // Header เริ่มต้น
  });
  export default axiosClient;