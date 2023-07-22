import { MainBodyWidthContainer } from '@/components/MainBodyWidthContainer';
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
        <footer className="footer footer-center bg-neutral p-4 text-neutral-content">
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
                                href: 'https://www.facebook.com/cutecraftph', // TODO: Real URLS
                            },
                            {
                                name: 'Instagram',
                                href: 'https://www.instagram.com/cutecraftph', // TODO: Real URLS
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
                    >
                        <p>&copy; 2023</p>
                    </Section>
                </div>
            </MainBodyWidthContainer>
        </footer>
    );
}
