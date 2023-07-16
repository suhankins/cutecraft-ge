import 'server-only';
/**
 * File name standard for images uploaded to the server.
 * Adds some random numbers to the end of the file name to avoid duplicate file names.
 */
export function getFileName(
    id: string,
    filetype: string,
    itemIndex?: number
): string {
    return `${id}_${itemIndex ?? 'category'}_${
        Math.random().toString().split('.').at(-1) ?? 0
    }.${filetype}`;
}
