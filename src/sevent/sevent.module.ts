import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SeventService } from './services/sevent.service';
import { SeventEntity } from './models/sevent.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SeventEntity])],
  providers: [SeventService],
})
export class SeventModule {}
