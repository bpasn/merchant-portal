import { NextRequest, NextResponse } from "next/server";
import axiosInstance from "./lib/utils/axios-config";
export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    if (pathname.startsWith("/businesses/menu")) {
        const { data } = await axiosInstance.get<ApiResponse<{ id: string, name: string }[]>>(`/api/store`);
        return NextResponse.redirect(new URL(`/businesses/${data.payload[0].id}/menu`, request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/businesses/menu"]
}