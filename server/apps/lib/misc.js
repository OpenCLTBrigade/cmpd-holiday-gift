// @flow

import type { $Request } from 'express';

module.exports = { rootUrl: (req: $Request): string => req.protocol + '://' + ((req.get('host'): any): string) };
