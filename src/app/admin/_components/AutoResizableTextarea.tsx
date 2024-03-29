import {
    FormEvent,
    ForwardedRef,
    HTMLAttributes,
    forwardRef,
    useCallback,
    useEffect,
} from 'react';

export type AutoResizableTextareaParams = {
    allowNewLine?: boolean;
} & HTMLAttributes<HTMLTextAreaElement>;

const TextArea = (
    { allowNewLine, defaultValue, ...props }: AutoResizableTextareaParams,
    ref: ForwardedRef<HTMLTextAreaElement>
) => {
    const resizeTextarea = useCallback((textarea: HTMLElement) => {
        textarea.style.height = '0';
        const height = textarea.scrollHeight > 32 ? textarea.scrollHeight : 32;
        textarea.style.height = `${height}px`;
    }, []);

    const onClick = useCallback(
        (event: React.MouseEvent) => {
            const target = event.target;
            if (!(target instanceof HTMLElement)) {
                return;
            }
            resizeTextarea(target);
        },
        [resizeTextarea]
    );

    const onInput = useCallback(
        (event: FormEvent) => {
            const target = event.target as HTMLTextAreaElement;
            if (!allowNewLine) {
                target.value = target.value.replaceAll(/[\r\n\v]+/g, ''); // removing all new line symbols
            }
            resizeTextarea(target);
        },
        [allowNewLine, resizeTextarea]
    );

    useEffect(() => {
        if (!ref) return;
        if (typeof ref === 'function') return;
        setTimeout(() => resizeTextarea(ref.current as HTMLTextAreaElement), 0);
    }, [ref, defaultValue, resizeTextarea]);

    return (
        <textarea
            defaultValue={defaultValue}
            ref={ref}
            onInput={onInput}
            onChange={onInput}
            onClick={onClick}
            {...props}
        />
    );
};

export const AutoResizableTextarea = forwardRef(TextArea);
