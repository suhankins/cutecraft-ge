import { getDictionary } from '@/lib/getDictionary';
import { Locale, i18n } from '@/lib/i18n-config';
import { CartViewer } from './_components/CartViewer';
import { OrderForm } from './_components/OrderForm';
import { MainBodyWidthContainer } from '@/components/MainBodyWidthContainer';

export const revalidate = false;
export async function generateStaticParams() {
    return i18n.locales.map((locale) => ({
        lang: locale,
    }));
}

export default async function Page({
    params: { lang },
}: {
    params: { lang: Locale };
}) {
    const dictionary = await getDictionary(lang);

    return (
        <MainBodyWidthContainer className="my-4 grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
            <CartViewer lang={lang} dictionary={dictionary.cartViewer} />
            <OrderForm lang={lang} dictionary={dictionary.orderForm} />
        </MainBodyWidthContainer>
    );
}
