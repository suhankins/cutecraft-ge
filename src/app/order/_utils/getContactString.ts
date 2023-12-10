export function getContactString(
    contactInfo: {
        label: string;
        content: FormDataEntryValue | null;
    }[]
) {
    return contactInfo
        .map((info) => `${info.label}: ${info.content}`)
        .join('\n');
}
