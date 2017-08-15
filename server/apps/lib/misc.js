

import type { BaseRequest } from '../types';

module.exports = {
  rootUrl: (req: BaseRequest): string =>
    `${req.protocol || 'http'}://${(req.get('host'): any)}`,
  baseUrl: (req: BaseRequest): string => 
    `${req.protocol || 'http'}://${(req.get('host'): any)}${req.path || ''}`
};
