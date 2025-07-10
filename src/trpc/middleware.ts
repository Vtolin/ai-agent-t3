import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const middleware = withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;

    // Protect student dashboard and AI agent pages
    if (pathname.startsWith("/dashboard") && !token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname;

        // Public access allowed to home, login, register, public resources
        if (
          pathname === "/" ||
          pathname.startsWith("/login") ||
          pathname.startsWith("/register") ||
          pathname.startsWith("/api/auth")
        ) {
          return true;
        }

        // Everything else requires login
        return !!token;
      },
    },
  }
);

export { middleware };

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/api/trpc/:path*",
    "/planner/:path*",
    "/summarizer/:path*",
    "/explainer/:path*",
    "/research/:path*",
  ],
};
