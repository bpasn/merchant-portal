import { ProductModal } from "@/lib/schema/productSchema";
import axiosServer from "@/lib/utils/axios-server";
import { handleResponse } from "@/lib/utils/handle-response";
import { handleBadRequest, handleError } from "@/lib/utils/handler-exception";
import { HttpStatus } from "@/lib/utils/http-status";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    const search = req.nextUrl.searchParams;
    const page = search.get("page");
    const size = search.get("size");
    if(!page || !size){
        return handleBadRequest("page and size parameters are required.")
    }
    else if((page && !size) || (size && !page)){
        return handleBadRequest("Both 'page' and 'size' parameters are required together.");
    }else if (Number(size) < 10){
        return handleBadRequest("Size must not be less than 10.")
    }
    try {
        const { data } = await axiosServer.get<ApiResponse<IDataTable<ProductModal>>>(`/products/?page=${page}&size=${size}`);
        return handleResponse(data, HttpStatus.OK);
    } catch (error) {
        console.log(error)
        return handleError(error);

    }
};

export const POST = async (req: NextRequest) => {
    const formData: FormData = await req.formData();
    try {
        const response = await axiosServer.post(`${process.env.API_URL}/products`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return NextResponse.json("SUCCESS");
    } catch (error) {
        return handleError(error);
    }
};

