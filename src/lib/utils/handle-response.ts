import { NextResponse } from "next/server";
import { HttpStatus } from "./http-status";

export const handleResponse = <T extends object,>(data: ApiResponse<T>, status: HttpStatus) => {
    const response = NextResponse.json(data,
        {
            status: status,
        }
    );
    response.headers.set('Cache-Control', 'no-store');
    response.headers.set('Pragma', 'no-cache');
    return response;
};