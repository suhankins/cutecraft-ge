import { CategoryModel, SimpleCategory } from '@/models/Category';
import { getDictionary } from '@/lib/getDictionary';
import { Locale } from '@/lib/i18n-config';
import { Hero } from './_components/Hero';
import { CategoryGrid } from '@/components/Category/CategoryGrid';
import { MainBodyWidthContainer } from '@/components/MainBodyWidthContainer';
import { ContactUs } from './_components/ContactUs';
import Link from 'next/link';

async function getCategories() {
    const categories = (
        await CategoryModel.find()
            .sort([['priority', 'desc']])
            .limit(6)
    ).map((category) => category.toObject() as SimpleCategory);
    return categories;
}

export default async function Home({
    params: { lang },
}: {
    params: { lang: Locale };
}) {
    const categories = await getCategories();
    const dictionary = await getDictionary(lang);

    return (
        <>
            <Hero lang={lang} dictionary={dictionary.hero} />
            <MainBodyWidthContainer>
                <CategoryGrid categories={categories} lang={lang} />
                <Link
                    href={`/${lang}/catalog`}
                    className="btn btn-primary btn-wide mx-auto"
                >
                    {dictionary.seeMore}
                </Link>
            </MainBodyWidthContainer>
            <ContactUs lang={lang} dictionary={dictionary.contactUs} />
        </>
    );
}
