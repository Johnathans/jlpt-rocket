import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // Refresh session if expired
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Define protected routes that require authentication
  const protectedRoutes = [
    '/roadmap',
    '/progress',
    '/review',
    '/profile',
    '/settings',
    '/kanji',
    '/sentences',
    '/vocabulary',
    '/stories',
    '/story',
    '/cloze',
    '/flashcard',
    '/match',
    '/typing',
    '/test',
    '/change-jlpt-level',
  ];

  // Check if current path starts with any protected route
  const isProtectedRoute = protectedRoutes.some(route => 
    req.nextUrl.pathname.startsWith(route)
  );

  // Redirect to login if accessing protected route without session
  if (isProtectedRoute && !session) {
    const redirectUrl = new URL('/login', req.url);
    redirectUrl.searchParams.set('redirect', req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // Redirect to roadmap if accessing login/signup while already logged in
  if ((req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/signup') && session) {
    return NextResponse.redirect(new URL('/roadmap', req.url));
  }

  return res;
}

// Specify which routes this middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api routes
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|api).*)',
  ],
};
