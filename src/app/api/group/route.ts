import { handleError } from "@/lib/utils/handler-exception";
import { NextRequest, NextResponse } from "next/server";
import { axiosConfig } from "../axios.config";
import { ProductGroupSchema } from "@/lib/schema/productGroupSchema";

export const GET = async (req: NextRequest) => {
    try {
        const response = await axiosConfig.get<ProductGroupSchema[]>("/api/v1/product-groups");
        return NextResponse.json({
            status: 200,
            payload: response.data
        }, { status: 200 });
    } catch (error) {
        return handleError(error);
    }
};

export const POST = async (req: NextRequest) => {
    const body = await req.json();
    try {
        console.log(body);
        const response = await axiosConfig.post("/api/v1/product-groups", body);
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