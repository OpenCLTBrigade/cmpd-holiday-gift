// @flow

import type { Request } from '../lib/typed-express';

module.exports = {
  rootUrl: (req: Request<>): string =>
    `${req.protocol || 'http'}://${(req.get('host'): any)}`,
  baseUrl: (req: Request<>): string =>
    `${req.protocol || 'http'}://${(req.get('host'): any)}${req.path || ''}`
};
