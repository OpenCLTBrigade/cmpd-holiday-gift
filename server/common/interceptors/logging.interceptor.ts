import { Interceptor, NestInterceptor, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

import logger from '../util/logger';

@Interceptor()
export class LoggingInterceptor implements NestInterceptor {
  intercept(
    dataOrRequest,
    context: ExecutionContext,
    stream$: Observable<any>,
  ): Observable<any> {
    logger.info('Before...');
    const now = Date.now();

    return stream$.do(() => logger.info(`After... ${Date.now() - now}ms`));
  }
}