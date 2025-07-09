import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

const middleware = withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const pathname = req.nextUrl.pathname

    // Admin-only routes
    if (pathname.startsWith("/admin") && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/unauthorized", req.url))
    }

    // Seller-only routes
    if (pathname.startsWith("/seller") && token?.role !== "SELLER" && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/unauthorized", req.url))
    }

    // Require login for dashboard
    if (pathname.startsWith("/dashboard") && !token) {
      return NextResponse.redirect(new URL("/login", req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname

        // Allow public access to login, homepage, auth APIs, products
        if (
          pathname.startsWith("/api/auth") ||
          pathname === "/" ||
          pathname.startsWith("/login") ||
          pathname.startsWith("/products")
        ) {
          return true
        }

        return !!token // Protect everything else
      },
    },
  }
)

export { middleware } // ✅ Named export required by Next.js

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/seller/:path*",
    "/api/trpc/:path*",
  ]
}
