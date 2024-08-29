import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt';


const secret = process.env.NEXTAUTH_SECRET

export async function middleware(req:NextRequest) {
  const token = await getToken({ req, secret })

  if(token){
    return  NextResponse.redirect(new URL('/dashboard', req.url))
  }
  else if( !token && req.nextUrl.pathname.startsWith('/dashboard')){
    return  NextResponse.redirect(new URL('/sign-in', req.url))

  }
}
export const config = {
    matcher: ['/sign-in', '/signup', '/dashboard'],
  }