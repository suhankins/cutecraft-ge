export function FacebookButton() {
    return (
        <a
            className="btn-facebook btn flex w-auto flex-nowrap gap-2 px-8"
            href="https://www.facebook.com/groups/2115643001964114/?ref=share"
            target="_blank"
        >
            <span>Facebook</span>
            <img
                alt="Facebook logo"
                src="/static/facebook.png"
                className="inline h-6 w-6"
            />
        </a>
    );
}
