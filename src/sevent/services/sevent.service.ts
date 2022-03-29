import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { SeventEntity } from '../models/sevent.entity';
import { Sevent } from '../models/sevent.model';

@Injectable()
export class SeventService {
  constructor(
    @InjectRepository(SeventEntity)
    private readonly seventRepository: Repository<SeventEntity>,
  ) {}

  saveSevent(sevent: Sevent) {
    return this.seventRepository.save(sevent);
  }

  findSevents() {
    return this.seventRepository.find();
  }

  findSevent(code?: string) {
    return this.seventRepository.findOneBy({ code });
  }

  updateSevent(code: string, sevent: Sevent) {
    return this.seventRepository.update(code, sevent);
  }

  deleteSevent(code: string) {
    return this.seventRepository.delete(code);
  }
}
