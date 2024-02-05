import { NextRequest } from 'next/server';

/**
 * @returns {boolean} true if request doesn't require authentication, false otherwise
 */
export function authMiddleware(request: NextRequest): boolean {
    const url = request.nextUrl.clone();
    const pathname = url.pathname.split('/');
    pathname.shift(); // remove the first empty string
    if (pathname[0] === 'api' || pathname[0] === 'admin') return false;
    return true;
}
