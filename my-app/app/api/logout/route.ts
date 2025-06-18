import { NextResponse } from 'next/server'
import { serialize } from 'cookie'

export async function POST() {
  const response = NextResponse.json({ message: 'Logged out' }, { status: 200 })

  // Clear the cookie by setting it to empty with an immediate expiry
  response.headers.set(
    'Set-Cookie',
    serialize('token', '', {
      path: '/',
      httpOnly: true,
      expires: new Date(0), // Expire the cookie
    })
  )

  return response
}