import { UserService } from './service/user.service';
import { Module } from '@nestjs/common';

import { HouseholdController, UserController, TrackingController, CmpdController } from './controllers';

import { AffiliationController, AffiliationService, AffiliationsResolver } from '../../affiliations';
import { HouseholdService } from './service/household.service';

@Module({
  controllers: [HouseholdController, UserController, TrackingController, AffiliationController, CmpdController],
  components: [AffiliationService, HouseholdService, UserService, AffiliationsResolver]
})
export class NominationsModule {}
