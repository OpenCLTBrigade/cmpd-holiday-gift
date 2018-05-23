import { Module } from '@nestjs/common';
import { CmpdController } from './cmpd.controller';

@Module({
  controllers: [CmpdController]
})
export class CmpdModule {}
