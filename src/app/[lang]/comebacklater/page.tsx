import { LanguagePickerViewer } from '@/components/LanguagePicker/LanguagePickerViewer';
import { MainBodyWidthContainer } from '@/components/MainBodyWidthContainer';
import CutecraftMap from '@/components/Map/CutecraftMap';
import { FacebookButton } from '@/components/buttons/SocialMediaButtons/FacebookButton';
import { InstagramButton } from '@/components/buttons/SocialMediaButtons/InstagramButton';
import { getDictionary } from '@/lib/getDictionary';
import { Locale, i18n } from '@/lib/i18n-config';
import { MapPinIcon } from '@heroicons/react/24/solid';

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
        <div className="relative flex min-h-screen w-full justify-center sm:items-center">
            <div className="absolute right-2 bottom-2 z-50 sm:hidden">
                <LanguagePickerViewer
                    className="dropdown-top rounded-2xl bg-primary text-primary-content shadow-lg"
                    selectedLang={lang}
                />
            </div>
            <div className="absolute right-2 top-2 z-50 hidden sm:inline-block">
                <LanguagePickerViewer
                    className="rounded-2xl bg-primary text-primary-content shadow-lg"
                    selectedLang={lang}
                />
            </div>
            <MainBodyWidthContainer>
                <main className="my-2 flex flex-col gap-4 rounded-lg border-t-4 border-t-primary sm:grid sm:grid-cols-2 sm:p-4 sm:shadow-xl">
                    <section className="my-4">
                        <h1 className="text-center text-6xl font-bold">
                            Cute Craft
                        </h1>
                        <p className="my-4 text-center">
                            {dictionary.comeBackLater.body}
                        </p>
                        <section className="flex flex-col gap-2">
                            <InstagramButton />
                            <FacebookButton />
                            <p className="flex items-center gap-2 text-lg">
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
                    </section>
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
