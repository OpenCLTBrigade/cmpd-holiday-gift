import { Module } from '@nestjs/common';
import { HouseholdController } from './controllers/household.controller';
import { UserController } from './controllers/user.controller';

@Module({
    controllers: [HouseholdController, UserController]
})
export class NominationsModule{}