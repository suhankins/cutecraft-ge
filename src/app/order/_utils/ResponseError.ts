export class ResponseError extends Error {
    public code;

    constructor(message: string, code: number) {
        super(message);
        this.code = code;
    }
}
