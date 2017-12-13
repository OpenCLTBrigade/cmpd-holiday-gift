const pino = require('pino');
const level = process.env.NODE_ENV === 'production' ? 'info' : 'debug';

export default pino({ level, prettyPrint: true });