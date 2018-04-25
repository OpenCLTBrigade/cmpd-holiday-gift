import { Module } from '@nestjs/common';

import { AffiliationService } from './affiliation.service';
import { AffiliationController } from './affiliation.controller';

@Module({
  controllers: [AffiliationController],
  components: [AffiliationService]
})
export class AffiliationsModule {}
