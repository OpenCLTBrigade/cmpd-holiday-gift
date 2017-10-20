// @flow

import type { Request } from '../lib/typed-express';

// Quick and dirty fix for GIFT-206 / GIFT-205
const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';

module.exports = {
  rootUrl: (req: Request<>): string =>
    `${protocol}://${(req.get('host'): any)}`,
  baseUrl: (req: Request<>): string =>
    `${protocol}://${(req.get('host'): any)}${req.path || ''}`
};
