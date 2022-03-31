import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SeventService } from './services/sevent.service';
import { SeventEntity } from './models/sevent.entity';
import { SeventController } from './controllers/sevent.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SeventEntity])],
  providers: [SeventService],
  controllers: [SeventController],
})
export class SeventModule {}
