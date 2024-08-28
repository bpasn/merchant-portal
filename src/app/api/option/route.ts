import { NextRequest, NextResponse } from "next/server";

export const GET = (req:NextRequest) => {
    return NextResponse.json({
        status:200,
        payload:[
            {
                id:1,
                name:"option1"
            },
            {
                id:2,
                name:"option2"
            },
        ]
    },{status:200})
}