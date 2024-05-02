import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const redirectLocation = 'comebacklater';

/**
 * Checks if user is on /comeBackLater.
 */

export function isOnComeBackLater(pathname: string) {
    const splitPathname = pathname.split('/');
    return (
        splitPathname.at(-1) === redirectLocation &&
        splitPathname.length <= 3 &&
        (splitPathname.at(1) === redirectLocation ||
            splitPathname.at(2) === redirectLocation)
    );
}

async function checkIfLoggedIn(req: NextRequest) {
    const token = await getToken({ req });
    return !!token;
}

export async function isRedirectNotNeeded(req: NextRequest, pathname: string) {
    const splitPathname = pathname.split('/');
    return (
        (await checkIfLoggedIn(req)) ||
        isOnComeBackLater(pathname) ||
        splitPathname.at(-1) === 'admin' ||
        splitPathname.at(1) === 'admin' ||
        splitPathname.at(1) === 'api' ||
        splitPathname.at(-1) === 'api'
    );
}

/**
 * Checks for COME_BACK_LATER env variable and redirects to /come-back-later if true.
 *
 * If the user is already on /come-back-later and COME_BACK_LATER is not set, it will redirect to /.
 *
 * Else just returns null.
 */
export async function comeBackLaterMiddleware(request: NextRequest) {
    if (process.env.COME_BACK_LATER === 'true') {
        if (await isRedirectNotNeeded(request, request.nextUrl.pathname)) {
            return null;
        }
        return NextResponse.redirect(
            new URL('/' + redirectLocation, request.url)
        );
    } else {
        if (isOnComeBackLater(request.nextUrl.pathname)) {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    return null;
}
