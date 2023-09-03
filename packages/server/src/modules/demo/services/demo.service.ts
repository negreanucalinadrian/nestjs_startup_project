import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class DemoService {
    private readonly logger = new Logger(DemoService.name);

    getHello(): string {
        this.logger.warn('Called getHello()');
        return 'Hello World!';
    }
}
