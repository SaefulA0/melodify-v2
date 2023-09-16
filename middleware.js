import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  // const token = await getToken({ req, secret: process.env.JWT_SECRET });

  // const { pathname } = req.nextUrl;

  // if (pathname.includes("/api/auth") || token) {
  //   return NextResponse.next();
  // }

  // if (!token && pathname !== "/login") {
  //   return NextResponse.rewrite(new URL("/login", req.url));
  // }

  if (req.nextUrl.pathname === "/") {
    const session = await getToken({
      req,
      secret: process.env.JWT_SECRET,
      secureCookie: process.env.NODE_ENV === "production",
    });
    // You could also check for any property on the session object,
    // like role === "admin" or name === "John Doe", etc.
    if (!session) {
      const url = req.nextUrl.clone();
      url.pathname = "/login";

      return NextResponse.redirect(url);
    }
    // If user is authenticated, continue.
  }
}
