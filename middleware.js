import { NextResponse } from 'next/server';

export async function middleware(req) {
    const { nextUrl: url, geo } = req;
    const country = geo.country || 'US';
   

    url.searchParams.set('c', country);

    return NextResponse.rewrite(url);
}