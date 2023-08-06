import { LanguagePickerViewer } from '@/app/[lang]/_components/LanguagePickerViewer';
import { Navbar } from '@/app/_components/Navbar';
import { GoBackButton } from '@/app/[lang]/checkout/_components/GoBackButton';
import { getDictionary } from '@/lib/getDictionary';
import { Locale, i18n } from '@/lib/i18n-config';
import Link from 'next/link';

export const revalidate = false;
export async function generateStaticParams() {
    return i18n.locales.map((locale) => ({
        lang: locale,
    }));
}

export default async function Layout({
    children,
    params: { lang },
}: {
    children: React.ReactNode;
    params: { lang: Locale };
}) {
    const dictionary = await getDictionary(lang);

    return (
        <>
            <Navbar>
                <GoBackButton />
                <Link href="/" className="btn-ghost btn text-xl normal-case">
                    {dictionary.companyName}
                </Link>
                <LanguagePickerViewer selectedLang={lang} />
            </Navbar>
            <main className="vertical-list mx-auto w-full max-w-screen-md p-4">
                {children}
            </main>
        </>
    );
}
