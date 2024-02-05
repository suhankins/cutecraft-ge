import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const redirectLocation = 'comebacklater';

/**
 * Checks if user is on /comeBackLater.
 */

export function checkIfAlreadyOnComeBackLater(pathname: string) {
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

export async function checkIfRedirectNeeded(
    req: NextRequest,
    pathname: string
) {
    const splitPathname = pathname.split('/');
    return (
        (await checkIfLoggedIn(req)) ||
        checkIfAlreadyOnComeBackLater(pathname) ||
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
    if (await checkIfRedirectNeeded(request, request.nextUrl.pathname)) {
        if (process.env.COME_BACK_LATER !== 'true') {
            return NextResponse.redirect(new URL('/', request.url));
        }

        return null;
    }

    if (process.env.COME_BACK_LATER === 'true') {
        return NextResponse.redirect(
            new URL('/' + redirectLocation, request.url)
        );
    }

    return null;
}
