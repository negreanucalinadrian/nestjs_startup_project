import ApplicationException from '@/exceptions/application.exception';

export default class ExpiredTokenException extends ApplicationException {
    constructor(msg: string) {
        super(msg);
        Object.setPrototypeOf(this, ExpiredTokenException.prototype);
    }
}
