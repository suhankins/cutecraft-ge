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

/**
 * Checks for COME_BACK_LATER env variable and redirects to /come-back-later if true.
 *
 * If the user is already on /come-back-later and COME_BACK_LATER is not set, it will redirect to /.
 *
 * Else just returns null.
 */
export function comeBackLaterMiddleware(request: NextRequest) {
    if (checkIfAlreadyOnComeBackLater(request.nextUrl.pathname)) {
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
