import { StoreModal, StoreSchema } from "@/lib/schema/storeSchema";
import axiosServer from "@/lib/utils/axios-server";
import { handleResponse } from "@/lib/utils/handle-response";
import { handleError } from "@/lib/utils/handler-exception";
import { HttpStatus } from "@/lib/utils/http-status";
import { NextRequest } from "next/server";


export const GET = async () => {
    const { data } = await axiosServer.get<ApiResponse<StoreModal>>("/store");
    return handleResponse(data, HttpStatus.OK);
};

// export const POST = async (req: NextRequest) => {
//     const body = await req.json();
//     try {
//         const { data } = await axiosServer.post<ApiResponse<StoreSchema>>("/store", body);
//         return handleResponse<StoreSchema>(data, HttpStatus.OK);
//     } catch (error) {
//         return handleError(error);
//     }
// };