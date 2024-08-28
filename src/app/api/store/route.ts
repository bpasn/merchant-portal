import { NextRequest, NextResponse } from "next/server";

export const GET = (req: NextRequest) => {
   return NextResponse.json(
        {
            id: 1234
        },
        {
            status: 200
        }
    );
};