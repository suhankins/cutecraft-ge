import { Locale, i18n } from '@/lib/i18n-config';

export const metadata = {
    title: {
        absolute: 'Cute Craft',
        template: '%s | Cute Craft',
    },
    colorScheme: 'light',
    metadataBase: new URL('https://cute-craft.com/'),
    openGraph: {
        siteName: 'Cute Craft',
        title: 'Cute Craft',
    },
};

interface Params {
    children: React.ReactNode;
    params: { lang: Locale };
}

export const revalidate = false;
export async function generateStaticParams() {
    return i18n.locales.map((locale) => ({
        lang: locale,
    }));
}

export default function Layout({ children, params: { lang } }: Params) {
    return (
        <html lang={lang}>
            <body>{children}</body>
        </html>
    );
}
