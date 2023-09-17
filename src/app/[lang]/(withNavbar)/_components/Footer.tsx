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
    links: link[];
    children?: React.ReactNode;
}) => {
    return (
        <section className="flex h-full flex-col items-start justify-start">
            {links.map((link, index) => {
                return (
                    <Link
                        key={index}
                        className="link-hover link"
                        href={link.href}
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
    lang: string;
    dictionary: {
        companyName: string;
        aboutLink: string;
        contactLink: string;
        catalogLink: string;
        cartLink: string;
        privacyPolicyLink: string;
        termsOfServiceLink: string;
    };
}

export function Footer({
    lang,
    dictionary: {
        companyName,
        aboutLink,
        contactLink,
        catalogLink,
        cartLink,
        privacyPolicyLink,
        termsOfServiceLink,
    },
}: FooterProps) {
    return (
        <footer className="footer footer-center bg-neutral p-4 text-neutral-content">
            <MainBodyWidthContainer className="w-full">
                <div className="grid w-full grid-cols-3">
                    <Section
                        links={[
                            { name: companyName, href: `/${lang}` },
                            { name: aboutLink, href: `/${lang}/about` },
                            { name: contactLink, href: `/${lang}/contact` },
                            { name: catalogLink, href: `/${lang}/catalog` },
                            { name: cartLink, href: `/${lang}/cart` },
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
                        ]}
                    />
                    <Section
                        links={[
                            {
                                name: privacyPolicyLink,
                                href: `/${lang}/privacy-policy`,
                            },
                            {
                                name: termsOfServiceLink,
                                href: `/${lang}/terms-of-service`,
                            },
                        ]}
                    >
                        <p>&copy; 2023</p>
                    </Section>
                </div>
            </MainBodyWidthContainer>
        </footer>
    );
}
