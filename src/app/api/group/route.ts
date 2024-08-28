import { NextRequest, NextResponse } from "next/server";

export const GET = (req: NextRequest) => {
    return NextResponse.json({
        status: 200,
        payload: [
            {
                id: 1,
                name: "group1"
            },
            {
                id: 2,
                name: "group2"
            },
        ]
    }, { status: 200 });
};