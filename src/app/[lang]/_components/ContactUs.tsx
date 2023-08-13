import { MainBodyWidthContainer } from '@/components/MainBodyWidthContainer';
import CutecraftMap from '@/components/Map/CutecraftMap';
import { FacebookButton } from '@/components/buttons/SocialMediaButtons/FacebookButton';
import { InstagramButton } from '@/components/buttons/SocialMediaButtons/InstagramButton';

export function ContactUs({
    dictionary: { header, body, markerText },
}: {
    dictionary: {
        header: string;
        body: string;
        markerText: string;
    };
}) {
    return (
        <section className="mt-2 flex w-full items-center bg-base-200 py-4">
            <MainBodyWidthContainer>
                <div className="grid w-full grid-cols-2 gap-2">
                    <div>
                        <h1 className="text-4xl font-bold">{header}</h1>
                        <p>{body}</p>
                        <div className="mt-2 flex gap-2">
                            <InstagramButton />
                            <FacebookButton />
                        </div>
                    </div>
                    <div className="h-96">
                        <CutecraftMap markerText={markerText} />
                    </div>
                </div>
            </MainBodyWidthContainer>
        </section>
    );
}
