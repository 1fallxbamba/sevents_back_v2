import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs';

import { Repository } from 'typeorm';

import { SeventEntity } from '../models/sevent.entity';
import { Sevent } from '../models/sevent.model';

@Injectable()
export class SeventService {
  constructor(
    @InjectRepository(SeventEntity)
    private readonly seventRepository: Repository<SeventEntity>,
  ) {}

//   createSevent(sevent: Sevent): Observable<Sevent> {
//     return this.seventRepository.save(sevent);
//   }
}
