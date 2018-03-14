import { Interceptor, NestInterceptor, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

import logger from '../util/logger';

@Interceptor()
export class LoggingInterceptor implements NestInterceptor {
  intercept({ originalUrl = '', method = '' }, context: ExecutionContext, stream$: Observable<any>): Observable<any> {
    logger.info('Before...', { method, originalUrl });

    const now = Date.now();

    return stream$.do(
      () => logger.info(`After... ${Date.now() - now}ms`, { method, originalUrl }),
      ({ message = '' }) =>
        logger.error(`Error... ${Date.now() - now}ms`, {
          method,
          originalUrl,
          message
        })
    );
  }
}
