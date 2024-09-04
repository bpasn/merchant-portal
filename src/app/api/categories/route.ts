import { CategoriesSchema } from "@/lib/schema/categoriesSchema";
import { handleError } from "@/lib/utils/handler-exception";
import { NextRequest, NextResponse } from "next/server";
import { handleResponse } from "@/lib/utils/handle-response";
import { HttpStatus } from "@/lib/utils/http-status";
import axiosServer from "@/lib/utils/axios-server";

export const GET = async (req: NextRequest) => {
    try {
        const response = await axiosServer.get<ApiResponse<CategoriesSchema[]>>("/categories");
        
        return handleResponse(response.data,HttpStatus.OK)
    } catch (error) {
        return handleError(error);
    }
};

export const POST = async (req: NextRequest) => {
    const body = await req.json();
    try {
        const response = await axiosServer.post("/categories", body);
        return NextResponse.json({
            payload: response.data,
            status: 200
        }, {
            status: 200
        });
    } catch (error) {
       return handleError(error);
    }
};