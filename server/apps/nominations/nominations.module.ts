import { UserService } from './service/user.service';
import { Module } from '@nestjs/common';
import { HouseholdController } from './controllers/household.controller';
import { UserController } from './controllers/user.controller';
import { AffiliationController } from './controllers/affiliation.controller';
import { TrackingController } from './controllers/tracking.controller';
import { AffiliationService } from './service/affiliation.service';
import { HouseholdService } from './service/household.service';
import { CmpdController } from './controllers/cmpd.controller';

@Module({
  controllers: [HouseholdController, UserController, TrackingController, AffiliationController, CmpdController],
  components: [AffiliationService, HouseholdService, UserService]
})
export class NominationsModule {}
