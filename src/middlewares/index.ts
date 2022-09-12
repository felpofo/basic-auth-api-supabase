import { NextFunction, Request, Response } from "express";

export interface Middleware {
  intercept: (request: Request, response: Response, next: NextFunction) => void
}

export * from "./EnsureAuth";
export * from "./EnsureAdmin";
export * from "./Log";
