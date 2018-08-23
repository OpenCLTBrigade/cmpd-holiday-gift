import { Module } from '@nestjs/common';

import { HouseholdController } from './household.controller';

import { HouseholdService } from './household.service';
import { AuthModule } from '../auth';

@Module({
  controllers: [HouseholdController],
  components: [HouseholdService],
  imports: [AuthModule]
})
export class HouseholdsModule {}
