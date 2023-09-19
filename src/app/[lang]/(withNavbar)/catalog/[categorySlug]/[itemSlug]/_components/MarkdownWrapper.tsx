'use client';

import Markdown from 'marked-react';
import { MarkdownProps } from 'marked-react/dist/Markdown';

interface MarkdownWrapperProps extends MarkdownProps {
    children?: string;
}

export function MarkdownWrapper({ children, ...props }: MarkdownWrapperProps) {
    return <Markdown {...props}>{children}</Markdown>;
}
