import { NextRequest, NextResponse } from 'next/server';

const redirectLocation = 'comebacklater';

function checkIfAlreadyOnComeBackLater(pathname: string) {
    const splitPathname = pathname.split('/');
    return (
        splitPathname.at(-1) === redirectLocation &&
        (splitPathname.at(1) === redirectLocation ||
            splitPathname.at(2) === redirectLocation)
    );
}

/**
 * Checks for COME_BACK_LATER env variable and redirects to /come-back-later if true
 */
export function comeBackLaterMiddleware(request: NextRequest) {
    if (
        process.env.COME_BACK_LATER &&
        !checkIfAlreadyOnComeBackLater(request.nextUrl.pathname)
    ) {
        return NextResponse.redirect(
            new URL('/' + redirectLocation, request.url)
        );
    }
    return null;
}
