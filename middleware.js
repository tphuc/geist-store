import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  return
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/shop/category', '/en/shop/category/all', '/vi/shop/category/all'],
}