import { getFormControls } from '@/lib/FormControls';
import { useMemo } from 'react';

export function useFormControls(dictionary: {
    labels: { [id: string]: string };
    placeholders: { [id: string]: string };
    errors: { [id: string]: string };
    pretexts: { [id: string]: string };
}) {
    const formControls = useMemo(
        () => getFormControls(dictionary),
        [dictionary]
    );
    return formControls;
}
