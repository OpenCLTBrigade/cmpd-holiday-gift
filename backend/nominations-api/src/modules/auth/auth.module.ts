import { Module } from '@nestjs/common';

import { authProviders } from './auth.providers';

import { DatabaseModule } from '../../instances/database.module';
import { HttpStrategy } from './http.strategy';
import { AccountService } from './v2/account.service';
import { AuthController } from './v2/auth.controller';

@Module({
  modules: [DatabaseModule],
  controllers: [AuthController],
  components: [...authProviders, HttpStrategy, AccountService]
})
export class AuthModule {}
