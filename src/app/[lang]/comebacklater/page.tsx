import { MainBodyWidthContainer } from '@/components/MainBodyWidthContainer';
import CutecraftMap from '@/components/Map/CutecraftMap';
import { FacebookButton } from '@/components/buttons/SocialMediaButtons/FacebookButton';
import { InstagramButton } from '@/components/buttons/SocialMediaButtons/InstagramButton';
import { getDictionary } from '@/lib/getDictionary';
import type { Locale } from '@/lib/i18n-config';
import { MapPinIcon } from '@heroicons/react/24/solid';

export default async function Page({
    params: { lang },
}: {
    params: { lang: Locale };
}) {
    const dictionary = await getDictionary(lang);

    return (
        <div className="flex w-full items-center justify-center sm:h-screen">
            <MainBodyWidthContainer>
                <main className="my-2 flex flex-col gap-4 rounded-lg border-t-4 border-t-primary sm:grid sm:grid-cols-2 sm:p-4 sm:shadow-xl">
                    <div className="my-4">
                        <h1 className="text-center text-6xl font-bold">
                            Cute Craft
                        </h1>
                        <p className="my-4 text-center">
                            {dictionary.comeBackLater.body}
                        </p>
                        <section className="flex flex-col gap-2">
                            <InstagramButton />
                            <FacebookButton />
                            <p className="flex gap-2 text-lg">
                                <MapPinIcon className="h-8 w-8" />
                                <a
                                    href="https://goo.gl/maps/WHyzFHXsr8LEgtb49"
                                    className="link"
                                    target="_blank"
                                >
                                    {dictionary.comeBackLater.address}
                                </a>
                            </p>
                        </section>
                    </div>
                    <section className="h-96 w-full">
                        <CutecraftMap
                            lang={lang}
                            markerText={dictionary.contactUs.markerText}
                        />
                    </section>
                </main>
            </MainBodyWidthContainer>
        </div>
    );
}
