'use client';

import { LogoutButton } from './_components/LogoutButton';
import { getCategoryElementId } from '@/utils/client/getCategoryElementId';
import { SimpleCategory } from '@/models/Category';
import { CategoryEditor } from './_components/Category/CategoryEditor';
import { CategorySkeleton } from './_components/Category/CategorySkeleton';
import { useId, useState } from 'react';
import useSwr from 'swr';
import { NewCategory } from './_components/NewCategory';
import { getPosition } from '@/utils/client/Position';
import { Locale, getLocalizedString } from '@/lib/i18n-config';
import { LanguagePickerEditor } from './_components/LanguagePickerEditor';
import { Navbar } from '@/components/Navbar';
import Link from 'next/link';
import { ChangePassword } from './_components/ChangePassword';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function AdminPage() {
    const [lang, setLang] = useState<Locale>('en');
    const categoriesHeaderId = useId();
    const accountHeaderId = useId();

    const { data, error, isLoading } = useSwr<SimpleCategory[]>(
        '/api/category',
        fetcher
    );

    return (
        <>
            <Navbar>
                <Link className="btn btn-ghost" href="/">
                    Back to website
                </Link>
                <LanguagePickerEditor
                    className="ml-auto"
                    selectedLang={lang}
                    setLang={setLang}
                />
                <LogoutButton className="ml-2" />
            </Navbar>
            <main className="vertical-list w-full max-w-screen-lg p-4">
                <h1 className="text-2xl font-bold" id={categoriesHeaderId}>
                    Categories
                </h1>
                {isLoading && <CategorySkeleton />}
                {error && (
                    <div className="alert alert-error shadow-lg">
                        <span>
                            Error! Couldn&apos;t fetch list of categories.
                        </span>
                        <span>Reload the page or call the programmer</span>
                    </div>
                )}
                {data
                    ?.sort((a, b) => (b.index ?? 0) - (a.index ?? 0))
                    .map((category, index) => (
                        <CategoryEditor
                            lang={lang}
                            id={getCategoryElementId(
                                getLocalizedString(category.name, lang),
                                index
                            )}
                            position={getPosition(index, data.length)}
                            category={category}
                            key={category._id.toString()}
                        />
                    ))}
                {data && <NewCategory />}
                <div className="divider" />
                <h1 className="text-2xl font-bold" id={accountHeaderId}>
                    Account
                </h1>
                <ChangePassword />
            </main>
        </>
    );
}
