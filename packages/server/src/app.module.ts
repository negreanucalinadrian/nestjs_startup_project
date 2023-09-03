import { Logger, MiddlewareConsumer, Module, NestModule, OnApplicationBootstrap, RequestMethod } from '@nestjs/common';
import app from './config/app.config';
import database from './config/database.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import { APP_FILTER } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ServeStaticModuleOptions } from '@nestjs/serve-static/dist/interfaces/serve-static-options.interface';
import { GlobalErrorFilter } from './filters/global-error.filter';
import { DemoModule } from './modules/demo/demo.module';
import { LoginMiddleware } from './middlewares/login.middleware';
import { join } from 'path';
import { UserModule } from "@/modules/user/user.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `${__dirname}/.env`,
            load: [() => ({ app: app() }), () => ({ database: database() })],
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => {
                return configService.get('database') as TypeOrmModuleOptions;
            },
            inject: [ConfigService],
        }),

        // import { EventEmitterModule } from '@nestjs/event-emitter';
        // EventEmitterModule.forRoot({ wildcard: true, delimiter: '.' }),
        // import { ScheduleModule } from '@nestjs/schedule';
        // ScheduleModule.forRoot(),

        ServeStaticModule.forRootAsync({
            inject: [],
            useFactory: () => {
                const staticRoutes: ServeStaticModuleOptions[] = [
                    {
                        rootPath: join(__dirname, '..', 'dist_client'),
                        exclude: ['/api/(.*)'],
                    },
                ];
                return staticRoutes;
            },
        }),
        DemoModule,
        UserModule,
    ],
    controllers: [],
    providers: [
        {
            provide: APP_FILTER,
            useClass: GlobalErrorFilter,
        },
    ],
})
export class AppModule implements NestModule, OnApplicationBootstrap {
    private readonly logger = new Logger(AppModule.name);

    constructor(private readonly configService: ConfigService) {}

    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoginMiddleware)
          .exclude({ path: 'demo', method: RequestMethod.ALL }, { path: 'healthcheck', method: RequestMethod.ALL })
          .forRoutes({ path: '*', method: RequestMethod.ALL });
    }

    async onApplicationBootstrap() {
        // logic to run right after deploy
        this.logger.warn('Application started');
    }
}
