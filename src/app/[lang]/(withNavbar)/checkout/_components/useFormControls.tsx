import { HTMLInputTypeAttribute, useMemo } from 'react';

export type FormControl = ReturnType<typeof getFormControls>[number];

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

const getFormControls = (dictionary: {
    labels: { [id: string]: string };
    placeholders: { [id: string]: string };
    errors: { [id: string]: string };
    pretexts: { [id: string]: string };
}) =>
    formControls.map((control) => ({
        ...control,
        label: dictionary.labels[control.id],
        placeholder: dictionary.placeholders[control.id],
        validate: control.validateFactory(dictionary.errors),
        pretext: control.hasPretext
            ? dictionary.pretexts[control.id]
            : undefined,
        validateFactory: undefined,
    }));

const formControls: RawFormControl[] = [
    {
        id: 'firstname',
        required: true,
        validateFactory: (dictionary) => (value) => {
            value = value.trim();
            if (value.length === 0) return dictionary.required;
        },
    },
    {
        id: 'lastname',
        required: true,
        validateFactory: (dictionary) => (value) => {
            value = value.trim();
            if (value.length === 0) return dictionary.required;
        },
    },
    {
        id: 'phone',
        hasPretext: true,
        type: 'tel',
        validateFactory: (dictionary) => (value) => {
            value = value.trim();
            if (value.length === 0) return;
        },
    },
    {
        id: 'email',
        type: 'email',
        required: true,
        validateFactory: (dictionary) => (value) => {
            value = value.trim();
            if (value.length === 0) return dictionary.required;
            if (!value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]+$/gi))
                return dictionary.invalidEmail;
        },
    },
    {
        id: 'country',
        required: true,
        validateFactory: (dictionary) => (value) => {
            value = value.trim();
            if (value.length === 0) return dictionary.required;
        },
    },
    {
        id: 'city',
        required: true,
        validateFactory: (dictionary) => (value) => {
            value = value.trim();
            if (value.length === 0) return dictionary.required;
        },
    },
];

interface RawFormControl {
    id: string;
    /**
     * Should have text before input box, i.e. +995 before phone number
     */
    hasPretext?: boolean;
    required?: boolean;
    type?: HTMLInputTypeAttribute;
    validateFactory: (dictionary: {
        [id: string]: string;
    }) => (value: string) => string | void;
}
