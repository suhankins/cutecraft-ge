import { CartProvider } from '@/components/Cart/CartProvider';
import { Footer } from './components/Footer';
import { Locale } from '@/lib/i18n-config';
import { getDictionary } from '@/lib/getDictionary';

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
            {children}
            <Footer dictionary={dictionary.footer} />
        </CartProvider>
    );
}
