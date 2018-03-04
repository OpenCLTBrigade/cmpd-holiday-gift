import * as pino from 'pino';
const isProduction = process.env.NODE_ENV === 'production';
const level = isProduction ? 'info' : 'debug';

const logger = pino({ level, prettyPrint: isProduction ? false : true });

export default logger;

export const logStart = (...args) => logger.debug('Start...', ...args);
export const logEnd = (...args) => logger.debug('End...', ...args);
