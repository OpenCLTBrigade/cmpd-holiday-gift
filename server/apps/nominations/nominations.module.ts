import { Module } from '@nestjs/common';
import { HouseholdController } from './controllers/household.controller';

@Module({
    controllers: [HouseholdController]
})
export class NominationsModule{}