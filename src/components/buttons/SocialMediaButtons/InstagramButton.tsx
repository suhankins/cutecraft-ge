import { socialMedia } from '@/lib/socialMedia';

export function InstagramButton() {
    return (
        <a
            className="btn-instagram btn flex w-auto flex-nowrap gap-2 px-8"
            href={socialMedia.instagram}
            target="_blank"
        >
            <span>@cute_craft.ge</span>
            <img
                alt="Instagram logo"
                src="/static/instagram.svg"
                className="inline h-6 w-6"
            />
        </a>
    );
}
