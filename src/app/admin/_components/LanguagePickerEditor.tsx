import { Locale, i18n } from '@/lib/i18n-config';

export function LanguagePickerEditor({
    className,
    selectedLang,
    setLang,
}: {
    className?: string;
    selectedLang: Locale;
    setLang: (lang: Locale) => void;
}) {
    const languages = i18n.locales;
    return (
        <select
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
