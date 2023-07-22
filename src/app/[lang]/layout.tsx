import { CartProvider } from '@/components/Cart/CartProvider';
import { Footer } from './components/Footer';
import { Locale } from '@/lib/i18n-config';
import { getDictionary } from '@/lib/getDictionary';
import { Navbar } from '@/components/Navbar/Navbar';
import Link from 'next/link';
import { LanguagePickerViewer } from '@/components/LanguagePicker/LanguagePickerViewer';
import { CartDisplay } from '@/components/Cart/CartDisplay';

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
                    {dictionary.companyName ?? 'Cutecraft'}
                </Link>
                <LanguagePickerViewer selectedLang={lang} />
                <CartDisplay />
            </Navbar>
            {children}
            <Footer dictionary={dictionary.footer} />
        </CartProvider>
    );
}
