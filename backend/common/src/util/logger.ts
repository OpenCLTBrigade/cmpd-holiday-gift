import * as pino from 'pino';
const level = process.env.NODE_ENV === 'production' ? 'info' : 'debug';

export const logger = pino({ level, prettyPrint: true });

export default logger;
