import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt';


const secret = process.env.NEXTAUTH_SECRET

export async function middleware(req:NextRequest) {
  const token = await getToken({ req, secret })

  if(token &&( req.nextUrl.pathname.startsWith('/sign-in') || req.nextUrl.pathname.startsWith('/signup')) ){
    return  NextResponse.redirect(new URL('/dashboard', req.url))
  }
  else if( !token && (req.nextUrl.pathname.startsWith('/dashboard')|| req.nextUrl.pathname.startsWith('/publish') )){
    return  NextResponse.redirect(new URL('/sign-in', req.url))

  }
}
export const config = {
    matcher: ['/sign-in', '/signup', '/dashboard', '/publish'],
  }