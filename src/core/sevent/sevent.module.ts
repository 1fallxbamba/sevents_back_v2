import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SeventService } from './services/sevent.service';
import { SeventEntity } from './models/sevent.entity';
import { SeventController } from './controllers/sevent.controller';
import { AuthModule } from '../authentication/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([SeventEntity]), AuthModule],
  providers: [SeventService],
  controllers: [SeventController],
})
export class SeventModule {}
