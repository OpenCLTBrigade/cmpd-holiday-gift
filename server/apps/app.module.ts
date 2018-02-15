import { Module, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { NominationsModule } from './nominations/nominations.module';
import { AuthModule } from './auth/auth.module';
import auth from './lib/auth';
import config from '../config';
import { UploadMiddleware } from '../common/middlewares/upload.middleware';

const allRoutes = {
  path: '*',
  method: RequestMethod.ALL
};

const nominationRoutes = {
  path: 'api/nominations/*',
  method: RequestMethod.ALL
};

const authRoutes = {
  path: 'api/auth/*',
  method: RequestMethod.ALL
};

@Module({
  modules: [AuthModule, NominationsModule]
})
export class AppModule {
  configure(consumer: MiddlewaresConsumer): void {
    consumer
      .apply(auth.authMiddleware(config.jwtSecrets.auth))
      .forRoutes(authRoutes);
    consumer
      .apply(auth.authMiddleware(config.jwtSecrets.nominations))
      .forRoutes(nominationRoutes);
    consumer.apply(auth.sessionMiddleware).forRoutes(allRoutes);

    consumer.apply(UploadMiddleware).forRoutes({
      path: '/api/nominations/:id/upload',
      method: RequestMethod.PUT
    });
  }
}
