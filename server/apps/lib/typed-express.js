// @flow

var Express = require('express');

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

export type Middleware<ReqIn, ReqOut = ReqIn> = (ReqIn, Response, Next) => void;

export type ErrorHandler<Req> = (Error, Req, Response, Next) => void;

export type Handler<Req> = (Req, Response, Fail) => void;

export type AsyncHandler<Req> = (Req, Response, Fail) => Promise<void>;;

type Route = {
  action: 'get' | 'post',
  path: string,
  middleware: [any]
};

type Action = 'get' | 'post';

function wrapAsync<Req>(handler: AsyncHandler<Req>): Handler<Req> {
  return (req, res, fail) => {
    handler(req, res, fail).then((_: void) => {}).catch(fail);
  }
}

class Chain<Req: Request<>> {
  router: Express.Router;
  action: Action;
  path: string;
  middleware: any[];
  
  constructor(router: Express.Router, action: Action, path: string) {
    this.router = router;
    this.action = action;
    this.path = path;
    this.middleware = [];
  }

  use<ReqOut>(middleware: Middleware<Req, ReqOut>): Chain<ReqOut> {
    this.middleware.push(middleware);
    return (this: any);
  }

  handle(handler: Handler<Req>): void {
    (this.router: any)[this.action].apply(this.router, [this.path, ...this.middleware, handler]);
  }

  handleAsync(handler: AsyncHandler<Req>) {
    (this.router: any)[this.action].apply(this.router, [this.path, ...this.middleware, wrapAsync(handler)]);
  }
}

type Parameters = { [string]: string };

export type Path<Params: Parameters = {}> = string;

class Router<Req: Request<>> {
  router: Express.Router;
  
  constructor() {
    this.router = Express.Router();
  }

  get<Params: Parameters>(path: Path<Params>): Chain<Req & {params: Params}> {
    return new Chain(this.router, 'get', (path: string));
  }

  post<Params: Parameters>(path: Path<Params>): Chain<Req & {params: Params}> {
    return new Chain(this.router, 'post', (path: string));
  }
}

module.exports = { Router };
