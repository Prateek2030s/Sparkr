import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { SignJWT } from 'jose'

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'testsecret')

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('Request body:', body)
    
    const { email, role } = body

    // Validate the role
    if (!role || (role !== 'teacher' && role !== 'student')) {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 })
    }
    
    // Create JWT with jose (compatible with edge runtime)
    const token = await new SignJWT({ email, role })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('1h')
      .sign(SECRET)

    const response = NextResponse.json({ success: true })
    response.cookies.set('token', token, { httpOnly: true, path: '/' })
    return response
    
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create token' }, { status: 500 })
  }
}