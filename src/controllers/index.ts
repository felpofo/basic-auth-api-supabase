import { Request, Response } from "express";

export interface Controller {
  handle: (request: Request, response: Response) => Promise<Response>;
}

export * from "./LoginController";
export * from "./SignUpController";
export * from "./GetLunchTokenController";
