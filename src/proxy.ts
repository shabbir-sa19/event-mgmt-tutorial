import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from './lib/auth'
import { headers } from 'next/headers'

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers
    // headers: await headers()
  })
  if (!session?.user) {
    return NextResponse.redirect(new URL("/login", request.url))
  }
  console.log(session.user.name)
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*'],
}