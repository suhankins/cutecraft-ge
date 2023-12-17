import { CartProvider } from '@/components/Cart/CartProvider';
import { Footer } from './_components/Footer';
import { Locale, i18n } from '@/lib/i18n-config';
import { getDictionary } from '@/lib/getDictionary';
import { Navbar } from '@/components/Navbar/Navbar';
import Link from 'next/link';
import { LanguagePickerViewer } from '@/components/LanguagePicker/LanguagePickerViewer';
import { CartDisplay } from '@/components/Cart/CartDisplay';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { WhatsAppButton } from '@/components/buttons/SocialMediaButtons/WhatsAppButton/WhatsAppButton';

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

export default async function layout({ children, params: { lang } }: Params) {
    const dictionary = await getDictionary(lang);

    return (
        <CartProvider>
            <WhatsAppButton>{dictionary.whatsAppButton}</WhatsAppButton>
            <Navbar>
                <div className="dropdown sm:hidden">
                    <label tabIndex={0} className="btn-ghost btn m-1">
                        <Bars3Icon className="h-6 w-6" />
                    </label>
                    <ul
                        tabIndex={0}
                        className="dropdown-content menu rounded-box z-[1] w-52 bg-base-100 p-2 shadow"
                    >
                        <li>
                            <Link href={`/${lang}`}>
                                {dictionary.links.homeLink}
                            </Link>
                        </li>
                        <li>
                            <Link href={`/${lang}/catalog`}>
                                {dictionary.links.catalogLink}
                            </Link>
                        </li>
                        <li>
                            <Link href={`/${lang}/contact`}>
                                {dictionary.links.contactLink}
                            </Link>
                        </li>
                    </ul>
                </div>
                <Link
                    href={`/${lang}`}
                    className="btn-ghost btn text-xl normal-case"
                >
                    {dictionary.companyName}
                </Link>
                <ul className="menu menu-horizontal hidden flex-grow items-center justify-center sm:inline-flex">
                    <li>
                        <Link href={`/${lang}`}>
                            {dictionary.links.homeLink}
                        </Link>
                    </li>
                    <li>
                        <Link href={`/${lang}/catalog`}>
                            {dictionary.links.catalogLink}
                        </Link>
                    </li>
                    <li>
                        <Link href={`/${lang}/contact`}>
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
