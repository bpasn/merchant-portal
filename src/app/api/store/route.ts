import { NextRequest, NextResponse } from "next/server";

export const GET = (req: NextRequest) => {
    return NextResponse.json(
        {
            payload: [
                {
                    id: "store-id-1",
                    name: "store 1"
                },
                {
                    id: "store-id-2",
                    name: "store 2"
                },
                {
                    id: "store-id-3",
                    name: "store 3"
                },
            ]
        },
        {
            status: 200
        }
    );
};