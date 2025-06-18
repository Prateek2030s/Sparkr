import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'testsecret')

export async function middleware(request: NextRequest) {

  const token = request.cookies.get('token')?.value
  
  if (!token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  try {
    // Use jose instead of jsonwebtoken for edge runtime compatibility
    const { payload } = await jwtVerify(token, SECRET)
    
    const path = request.nextUrl.pathname
    const userRole = payload.role as string

    if (path.startsWith('/teacher') && userRole !== 'teacher') {
      return NextResponse.redirect(new URL('/unauthorised', request.url))
    }

    if (path.startsWith('/student') && userRole !== 'student') {
      return NextResponse.redirect(new URL('/unauthorised', request.url))
    }

    return NextResponse.next()

  } catch (error) {
    return NextResponse.redirect(new URL('/auth', request.url))
  }
}

export const config = {
  matcher: ['/teacher/:path*', '/student/:path*'],
}