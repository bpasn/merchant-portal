import { FormItemSchema } from "@/lib/schema/productSchema";
import { handleError } from "@/lib/utils/handler-exception";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        return NextResponse.json("Aready");
    } catch (error) {
        return handleError(error);

    }
};

export const POST = async (req: NextRequest) => {
    const formData = await req.formData();
    const formProduct: FormItemSchema = {
        nameTH: formData.get("nameTH") as string,
        nameEN: formData.get("nameEN") as string,
        price: parseFloat(formData.get("price") as string),
        descriptionTH: formData.get("descriptionTH") as string,
        descriptionEN: formData.get("descriptionEN") as string,
        images: formData.getAll("images").map(e => e) as File[],
        itemOption: [],
        itemGroup: []
    };
    try {
        return NextResponse.json("SUCCESS");
    } catch (error) {
        return handleError(error);
    }
};
