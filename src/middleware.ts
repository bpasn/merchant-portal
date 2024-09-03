import { NextRequest, NextResponse } from "next/server";
import axios from 'axios';
import { StoreModal } from "./lib/schema/storeSchema";

export async function middleware(request: NextRequest) {
    const response = NextResponse.next();

    // Set Cache-Control headers
    response.headers.set('Cache-Control', 'no-store');

    const pathname = request.nextUrl.pathname;

    // if (pathname.startsWith("/businesses/menu")) {
    //     try {
    //         const response = await axios.get<ApiResponse<StoreModal>>(`${process.env.NEXT_PUBLIC_APP_URL}/api/store`,{
    //             headers:{
    //                 "Cache-Control":"no-cache"
    //             }
    //         });
    //         const data = response.data;
    //         console.log('API response:', data);

    //         if (data.payload) {
    //             return NextResponse.redirect(new URL(`/businesses/${data.payload.id}/menu`, request.url));
    //         } else {
    //             return NextResponse.redirect(new URL('/businesses', request.url));
    //         }
    //     } catch (error) {
    //         console.error('API request failed:', error);
    //         return NextResponse.redirect(new URL('/businesses', request.url));
    //     }
    // }

    return response;
}

export const config = {
    matcher: ["/businesses/menu"]
};
