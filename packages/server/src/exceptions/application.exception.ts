// This is a base Error class, see global-error.filter.ts.
// The message will be show in JSON format regardless of the environment
export default class ApplicationException extends Error {
    private status: any;
    constructor(msg: string, status = 500) {
        super(msg);
        Object.setPrototypeOf(this, ApplicationException.prototype);
        this.status = status;
    }
}
