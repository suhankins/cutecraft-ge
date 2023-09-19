/* eslint-disable @next/next/no-img-element */
import { socialMedia } from '@/lib/socialMedia';
import styles from './FacebookButton.module.scss';

export function FacebookButton() {
    return (
        <a
            className={`${styles.facebookButton} btn flex w-auto flex-nowrap gap-2 px-8`}
            href={socialMedia.facebook}
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
