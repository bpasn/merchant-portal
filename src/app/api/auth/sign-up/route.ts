import axiosServer from "@/lib/utils/axios-server";
import { handleResponse } from "@/lib/utils/handle-response";
import { handleError } from "@/lib/utils/handler-exception";
import { HttpStatus } from "@/lib/utils/http-status";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
    const body = await req.json();
    try {
        const { data } = await axiosServer.post<ApiResponse<{ token: string }>>("/auth/register", body);
        return handleResponse(data, HttpStatus.OK);
    } catch (error) {
        return handleError(error);
    }
}