export function FacebookButton() {
    return (
        <a
            className="btn-facebook btn flex w-auto flex-nowrap gap-2 px-8"
            href="https://www.instagram.com/cute_craft.ge/" // TODO: Find them on facebook
            target="_blank"
        >
            <span>@cute_craft.ge</span>
            <img
                alt="Facebook logo"
                src="/static/facebook.png"
                className="inline h-6 w-6"
            />
        </a>
    );
}
