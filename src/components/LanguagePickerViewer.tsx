'use client';

import { Locale, i18n } from '@/lib/i18n-config';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { usePathname, useSearchParams } from 'next/navigation';

export function LanguagePickerViewer({
    selectedLang,
    className = '',
}: {
    selectedLang: Locale;
    className?: string;
}) {
    const languages = i18n.locales;
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const pathnameWithoutLocale = pathname.split('/').slice(2).join('/');

    return (
        <div className={`dropdown ml-auto ${className}`}>
            <label tabIndex={0} className="btn btn-ghost m-1 flex gap-2">
                <span>{selectedLang}</span>
                <ChevronDownIcon className="h-4 w-4" />
            </label>
            <ul
                tabIndex={0}
                className="menu dropdown-content rounded-box bg-base-200 p-2 uppercase text-neutral shadow-lg"
            >
                {languages.map(
                    (locale) =>
                        locale !== selectedLang && (
                            <li key={locale}>
                                <a
                                    href={`/${locale}/${pathnameWithoutLocale}${
                                        searchParams.size > 0
                                            ? `?${searchParams.toString()}`
                                            : ''
                                    }`}
                                >
                                    {locale}
                                </a>
                            </li>
                        )
                )}
            </ul>
        </div>
    );
}
