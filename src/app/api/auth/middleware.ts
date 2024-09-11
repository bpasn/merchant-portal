import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from 'next-auth';
export const middleware = (
    handler: <P>(request: NextRequest, params?: P) => Promise<NextResponse>
) => async (req: NextRequest) => {
    const session = await getServerSession();
    if (!session) {
        return handler(req);
    }
    return NextResponse.json({
        message: "Unauthorization",
        status: 401
    }, {
        status: 401
    })
}