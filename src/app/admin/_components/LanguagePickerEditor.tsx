import { Locale, i18n } from '@/lib/i18n-config';
import { useCallback } from 'react';

export function LanguagePickerEditor({
    className = '',
    selectedLang,
    setLang,
}: {
    className?: string;
    selectedLang: Locale;
    setLang: (lang: Locale) => void;
}) {
    const languages = i18n.locales;
    const selectRef = useCallback(
        (selectElement: HTMLSelectElement) => {
            if (!selectElement) {
                return;
            }
            setLang(selectElement.value as Locale);
        },
        [setLang]
    );
    return (
        <select
            ref={selectRef}
            className={`select uppercase ${className}`}
            onChange={(event) => {
                setLang(event.target.value as Locale);
            }}
            defaultValue={selectedLang}
        >
            {languages.map((lang, index) => (
                <option className="uppercase" key={index}>
                    {lang}
                </option>
            ))}
        </select>
    );
}
