// @flow

const Express = require('express');

const proxy: any = undefined;

import type { $Response } from 'express';

export type Request<Params: { [string]: string } = {}> = {
  +body: ?{},
  +query: ?{},
  +protocol: 'https' | 'http',
  get('host'): 'string',
  +path: string,
  +params: Params
};

export type AuthRequest<User, Params: { [string]: string } = {}> = Request<Params> & {
  +user: User
};

export type Response = $Response;

export type Error = mixed;

export type Fail = (Error) => void;

export type Next = Fail | () => void;

export type Middleware<ReqIn, ReqOut> = (ReqIn) => [ReqOut, (ReqIn, Response, Next) => void];

export type ErrorHandler<Req> = (Error, Req, Response, Next) => void;

export type Handler<Req> = (Req, Response, Fail) => void;

export type AsyncHandler<Req> = (Req, Response, Fail) => Promise<void>;

type Action = 'get' | 'post';

function wrapAsync<Req>(handler: AsyncHandler<Req>): Handler<Req> {
  return (req, res, fail) => {
    handler(req, res, fail).then((_: void) => {}).catch(fail);
  };
}

class Chain<Req: Request<>> {
  router: Express.Router;
  action: Action;
  path: string;
  middleware: any[];

  constructor(router: Express.Router, action: Action, path: string, middleware: ?any[] = null) {
    this.router = router;
    this.action = action;
    this.path = path;
    this.middleware = middleware ? middleware : [];
  }

  use<ReqOut: Request<>>(middleware: Middleware<Req, ReqOut>): Chain<ReqOut> {
    const pair = middleware((undefined: any));
    return new Chain(this.router, this.action, this.path, [...this.middleware, pair[1]]);
  }

  handle(handler: Handler<Req>) {
    (this.router: any)[this.action].apply(this.router, [this.path, ...this.middleware, handler]);
  }

  handleAsync(handler: AsyncHandler<Req>) {
    (this.router: any)[this.action].apply(this.router, [this.path, ...this.middleware, wrapAsync(handler)]);
  }
}

type Parameters = { [string]: string };

class Router<Req: Request<>> {
  router: Express.Router;

  constructor() {
    this.router = Express.Router();
  }

  get<Params: Parameters>(path: string, _: Params = ({}: any)): Chain<Req & {params: Params}> {
    return new Chain(this.router, 'get', (path: string));
  }

  post<Params: Parameters>(path: string, _: Params = ({}: any)): Chain<Req & {params: Params}> {
    return new Chain(this.router, 'post', (path: string));
  }
}

module.exports = { Router, proxy };
