import { Request, Response, NextFunction } from "express";
import { PORT } from "../server";
import { Middleware } from ".";

/**
 * this class is only for debug
 * i like console logs
 */
export class Log implements Middleware {
  public intercept(request: Request, response: Response, next: NextFunction) {
    console.log(`[ ${request.method} ] http://${request.hostname}:${PORT}${request.url}`);
    return next();
  }
}
