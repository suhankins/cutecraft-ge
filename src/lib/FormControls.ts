import type { HTMLInputTypeAttribute } from 'react';

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

export type FormControl = ReturnType<typeof getFormControls>[number];

export const formControls: RawFormControl[] = [
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
            if (value.match(/[^0-9\s()-]/gi) !== null)
                return dictionary.invalidPhone;
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

export const getFormControls = (dictionary: {
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
