import { CartProvider } from '@/app/_components/Cart/CartProvider';
import { Footer } from './_components/Footer';
import { Locale } from '@/lib/i18n-config';
import { getDictionary } from '@/lib/getDictionary';
import { Navbar } from '@/app/_components/Navbar';
import Link from 'next/link';
import { LanguagePickerViewer } from '@/app/[lang]/_components/LanguagePickerViewer';
import { CartDisplay } from '@/app/_components/Cart/CartDisplay';

export default async function Layout({
    children,
    params: { lang },
}: {
    children: React.ReactNode;
    params: { lang: Locale };
}) {
    const dictionary = await getDictionary(lang);

    return (
        <CartProvider>
            <Navbar>
                <Link href="/" className="btn-ghost btn text-xl normal-case">
                    {dictionary.companyName}
                </Link>
                <ul className="menu menu-horizontal flex-grow items-center justify-center">
                    <li>
                        <Link href="/">{dictionary.links.homeLink}</Link>
                    </li>
                    <li>
                        <Link href="/catalog">
                            {dictionary.links.catalogLink}
                        </Link>
                    </li>
                    <li>
                        <Link href="/about">{dictionary.links.aboutLink}</Link>
                    </li>
                    <li>
                        <Link href="/contact">
                            {dictionary.links.contactLink}
                        </Link>
                    </li>
                </ul>
                <LanguagePickerViewer selectedLang={lang} />
                <CartDisplay />
            </Navbar>
            <main className="h-full w-full flex-grow">{children}</main>
            <Footer dictionary={dictionary.links} />
        </CartProvider>
    );
}
