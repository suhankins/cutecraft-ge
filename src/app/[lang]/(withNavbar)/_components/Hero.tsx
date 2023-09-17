import Link from 'next/link';

export function Hero({
    lang,
    dictionary: { top, bottom, catalogButton },
}: {
    lang: string;
    dictionary: {
        top: string;
        bottom: string;
        catalogButton: string;
    };
}) {
    return (
        <div
            className="hero relative mb-4 h-64"
            style={{
                backgroundImage: `url("/static/backgroundPlaceholder.webp")`,
            }}
        >
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content flex w-full flex-col items-start px-8 text-primary">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">{top}</h1>
                    <p className="mb-5">{bottom}</p>
                </div>
                <Link
                    href={`/${lang}/catalog`}
                    className="btn-primary btn-wide btn absolute bottom-8 self-end"
                >
                    {catalogButton}
                </Link>
            </div>
        </div>
    );
}
