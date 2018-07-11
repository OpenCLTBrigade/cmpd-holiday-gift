import { Module } from '@nestjs/common';
import { ChildController } from './child.controller';
import { ChildService } from './child.service';

@Module({
  controllers: [ChildController],
  components: [ChildService]
})
export class ChildrenModule {}
