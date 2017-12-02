// @flow

const pino = require('pino');
const level = process.env.NODE_ENV === 'production' ? 'info' : 'debug';

module.exports = pino({ level, prettyPrint: true });