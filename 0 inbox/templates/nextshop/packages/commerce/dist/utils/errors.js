export class CommerceError extends Error {
    constructor({ message , code , errors  }){
        const error = message ? {
            message,
            ...code ? {
                code
            } : {}
        } : errors[0];
        super(error.message);
        this.errors = message ? [
            error
        ] : errors;
        if (error.code) this.code = error.code;
    }
}
// Used for errors that come from a bad implementation of the hooks
export class ValidationError extends CommerceError {
    constructor(options){
        super(options);
        this.code = "validation_error";
    }
}
export class FetcherError extends CommerceError {
    constructor(options){
        super(options);
        this.status = options.status;
    }
}
