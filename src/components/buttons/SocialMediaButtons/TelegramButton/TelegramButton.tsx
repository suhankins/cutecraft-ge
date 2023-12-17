/* eslint-disable @next/next/no-img-element */
import { socialMedia } from '@/lib/socialMedia';
import styles from './TelegramButton.module.scss';

export function TelegramButton() {
    return (
        <a
            className={`${styles.telegramButton} btn flex w-auto flex-nowrap gap-2 px-8`}
            href={socialMedia.telegram}
            target="_blank"
        >
            <span>@suhankin_ge</span>
            <img
                alt="Telegram logo"
                src="/static/telegram.svg"
                className="inline h-6 w-6"
            />
        </a>
    );
}
