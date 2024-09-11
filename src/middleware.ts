import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export default async function middleware(req: NextRequest, event: NextFetchEvent) {
    const token = await getToken({ req });

    const isAuthentication = !!token;

    if ((req.nextUrl.pathname.startsWith("/sign-in") || req.nextUrl.pathname.startsWith("/sign-up") )&& isAuthentication) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    const authMiddlware = withAuth({
        pages: {
            signIn: "/sign-in"
        },
        callbacks: {
            async authorized({ req, token, }) {
              const { pathname } = req.nextUrl;
        
              // อนุญาตให้เข้าถึงหน้า sign-in และ sign-up ได้เสมอ
              if (pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up") && !token) {
                return true;
              }
        
              // อนุญาตเฉพาะเมื่อมี token (ผู้ใช้ล็อกอินแล้ว)
              return !!token;
            },
          },
    });
    // @ts-expect-error
    return authMiddlware(req, event);
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
};
