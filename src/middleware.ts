import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    if (pathname.startsWith("/businesses/menu")) {
        const { data } = await axios.get<ApiResponse<{ id: string, name: string }[]>>("http://localhost:3000/api/store");
        return NextResponse.redirect(new URL(`/businesses/${data.payload[0].id}/menu`, request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/businesses/menu"]
}