import { handleError } from "@/lib/utils/handler-exception";
import { NextRequest, NextResponse } from "next/server";
import { axiosConfig } from "../axios.config";
import { productSchema, ProductSchema } from "@/lib/schema/productSchema";

export const GET = async (req: NextRequest) => {
    try {
        return NextResponse.json("Aready");
    } catch (error) {
        return handleError(error);

    }
};

export const POST = async (req: NextRequest) => {
    const formData: FormData = await req.formData();
    try {
       
        const response = await axiosConfig.post(`${process.env.API_URL}/api/v1/products`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return NextResponse.json("SUCCESS");
    } catch (error) {
        return handleError(error);
    }
};
