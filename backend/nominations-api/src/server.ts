import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from './config';
import logger from './modules/lib/logger';
import { AnyExceptionFilter } from './common/filters/any-exception.filter';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('CMPD Explorers')
    .setDescription('The CMPD API specification')
    .setVersion('1.0')
    .addTag('auth')
    .addTag('nominations')
    .addTag('users')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/swagger', app, document);

  app.useGlobalInterceptors(new LoggingInterceptor());
  app.enableCors();

  const port = process.env.PORT || config.port;

  await app.listen(port, () => {
    if (config.verbose) {
      logger.info('Express server listening on port ' + port);
    }
  });
}
bootstrap();
