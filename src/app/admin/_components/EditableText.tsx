import {
    Dispatch,
    HTMLInputTypeAttribute,
    SetStateAction,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { AutoResizableTextarea } from './AutoResizableTextarea';
import { mutate } from 'swr';

export type HTMLTextField = HTMLInputElement & HTMLTextAreaElement;
export type HTMLTextFieldAttributes =
    React.InputHTMLAttributes<HTMLInputElement> &
        React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export interface EditableTextProps extends HTMLTextFieldAttributes {
    textarea?: boolean;
    className?: string;
    disabled?: boolean;
    defaultValue?: string;
    /**
     * The HTTP method to use when updating the value. PATCH by default.
     */
    method?: string;
    /**
     * Allows for string to be completely erased. False by default.
     */
    nullable?: boolean;
    /**
     * Allows for new line characters in textarea. False by default.
     */
    allowNewLine?: boolean;
    setLoading?: Dispatch<SetStateAction<boolean>>;
    /**
     * The URL to fetch to update the value
     * @example '/api/category/1'
     */
    fetchUrl: string;
    /**
     * The name of the value in the request body
     * @example 'name_en'
     */
    valueName?: string;
    /**
     * The type of the input field
     * @default 'text'
     */
    type?: HTMLInputTypeAttribute;
}

export function EditableText({
    textarea,
    allowNewLine,
    nullable,
    className = '',
    defaultValue,
    fetchUrl,
    method = 'PATCH',
    valueName = 'value',
    type = 'text',
    setLoading: setOutsideLoading,
    disabled,
    ...props
}: EditableTextProps) {
    const fieldRef = useRef<HTMLTextField>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => setOutsideLoading?.(loading), [loading, setOutsideLoading]);

    const reset = useCallback(() => {
        if (!fieldRef.current) return;
        fieldRef.current.value = defaultValue ?? '';
    }, [defaultValue]);

    const updateCategory = useMemo(
        () => async () => {
            if (!fieldRef.current) return;

            let newValue: string | null = fieldRef.current.value.trim();

            if (newValue === '') {
                if (!nullable || !defaultValue) {
                    reset();
                    return;
                }
                newValue = null;
            }
            if (newValue !== defaultValue) {
                setLoading(true);
                const result = await fetch(fetchUrl, {
                    body: JSON.stringify({ [valueName]: newValue }),
                    method: method,
                    headers: { 'Content-Type': 'application/json' },
                });
                if (result.status === 200) {
                    await mutate('/api/category');
                } else {
                    reset();
                }
                setLoading(false);
            }
        },
        [fetchUrl, valueName, defaultValue, method, nullable, reset]
    );

    const classNameProp = useMemo(
        () => `${className} ${loading && 'skeleton'}`,
        [className, loading]
    );
    const disabledProp = useMemo(
        () => loading || disabled,
        [loading, disabled]
    );
    const onBlur = useCallback(() => updateCategory(), [updateCategory]);
    const onKeyUp = useCallback(
        (e: React.KeyboardEvent) => {
            if (e.key === 'Enter' && !allowNewLine) {
                e.preventDefault();
                updateCategory();
            }
        },
        [updateCategory, allowNewLine]
    );

    useEffect(() => {
        if (!fieldRef.current || defaultValue === undefined) return;
        fieldRef.current.value = defaultValue;
    }, [defaultValue]);

    return (
        <>
            {textarea ? (
                <AutoResizableTextarea
                    defaultValue={defaultValue}
                    ref={fieldRef}
                    allowNewLine={allowNewLine}
                    className={classNameProp}
                    aria-busy={loading}
                    onBlur={onBlur}
                    onKeyUp={onKeyUp}
                    {...props}
                />
            ) : (
                <input
                    defaultValue={defaultValue}
                    ref={fieldRef}
                    type={type}
                    className={classNameProp}
                    disabled={disabledProp}
                    aria-busy={loading}
                    onBlur={onBlur}
                    onKeyUp={onKeyUp}
                    {...props}
                />
            )}
        </>
    );
}
