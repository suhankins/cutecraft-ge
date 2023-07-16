export function InstagramButton() {
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
    </a>;
}
