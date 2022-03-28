import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import 'dotenv/config';

import { SeventEntity } from '../sevent/models/sevent.entity';

export const ormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.PG_HOST,
  port: parseInt(process.env.PG_PORT),
  username: process.env.PG_USER,
  password: process.env.PG_PWD,
  database: process.env.PG_DB,
  entities: [SeventEntity],
  autoloadEntities: true,
};
