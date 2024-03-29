import { getDictionary } from '@/lib/getDictionary';
import { Locale, i18n } from '@/lib/i18n-config';
import { MainBodyWidthContainer } from '@/components/MainBodyWidthContainer';
import { InstagramButton } from '@/components/buttons/SocialMediaButtons/InstagramButton/InstagramButton';
import { FacebookButton } from '@/components/buttons/SocialMediaButtons/FacebookButton/FacebookButton';
import { TelegramButton } from '@/components/buttons/SocialMediaButtons/TelegramButton/TelegramButton';
import DynamicMap from '@/components/Map/DynamicMap';

export const revalidate = false;
export async function generateStaticParams() {
    return i18n.locales.map((locale) => ({
        lang: locale,
    }));
}

export default async function Home({
    params: { lang },
}: {
    params: { lang: Locale };
}) {
    const dictionary = await getDictionary(lang);

    return (
        <MainBodyWidthContainer className="py-4">
            <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-2">
                <div>
                    <h1 className="text-4xl font-bold">
                        {dictionary.contactUs.header}
                    </h1>
                    <p>{dictionary.contactUs.body}</p>
                    <div className="mt-2 flex w-full flex-wrap gap-2 md:flex-col">
                        <InstagramButton />
                        <FacebookButton />
                        <TelegramButton />
                    </div>
                </div>
                <div className="h-96">
                    <DynamicMap
                        apiKey={process.env.GOOGLE_MAPS_API_KEY ?? ''}
                        lang={lang}
                        markerText={dictionary.contactUs.markerText}
                    />
                </div>
            </div>
        </MainBodyWidthContainer>
    );
}
