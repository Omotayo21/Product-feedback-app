import { NextResponse, NextRequest } from "next/server";


export function middleware(NextRequest) {
   const path = NextRequest.nextUrl.pathname

   const isPublicPath = path === '/' || path === '/signup'|| path === '/login' 

const token =  NextRequest.cookies.get('token')?.value || ''
if(isPublicPath && token) {
    return NextResponse.redirect(new URL('/home', NextRequest.nextUrl))
}
if(!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', NextRequest.nextUrl))
}
}



export const config = {
    matcher:[
        '/',
        '/login',
        '/signup',
       
     

    ]
}
