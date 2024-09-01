import { handleError } from "@/lib/utils/handler-exception";
import { NextRequest, NextResponse } from "next/server";
import { axiosConfig } from "../axios.config";
import { ProductOptionSchema } from "@/lib/schema/ProductOptionSchema";
import { AxiosError } from "axios";

export const GET = async (req: NextRequest) => {
    try {
        const { data } = await axiosConfig.get<ProductOptionSchema[]>("/api/v1/product-option");
        return NextResponse.json({
            payload: data,
            status: 200
        }, { status: 200 });
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
        const response = await axiosConfig.post("/api/v1/product-option", body,);
        return NextResponse.json({
            payload: response.data,
            status: 200
        }, {
            status: 200
        });
    } catch (error) {
        if(error instanceof AxiosError){
            console.log(error.response!.data);
        }
        handleError(error);
        return;
    }
};