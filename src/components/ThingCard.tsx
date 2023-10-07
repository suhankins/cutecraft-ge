import Link from 'next/link';

export interface CategoryProps {
    href: string;
    children: React.ReactNode;
}

export function ThingCard({ href, children }: CategoryProps) {
    return (
        <Link
            href={href}
            className="card-compact card w-60 max-w-2xl bg-base-200"
        >
            {children}
        </Link>
    );
}
