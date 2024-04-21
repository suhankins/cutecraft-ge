import { MainBodyWidthContainer } from '@/components/MainBodyWidthContainer';
import { socialMedia } from '@/lib/socialMedia';
import Link from 'next/link';

interface link {
    name: string;
    href: string;
}

const Section = ({
    links,
    children,
}: {
    links?: link[];
    children?: React.ReactNode;
}) => {
    return (
        <section className="flex h-full w-full flex-col items-start justify-start">
            {links?.map((link, index) => {
                return (
                    <Link
                        key={index}
                        className="link-hover link"
                        href={link.href}
                        replace
                        prefetch={false}
                    >
                        {link.name}
                    </Link>
                );
            })}
            {children}
        </section>
    );
};

export interface FooterProps {
    dictionary: {
        companyName: string;
        contactLink: string;
        catalogLink: string;
        cartLink: string;
    };
}

export function Footer({
    dictionary: { companyName, contactLink, catalogLink, cartLink },
}: FooterProps) {
    return (
        <footer className="footer footer-center bg-neutral p-4 text-neutral-content">
            <MainBodyWidthContainer>
                <div className="flex w-full">
                    <Section
                        links={[
                            { name: companyName, href: `/` },
                            { name: contactLink, href: `/contact` },
                            { name: catalogLink, href: `/catalog` },
                            { name: cartLink, href: `/checkout` },
                        ]}
                    />
                    <Section
                        links={[
                            {
                                name: 'Facebook',
                                href: socialMedia.facebook,
                            },
                            {
                                name: 'Instagram',
                                href: socialMedia.instagram,
                            },
                            {
                                name: 'WhatsApp',
                                href: socialMedia.whatsapp,
                            },
                            {
                                name: 'Telegram',
                                href: socialMedia.telegram,
                            },
                        ]}
                    />
                </div>
            </MainBodyWidthContainer>
        </footer>
    );
}
