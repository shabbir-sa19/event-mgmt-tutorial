
import { type NextRequest, NextResponse } from 'next/server'
import { auth } from './lib/auth'

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  })
  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  const path = request.nextUrl.pathname
  const employeeAllowedPath =
    path === "/dashboard" || path.startsWith("/dashboard/profile")

  if (session.user.role !== "admin" && !employeeAllowedPath) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*'],
}