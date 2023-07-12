export function Hero({
    dictionary: { top, bottom },
}: {
    dictionary: {
        top: string;
        bottom: string;
    };
}) {
    return (
        <div
            className="hero relative h-64"
            style={{
                backgroundImage: `url("/static/backgroundPlaceholder.webp")`,
            }}
        >
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">{top}</h1>
                    <p className="mb-5">{bottom}</p>
                </div>
            </div>
            <a
                className="btn-instagram group btn-square btn absolute bottom-4 right-4 flex gap-2 focus:w-auto focus:px-4 sm:w-auto sm:px-4"
                href="https://www.instagram.com/slivki_coffee_ge/"
                target="_blank"
            >
                <span className="hidden group-focus:inline sm:inline">
                    @slivki_coffee_ge
                </span>
                <img
                    alt="Instagram logo"
                    src="/static/instagram.svg"
                    className="inline h-6 w-6"
                />
            </a>
        </div>
    );
}
