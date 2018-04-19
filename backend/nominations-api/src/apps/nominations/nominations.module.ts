import { UserService } from './service/user.service';
import { Module } from '@nestjs/common';

import {
  HouseholdController,
  UserController,
  AffiliationController,
  TrackingController,
  CmpdController
} from './controllers';
import { AffiliationService } from './service/affiliation.service';
import { HouseholdService } from './service/household.service';
import { AffiliationsResolver } from './affiliation.resolver';

@Module({
  controllers: [HouseholdController, UserController, TrackingController, AffiliationController, CmpdController],
  components: [AffiliationService, HouseholdService, UserService, AffiliationsResolver]
})
export class NominationsModule {}
