import { MiddlewareConsumer, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
// import { typeDefs } from './modules/affiliations';
import { AffiliationsModule } from './modules/affiliations';
import { AuthModule } from './modules/auth';
import { CmpdModule } from './modules/cmpd/cmpd.module';
import { HouseholdsModule } from './modules/households';
import { TrackingModule } from './modules/tracking';
import { UsersModule } from './modules/users/users.module';
import { AppController } from './app.controller';

// const allRoutes = {
//   path: '*',
//   method: RequestMethod.ALL
// };

// const nominationRoutes = {
//   path: 'api/nominations/*',
//   method: RequestMethod.ALL
// };

// const authRoutes = {
//   path: 'api/auth/*',
//   method: RequestMethod.ALL
// };

@Module({
  modules: [GraphQLModule, AuthModule, HouseholdsModule, AffiliationsModule, TrackingModule, UsersModule, CmpdModule],
  controllers: [AppController]
})
export class AppModule {
  constructor() {}

  configure(consumer: MiddlewareConsumer): void {
    // consumer.apply(auth.authMiddleware(config.jwtSecrets.auth)).forRoutes(authRoutes);
    // consumer.apply(auth.authMiddleware(config.jwtSecrets.nominations)).forRoutes(nominationRoutes);
    // consumer.apply(auth.sessionMiddleware).forRoutes(allRoutes);
    // consumer.apply(UploadMiddleware).forRoutes({
    //   path: '/api/nominations/:id/upload',
    //   method: RequestMethod.PUT
    // });
    this.setupGraphQl(consumer);
  }

  setupGraphQl(_: MiddlewareConsumer) {
    // const localSchema = this.graphQLFactory.createSchema({ typeDefs });
    // const delegates = this.graphQLFactory.createDelegates();
    // const schema = mergeSchemas({
    //   schemas: [localSchema],
    //   resolvers: delegates
    // });
    // consumer
    //   .apply(graphqlExpress(req => ({ schema, rootValue: req })))
    //   .forRoutes({ path: '/graphql', method: RequestMethod.ALL });
  }
}
