import type { FormControl } from '@/lib/FormControls';
import type { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { useCallback, useState } from 'react';

export function FormItem({
    formControl,
    setOutsideError,
}: {
    formControl: FormControl;
    setOutsideError: Dispatch<SetStateAction<string | null>>;
}) {
    const [error, setError] = useState<string | void>();

    const handleChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const validationResult = formControl.validate(e.target.value);
            setError(validationResult);
            setOutsideError(!!validationResult ? '' : null);
        },
        [formControl, setOutsideError]
    );

    return (
        <div className="form-control w-full">
            <label className="label" htmlFor={formControl.id}>
                <span
                    className={`label-text ${
                        !!formControl.required ? 'required' : ''
                    }`}
                >
                    {formControl.label}
                </span>
            </label>
            <div className={`${formControl.hasPretext ? 'join' : ''} w-full`}>
                {formControl.hasPretext && (
                    <div className="join-item flex w-16 place-items-center bg-base-300">
                        <span className="w-full text-center">
                            {formControl.pretext}
                        </span>
                    </div>
                )}
                <input
                    name={formControl.id}
                    required={formControl.required}
                    onChange={handleChange}
                    id={formControl.id}
                    type={formControl.type || 'text'}
                    placeholder={formControl.placeholder}
                    className="input-bordered input join-item w-full"
                />
            </div>
            {!!error && (
                <label className="label">
                    <span className="label-text-alt text-error">{error}</span>
                </label>
            )}
        </div>
    );
}
