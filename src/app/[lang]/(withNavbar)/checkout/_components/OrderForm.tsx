'use client';

import { createRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useFormControls } from './useFormControls';
import { FormItem } from './FormItem';

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
    const [loading, setLoading] = useState(false);

    const recaptchaRef = createRef<ReCAPTCHA>();

    const formControls = useFormControls(dictionary);

    return (
        <form className="flex w-full flex-col items-center gap-2">
            <h1 className="text-center text-xl">
                {dictionary.howToContactYou}
            </h1>
            <div className="grid grid-cols-2 gap-2">
                {formControls.map((formControl, index) => (
                    <FormItem key={index} formControl={formControl} />
                ))}
            </div>
            <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ''}
                onChange={() => setError(null)}
            />
            <button
                className="btn-success btn-block btn"
                type="submit"
                disabled={!!error || loading}
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
