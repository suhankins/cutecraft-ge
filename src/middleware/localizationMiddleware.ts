import { i18n, Locale } from '@/lib/i18n-config';
import { NextRequest, NextResponse } from 'next/server';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

/**
 * Tries to get the locale from the cookie. If it doesn't exist, it returns null.
 * @param request
 * @returns {string | null}
 */
function getLocaleFromCookie(request: NextRequest) {
    const prefered = request.cookies.get('language');

    if (prefered && i18n.locales.includes(prefered.value as Locale)) {
        return prefered.value;
    }

    return null;
}

/**
 * Try to get the locale from the Accept-Language header. If locale in the header is not supported, it returns default locale.
 */
function getLocaleFromHeader(request: NextRequest) {
    const negotiatorHeaders: Record<string, string> = {};
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

    // i18n.locales is readonly, so we need to copy it
    const locales = [...i18n.locales];

    const languages = new Negotiator({ headers: negotiatorHeaders }).languages(
        locales
    );

    const locale = match(languages, locales, i18n.defaultLocale);

    return locale;
}

/**
 * Tries to get the locale from the cookie.
 * If it doesn't exist, it tries to get it from the Accept-Language header.
 * Otherwise returns default locale.
 */
function getLocale(request: NextRequest) {
    return getLocaleFromCookie(request) ?? getLocaleFromHeader(request);
}

/**
 * Sets language cookie to the response.
 * Don't forget that you need to return the response.
 */
function setCookie(response: NextResponse, locale: string) {
    response.cookies.set('language', locale);
    return response;
}

/**
 * Checks if url we are trying to access has a locale in it. If not, it redirects to the same url with the locale in it.
 */
export function localizationMiddleware(
    request: NextRequest,
    response: NextResponse
) {
    const pathname = request.nextUrl.pathname;
    // If the url starts with /api/ we don't need to do anything
    if (
        pathname.startsWith('/api/') ||
        pathname.startsWith('/admin') ||
        pathname.startsWith('/order')
    )
        return response;
    const pathnameIsMissingLocale = i18n.locales.every(
        (locale) =>
            !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    if (pathnameIsMissingLocale) {
        const locale = getLocale(request);

        return NextResponse.redirect(
            new URL(`/${locale}/${pathname}`, request.url)
        );
    }

    const chosenLocale = pathname.split('/')[1];
    // Setting a cookie if the locale in the url is different from the locale in the cookie
    if (chosenLocale !== getLocaleFromCookie(request))
        setCookie(response, chosenLocale);
    return response;
}
