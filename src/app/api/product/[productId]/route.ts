import { ProductModal } from "@/lib/schema/productSchema";
import axiosServer from "@/lib/utils/axios-server";
import { handleResponse } from "@/lib/utils/handle-response";
import { handleError } from "@/lib/utils/handler-exception";
import { HttpStatus } from "@/lib/utils/http-status";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, {
    params: {
        productId
    }
}: {
    params: {
        productId: string;
    };
}) => {
    try {
        const { data } = await axiosServer.get<ApiResponse<ProductModal>>(`/products/${productId}`);
        return handleResponse(data, HttpStatus.OK);
    } catch (error) {
        return handleError(error);
    }
};

export const PUT = async (req: NextRequest, {
    params
}: {
    params: {
        productId: string;
    };
}) => {
    const formData: FormData = await req.formData();
    try {
        await axiosServer.put(`${process.env.API_URL}/products/${params.productId}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return NextResponse.json("SUCCESS");
    } catch (error) {
        return handleError(error);
    }
};
