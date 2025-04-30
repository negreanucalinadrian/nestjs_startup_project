import {TypeOrmModuleOptions} from '@nestjs/typeorm';
import * as path from 'path';

export default () =>
  ({
    type: process.env.DB_DIALECT || 'mysql',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    connectTimeout: process.env.DB_CONNECTION_TIMEOUT,
    synchronize: process.env.DB_SYNC === 'true',
    logging: process.env.DB_LOG === 'true',
    autoLoadEntities: true,
    pool: {
      min: process.env.DB_POOL_MIN_SIZE || 2,
      max: process.env.DB_POOL_MAX_SIZE || 400,
    },
    migrationsRun: true,
    migrations: [path.resolve(__dirname, '../migrations/*.js')],
  } as TypeOrmModuleOptions);
