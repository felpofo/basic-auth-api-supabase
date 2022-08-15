import { Request, Response } from "express";

export interface Controller {
  handle: (request: Request, response: Response) => Promise<Response | void>;
}

export { LoginController } from "./LoginController";
export { UserContentController } from "./UserContentController";
export { AdminContentController } from "./AdminContentController";
export { SignUpController } from "./SignUpController";
