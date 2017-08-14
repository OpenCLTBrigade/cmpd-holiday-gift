// @flow

import type {$Request, $Response} from 'express';

export type Request = $Request & {
  user: $TODO
};

export type Response = $Response;

export type Next = (?string) => void;

export type Middleware = (Request, Response, Next) => (void | Promise<void>);

export interface Router {
  get(string, ...Middleware[]): void;
};
