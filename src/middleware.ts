// src/middleware.ts
import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  const { supabase, response } = createClient(request)

  // This will refresh the session if it's expired
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // If the user is trying to access an admin route
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // If there's no active session, redirect to login
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // If there is a session, check the user's role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single()

    // If the user is not an admin, redirect them to the home page
    if (profile?.role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return response
}

// Config to specify which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}