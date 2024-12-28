import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  const { data: { session } } = await supabase.auth.getSession()

  // If user is not signed in and trying to access protected routes
  if (!session && (
    req.nextUrl.pathname === '/fellowships' ||
    req.nextUrl.pathname === '/bookmarked'
  )) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  // If user is signed in and trying to access auth pages
  if (session && (
    req.nextUrl.pathname === '/login' ||
    req.nextUrl.pathname === '/signup'
  )) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return res
}

export const config = {
  matcher: [
    '/',
    '/fellowships',
    '/bookmarked',
    '/login',
    '/signup',
    '/auth/callback'
  ]
}
