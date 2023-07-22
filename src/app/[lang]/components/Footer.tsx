import { MainBodyWidthContainer } from '@/components/MainBodyWidthContainer';
import Link from 'next/link';

interface link {
    name: string;
    href: string;
}

const Section = ({ links }: { links: link[] }) => {
    return (
        <section className="flex h-full flex-col items-start justify-end">
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
        </section>
    );
};

export interface FooterProps {
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
        <footer className="footer-center mt-4 w-full bg-neutral p-4 text-neutral-content">
            <MainBodyWidthContainer>
                <div className="grid w-full grid-cols-3">
                    <Section
                        links={[
                            { name: companyName, href: '/' },
                            { name: aboutLink, href: '/about' },
                            { name: contactLink, href: '/contact' },
                            { name: catalogLink, href: '/catalog' },
                            { name: cartLink, href: '/cart' },
                        ]}
                    />
                    <Section
                        links={[
                            {
                                name: 'Facebook',
                                href: 'https://www.facebook.com/cutecraftph',
                            },
                            {
                                name: 'Instagram',
                                href: 'https://www.instagram.com/cutecraftph',
                            },
                        ]}
                    />
                    <Section
                        links={[
                            {
                                name: privacyPolicyLink,
                                href: '/privacy-policy',
                            },
                            {
                                name: termsOfServiceLink,
                                href: '/terms-of-service',
                            },
                        ]}
                    />
                </div>
            </MainBodyWidthContainer>
        </footer>
    );
}
