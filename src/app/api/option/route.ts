import { ProductOptionSchema } from "@/lib/schema/ProductOptionSchema";
import { handleError } from "@/lib/utils/handler-exception";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";
import { handleResponse } from "@/lib/utils/handle-response";
import { HttpStatus } from "@/lib/utils/http-status";
import axiosServer from "@/lib/utils/axios-server";

export const GET = async (req: NextRequest) => {
    try {
        const { data } = await axiosServer.get<ApiResponse<ProductOptionSchema[]>>("/product-option");
        return handleResponse(data, HttpStatus.OK);
    } catch (error) {
        handleError(error);
    }
    return NextResponse.json({
        status: 200,
        payload: [
            {
                id: 1,
                name: "option1"
            },
            {
                id: 2,
                name: "option2"
            },
        ]
    }, { status: 200 });
};

export const POST = async (req: NextRequest) => {
    const body = await req.json();
    try {
        const response = await axiosServer.post<ApiResponse<ProductOptionSchema[]>>("/product-option", body,);
        return handleResponse(response.data, HttpStatus.OK);
    } catch (error) {
        if (error instanceof AxiosError) {
            console.log(error.response!.data);
        }
        handleError(error);
        return;
    }
};