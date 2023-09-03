import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import ApplicationException from "../exceptions/application.exception";

@Catch()
export class GlobalErrorFilter implements ExceptionFilter {
    constructor(private readonly configService: ConfigService) {}
    private readonly logger = new Logger(GlobalErrorFilter.name);

    catch(exception: any, host: ArgumentsHost) {
        this.logger.error(exception.message);
        this.logger.error(exception.stack);
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        // Transform the exception into an HttpException
        let generalErrorText: string;
        let status: number;
        switch (exception.name) {
            case 'EntityNotFoundError':
                status = 404;
                generalErrorText = 'Not found';
                break;
            case 'UnauthorizedException':
                status = 401;
                generalErrorText = 'Expired token';
                break;
            default:
                status = 500;
                generalErrorText = 'Internal server error';
                break;
        }
        // Show the actual error message if not in production or if it is an extension of ApplicationException which
        // intends to inform the user of the actual error message
        if (
            this.configService.get<string>('app.environment', 'production') !== 'production' ||
            exception instanceof ApplicationException
        ) {
            generalErrorText = exception.message;
            if (exception.status) {
                status = exception.status;
            }
        }
        const transformedException = new HttpException(generalErrorText, status);
        response.status(transformedException.getStatus()).json({
            message: transformedException.message,
        });
    }
}
