import { DemoController } from '@/modules/demo/controllers/demo.controller';
import { Module } from '@nestjs/common';
import { DemoService } from '@/modules/demo/services/demo.service';
import { TerminusModule } from '@nestjs/terminus';
import { HealthCheckController } from '@/modules/demo/controllers/healthCheck.controller'; // Healthcheck module

@Module({
    providers: [DemoService],
    exports: [],
    imports: [TerminusModule],
    controllers: [DemoController, HealthCheckController],
})
export class DemoModule {}
