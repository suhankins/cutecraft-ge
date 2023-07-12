'use client';

import { scrollElementIntoView } from '@/utils/client/scrollElementIntoView';
import { Header } from './Header';
import { useEffect, useMemo, useState } from 'react';

export interface DrawerLinkProps {
    header: Header;
    /**
     * Depth of the header, used for indentation
     */
    depth?: number;
    className?: string;
    isStep?: boolean;
    drawerCheckboxRef?: React.RefObject<HTMLInputElement>;
}

export function DrawerLink({
    header,
    depth: paramDepth = 0,
    className,
    drawerCheckboxRef,
}: DrawerLinkProps) {
    // TODO: Use depth
    const depth = header.depth ?? paramDepth;
    // We can't just use useMemo because while SSR it can't find document
    const [element, setElement] = useState<HTMLElement | null>(null);
    useEffect(
        () => setElement(header.id ? document.getElementById(header.id) : null),
        [header]
    );
    return (
        <li>
            <button
                type="button"
                className={className}
                onClick={() => {
                    scrollElementIntoView(element);
                    drawerCheckboxRef?.current?.click();
                }}
            >
                {header.name}
            </button>
        </li>
    );
}
