import { Request, Response } from "express";
import type { Controller } from ".";
import { UserContentService } from "../services";

export class UserContentController implements Controller {
  public async handle(request: Request, response: Response) {

    return response.json(await new UserContentService().execute());
  }
}
