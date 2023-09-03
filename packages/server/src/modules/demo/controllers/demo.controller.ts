import { Controller, Get, Logger } from '@nestjs/common';
import { DemoService } from '../services/demo.service';

@Controller('demo')
export class DemoController {
    private readonly logger = new Logger(DemoController.name);

    constructor(private readonly appService: DemoService) {}

    @Get('/')
    getHello(): string {
        this.logger.warn('Called getHello()');
        return this.appService.getHello();
    }
}
