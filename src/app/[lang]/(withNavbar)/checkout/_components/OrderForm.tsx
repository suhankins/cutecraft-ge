'use client';

import { createRef, useMemo, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useFormControls } from './useFormControls';
import { FormItem } from './FormItem';
import { useSendForm } from './useSendForm';

export function OrderForm({
    dictionary,
}: {
    dictionary: {
        labels: { [id: string]: string };
        placeholders: { [id: string]: string };
        pretexts: { [id: string]: string };
        errors: {
            recaptcha: string;
            somethingWentWrong: string;
        };
        order: string;
        howToContactYou: string;
    };
}) {
    const [error, setError] = useState<string | null>(null);
    const [onSubmit, loading] = useSendForm(setError, dictionary.errors);

    const recaptchaRef = createRef<ReCAPTCHA>();
    const formControls = useFormControls(dictionary);

    const disabled = useMemo(() => error !== null || loading, [error, loading]);

    return (
        <form
            className="flex w-full flex-col items-center gap-2"
            onSubmit={onSubmit}
        >
            <h1 className="text-center text-xl">
                {dictionary.howToContactYou}
            </h1>
            <fieldset className="grid grid-cols-2 gap-2">
                {formControls.map((formControl, index) => (
                    <FormItem
                        setOutsideError={setError}
                        key={index}
                        formControl={formControl}
                    />
                ))}
            </fieldset>
            <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ''}
                onChange={() => setError(null)}
            />
            {error !== null && error !== '' && (
                <label className="label">
                    <span className="label-text-alt text-error">{error}</span>
                </label>
            )}
            <button
                className="btn-success btn-block btn"
                type="submit"
                disabled={disabled}
            >
                {loading ? (
                    <span className="loading loading-spinner"></span>
                ) : (
                    dictionary.order
                )}
            </button>
        </form>
    );
}
