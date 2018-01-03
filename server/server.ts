import { NestFactory } from '@nestjs/core';
import { AppModule } from './apps/app.module';
import config from './config';
import logger from './apps/lib/logger';
import { AnyExceptionFilter } from './common/filters/any-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new AnyExceptionFilter());

  const port = process.env.PORT || config.port;
  await app.listen(port, () => {
    if (config.verbose) {
      logger.info('Express server listening on port ' + port);
    }

    if (process.send) {
      process.send({
        port,
        dbPath: config.db.storage
      });
    }
  });
}
bootstrap();
