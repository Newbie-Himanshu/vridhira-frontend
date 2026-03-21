import { NextRequest, NextResponse } from "next/server"

/**
 * Redirect root to default region
 */
export function middleware(request: NextRequest) {
  // Redirect / to /in (default region)
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/in", request.url))
  }

  // Pass through all other requests
  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|assets|png|svg|jpg|jpeg|gif|webp).*)",
  ],
}
