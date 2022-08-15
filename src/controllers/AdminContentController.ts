import { Request, Response } from "express";
import { Controller } from ".";
import { AdminContentService } from "../services";

export class AdminContentController implements Controller {
  public async handle(request: Request, response: Response) {
    return response.json(await new AdminContentService().execute());
  }
}
