import { Interceptor, NestInterceptor, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import logger from '../util/logger';

@Interceptor()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, stream$: Observable<any>): Observable<any> {
    const [{ method, originalUrl }] = context.getArgs();
    logger.info('Before...', { method, originalUrl });

    const now = Date.now();

    return stream$.pipe(tap(() => logger.info(`After... ${Date.now() - now}ms`, { method, originalUrl })));
  }
}
