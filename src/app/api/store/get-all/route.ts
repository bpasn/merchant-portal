import { StoreModal, StoreSchema } from "@/lib/schema/storeSchema";
import axiosServer from "@/lib/utils/axios-server";
import { handleResponse } from "@/lib/utils/handle-response";
import { handleError } from "@/lib/utils/handler-exception";
import { HttpStatus } from "@/lib/utils/http-status";
import { NextRequest } from "next/server";

export const dynamic = 'force-static'
export const revalidate = 0
export const GET = async () => {
    try {
        const { data } = await axiosServer.get<ApiResponse<StoreModal>>("/store");
        return handleResponse(data, HttpStatus.OK);
    } catch (error) {
        return handleError(error);
    }
};
