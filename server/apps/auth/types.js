// @flow

import type { $Request, $Response } from 'express';

export type Response = $Response;

export type Request = $Request & { body: Object, user: $TODO };
