'use client';

import Link from 'next/link';
import { DrawerLink } from './DrawerLink';
import { useId, useRef } from 'react';
import { Header } from './Header';
import { Navbar } from '../Navbar/Navbar';
import { BurgerIcon } from './BurgerIcon';

export interface DrawerProps {
    children: React.ReactNode;
    navbarElements?: React.ReactNode;
    headers?: Header[];
    name?: string;
}

export function Drawer({
    children,
    navbarElements,
    name,
    headers,
}: DrawerProps) {
    const drawerInputId = useId();
    const topId = useId();
    const drawerContentId = useId();
    const drawerCheckboxRef = useRef<HTMLInputElement>(null);
    return (
        <div className="drawer">
            <input
                ref={drawerCheckboxRef}
                id={drawerInputId}
                type="checkbox"
                className="drawer-toggle"
            />
            <div
                className="drawer-content flex flex-col items-center"
                id={drawerContentId}
            >
                <Navbar>
                    <div className="flex-none">
                        <label
                            htmlFor={drawerInputId}
                            className="btn-ghost btn-square btn"
                        >
                            <BurgerIcon />
                        </label>
                    </div>
                    <Link
                        href="/"
                        className="btn-ghost btn text-xl normal-case"
                    >
                        {name ?? 'Cutecraft'}
                    </Link>
                    {navbarElements}
                </Navbar>
                <div id={topId} className="absolute top-0 left-0" />
                {children}
            </div>
            <aside className="drawer-side" aria-label="Table of contents">
                <label
                    htmlFor={drawerInputId}
                    className="drawer-overlay"
                ></label>
                <ul className="menu h-full w-60 gap-2 bg-base-100 p-4">
                    <DrawerLink
                        isStep={false}
                        className="text-2xl font-bold"
                        header={{
                            name: name ?? 'Slivki',
                            id: topId,
                        }}
                        drawerCheckboxRef={drawerCheckboxRef}
                    />
                    <li>
                        <ul>
                            {headers?.map((header) => (
                                <DrawerLink
                                    key={header.id}
                                    header={header}
                                    drawerCheckboxRef={drawerCheckboxRef}
                                />
                            ))}
                        </ul>
                    </li>
                </ul>
            </aside>
        </div>
    );
}
