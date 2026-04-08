import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getLocaleFromHostname } from '@/lib/i18n'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''
  const locale = getLocaleFromHostname(hostname)

  // Pass locale to server components via modified REQUEST headers.
  // NextResponse.next({ request }) forwards the modified headers to the app —
  // server components can then read them via headers() from 'next/headers'.
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-locale', locale)

  return NextResponse.next({
    request: { headers: requestHeaders },
  })
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|studio).*)'],
}
