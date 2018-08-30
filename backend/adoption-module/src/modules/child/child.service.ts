import { Injectable } from '@nestjs/common';
import { Child } from '../entities/child';
// import { createPagedResults } from '../lib/table/table';

@Injectable()
export class ChildService {
  async getAll({ active = true } = {}) {
    return await Child.find({ where: { deleted: false } });
  }

  async getById(id: number) {
    return await Child.findOneById(id);
  }
}
