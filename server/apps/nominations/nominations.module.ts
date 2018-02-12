import { Module } from '@nestjs/common';
import { HouseholdController } from './controllers/household.controller';
import { UserController } from './controllers/user.controller';
import { AffiliationController } from './controllers/affiliation.controller';
import { TrackingController } from './controllers/tracking.controller';

@Module({
    controllers: [HouseholdController, UserController, TrackingController, AffiliationController]
})
export class NominationsModule{}