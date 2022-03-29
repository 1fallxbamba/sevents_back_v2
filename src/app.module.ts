import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SeventModule } from './sevent/sevent.module';

import { ormConfig } from './config/ormconfig';

@Module({
  imports: [
    MulterModule.register({ dest: './public/images' }),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(ormConfig),
    SeventModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
