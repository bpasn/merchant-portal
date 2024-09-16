
import { getSession } from "@/app/auth";
import { StoreSchema } from "@/lib/schema/storeSchema";
import { report } from "@/lib/utils";
import axiosServer from "@/lib/utils/axios-server";
import { handleResponse } from "@/lib/utils/handle-response";
import { handleError } from "@/lib/utils/handler-exception";
import { HttpStatus } from "@/lib/utils/http-status";
import { NextRequest } from "next/server";

export const dynamic = 'force-static';
export const revalidate = 0;
export const GET = async (req: NextRequest) => {
    const session = await getSession();
    try {
        // const { data } = await axiosServer.get<ApiResponse<StoreModal>>("/store/find-one", headers);
        return handleResponse({} as any, HttpStatus.OK);
    } catch (error) {
        return handleError(error);
    }
};

export const POST = async (req: NextRequest) => {
    const body = await req.json();
    try {
        const { data } = await axiosServer.post<ApiResponse<StoreSchema>>("/store", body);
        return handleResponse(data, HttpStatus.OK);
    } catch (error) {
        return handleError(error);
    }
};