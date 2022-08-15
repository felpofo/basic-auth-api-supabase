import { NextFunction, Request, Response } from "express";

export interface Middleware {
  intercept: (request: Request, response: Response, next: NextFunction) => void
}

export { EnsureAuth } from "./EnsureAuth";
export { EnsureAdmin } from "./EnsureAdmin";
export { Log } from "./Log";
