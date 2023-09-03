import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { useContainer } from 'class-validator';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { LogLevel } from '@nestjs/common/services/logger.service';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    app.enableCors();
    app.setGlobalPrefix('api');
    const configService: ConfigService = app.get<ConfigService>(ConfigService) as ConfigService;
    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
    // Validators as global to be available on each HTTP request
    app.useGlobalPipes(
        new ValidationPipe({
            enableDebugMessages: true,
            whitelist: true,
            forbidNonWhitelisted: true,
            forbidUnknownValues: true,
            skipMissingProperties: false,
            transform: true,
        }),
    );
    app.useLogger(configService.get('app.log') as LogLevel[]);
    await app.listen(configService.get('app.port') as number);
}

bootstrap();
