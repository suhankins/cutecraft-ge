'use client';

import { Locale, i18n } from '@/lib/i18n-config';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function LanguagePickerViewer({
    selectedLang,
    className,
}: {
    selectedLang: Locale;
    className?: string;
}) {
    const languages = i18n.locales;
    const pathname = usePathname();
    const pathnameWithoutLocale = pathname.split('/').slice(2).join('/');

    return (
        <div className={`dropdown ml-auto ${className ?? ''}`}>
            <label tabIndex={0} className="btn-ghost btn m-1 flex gap-2">
                <span>{selectedLang}</span>
                <ChevronDownIcon className="h-4 w-4" />
            </label>
            <ul
                tabIndex={0}
                className="dropdown-content menu rounded-box bg-base-200 p-2 uppercase text-neutral shadow-lg"
            >
                {languages.map(
                    (locale) =>
                        locale !== selectedLang && (
                            <li key={locale}>
                                <Link
                                    scroll={false}
                                    prefetch={false}
                                    replace
                                    href={`/${locale}/${pathnameWithoutLocale}`}
                                >
                                    {locale}
                                </Link>
                            </li>
                        )
                )}
            </ul>
        </div>
    );
}
