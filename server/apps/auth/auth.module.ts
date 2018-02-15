import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';

import { authProviders } from './auth.providers';
import { AccountService } from './account.service';
import { DatabaseModule } from '../../instances/database.module';

@Module({
  modules: [DatabaseModule],
  controllers: [AuthController],
  components: [...authProviders, AccountService]
})
export class AuthModule {}
