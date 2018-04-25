import { Module } from '@nestjs/common';
import { TrackingController } from './tracking.controller';
import { HouseholdService } from '../households';
@Module({
  controllers: [TrackingController],
  components: [HouseholdService]
})
export class TrackingModule {}
