import { getDictionary } from '@/lib/getDictionary';
import { Locale, i18n } from '@/lib/i18n-config';
import { MainBodyWidthContainer } from '@/components/MainBodyWidthContainer';
import { FacebookButton } from '@/components/buttons/SocialMediaButtons/FacebookButton/FacebookButton';
import { InstagramButton } from '@/components/buttons/SocialMediaButtons/InstagramButton/InstagramButton';
import { OrderId } from './_components/OrderId';
import { TelegramButton } from '@/components/buttons/SocialMediaButtons/TelegramButton/TelegramButton';

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
        <MainBodyWidthContainer className="py-4 text-center">
            <h1 className="text-4xl">{dictionary.orderSuccess.thankYou}</h1>
            <p className="text-2xl">
                {dictionary.orderSuccess.orderIdIs}{' '}
                <b>
                    <OrderId />
                </b>
            </p>
            <p className="text-lg">
                {dictionary.orderSuccess.weWillContactYou}
            </p>
            <div className="mx-auto flex w-96 flex-col gap-2">
                <InstagramButton />
                <FacebookButton />
                <TelegramButton />
            </div>
        </MainBodyWidthContainer>
    );
}
