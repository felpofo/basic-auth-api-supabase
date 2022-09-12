import { Request, Response } from "express";
import { Controller } from ".";
import { GetLunchTokenService } from "../services";

export class GetLunchTokenController implements Controller {
  public async handle(request: Request, response: Response) {
    const { user_id } = request;

    return await new GetLunchTokenService().execute({ user_id })
      .then(({ message, data, status }) => response.status(status).json({ message, data }))
      .catch(({ error, status }) => response.status(status).json({ error }));
  }
}
