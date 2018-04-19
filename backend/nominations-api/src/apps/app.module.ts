import { MiddlewaresConsumer, Module, RequestMethod } from '@nestjs/common';
import { GraphQLFactory, GraphQLModule } from '@nestjs/graphql';
import { graphqlExpress } from 'apollo-server-express';
import { mergeSchemas } from 'graphql-tools';
import { UploadMiddleware } from '../common/middlewares/upload.middleware';
import config from '../config';
import { AuthModule } from './auth/auth.module';
import auth from './lib/auth';
import { NominationsModule } from './nominations/nominations.module';
import { typeDefs } from './nominations/affiliations.schema';

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
  modules: [GraphQLModule, AuthModule, NominationsModule]
})
export class AppModule {
  constructor(private readonly graphQLFactory: GraphQLFactory) {}

  configure(consumer: MiddlewaresConsumer): void {
    consumer.apply(auth.authMiddleware(config.jwtSecrets.auth)).forRoutes(authRoutes);
    consumer.apply(auth.authMiddleware(config.jwtSecrets.nominations)).forRoutes(nominationRoutes);
    consumer.apply(auth.sessionMiddleware).forRoutes(allRoutes);

    consumer.apply(UploadMiddleware).forRoutes({
      path: '/api/nominations/:id/upload',
      method: RequestMethod.PUT
    });

    this.setupGraphQl(consumer);
  }

  setupGraphQl(consumer: MiddlewaresConsumer) {
    const localSchema = this.graphQLFactory.createSchema({ typeDefs });
    const delegates = this.graphQLFactory.createDelegates();

    const schema = mergeSchemas({
      schemas: [localSchema],
      resolvers: delegates
    });
    consumer
      .apply(graphqlExpress(req => ({ schema, rootValue: req })))
      .forRoutes({ path: '/graphql', method: RequestMethod.ALL });
  }
}
