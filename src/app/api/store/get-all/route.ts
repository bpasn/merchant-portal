import { StoreModal, StoreSchema } from "@/lib/schema/storeSchema";
import axiosServer from "@/lib/utils/axios-server";
import { handleResponse } from "@/lib/utils/handle-response";
import { handleError } from "@/lib/utils/handler-exception";
import { HttpStatus } from "@/lib/utils/http-status";
import { getServerSession } from "next-auth/next";
import { NextRequest } from "next/server";

export const dynamic = 'force-static'
export const revalidate = 0
export const GET = async (req: NextRequest) => {
    const session = await getServerSession({ req, secret: process.env.NEXTAUTH_SECRET })
    try {
        const { data } = await axiosServer.get<ApiResponse<StoreModal>>("/store", {
            headers: {
                Authorization: "Bearer " + session?.user?.accessToken
            }
        });
        return handleResponse(data, HttpStatus.OK);
    } catch (error) {
        return handleError(error);
    }
};
