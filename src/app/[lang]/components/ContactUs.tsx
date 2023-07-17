import { MainBodyWidthContainer } from '@/components/MainBodyWidthContainer';
import { FacebookButton } from '@/components/buttons/SocialMediaButtons/FacebookButton';
import { InstagramButton } from '@/components/buttons/SocialMediaButtons/InstagramButton';

export function ContactUs({
    dictionary,
}: {
    dictionary: {
        header: string;
        body: string;
    };
}) {
    return (
        <section className="my-2 flex h-48 w-full items-center bg-base-200 py-4">
            <MainBodyWidthContainer>
                <div className="flex w-full gap-2">
                    <div>
                        <h1 className="text-4xl font-bold">
                            {dictionary.header}
                        </h1>
                        <p>{dictionary.body}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <InstagramButton />
                        <FacebookButton />
                    </div>
                </div>
            </MainBodyWidthContainer>
        </section>
    );
}
