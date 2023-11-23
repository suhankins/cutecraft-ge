/* eslint-disable @next/next/no-img-element */
import styles from './WhatsAppButton.module.scss';

export function WhatsAppButton({ children }: { children: React.ReactNode }) {
    return (
        <a
            href="https://api.whatsapp.com/send?phone=995599048735"
            className={`${styles.whatsAppButton} gap-2' btn fixed right-2 bottom-2 z-40 flex h-auto flex-col items-center py-2`}
        >
            <p>{children}</p>
            <img
                alt="Instagram logo"
                src="/static/whatsapp.svg"
                className="h-8 w-8"
            />
        </a>
    );
}
