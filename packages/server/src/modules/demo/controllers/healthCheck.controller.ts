import { Controller, Get } from '@nestjs/common';
import { HealthCheckResult, HealthCheckService } from '@nestjs/terminus';

@Controller('healthcheck')
export class HealthCheckController {
    constructor(private health: HealthCheckService) {}

    @Get('/')
    getHello(): Promise<HealthCheckResult> {
        return this.health.check([]);
    }
}
